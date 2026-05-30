# Strumf — AI assistant notes

Baby feeding & care app. Stack: Next.js (App Router), TypeScript, tRPC, Prisma on Neon Postgres, NextAuth (credentials).

## Key docs

- [README.md](./README.md) — local setup, auth flow, DB commands
- [docs/PRODUCT_REQUIREMENTS.md](./docs/PRODUCT_REQUIREMENTS.md) — product defaults and implementation scope

## Common commands

```bash
npm install
npm run dev
npm run db:migrate   # apply Prisma migrations to Neon
npm run db:push      # schema push without migration history
```

## Conventions

- Domain logic lives in tRPC routers with Zod validation and household membership guards.
- New users register with `isActive=false`; activate in DB before sign-in works locally.
- Health check: `GET /api/health/db`
