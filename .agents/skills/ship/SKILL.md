---
name: ship
description: >-
  Full lifecycle orchestrator for this repo: plan → implement → code review →
  architecture → MR. Chains Matt Pocock engineering skills sequentially.
  Use when the user invokes /ship with a feature to build, "ship this feature",
  or asks for the full pipeline from plan through merge request. For PR-only
  on an already-finished branch, use make-mr directly.
disable-model-invocation: true
---

# Ship (full pipeline)

End-to-end agent: idea → merge request. **Matt Pocock skills only.** Five phases in strict order with gates between each.

**Prerequisite:** If `docs/agents/issue-tracker.md` is missing, run `setup-matt-pocock-skills` first.

## Invocation

```
/ship <feature description or issue #>
/ship resume
/ship from implement     # plan already approved — start at Phase 2
/ship from diagnose      # bug/regression — Phase 2 uses diagnose instead of tdd
```

## Skill map

| Phase | Name | Matt Pocock skill |
|-------|------|-------------------|
| 1 | Plan | `to-prd` → `grill-with-docs` |
| 2 | Implement | `tdd` (or `diagnose` for bugs) |
| 3 | Code review | `review` |
| 4 | Architecture | `improve-codebase-architecture` |
| 5 | MR | `make-mr` |

All skills live under `.agents/skills/` (symlinked from `.claude/skills/`). The `review` skill lives at `~/.agents/skills/review/SKILL.md`.

## Session setup

```bash
mkdir -p .scratch/ship-pipeline
```

Write `.scratch/ship-pipeline/state.json`:

```json
{
  "feature": "<user request>",
  "phase": 1,
  "mode": "feature",
  "started_at": "<ISO timestamp>",
  "plan_file": null,
  "prd_issue": null,
  "spec_source": null,
  "reviews": {},
  "gates": {}
}
```

Set `mode` to `"bugfix"` when using `from diagnose`. Update `phase` after each gate. On `resume`, read state and continue.

## Phase gates

| Phase | Gate |
|-------|------|
| 1 Plan | Approved plan in `.scratch/ship-pipeline/plan.md`; PRD published or existing spec linked; user confirms after grilling |
| 2 Implement | Plan items done; tests pass |
| 3 Code review | Zero 🔴 critical findings from `review`; user acknowledges 🟡 suggestions or they are fixed |
| 4 Architecture | In-scope deepening applied or deferred with reason in state.json |
| 5 MR | PR URL returned |

---

## Phase 1: Plan

### 1a — PRD (`to-prd`)

**Read:** `.agents/skills/to-prd/SKILL.md`

**Skip when:** User passed an existing issue # or PRD path — fetch via `docs/agents/issue-tracker.md`, store in `state.json` → `spec_source`.

**Otherwise:** Publish PRD to issue tracker with `needs-triage` label. Store in `state.json` → `prd_issue`.

### 1b — Grilling (`grill-with-docs`)

**Read:** `.agents/skills/grill-with-docs/SKILL.md`

Stress-test against `CONTEXT.md`, ADRs, and codebase. Update docs inline.

**Optional:** `to-issues` for large multi-slice features.

### 1c — Plan artifact

Write `.scratch/ship-pipeline/plan.md`. Update `state.json`: `plan_file`, `spec_source`, `gates.plan = "passed"`.

**Tiny bugfix:** Skip `to-prd`; light `grill-with-docs`; one-page `plan.md`.

---

## Phase 2: Implement

**Feature:** `.agents/skills/tdd/SKILL.md` — tracer-bullet loop per `plan.md`.

**Bugfix:** `.agents/skills/diagnose/SKILL.md` when `mode = "bugfix"`.

Update `state.json`: `gates.implement = "passed"`.

---

## Phase 3: Code review

**Read:** `~/.agents/skills/review/SKILL.md` — follow completely. **Do not** use any other review skill.

Pin fixed point: merge-base with base branch. Spec: `state.json` → `spec_source` or `plan.md`.

Store in `state.json` → `reviews.standards`, `reviews.spec`.

Fix all 🔴 criticals; re-run `review` if needed. Update `state.json`: `gates.review = "passed"`.

---

## Phase 4: Architecture deepening

**Read:** `.agents/skills/improve-codebase-architecture/SKILL.md`

In-scope only (modules touched by this feature). Log deferrals in `state.json` → `architecture.deferred`.

Re-run tests after refactors. Update `state.json`: `gates.architecture = "passed"`.

---

## Phase 5: Merge request

**Read:** `.agents/skills/make-mr/SKILL.md` — follow completely.

Pass pipeline context into the PR body:

- PRD issue or `plan.md` link
- Code review summary from `state.json` → `reviews`
- Architecture deferrals from `state.json` → `architecture.deferred`

**Do not re-invoke** this pipeline skill.

Update `state.json`: `phase = "complete"`, `gates.mr = "passed"`, `pr_url`.

---

## Status footer

After every phase:

```
Ship pipeline: Phase N/5 — <phase name> — <passed|in progress|blocked>
Matt Pocock: <skill used this phase>
Next: <what happens next>
```

## Quick reference

| User need | Phases | Matt Pocock skills |
|-----------|--------|--------------------|
| Full pipeline | 1–5 | to-prd, grill-with-docs, tdd, review, improve-codebase-architecture, make-mr |
| Just plan | 1 | to-prd, grill-with-docs |
| Plan + build | 1–2 | + tdd |
| Review branch | 3 | review |
| Architecture pass | 4 | improve-codebase-architecture |
| PR only | — | make-mr |
| Bug fix | 1–5 with diagnose at Phase 2 | grill-with-docs, diagnose, review, … |
