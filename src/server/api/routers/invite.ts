import { randomBytes } from "node:crypto";

import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { Prisma } from "../../../../generated/prisma";

import {
  getMembership,
  normalizeEmail,
  requireHouseholdOwner,
} from "~/server/lib/household-access";

const INVITE_TTL_DAYS = 14;

export const inviteRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        householdId: z.string().cuid(),
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await requireHouseholdOwner(ctx.db, ctx.session.user.id, input.householdId);
      const emailNorm = normalizeEmail(input.email);
      const sessionEmail = ctx.session.user.email;
      if (sessionEmail && normalizeEmail(sessionEmail) === emailNorm) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You cannot invite your own account email.",
        });
      }
      const existingUser = await ctx.db.user.findUnique({
        where: { email: emailNorm },
      });
      if (existingUser) {
        const already = await getMembership(
          ctx.db,
          existingUser.id,
          input.householdId,
        );
        if (already) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "This user is already a member of the household.",
          });
        }
      }
      const pending = await ctx.db.caregiverInvite.findFirst({
        where: {
          householdId: input.householdId,
          emailNormalized: emailNorm,
          revokedAt: null,
          acceptedAt: null,
          expiresAt: { gt: new Date() },
        },
      });
      if (pending) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "An active invite already exists for this email.",
        });
      }
      const token = randomBytes(24).toString("hex");
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + INVITE_TTL_DAYS);
      return ctx.db.caregiverInvite.create({
        data: {
          householdId: input.householdId,
          emailNormalized: emailNorm,
          token,
          invitedByUserId: ctx.session.user.id,
          expiresAt,
        },
      });
    }),

  listPending: protectedProcedure
    .input(z.object({ householdId: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      await requireHouseholdOwner(ctx.db, ctx.session.user.id, input.householdId);
      return ctx.db.caregiverInvite.findMany({
        where: {
          householdId: input.householdId,
          revokedAt: null,
          acceptedAt: null,
          expiresAt: { gt: new Date() },
        },
        orderBy: { expiresAt: "asc" },
        select: {
          id: true,
          householdId: true,
          emailNormalized: true,
          expiresAt: true,
          invitedByUserId: true,
        },
      });
    }),

  revoke: protectedProcedure
    .input(z.object({ inviteId: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const inv = await ctx.db.caregiverInvite.findUnique({
        where: { id: input.inviteId },
      });
      if (!inv) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Invite not found." });
      }
      await requireHouseholdOwner(ctx.db, ctx.session.user.id, inv.householdId);
      return ctx.db.caregiverInvite.update({
        where: { id: input.inviteId },
        data: { revokedAt: new Date() },
      });
    }),

  acceptByToken: protectedProcedure
    .input(z.object({ token: z.string().min(10).max(128) }))
    .mutation(async ({ ctx, input }) => {
      const userEmail = ctx.session.user.email;
      if (!userEmail) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Your account must have an email to accept an invite.",
        });
      }
      const userNorm = normalizeEmail(userEmail);
      const inv = await ctx.db.caregiverInvite.findUnique({
        where: { token: input.token },
      });
      if (!inv || inv.revokedAt || inv.acceptedAt || inv.expiresAt < new Date()) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid or expired invite.",
        });
      }
      if (inv.emailNormalized !== userNorm) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "This invite was sent to a different email address.",
        });
      }
      const userId = ctx.session.user.id;
      const existing = await getMembership(ctx.db, userId, inv.householdId);
      if (existing) {
        return { householdId: inv.householdId, alreadyMember: true };
      }
      try {
        await ctx.db.$transaction([
          ctx.db.householdMembership.create({
            data: {
              userId,
              householdId: inv.householdId,
              role: "MEMBER",
            },
          }),
          ctx.db.caregiverInvite.update({
            where: { id: inv.id },
            data: {
              acceptedAt: new Date(),
              acceptedByUserId: userId,
            },
          }),
        ]);
      } catch (err) {
        if (
          err instanceof Prisma.PrismaClientKnownRequestError &&
          err.code === "P2002"
        ) {
          return { householdId: inv.householdId, alreadyMember: true };
        }
        throw err;
      }
      return { householdId: inv.householdId, alreadyMember: false };
    }),
});
