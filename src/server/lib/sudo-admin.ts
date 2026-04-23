import { normalizeEmail } from "~/server/lib/household-access";

/** Temporary hardcoded bootstrap admin (remove when real roles exist). */
export const SUDO_ADMIN_EMAIL = normalizeEmail("andcom@gmail.com");

export const SUDO_ADMIN_PASSWORD = "parola1234";

export function isSudoAdminEmail(email: string): boolean {
  return normalizeEmail(email) === SUDO_ADMIN_EMAIL;
}
