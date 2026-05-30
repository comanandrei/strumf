# Product requirements — baby feeding & care (Strumf)

This document locks **product defaults** and drives implementation.

---

## 1. Locked product decisions (defaults)

These are **non-negotiable for v1** unless explicitly reopened.

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Households / babies** | **Multi-baby** | One account may care for several children; data and UI must not assume a single baby. |
| **Collaboration** | **Invite caregivers now** | Parents and co-carers need shared logging from day one; invitations are in scope for MVP, not deferred. |
| **Feeding modality** | **Bottle / expressed milk volume only** | MVP tracks **volume in ml** (and optional milk type label: e.g. breast milk vs formula). **No** breastfeeding-side timers, latch tracking, or per-breast nursing flows in v1. |

---

## 2. Product goal

A trustworthy app to log **bottle feeds (ml)**, **baby identity & birth data**, **consultations** (where / why / when), and **appointments**, with a first dashboard focused on **milk consumed today and last 7 days**, **intervals between feeds**, and a **cached “next feed” estimate** (deterministic baseline first; AI layer optional later).

---

## 3. User personas

- **Primary parent** — creates household (or first baby), invites others, logs most events.
- **Co-caregiver** (partner, grandparent, nanny) — accepts invite, logs feeds for assigned babies.
- **Future: clinician view** — out of scope for v1; design exports so pediatrician visits are easy.

---

## 4. Functional requirements

### 4.1 Accounts, households, and multi-baby

- A **user** may belong to one or more **households** (or a single household with multiple babies — pick one model in schema; see §6).
- Each **baby** has: legal/preferred name, birth date & time, birth weight, birth length, optional head circumference, sex (optional), notes, timezone.
- **Parents / guardians**: store names and relationship to baby; link to user accounts where invited.
- Switching **active baby** in the UI must be one tap from any main screen.

### 4.2 Caregiver invitations (MVP)

- **Invite by email** (or shareable invite link tied to household + role).
- Roles at minimum: **Owner**, **Member** (both can log; Owner can manage babies and invites; refine in implementation).
- Invitee must **sign up or sign in** to accept; no anonymous write access.
- Revoke invite / remove member: Owner only.

### 4.3 Bottle feeding (v1 scope)

- Log **start time** (required), optional **end time**, **amountMl** (required, > 0), optional **milk type** enum: `BREAST_MILK` | `FORMULA` | `MIXED` | `UNKNOWN`.
- No nursing timer, no left/right breast, no “transfer” from breast to bottle beyond optional note field.
- Edit/delete own entries with audit-friendly rules (soft delete or history — implementation choice; document in ADR).

### 4.4 Consultations

- Fields: datetime, **location** (clinic name / address text), **reason for visit**, **outcome / notes**, optional provider name, optional follow-up date.
- List and detail views per baby.

### 4.5 Appointments

- Fields: datetime, location, purpose/title, optional reminder (phase 1b if push/email not ready).
- List per baby; optional calendar export later.

### 4.6 Optional logs (later phases, schema-friendly)

- Sleep, diaper, stool — **not required for MVP**; keep event model extensible (`type` + JSON payload pattern acceptable).

### 4.7 Dashboard (MVP)

- **Today**: total ml bottle-fed for selected baby.
- **Last 7 days**: daily totals (bar or line chart).
- **Intervals**: time between consecutive bottle feeds for selected baby (table or sparkline).
- **Next feed estimate**: show window + confidence; **server-side cache** with invalidation on new feed or TTL (document in §6).

### 4.8 AI (after MVP baseline)

- v1 prediction: **deterministic** (e.g. median interval, clamped bounds).
- v2: optional LLM for **explanation** only; never sole safety-critical signal; versioned prompts + stored output in `PredictionCache`.

---

## 5. Non-goals (v1)

- Breastfeeding-specific flows.
- Medical diagnosis, dosing, or clinical decision support.
- Hardware integrations (scales, pumps).
- Full “AI parenting coach” before stable feed data + privacy review.

---

## 6. Data model implications (engineering handoff)

**Multi-baby + invites** suggest:

- `Household` — id, name (optional), createdById.
- `HouseholdMembership` — userId, householdId, role (`OWNER` | `MEMBER`), unique (userId, householdId).
- `Baby` — id, householdId, … profile fields …
- `FeedingEvent` — babyId, loggedByUserId, startedAt, endedAt?, amountMl, milkType, notes, createdAt.
- `Consultation`, `Appointment` — babyId + foreign keys; scoped by household membership checks in tRPC.

**Authorization:** every query/mutation must verify `userId` is a member of the baby’s household.

**Prediction cache:** `PredictionCache` (babyId, kind, inputFingerprint, payload JSON, modelVersion nullable, expiresAt).

---

## 7. Security & privacy (baseline)

- Treat data as **sensitive**; HTTPS only; minimal PII in logs.
- Caregivers only see babies in households they belong to.
- Document retention and export in a follow-up `docs/PRIVACY.md` when legal copy is ready.

---

## 8. Delivery phases (updated for your defaults)

| Phase | Scope |
|-------|--------|
| **P0** | Auth + household + membership + baby CRUD + role checks in tRPC. |
| **P1** | Invites (email flow or magic link) + accept + revoke. |
| **P2** | Bottle feeding log + list/timeline + dashboard (today / 7d / intervals / cached next-feed). |
| **P3** | Consultations + appointments CRUD + lists. |
| **P4** | Charts polish, exports, reminders; then optional AI explainer. |

---

## 9. Next steps in the process (immediate)

1. **Schema migration** — done: `Household`, `HouseholdMembership`, `CaregiverInvite`, `Baby`, `FeedingEvent`, `Consultation`, `Appointment`, `PredictionCache`; demo `Post` removed. Apply with `npm run db:migrate` on Neon.
2. **tRPC routers** — done: `household`, `baby`, `invite`, `feeding`, `consultation`, `appointment` with Zod + membership / owner guards.
3. **UI** — next: baby switcher, invite accept page (token URL), quick bottle log, dashboard charts + prediction cache usage.
4. **Tests** — add membership boundary tests (user A cannot read baby in household B).

---

## 10. Traceability

- Stack: [Create T3 App](https://create.t3.gg/) (this repo).
