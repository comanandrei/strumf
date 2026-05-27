import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { requireBabyAccess } from "~/server/lib/household-access";

const MAX_SLEEP_HOURS = 18;

export const sleepRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        babyId: z.string().cuid(),
        startedAt: z.coerce.date(),
        endedAt: z.coerce.date(),
        notes: z.string().max(2000).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await requireBabyAccess(ctx.db, ctx.session.user.id, input.babyId);
      if (input.endedAt <= input.startedAt) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "endedAt must be after startedAt.",
        });
      }

      const durationHours =
        (input.endedAt.getTime() - input.startedAt.getTime()) / (60 * 60 * 1000);
      if (durationHours > MAX_SLEEP_HOURS) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Sleep cannot be longer than ${MAX_SLEEP_HOURS} hours.`,
        });
      }

      return ctx.db.sleepEvent.create({
        data: {
          babyId: input.babyId,
          loggedByUserId: ctx.session.user.id,
          startedAt: input.startedAt,
          endedAt: input.endedAt,
          notes: input.notes,
        },
      });
    }),

  deleteOwn: protectedProcedure
    .input(z.object({ sleepEventId: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const event = await ctx.db.sleepEvent.findUnique({
        where: { id: input.sleepEventId },
        select: { id: true, babyId: true, loggedByUserId: true },
      });
      if (!event) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Sleep event not found." });
      }
      if (event.loggedByUserId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You can only delete sleep events you logged.",
        });
      }

      await requireBabyAccess(ctx.db, ctx.session.user.id, event.babyId);
      await ctx.db.sleepEvent.delete({ where: { id: event.id } });
      return { ok: true as const };
    }),

  listByBaby: protectedProcedure
    .input(
      z.object({
        babyId: z.string().cuid(),
        from: z.coerce.date().optional(),
        to: z.coerce.date().optional(),
        limit: z.number().int().min(1).max(200).optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      await requireBabyAccess(ctx.db, ctx.session.user.id, input.babyId);
      const startedAt: { gte?: Date; lte?: Date } = {};
      if (input.from) startedAt.gte = input.from;
      if (input.to) startedAt.lte = input.to;

      return ctx.db.sleepEvent.findMany({
        where: {
          babyId: input.babyId,
          ...(Object.keys(startedAt).length > 0 ? { startedAt } : {}),
        },
        orderBy: { startedAt: "desc" },
        take: input.limit ?? 100,
      });
    }),
});
