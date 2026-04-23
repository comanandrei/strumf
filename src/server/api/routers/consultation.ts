import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { requireBabyAccess } from "~/server/lib/household-access";

export const consultationRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        babyId: z.string().cuid(),
        occurredAt: z.coerce.date(),
        location: z.string().min(1).max(500),
        reason: z.string().min(1).max(10000),
        outcomeNotes: z.string().max(10000).optional(),
        providerName: z.string().max(200).optional(),
        followUpAt: z.coerce.date().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await requireBabyAccess(ctx.db, ctx.session.user.id, input.babyId);
      return ctx.db.consultation.create({
        data: {
          babyId: input.babyId,
          recordedById: ctx.session.user.id,
          occurredAt: input.occurredAt,
          location: input.location,
          reason: input.reason,
          outcomeNotes: input.outcomeNotes,
          providerName: input.providerName,
          followUpAt: input.followUpAt,
        },
      });
    }),

  listByBaby: protectedProcedure
    .input(z.object({ babyId: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      await requireBabyAccess(ctx.db, ctx.session.user.id, input.babyId);
      return ctx.db.consultation.findMany({
        where: { babyId: input.babyId },
        orderBy: { occurredAt: "desc" },
      });
    }),
});
