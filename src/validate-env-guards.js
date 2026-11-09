/**
 * Cross-field and production guardrails for environment variables.
 * Invoked from `env.js` after T3 `createEnv` parsing.
 *
 * @param {import("./env.js").env} vals
 */
export function assertEnvGuards(vals) {
  const bootstrapEmail = vals.BOOTSTRAP_ADMIN_EMAIL;
  const bootstrapPassword = vals.BOOTSTRAP_ADMIN_PASSWORD;

  if (bootstrapEmail && !bootstrapPassword) {
    throw new Error(
      "BOOTSTRAP_ADMIN_PASSWORD is required when BOOTSTRAP_ADMIN_EMAIL is set.",
    );
  }
  if (bootstrapPassword && !bootstrapEmail) {
    throw new Error(
      "BOOTSTRAP_ADMIN_EMAIL is required when BOOTSTRAP_ADMIN_PASSWORD is set.",
    );
  }

  if (vals.NODE_ENV !== "production") return;

  if (!vals.AUTH_SECRET?.trim()) {
    throw new Error("AUTH_SECRET is required in production.");
  }
  if (!vals.APPOINTMENT_REMINDER_CRON_SECRET?.trim()) {
    throw new Error(
      "APPOINTMENT_REMINDER_CRON_SECRET is required in production (cron endpoint is otherwise open).",
    );
  }
  if (vals.SKIP_EMAIL_VERIFICATION === "true") {
    throw new Error("SKIP_EMAIL_VERIFICATION must not be true in production.");
  }
  if (bootstrapEmail || bootstrapPassword) {
    throw new Error(
      "Bootstrap admin env vars must not be set in production. Use normal registration + email verification.",
    );
  }
}
