import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    /** Prefer a strong random value; auth falls back if unset so local/bootstrap never hard-fails. */
    AUTH_SECRET: z.string().optional(),
    DIRECT_URL: z.string().url(),
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    /** Send confirmation via Resend; if unset, the verification URL is logged server-side in dev. */
    RESEND_API_KEY: z.string().optional(),
    /** Required when RESEND_API_KEY is set (e.g. `Strumf <onboarding@resend.dev>`). */
    EMAIL_FROM: z.string().optional(),
    /** Set to "true" to skip email verification (local testing only). */
    SKIP_EMAIL_VERIFICATION: z.enum(["true", "false"]).optional(),
    /** Bearer token for the read-only MCP endpoint at `/api/mcp` (min 16 characters). */
    MCP_API_SECRET: z.string().min(16).optional(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    DIRECT_URL: process.env.DIRECT_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    SKIP_EMAIL_VERIFICATION: process.env.SKIP_EMAIL_VERIFICATION,
    MCP_API_SECRET: process.env.MCP_API_SECRET,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
