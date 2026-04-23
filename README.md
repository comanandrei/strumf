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
- New users are created with `isActive=false`.
- A developer/admin activates accounts directly in DB by setting `User.isActive=true`.
- After activation, users can sign in from `/auth`.

## DB Health Check

- `GET /api/health/db` returns DB reachability status.

## Notes

- A baseline Postgres migration SQL file is included under `prisma/migrations/`.
- Without valid Neon credentials, live DB migration/apply and end-to-end sign-in verification cannot be executed locally.
