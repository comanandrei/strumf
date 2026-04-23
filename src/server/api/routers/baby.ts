import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import {
  requireBabyAccess,
  requireHouseholdMember,
  requireHouseholdOwner,
} from "~/server/lib/household-access";
import { BabySex } from "../../../../generated/prisma";

const babyCreateInput = z.object({
  householdId: z.string().cuid(),
  displayName: z.string().min(1).max(120),
  birthDateTime: z.coerce.date(),
  birthWeightGrams: z.number().int().positive().optional(),
  birthLengthCm: z.number().int().positive().optional(),
  headCircumferenceCm: z.number().int().positive().optional(),
  sex: z.nativeEnum(BabySex).optional(),
  notes: z.string().max(5000).optional(),
  timezone: z.string().min(1).max(64).optional(),
});

const babyUpdateInput = z.object({
  babyId: z.string().cuid(),
  displayName: z.string().min(1).max(120).optional(),
  birthDateTime: z.coerce.date().optional(),
  birthWeightGrams: z.number().int().positive().optional().nullable(),
  birthLengthCm: z.number().int().positive().optional().nullable(),
  headCircumferenceCm: z.number().int().positive().optional().nullable(),
  sex: z.nativeEnum(BabySex).optional(),
  notes: z.string().max(5000).optional().nullable(),
  timezone: z.string().min(1).max(64).optional(),
});

export const babyRouter = createTRPCRouter({
  listByHousehold: protectedProcedure
    .input(z.object({ householdId: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      await requireHouseholdMember(ctx.db, ctx.session.user.id, input.householdId);
      return ctx.db.baby.findMany({
        where: { householdId: input.householdId },
        orderBy: { birthDateTime: "desc" },
      });
    }),

  create: protectedProcedure
    .input(babyCreateInput)
    .mutation(async ({ ctx, input }) => {
    await requireHouseholdOwner(ctx.db, ctx.session.user.id, input.householdId);
    return ctx.db.baby.create({
      data: {
        householdId: input.householdId,
        displayName: input.displayName,
        birthDateTime: input.birthDateTime,
        birthWeightGrams: input.birthWeightGrams,
        birthLengthCm: input.birthLengthCm,
        headCircumferenceCm: input.headCircumferenceCm,
        sex: input.sex ?? "UNKNOWN",
        notes: input.notes,
        timezone: input.timezone ?? "UTC",
      },
    });
  }),

  get: protectedProcedure
    .input(z.object({ babyId: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      const { baby } = await requireBabyAccess(
        ctx.db,
        ctx.session.user.id,
        input.babyId,
      );
      return baby;
    }),

  update: protectedProcedure.input(babyUpdateInput).mutation(async ({ ctx, input }) => {
      const { baby, role } = await requireBabyAccess(
        ctx.db,
        ctx.session.user.id,
        input.babyId,
      );
      if (role !== "OWNER") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only household owners can update baby profile.",
        });
      }
      const { babyId: _babyId, ...fields } = input;
      return ctx.db.baby.update({
        where: { id: baby.id },
        data: {
          displayName: fields.displayName,
          birthDateTime: fields.birthDateTime,
          birthWeightGrams: fields.birthWeightGrams,
          birthLengthCm: fields.birthLengthCm,
          headCircumferenceCm: fields.headCircumferenceCm,
          sex: fields.sex,
          notes: fields.notes,
          timezone: fields.timezone,
        },
      });
    }),
});
