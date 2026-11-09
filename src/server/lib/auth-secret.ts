import { env } from "~/env";

const DEV_FALLBACK_SECRET =
  "strumf-dev-auth-secret-min-32-chars-do-not-use-in-production";

/**
 * Resolves Auth.js `secret`. Production must set AUTH_SECRET; dev may use a documented fallback.
 */
export function resolveAuthSecret(): string {
  const configured = env.AUTH_SECRET?.trim();
  if (configured) return configured;
  if (env.NODE_ENV === "production") {
    throw new Error(
      "AUTH_SECRET is required in production. Generate one with: npx auth secret",
    );
  }
  return DEV_FALLBACK_SECRET;
}
