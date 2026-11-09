# Strumf (T3 + Neon + NextAuth)

This project is scaffolded with [Create T3 App](https://create.t3.gg/) and configured for:
- Next.js App Router + TypeScript
- Prisma on Neon Postgres
- NextAuth with credentials-based login

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure environment variables:
   - Copy `.env.example` to `.env` if needed.
   - Set Neon values:
     - `DATABASE_URL`: pooled Neon connection string.
     - `DIRECT_URL`: direct Neon connection string for Prisma migrations.
   - Set `AUTH_SECRET` (generate with `npx auth secret`).
   - Optional: set `GEOAPIFY_API_KEY` for Nearby routing. Without it, Nearby uses OpenStreetMap/Overpass with estimated travel times.

3. Apply schema to Neon (migrations include domain tables + `migration_lock.toml`):

   ```bash
   npm run db:migrate
   ```

   For a quick local experiment without migration history you can use `npm run db:push` instead.

4. Open the app (after sign-in): `/app` — create a household, then use tRPC (`baby`, `feeding`, `invite`, etc.) from the client or API.

5. Start development server:

   ```bash
   npm run dev
   ```

## Authentication Flow

- Register via `POST /api/register` (or the UI at `/auth`).
- New users stay **inactive** until they confirm email (`/api/auth/verify-email`), then `isActive` is set.
- Local dev can set `SKIP_EMAIL_VERIFICATION=true` (disallowed in production builds).
- Optional **bootstrap admin**: set `BOOTSTRAP_ADMIN_EMAIL` and `BOOTSTRAP_ADMIN_PASSWORD` together for a first local admin (never commit real values).
- Sign in from `/auth` after verification.

See [docs/SECURITY.md](./docs/SECURITY.md) (reviewer checklist), [docs/BACKEND.md](./docs/BACKEND.md), and [docs/REVIEW.md](./docs/REVIEW.md).

## DB Health Check

- `GET /api/health/db` returns DB reachability status.

## Notes

- A baseline Postgres migration SQL file is included under `prisma/migrations/`.
- Without valid Neon credentials, live DB migration/apply and end-to-end sign-in verification cannot be executed locally.
