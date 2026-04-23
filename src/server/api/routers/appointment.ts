import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { requireBabyAccess } from "~/server/lib/household-access";

export const appointmentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        babyId: z.string().cuid(),
        title: z.string().min(1).max(200),
        startsAt: z.coerce.date(),
        endsAt: z.coerce.date().optional(),
        location: z.string().max(500).optional(),
        notes: z.string().max(5000).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await requireBabyAccess(ctx.db, ctx.session.user.id, input.babyId);
      if (input.endsAt && input.endsAt < input.startsAt) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "endsAt must be after startsAt.",
        });
      }
      return ctx.db.appointment.create({
        data: {
          babyId: input.babyId,
          title: input.title,
          startsAt: input.startsAt,
          endsAt: input.endsAt,
          location: input.location,
          notes: input.notes,
        },
      });
    }),

  listByBaby: protectedProcedure
    .input(z.object({ babyId: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      await requireBabyAccess(ctx.db, ctx.session.user.id, input.babyId);
      return ctx.db.appointment.findMany({
        where: { babyId: input.babyId },
        orderBy: { startsAt: "asc" },
      });
    }),
});
