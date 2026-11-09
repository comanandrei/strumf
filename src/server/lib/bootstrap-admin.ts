import { env } from "~/env";
import { normalizeEmail } from "~/server/lib/household-access";

/**
 * Optional first-run admin used in self-hosted / dev environments.
 * Configure via BOOTSTRAP_ADMIN_EMAIL + BOOTSTRAP_ADMIN_PASSWORD — never commit real values.
 */
export function isBootstrapAdminConfigured(): boolean {
  return Boolean(env.BOOTSTRAP_ADMIN_EMAIL && env.BOOTSTRAP_ADMIN_PASSWORD);
}

export function getBootstrapAdminEmail(): string | null {
  if (!env.BOOTSTRAP_ADMIN_EMAIL) return null;
  return normalizeEmail(env.BOOTSTRAP_ADMIN_EMAIL);
}

export function getBootstrapAdminPassword(): string | null {
  return env.BOOTSTRAP_ADMIN_PASSWORD ?? null;
}

export function isBootstrapAdminLogin(email: string, password: string): boolean {
  const configuredEmail = getBootstrapAdminEmail();
  const configuredPassword = getBootstrapAdminPassword();
  if (!configuredEmail || !configuredPassword) return false;
  return (
    normalizeEmail(email) === configuredEmail && password === configuredPassword
  );
}

export function isBootstrapAdminEmail(email: string): boolean {
  const configuredEmail = getBootstrapAdminEmail();
  if (!configuredEmail) return false;
  return normalizeEmail(email) === configuredEmail;
}
