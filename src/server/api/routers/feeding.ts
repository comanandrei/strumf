import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { requireBabyAccess } from "~/server/lib/household-access";
import { MilkType } from "../../../../generated/prisma";

export const feedingRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        babyId: z.string().cuid(),
        startedAt: z.coerce.date(),
        endedAt: z.coerce.date().optional(),
        amountMl: z.number().int().positive().max(2000),
        milkType: z.nativeEnum(MilkType).optional(),
        notes: z.string().max(2000).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await requireBabyAccess(ctx.db, ctx.session.user.id, input.babyId);
      if (input.endedAt && input.endedAt < input.startedAt) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "endedAt must be after startedAt.",
        });
      }
      return ctx.db.feedingEvent.create({
        data: {
          babyId: input.babyId,
          loggedByUserId: ctx.session.user.id,
          startedAt: input.startedAt,
          endedAt: input.endedAt,
          amountMl: input.amountMl,
          milkType: input.milkType ?? "UNKNOWN",
          notes: input.notes,
        },
      });
    }),

  deleteOwn: protectedProcedure
    .input(z.object({ feedingEventId: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const event = await ctx.db.feedingEvent.findUnique({
        where: { id: input.feedingEventId },
        select: { id: true, babyId: true, loggedByUserId: true },
      });
      if (!event) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Feeding not found." });
      }
      if (event.loggedByUserId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You can only delete feedings you logged.",
        });
      }
      await requireBabyAccess(ctx.db, ctx.session.user.id, event.babyId);
      await ctx.db.feedingEvent.delete({ where: { id: event.id } });
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
      return ctx.db.feedingEvent.findMany({
        where: {
          babyId: input.babyId,
          ...(Object.keys(startedAt).length > 0 ? { startedAt } : {}),
        },
        orderBy: { startedAt: "desc" },
        take: input.limit ?? 100,
      });
    }),
});
