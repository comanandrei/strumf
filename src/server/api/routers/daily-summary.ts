import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  DAILY_BABY_SUMMARY_KIND,
  buildDailyBabySummaryPrompt,
  dailyBabySummaryExpiresAt,
  getCachedDailyBabySummary,
  makeDailyBabySummaryPayload,
  requestGptBabySummary,
} from "~/server/lib/daily-baby-summary";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { requireBabyAccess } from "~/server/lib/household-access";
import { env } from "~/env";

export const dailySummaryRouter = createTRPCRouter({
  today: protectedProcedure
    .input(z.object({ babyId: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      const { baby } = await requireBabyAccess(ctx.db, ctx.session.user.id, input.babyId);
      const { dateKey, prompt } = await buildDailyBabySummaryPrompt(ctx.db, baby);
      const summary = await getCachedDailyBabySummary(ctx.db, baby.id, dateKey);

      return {
        dateKey,
        prompt,
        summary,
        isGptConfigured: Boolean(env.OPENAI_API_KEY),
      };
    }),

  generate: protectedProcedure
    .input(z.object({ babyId: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const { baby } = await requireBabyAccess(ctx.db, ctx.session.user.id, input.babyId);
      const { dateKey, prompt } = await buildDailyBabySummaryPrompt(ctx.db, baby);
      const cached = await getCachedDailyBabySummary(ctx.db, baby.id, dateKey);

      if (cached) {
        return {
          dateKey,
          prompt,
          summary: cached,
          created: false,
          isGptConfigured: Boolean(env.OPENAI_API_KEY),
        };
      }

      if (!env.OPENAI_API_KEY) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "OpenAI is not configured. Add OPENAI_API_KEY to enable GPT summaries.",
        });
      }

      try {
        const { model, summary } = await requestGptBabySummary(prompt);
        const payload = makeDailyBabySummaryPayload({ dateKey, model, prompt, summary });

        await ctx.db.predictionCache.create({
          data: {
            babyId: baby.id,
            kind: DAILY_BABY_SUMMARY_KIND,
            inputFingerprint: dateKey,
            payload,
            modelVersion: model,
            expiresAt: dailyBabySummaryExpiresAt(),
          },
        });

        return {
          dateKey,
          prompt,
          summary: payload,
          created: true,
          isGptConfigured: true,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            error instanceof Error
              ? error.message
              : "Could not generate the daily baby summary.",
        });
      }
    }),
});

