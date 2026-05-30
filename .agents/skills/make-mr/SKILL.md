---
name: make-mr
description: >-
  Create or update a GitHub pull request for the current branch. Runs pre-flight
  checks, pushes if needed, and opens a PR with summary and test plan via gh.
  Use when the user asks to make an MR, create a PR, open a pull request, or
  ship the current branch to GitHub.
disable-model-invocation: true
---

# Make MR (GitHub)

Create or update a pull request on GitHub for the current branch using `gh`.

**Prerequisite:** Run inside a git clone with `origin` pointing at GitHub. Run `/setup-matt-pocock-skills` if `docs/agents/issue-tracker.md` is missing.

## Process

### 1. Pre-flight (parallel)

Run these in parallel:

```bash
git status
git diff
git diff --staged
git branch -vv
```

Determine:

- **Base branch** — `main` unless `gh pr view` on an existing PR says otherwise, or the repo's default branch from `gh repo view --json defaultBranchRef -q .defaultBranchRef.name`
- **Current branch** — must not be the base branch
- **Uncommitted changes** — do not commit unless the user explicitly asked. Warn and stop if dirty working tree would be left out of the PR.
- **Unpushed commits** — note if push is needed

Also run:

```bash
git log <base>..HEAD --oneline
git diff <base>...HEAD --stat
```

### 2. Pre-push checks

Run the repo's quality gate before opening the PR:

1. `npm run typecheck` if defined in `package.json`
2. Any test script if defined (`npm test`, `npm run test`, etc.)

If checks fail, **stop** and fix or report failures. Do not open the PR on a broken branch unless the user explicitly overrides.

### 3. Push branch

If the branch is not on the remote or is ahead:

```bash
git push -u origin HEAD
```

Do not force-push unless the user explicitly requests it.

### 4. Existing PR?

```bash
gh pr view --json url,number,title,body 2>/dev/null
```

- **If a PR exists** for this branch → update its body (and title if needed) with `gh pr edit`
- **If none** → create with `gh pr create`

### 5. Draft PR body

Build the body from available context. When invoked from `/ship`, read `.scratch/ship-pipeline/state.json` and `plan.md`.

Use this template:

```markdown
## Summary

- <1–3 bullets: what changed and why>

## Spec

- Closes #<issue> / see `.scratch/ship-pipeline/plan.md`

## Review notes

<From ship pipeline state.json if present: code review, architecture deferrals, readiness>

## Test plan

- [ ] <concrete verification step>
- [ ] typecheck passes
- [ ] <feature-specific check from plan or PRD>
```

**Title:** Imperative, under 72 chars. Derive from the branch name, issue title, or plan — not "WIP" or "Updates".

**Issue linking:** If `state.json` has `prd_issue` or `spec_source`, add `Closes #N` or `Relates to #N` in the body.

### 6. Create or update PR

**Create:**

```bash
gh pr create --base <base> --title "<title>" --body "$(cat <<'EOF'
<body>
EOF
)"
```

**Update existing:**

```bash
gh pr edit --title "<title>" --body "$(cat <<'EOF'
<body>
EOF
)"
```

Return the PR URL to the user.

### 7. Done

Print:

- PR URL
- Base ← head branches
- Checklist of what was included in the body
- Reminder if working tree is still dirty

## When invoked from `/ship`

After success, update `.scratch/ship-pipeline/state.json`:

```json
{
  "phase": "complete",
  "gates": { "mr": "passed" },
  "pr_url": "<url>"
}
```

## Rules

- Use `gh` for all GitHub operations — never the web UI
- Never update git config
- Never force-push to `main` or `master`
- Never commit unless the user explicitly asked
- Do not push unless creating/updating the PR requires it
