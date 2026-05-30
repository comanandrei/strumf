import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, sudoProcedure } from "~/server/api/trpc";
import { env } from "~/env";
import { runOracleQuery } from "~/server/lib/oracle-query";

export const oracleRouter = createTRPCRouter({
  status: sudoProcedure.query(() => ({
    isGptConfigured: Boolean(env.OPENAI_API_KEY),
  })),

  ask: sudoProcedure
    .input(
      z.object({
        question: z.string().trim().min(3).max(2000),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!env.OPENAI_API_KEY) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "OpenAI is not configured. Add OPENAI_API_KEY to enable Oracle.",
        });
      }

      try {
        const result = await runOracleQuery(ctx.db, input.question);
        console.info("[oracle]", {
          userId: ctx.session.user.id,
          question: input.question.slice(0, 200),
          sql: result.sql,
          rowCount: result.rowCount,
        });
        return result;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            error instanceof Error ? error.message : "Oracle could not answer that question.",
        });
      }
    }),
});
