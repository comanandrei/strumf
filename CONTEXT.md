# Strumf

Baby feeding and care app: log bottle feeds, track baby identity and birth data,
manage consultations and appointments, and surface useful nearby places to take
the baby outside.

## Language

### Core

**Household**:
A group of caregivers that share access to one or more babies.
_Avoid_: family, group, account.

**Baby**:
A child whose feeds, consultations, and appointments are tracked. Belongs to
exactly one household.
_Avoid_: child, kid, infant.

**Caregiver**:
A user who is a member of a household. Owners can manage babies and invites;
members can log events.
_Avoid_: parent, member, guardian (use only when describing the relationship to
a specific baby in profile data).

**Feeding**:
A single bottle/expressed-milk event with start time, optional end time, volume
in ml, and milk type. Volume only — no breastfeeding-side timers in v1.
_Avoid_: meal, session, nursing.

**Sleep**:
A completed rest window for a Baby, with start time, end time, optional notes,
and the Caregiver who logged it. Sleep Rhythm uses recent Sleep events to show a
deterministic next-nap guide.
_Avoid_: nap as the canonical entity name (use only when describing a short
sleep), sleep training, schedule prescription.

**Consultation**:
A medical visit recorded against a baby (datetime, location, reason, outcome).
_Avoid_: appointment, doctor visit, checkup.

**Appointment**:
A scheduled future event for a baby (datetime, location, purpose). Distinct
from a consultation, which is a recorded visit.
_Avoid_: booking, visit, event.

### Nearby

**Nearby**:
The product surface that helps a caregiver decide where to take the baby
outside. In v1 it shows close parks and malls; transit details come later.
_Avoid_: outside, places, around me.

**Nearby Place**:
A physical location returned for the current request: a park or a mall, with
a name, distance, and travel time from the user's current location.
_Avoid_: POI, point of interest, venue.

**Park**:
A public outdoor space tagged `leisure=park` in the underlying OpenStreetMap
data.
_Avoid_: garden, green space (use only when describing the place itself, not
the kind).

**Mall**:
A shopping centre tagged `commercial.shopping_mall` in the underlying provider
data.
_Avoid_: shopping centre, retail park, store (a single shop is not a Mall).

**Travel Mode**:
The way the user plans to reach a Nearby Place. v1 supports `walk` and `drive`;
future modes (e.g. `transit`) will be added explicitly.
_Avoid_: transport, route type.

**Travel Time**:
The estimated duration to reach a Nearby Place from the user's current
location, in the selected Travel Mode. Distinct from straight-line distance.
_Avoid_: ETA, duration, travel duration.

## Relationships

- A **Household** has many **Babies** and many **Caregivers** (via membership).
- A **Baby** has many **Feedings**, **Sleep** events, **Consultations**, and
  **Appointments**.
- A **Nearby Place** is computed for the current Caregiver session and is
  **not** persisted — it has no relationship to a Baby or Household.
- A **Nearby Place** has exactly one **Travel Time** at a time, scoped to the
  selected **Travel Mode**.

## Flagged ambiguities

- "outside page" was used informally for the Nearby surface — resolved:
  canonical name is **Nearby**.
- "location" can mean both a free-text address (e.g. on a Consultation) and a
  pair of GPS coordinates (Nearby request input). Treat them as distinct:
  Consultation/Appointment `location` is human text, Nearby uses coordinates
  that are **never persisted**.
