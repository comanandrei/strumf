# Security model (backend)

Strumf is a multi-tenant caregiver app: **Household** membership gates every baby-scoped mutation. This document is written for reviewers auditing the open-source backend.

## Trust boundaries

| Surface | Auth | Notes |
| -------- | ----- | ----- |
| `tRPC` (`/api/trpc`) | NextAuth session (JWT) | All domain routes use `protectedProcedure` + active-user check |
| `POST /api/register` | None | Rate-limited; email verification before sign-in |
| `GET /api/auth/*` | Auth.js | Middleware strips invalid `callbackUrl` values |
| `GET /api/cron/appointment-reminders` | Shared secret (prod required) | Idempotent claim via `reminderSentAt` |
| `GET /api/health/db` | None | No internal error text in production |

## Authorization

All household-scoped access funnels through `src/server/lib/household-access.ts`:

- `requireHouseholdMember` — read household data
- `requireHouseholdOwner` — invites, baby create, profile update
- `requireBabyAccess` — resolves baby → household → membership

Invite acceptance binds the logged-in user's **normalized email** to the invite token (no open token redeem).

## Authentication

- Credentials provider with bcrypt (cost 12).
- JWT strategy (no DB session rows for credentials today).
- Users must be **email-verified** and **`isActive`** before sign-in (except dev `SKIP_EMAIL_VERIFICATION`).
- Optional **bootstrap admin** (`BOOTSTRAP_ADMIN_EMAIL` + `BOOTSTRAP_ADMIN_PASSWORD`) for local/self-hosted first run only — blocked in production by env validation.

## Secrets & environment

Production builds validate via `src/env.js` (`superRefine`):

- `AUTH_SECRET` required
- `APPOINTMENT_REMINDER_CRON_SECRET` required
- `SKIP_EMAIL_VERIFICATION` must not be `true`
- Bootstrap admin env vars must be unset

Never commit `.env`. See `.env.example`.

## Data exposure

- Household **owners** see member emails in `household.get`; **members** see names only.
- Nearby uses ephemeral coordinates on the server; coordinates are not stored (see ADR-0001).
- GPT daily summaries send a constructed prompt to OpenAI only when `OPENAI_API_KEY` is set and the caller has baby access.

## Reporting issues

If you find a vulnerability in this repository, please open a private security advisory on GitHub rather than a public issue.
