# How we review changes

Agents and maintainers use the same bar.

## Automated

- `npm run typecheck` on the PR branch
- CI (when configured)

## Manual (backend / security PRs)

1. Read the PR summary and linked issue or plan.
2. Walk [SECURITY.md](./SECURITY.md) **Reviewer checklist** on the diff.
3. Confirm new tRPC procedures call a `require*` helper before Prisma.
4. Skim [ADR-0003](./adr/0003-household-authorization-layer.md) if authorization code moved.

## Agents (`/ship` Phase 3)

Follow `.agents/skills/review/SKILL.md`. Store output in `.scratch/ship-pipeline/state.json` for the MR body.
