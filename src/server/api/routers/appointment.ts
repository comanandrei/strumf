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
        reminderAt: z.coerce.date().optional(),
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
      if (input.reminderAt) {
        if (input.reminderAt >= input.startsAt) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Reminder must be before the appointment starts.",
          });
        }
        if (input.reminderAt <= new Date()) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Reminder must be scheduled in the future.",
          });
        }
      }
      return ctx.db.appointment.create({
        data: {
          babyId: input.babyId,
          title: input.title,
          startsAt: input.startsAt,
          endsAt: input.endsAt,
          location: input.location,
          notes: input.notes,
          reminderAt: input.reminderAt,
        },
      });
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
      const startsAt: { gte?: Date; lte?: Date } = {};
      if (input.from) startsAt.gte = input.from;
      if (input.to) startsAt.lte = input.to;

      return ctx.db.appointment.findMany({
        where: {
          babyId: input.babyId,
          ...(Object.keys(startsAt).length > 0 ? { startsAt } : {}),
        },
        orderBy: { startsAt: "asc" },
        ...(input.limit ? { take: input.limit } : {}),
      });
    }),
});
