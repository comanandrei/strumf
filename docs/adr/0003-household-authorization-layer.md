# ADR-0003: Household authorization layer

## Status

Accepted

## Context

Strumf shares baby care data across **Caregivers** in a **Household**. Every tRPC router touching babies or households must enforce the same membership rules, or IDOR bugs appear quickly in open review.

## Decision

Centralize authorization in `src/server/lib/household-access.ts` and require every protected procedure to call one of:

1. `requireHouseholdMember` — read access to household-scoped lists
2. `requireHouseholdOwner` — structural changes (babies, invites)
3. `requireBabyAccess` — any baby-keyed entity (feeding, sleep, appointments, etc.)

tRPC `protectedProcedure` additionally verifies the session user is still `isActive` on each call so deactivated accounts cannot keep using a stale JWT.

## Consequences

- Routers stay thin: validate with Zod, authorize with household-access, then Prisma.
- New routers must not query babies/households without an explicit helper call — reviewers should grep for `ctx.db.baby` / `household` and confirm a matching `require*` precedes it.
- One extra DB read per authenticated tRPC call (active-user check); acceptable at current scale; swap for JWT claim refresh if this becomes hot.
