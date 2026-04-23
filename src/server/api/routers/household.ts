import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import {
  requireHouseholdMember,
} from "~/server/lib/household-access";

export const householdRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(120).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return ctx.db.$transaction(async (tx) => {
        const household = await tx.household.create({
          data: { name: input.name },
        });
        await tx.householdMembership.create({
          data: {
            userId,
            householdId: household.id,
            role: "OWNER",
          },
        });
        return tx.household.findUniqueOrThrow({
          where: { id: household.id },
          include: {
            memberships: { where: { userId } },
          },
        });
      });
    }),

  myHouseholds: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    return ctx.db.household.findMany({
      where: { memberships: { some: { userId } } },
      include: {
        memberships: {
          where: { userId },
          take: 1,
        },
        babies: { orderBy: { displayName: "asc" } },
      },
      orderBy: { updatedAt: "desc" },
    });
  }),

  get: protectedProcedure
    .input(z.object({ householdId: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      const { role } = await requireHouseholdMember(
        ctx.db,
        ctx.session.user.id,
        input.householdId,
      );
      const userSelect =
        role === "OWNER"
          ? ({ id: true, name: true, email: true } as const)
          : ({ id: true, name: true } as const);
      return ctx.db.household.findUniqueOrThrow({
        where: { id: input.householdId },
        include: {
          babies: { orderBy: { birthDateTime: "desc" } },
          memberships: {
            include: { user: { select: userSelect } },
          },
        },
      });
    }),
});
