import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

// Prisma `directUrl` and our schema expect DIRECT_URL. Many hosts (e.g. Vercel) only set
// DATABASE_URL — mirror it so builds, postinstall `prisma generate`, and runtime work.
// Neon with a pooler can set a separate DIRECT_URL for migrations.
const databaseUrlForEnv = process.env.DATABASE_URL;
const directUrlForEnv = process.env.DIRECT_URL ?? databaseUrlForEnv;
if (directUrlForEnv && !process.env.DIRECT_URL) {
  process.env.DIRECT_URL = directUrlForEnv;
}

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    /** Prefer a strong random value; auth falls back if unset so local/bootstrap never hard-fails. */
    AUTH_SECRET: z.string().optional(),
    /** Defaults to DATABASE_URL when unset (see bootstrap above). */
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
    /** Geoapify free-tier API key for the Nearby feature (server-side only). */
    GEOAPIFY_API_KEY: z.string().optional(),
    /** Optional OpenAI key used for one daily GPT baby summary. */
    OPENAI_API_KEY: z.string().optional(),
    /** Optional override for the GPT model used by daily summaries. */
    OPENAI_MODEL: z.string().optional(),
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
    DIRECT_URL: directUrlForEnv,
    DATABASE_URL: databaseUrlForEnv,
    NODE_ENV: process.env.NODE_ENV,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    SKIP_EMAIL_VERIFICATION: process.env.SKIP_EMAIL_VERIFICATION,
    GEOAPIFY_API_KEY: process.env.GEOAPIFY_API_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_MODEL: process.env.OPENAI_MODEL,
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
