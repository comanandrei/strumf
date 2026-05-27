# Sleep Rhythm as the first competitor-gap feature

Competitor research shows that leading baby-care apps treat sleep as a core
daily-care primitive. Huckleberry differentiates with SweetSpot nap and bedtime
prediction, while Nara Baby, Sprout Baby, Glow Baby, and Baby Tracker all cover
sleep alongside feeding, diapers, growth, and caregiver sync. Strumf already has
feeding, medical care, milestones, appointments, and Nearby, but it does not let
caregivers record sleep or see a nap guide.

We will add **Sleep Rhythm**: caregivers can log completed sleep windows and see
a deterministic wake-window guide on the dashboard. This gives Strumf a visible
"smart" feature without introducing AI, medical advice, push notifications, or
paid-plan complexity.

## Design

- Persist sleep as `SleepEvent`, scoped to a `Baby` and `loggedByUserId`.
- Require `endedAt > startedAt`; v1 logs completed naps/night sleep only.
- Expose `sleep.create`, `sleep.deleteOwn`, and `sleep.listByBaby` through tRPC.
- Use the existing baby-access invariant for all sleep reads/writes.
- Add a Sleep tab to the existing Log surface instead of adding a new bottom-nav
  destination.
- Add dashboard cards for sleep in the last 24 hours, last sleep, and next nap
  guide.
- Add sleep markers and sleep details to Calendar so caregivers can review the
  daily rhythm in one place.

## Prediction approach

The next-nap guide is intentionally deterministic:

1. Use the active baby's age to select an approximate wake window.
2. Use the last completed sleep end as the anchor.
3. Show the next suggested sleep window as `endedAt + wakeWindow`.

This mirrors the user value of competitor sleep prediction while staying inside
Strumf's current safety posture: no diagnosis, no sleep training instructions,
and no claim of clinical precision.

## Consequences

- `SleepEvent` becomes the second daily-care log next to `FeedingEvent`; future
  diaper or medication logs should follow the same baby-scoped pattern.
- The dashboard prediction is client-side for now, matching the current
  next-feed estimate. If we later cache predictions server-side, sleep and
  feeding can share the existing `PredictionCache` model.
- Calendar density increases, so sleep markers use a separate visual count and
  modal section rather than overloading feeding inputs.
