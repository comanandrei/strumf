/**
 * NextAuth's `reqWithEnvURL` replaces the request origin with `AUTH_URL` / `NEXTAUTH_URL`.
 * If that origin does not match the browser (wrong port, https vs http, tunnel URL, etc.),
 * CSRF / cookies break and sign-in ends as `error=Configuration`.
 *
 * **Non-production:** drop these vars so Auth.js always uses the actual request host
 * (best default for `next dev` on localhost).
 *
 * **Production:** normalize to origin only; strip only the common bad pathname `/auth`.
 */
const keys = ["AUTH_URL", "NEXTAUTH_URL"] as const;

if (process.env.NODE_ENV === "production") {
  for (const key of keys) {
    const raw = process.env[key];
    if (!raw || raw.trim() === "") continue;
    try {
      const u = new URL(raw);
      const badAuthPath =
        u.pathname === "/auth" ||
        u.pathname === "/auth/" ||
        u.pathname.startsWith("/auth/");
      if (badAuthPath) {
        process.env[key] = u.origin;
      }
    } catch {
      delete process.env[key];
    }
  }
} else {
  for (const key of keys) {
    delete process.env[key];
  }
}
