## Cursor Cloud specific instructions

### Overview

**Strumf** is a baby care tracking web app (Next.js App Router + tRPC + Prisma + NextAuth). Single monolithic service with a PostgreSQL database.

### Services

| Service | Start Command | Port |
|---------|--------------|------|
| PostgreSQL | `npm run db:up` (docker compose) | 5432 |
| Next.js dev server | `npm run dev` | 3000 |

### Key Commands

- **Typecheck:** `npm run typecheck`
- **Build:** `npm run build`
- **Dev server:** `npm run dev` (uses Turbopack)
- **DB up:** `npm run db:up` (requires Docker daemon running)
- **DB migrate:** `npm run db:migrate` (applies pending Prisma migrations)
- **DB push:** `npm run db:push` (sync schema without migration history)
- **DB studio:** `npm run db:studio` (Prisma Studio GUI on port 5555)

### Startup Caveats

1. **Docker daemon must be started manually** before `npm run db:up`. Run `dockerd &` first if not already running.
2. **Docker in this environment uses fuse-overlayfs** storage driver and iptables-legacy (required for nested container support).
3. The `.env` file must exist with valid `DATABASE_URL` and `DIRECT_URL` pointing to the local Postgres (`postgresql://strumf:strumf@localhost:5432/strumf?schema=public`).
4. Set `SKIP_EMAIL_VERIFICATION="true"` in `.env` to bypass email verification for local/dev user registration.
5. There is **no ESLint config** in this repo — only `tsc --noEmit` for linting/type-checking.
6. The `postinstall` script runs `prisma generate` automatically after `npm install`.

### Auth Flow (dev)

- Register via `POST /api/register` with `{email, password, name}`.
- With `SKIP_EMAIL_VERIFICATION=true`, accounts are immediately active.
- Sign in via NextAuth credentials provider at `/auth`.
