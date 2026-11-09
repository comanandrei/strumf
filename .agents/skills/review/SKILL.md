---
name: review
description: >-
  Two-axis code review (standards + spec) on a git diff, with Strumf security
  checks for backend changes. Reports 🔴 critical and 🟡 suggestions. Use when
  reviewing a branch or PR, finishing ship Phase 3, or the user asks for a code
  review.
disable-model-invocation: true
---

# Code review (standards + spec)

Review `git diff <base>...HEAD` before merge. Ship Phase 3 treats **zero 🔴** as the gate.

**Prerequisite:** `docs/agents/issue-tracker.md` or user-provided spec path.

## 1. Pin the diff

```bash
git rev-parse <base>
git log <base>..HEAD --oneline
git diff <base>...HEAD
```

Default `<base>`: `master` (or repo default). Stop if the diff is empty.

## 2. Load context

| Axis | Sources |
| ---- | ------- |
| **Spec** | Issue # from commits, user path, `.scratch/ship-pipeline/plan.md`, or `docs/PRODUCT_REQUIREMENTS.md` |
| **Standards** | `CONTEXT.md`, `docs/adr/*`, `CLAUDE.md`, contributor docs if present |
| **Security** (backend / auth / API) | [docs/SECURITY.md](../../docs/SECURITY.md) checklist |

## 3. Review passes

Run **standards** and **spec** mentally (or parallel sub-agents for large diffs). For touches under `src/server/`, `src/app/api/`, `src/env.js`, or `docs/SECURITY.md`, also run the **security** pass.

### Standards

- Match repo patterns (naming, module boundaries, Zod on inputs).
- Fowler smells as heuristics only — cite the hunk, not dogma.
- Skip what CI already enforces (typecheck, format).

### Spec

Each finding quotes the spec line. Flag missing requirements, scope creep, and “looks done but wrong”.

### Security (Strumf)

Walk [docs/SECURITY.md](../../docs/SECURITY.md) **Reviewer checklist**. Any failed item is at least 🟡; exploitable IDOR, missing auth, or secret leakage is 🔴.

## 4. Report format

```markdown
## Standards
- 🟡|🔴 <file>: <finding> — <rule or smell>

## Spec
- 🟡|🔴 <requirement>: <finding>

## Security
- 🟡|🔴 <checklist item>: <finding> (or "N/A — no backend surface in diff")

## Summary
- 🔴: <count> — <worst per axis>
- 🟡: <count>
- Verdict: pass | fix 🔴 before merge
```

**🔴 critical:** security exploitable in production, spec requirement absent, or violates a documented must-follow rule.

**🟡 suggestion:** smell, docs gap, scale note, or defense-in-depth improvement.

## 5. Ship integration

Write summaries to `.scratch/ship-pipeline/state.json`:

```json
{
  "reviews": {
    "standards": "<paste Standards section>",
    "spec": "<paste Spec section>",
    "security": "<paste Security section>"
  },
  "gates": { "review": "passed|blocked" }
}
```

`passed` only when 🔴 count is 0. Fix 🔴 in code, then re-run from step 1.
