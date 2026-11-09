# Security (backend)

For humans auditing this repo. Domain vocabulary: [CONTEXT.md](../CONTEXT.md). Architecture map: [BACKEND.md](./BACKEND.md).

## Reviewer checklist

Use this list on any PR that touches auth, APIs, env, or Prisma routers.

1. **Household boundary** — Baby/household reads and writes go through `requireHouseholdMember`, `requireHouseholdOwner`, or `requireBabyAccess` in `src/server/lib/household-access.ts` before Prisma. Grep `ctx.db` in changed routers.
2. **Session gate** — Mutations use `protectedProcedure` (JWT + `isActive` check in `src/server/api/trpc.ts`).
3. **No secrets in git** — No passwords, API keys, or production URLs in source. Bootstrap admin only via env (see below).
4. **Production env** — `src/validate-env-guards.js`: `AUTH_SECRET`, `APPOINTMENT_REMINDER_CRON_SECRET` required; `SKIP_EMAIL_VERIFICATION` and bootstrap vars forbidden.
5. **Register** — Rate limited (`src/server/lib/rate-limit.ts`); new users inactive until verified (unless dev flag).
6. **Cron** — `GET/POST /api/cron/appointment-reminders` requires shared secret in production; compare via `secureCompare`.
7. **Errors** — Health and auth responses do not leak stack traces or connection strings in production.
8. **Third-party data** — OpenAI / Geoapify / Resend only after authorization; no PII in client bundles.

## Trust boundaries

| Surface | Auth | Notes |
| -------- | ----- | ----- |
| tRPC `/api/trpc` | NextAuth JWT | `protectedProcedure` + active user |
| `POST /api/register` | None | Rate limited; verify email before use |
| `GET /api/auth/*` | Auth.js | Safe redirect callback handling |
| `GET/POST …/cron/appointment-reminders` | Bearer or `x-cron-secret` | Fail closed in production without secret |
| `GET /api/health/db` | None | Generic body in production |

## Authorization model

See [ADR-0003](./adr/0003-household-authorization-layer.md). Invite accept ties the token to the signed-in user's normalized email.

## Authentication

- Bcrypt (cost 12) for passwords.
- JWT sessions (no DB session rows for credentials).
- Sign-in requires verified email and `isActive` (unless `SKIP_EMAIL_VERIFICATION=true` in non-production).
- **Bootstrap admin** (optional): set `BOOTSTRAP_ADMIN_EMAIL` and `BOOTSTRAP_ADMIN_PASSWORD` together for local/self-hosted first run — blocked in production by env guards. Never commit values; see `.env.example`.

## Reporting vulnerabilities

Open a [GitHub private security advisory](https://github.com/comanandrei/strumf/security/advisories/new), not a public issue.
