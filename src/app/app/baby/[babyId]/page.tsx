"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState, type FormEvent } from "react";

import { Button } from "~/app/_components/ui/button";
import { Card } from "~/app/_components/ui/card";
import { formatClock, formatShortDate, formatTimeAgo, milkTypeLabel } from "~/app/lib/time-ago";
import { api, type RouterOutputs } from "~/trpc/react";

import { useBabySelection } from "../../_components/baby-selection-context";

type Consultation = RouterOutputs["consultation"]["listByBaby"][number];
type Appointment = RouterOutputs["appointment"]["listByBaby"][number];
type Feeding = RouterOutputs["feeding"]["listByBaby"][number];
type Baby = RouterOutputs["baby"]["get"];
type BabySex = Baby["sex"];

type ProfileFormState = {
  displayName: string;
  birthDateTime: string;
  birthWeightGrams: string;
  birthLengthCm: string;
  headCircumferenceCm: string;
  sex: BabySex;
  timezone: string;
  notes: string;
};

const BABY_SEX_OPTIONS: { value: BabySex; label: string }[] = [
  { value: "UNKNOWN", label: "Prefer not to say" },
  { value: "FEMALE", label: "Female" },
  { value: "MALE", label: "Male" },
  { value: "OTHER", label: "Other" },
];

const inputClass =
  "w-full rounded-xl border border-strumf-border bg-white/70 px-3 py-3 text-sm font-medium text-strumf-foreground outline-none transition-smooth placeholder:text-strumf-muted/70 focus:border-strumf-accent";

function formatDateTime(value: Date) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatAge(birthDateTime: Date) {
  const born = new Date(birthDateTime).getTime();
  const now = Date.now();
  const days = Math.max(0, Math.floor((now - born) / 86_400_000));
  if (days < 14) return `${days} day${days === 1 ? "" : "s"} old`;
  const weeks = Math.floor(days / 7);
  if (weeks < 12) return `${weeks} week${weeks === 1 ? "" : "s"} old`;
  const months = Math.floor(days / 30.44);
  if (months < 24) return `${months} month${months === 1 ? "" : "s"} old`;
  const years = Math.floor(days / 365.25);
  return `${years} year${years === 1 ? "" : "s"} old`;
}

function profileValue(value: string | number | null | undefined, suffix = "") {
  if (value === null || value === undefined || value === "") return "Not added";
  return `${value}${suffix}`;
}

export default function BabyProfilePage() {
  const params = useParams<{ babyId: string }>();
  const babyId = Array.isArray(params.babyId) ? params.babyId[0] : params.babyId;
  const utils = api.useUtils();
  const { babies, selectedBabyId, setSelectedBabyId, isLoading: loadingBabies } =
    useBabySelection();
  const since24h = useMemo(() => new Date(Date.now() - 24 * 60 * 60 * 1000), []);
  const [isEditing, setIsEditing] = useState(false);
  const [profileForm, setProfileForm] = useState<ProfileFormState>(() =>
    emptyProfileForm(),
  );
  const [formError, setFormError] = useState<string | null>(null);
  const [formMessage, setFormMessage] = useState<string | null>(null);

  const { data: baby, isLoading, error } = api.baby.get.useQuery(
    { babyId: babyId ?? "" },
    { enabled: !!babyId },
  );
  const { data: recentFeedings, isLoading: loadingFeedings } =
    api.feeding.listByBaby.useQuery(
      { babyId: babyId ?? "", from: since24h, limit: 200 },
      { enabled: !!babyId },
    );
  const { data: consultations, isLoading: loadingConsultations } =
    api.consultation.listByBaby.useQuery({ babyId: babyId ?? "" }, { enabled: !!babyId });
  const { data: appointments, isLoading: loadingAppointments } =
    api.appointment.listByBaby.useQuery({ babyId: babyId ?? "" }, { enabled: !!babyId });
  const updateBaby = api.baby.update.useMutation({
    onSuccess: async (updatedBaby) => {
      setFormError(null);
      setFormMessage("Baby profile updated.");
      setIsEditing(false);
      await Promise.all([
        utils.baby.get.invalidate({ babyId: updatedBaby.id }),
        utils.household.myHouseholds.invalidate(),
      ]);
    },
    onError: (e) => {
      setFormMessage(null);
      setFormError(e.message);
    },
  });

  const upcomingAppointments = useMemo(() => {
    const now = Date.now();
    return (appointments ?? []).filter((appointment) => appointment.startsAt.getTime() >= now);
  }, [appointments]);
  const careSummary = useMemo(
    () => buildCareSummary(recentFeedings ?? []),
    [recentFeedings],
  );
  const profileGaps = useMemo(() => (baby ? buildProfileGaps(baby) : []), [baby]);

  useEffect(() => {
    if (!babyId || selectedBabyId === babyId) return;
    if (babies.some((b) => b.id === babyId)) {
      setSelectedBabyId(babyId);
    }
  }, [babies, babyId, selectedBabyId, setSelectedBabyId]);

  useEffect(() => {
    if (!baby) return;
    setProfileForm(toProfileForm(baby));
  }, [baby]);

  const submitProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!babyId) return;

    const displayName = profileForm.displayName.trim();
    const timezone = profileForm.timezone.trim() || "UTC";
    const birthDateTime = profileForm.birthDateTime
      ? new Date(profileForm.birthDateTime)
      : null;

    setFormMessage(null);
    setFormError(null);

    if (!displayName) {
      setFormError("Add the baby's name.");
      return;
    }
    if (!birthDateTime || Number.isNaN(birthDateTime.getTime())) {
      setFormError("Add a valid birth date and time.");
      return;
    }

    updateBaby.mutate({
      babyId,
      displayName,
      birthDateTime,
      birthWeightGrams: optionalPositiveIntOrNull(profileForm.birthWeightGrams),
      birthLengthCm: optionalPositiveIntOrNull(profileForm.birthLengthCm),
      headCircumferenceCm: optionalPositiveIntOrNull(profileForm.headCircumferenceCm),
      sex: profileForm.sex,
      timezone,
      notes: optionalTextOrNull(profileForm.notes),
    });
  };

  if (loadingBabies || isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 w-44 rounded-lg bg-white/10" />
        <div className="h-56 w-full rounded-strumf-card bg-white/10" />
      </div>
    );
  }

  if (!babyId || error || !baby) {
    return (
      <Card>
        <h1 className="text-lg font-semibold">Baby profile not found</h1>
        <p className="mt-2 text-sm text-strumf-muted">
          Choose another baby or add a baby profile during onboarding.
        </p>
        <Link href="/app/onboarding" className="mt-4 inline-block text-strumf-accent underline">
          Go to onboarding
        </Link>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-5 pb-6">
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-strumf-muted">Baby profile</p>
          <h1 className="font-display mt-1 text-3xl font-bold tracking-tight">
            {baby.displayName}
          </h1>
          <p className="mt-1 text-sm text-strumf-accent">{formatAge(baby.birthDateTime)}</p>
        </div>
        <Button
          type="button"
          variant={isEditing ? "ghost" : "primary"}
          className="!min-h-10 px-4 py-2 text-sm"
          onClick={() => {
            setFormError(null);
            setFormMessage(null);
            setIsEditing((current) => !current);
          }}
        >
          {isEditing ? "Close" : "Edit"}
        </Button>
      </header>

      {profileGaps.length ? (
        <ProfileCompletionCard
          gaps={profileGaps}
          onEdit={() => {
            setFormError(null);
            setFormMessage(null);
            setIsEditing(true);
          }}
        />
      ) : (
        <Card className="border-strumf-accent/30 bg-strumf-accent/10">
          <p className="text-sm font-bold text-strumf-accent">Profile details look complete.</p>
          <p className="mt-1 text-sm text-strumf-muted">
            You can still edit measurements, timezone, or notes whenever something changes.
          </p>
        </Card>
      )}

      {isEditing ? (
        <ProfileEditor
          form={profileForm}
          error={formError}
          message={formMessage}
          isPending={updateBaby.isPending}
          onChange={setProfileForm}
          onCancel={() => {
            setProfileForm(toProfileForm(baby));
            setFormError(null);
            setFormMessage(null);
            setIsEditing(false);
          }}
          onSubmit={submitProfile}
        />
      ) : formMessage ? (
        <Card className="border-strumf-accent/40 bg-strumf-accent/15">
          <p className="font-medium text-strumf-accent">{formMessage}</p>
        </Card>
      ) : null}

      <Card>
        <p className="mb-4 text-xs font-medium uppercase tracking-wide text-strumf-muted">
          Birth details
        </p>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ProfileField label="Born" value={formatDateTime(baby.birthDateTime)} />
          <ProfileField label="Sex" value={baby.sex.toLowerCase()} />
          <ProfileField
            label="Birth weight"
            value={profileValue(baby.birthWeightGrams, " g")}
          />
          <ProfileField label="Birth length" value={profileValue(baby.birthLengthCm, " cm")} />
          <ProfileField
            label="Head circumference"
            value={profileValue(baby.headCircumferenceCm, " cm")}
          />
          <ProfileField label="Timezone" value={baby.timezone} />
        </dl>
      </Card>

      <Card>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-strumf-muted">
          Notes
        </p>
        <p className="whitespace-pre-wrap text-sm text-strumf-muted">
          {baby.notes?.trim() || "No notes added yet."}
        </p>
      </Card>

      <CareSnapshot
        summary={careSummary}
        lastFeed={recentFeedings?.[0]}
        isLoading={loadingFeedings}
      />

      <Card>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-strumf-muted">
              Medical care
            </p>
            <h2 className="font-display mt-1 text-xl font-semibold">
              Upcoming appointments
            </h2>
          </div>
          <Link href="/app/log" className="shrink-0 text-xs font-bold text-strumf-accent">
            Add
          </Link>
        </div>
        <AppointmentSummary
          appointments={upcomingAppointments}
          isLoading={loadingAppointments}
        />
      </Card>

      <Card>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-strumf-muted">
              Medical history
            </p>
            <h2 className="font-display mt-1 text-xl font-semibold">Consultations</h2>
          </div>
          <Link href="/app/log" className="shrink-0 text-xs font-bold text-strumf-accent">
            Record
          </Link>
        </div>
        <ConsultationSummary
          consultations={consultations ?? []}
          isLoading={loadingConsultations}
        />
      </Card>
    </div>
  );
}

function ProfileCompletionCard({
  gaps,
  onEdit,
}: {
  gaps: string[];
  onEdit: () => void;
}) {
  return (
    <Card className="border-strumf-warm bg-gradient-warm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-strumf-muted">
            Complete profile
          </p>
          <h2 className="font-display mt-1 text-xl font-semibold">Add details caregivers need</h2>
          <p className="mt-2 text-sm text-strumf-muted">
            Missing: {gaps.slice(0, 4).join(", ")}
            {gaps.length > 4 ? `, +${gaps.length - 4} more` : ""}.
          </p>
        </div>
        <Button
          type="button"
          variant="accent"
          className="!min-h-10 shrink-0 px-4 py-2 text-sm"
          onClick={onEdit}
        >
          Add info
        </Button>
      </div>
    </Card>
  );
}

function ProfileEditor({
  form,
  error,
  message,
  isPending,
  onChange,
  onCancel,
  onSubmit,
}: {
  form: ProfileFormState;
  error: string | null;
  message: string | null;
  isPending: boolean;
  onChange: (next: ProfileFormState) => void;
  onCancel: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <Card>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-strumf-muted">
            Profile inputs
          </p>
          <h2 className="font-display mt-1 text-xl font-semibold">Edit baby details</h2>
        </div>

        <label className="block space-y-1.5 text-sm font-bold">
          <span>Baby name</span>
          <input
            required
            value={form.displayName}
            onChange={(e) => onChange({ ...form, displayName: e.target.value })}
            placeholder="e.g. Emma"
            className={inputClass}
          />
        </label>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="space-y-1.5 text-sm font-bold">
            <span>Birth date and time</span>
            <input
              required
              type="datetime-local"
              value={form.birthDateTime}
              onChange={(e) => onChange({ ...form, birthDateTime: e.target.value })}
              className={inputClass}
            />
          </label>
          <label className="space-y-1.5 text-sm font-bold">
            <span>Sex</span>
            <select
              value={form.sex}
              onChange={(e) => onChange({ ...form, sex: e.target.value as BabySex })}
              className={inputClass}
            >
              {BABY_SEX_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <label className="space-y-1.5 text-sm font-bold">
            <span>Birth weight, g</span>
            <input
              type="number"
              min={1}
              inputMode="numeric"
              value={form.birthWeightGrams}
              onChange={(e) => onChange({ ...form, birthWeightGrams: e.target.value })}
              placeholder="Optional"
              className={inputClass}
            />
          </label>
          <label className="space-y-1.5 text-sm font-bold">
            <span>Birth length, cm</span>
            <input
              type="number"
              min={1}
              inputMode="numeric"
              value={form.birthLengthCm}
              onChange={(e) => onChange({ ...form, birthLengthCm: e.target.value })}
              placeholder="Optional"
              className={inputClass}
            />
          </label>
          <label className="space-y-1.5 text-sm font-bold">
            <span>Head, cm</span>
            <input
              type="number"
              min={1}
              inputMode="numeric"
              value={form.headCircumferenceCm}
              onChange={(e) => onChange({ ...form, headCircumferenceCm: e.target.value })}
              placeholder="Optional"
              className={inputClass}
            />
          </label>
        </div>

        <label className="block space-y-1.5 text-sm font-bold">
          <span>Timezone</span>
          <input
            value={form.timezone}
            onChange={(e) => onChange({ ...form, timezone: e.target.value })}
            placeholder="UTC"
            className={inputClass}
          />
        </label>

        <label className="block space-y-1.5 text-sm font-bold">
          <span>Notes</span>
          <textarea
            value={form.notes}
            onChange={(e) => onChange({ ...form, notes: e.target.value })}
            placeholder="Allergies, preferences, birth notes, or care reminders"
            rows={4}
            className={inputClass}
          />
        </label>

        {error ? <p className="text-sm text-strumf-danger">{error}</p> : null}
        {message ? <p className="text-sm font-medium text-strumf-accent">{message}</p> : null}

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            type="submit"
            variant="accent"
            fullWidth
            disabled={isPending || !form.displayName.trim() || !form.birthDateTime}
          >
            {isPending ? "Saving..." : "Save profile"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            fullWidth
            className="border border-strumf-border"
            disabled={isPending}
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}

function CareSnapshot({
  summary,
  lastFeed,
  isLoading,
}: {
  summary: {
    totalMl: number;
    feedCount: number;
    averageMl: number;
  };
  lastFeed?: Feeding;
  isLoading: boolean;
}) {
  return (
    <Card>
      <div className="mb-4">
        <p className="text-xs font-medium uppercase tracking-wide text-strumf-muted">
          Care snapshot
        </p>
        <h2 className="font-display mt-1 text-xl font-semibold">Last 24 hours</h2>
      </div>

      {isLoading ? (
        <div className="h-28 animate-pulse rounded-2xl bg-white/60" />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <SnapshotStat
            label="Milk"
            value={`${summary.totalMl} ml`}
            sub={`${summary.feedCount} feed${summary.feedCount === 1 ? "" : "s"}`}
          />
          <SnapshotStat
            label="Average"
            value={`${summary.averageMl} ml`}
            sub="per feed"
          />
          <SnapshotStat
            label="Last feed"
            value={lastFeed ? formatClock(lastFeed.startedAt) : "None"}
            sub={lastFeed ? `${milkTypeLabel(lastFeed.milkType)} - ${formatTimeAgo(lastFeed.startedAt)}` : "no feeds yet"}
          />
        </div>
      )}
    </Card>
  );
}

function SnapshotStat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-2xl bg-white/55 px-4 py-3">
      <p className="text-xs font-bold uppercase tracking-wide text-strumf-muted">{label}</p>
      <p className="font-display mt-1 text-xl font-bold">{value}</p>
      <p className="text-xs text-strumf-muted">{sub}</p>
    </div>
  );
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-strumf-muted">{label}</dt>
      <dd className="mt-1 text-base font-medium capitalize">{value}</dd>
    </div>
  );
}

function AppointmentSummary({
  appointments,
  isLoading,
}: {
  appointments: Appointment[];
  isLoading: boolean;
}) {
  if (isLoading) {
    return <div className="h-20 animate-pulse rounded-2xl bg-white/60" />;
  }

  if (!appointments.length) {
    return (
      <p className="rounded-2xl bg-white/55 px-4 py-5 text-center text-sm text-strumf-muted">
        No upcoming appointments.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {appointments.slice(0, 5).map((appointment) => (
        <li key={appointment.id} className="rounded-2xl bg-white/55 px-4 py-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-medium">{appointment.title}</p>
              <p className="text-xs text-strumf-muted">
                {formatShortDate(appointment.startsAt)} at {formatClock(appointment.startsAt)}
                {appointment.endsAt ? `-${formatClock(appointment.endsAt)}` : ""}
              </p>
            </div>
            <span className="rounded-full bg-strumf-accent/25 px-3 py-1 text-xs font-bold text-strumf-accent">
              Upcoming
            </span>
          </div>
          {appointment.location ? (
            <p className="mt-2 text-xs text-strumf-muted">{appointment.location}</p>
          ) : null}
          {appointment.notes ? (
            <p className="mt-2 whitespace-pre-wrap text-sm text-strumf-muted">
              {appointment.notes}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

function ConsultationSummary({
  consultations,
  isLoading,
}: {
  consultations: Consultation[];
  isLoading: boolean;
}) {
  if (isLoading) {
    return <div className="h-20 animate-pulse rounded-2xl bg-white/60" />;
  }

  if (!consultations.length) {
    return (
      <p className="rounded-2xl bg-white/55 px-4 py-5 text-center text-sm text-strumf-muted">
        No consultations recorded.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {consultations.slice(0, 5).map((consultation) => (
        <li key={consultation.id} className="rounded-2xl bg-white/55 px-4 py-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-medium">{consultation.reason}</p>
              <p className="text-xs text-strumf-muted">
                {formatShortDate(consultation.occurredAt)} at{" "}
                {formatClock(consultation.occurredAt)}
                {consultation.providerName ? ` - ${consultation.providerName}` : ""}
              </p>
            </div>
            <span className="rounded-full bg-strumf-accent-muted/70 px-3 py-1 text-xs font-bold text-strumf-foreground">
              Visit
            </span>
          </div>
          <p className="mt-2 text-xs text-strumf-muted">{consultation.location}</p>
          {consultation.outcomeNotes ? (
            <p className="mt-2 whitespace-pre-wrap text-sm text-strumf-muted">
              {consultation.outcomeNotes}
            </p>
          ) : null}
          {consultation.followUpAt ? (
            <p className="mt-2 text-xs font-bold text-strumf-accent">
              Follow-up: {formatShortDate(consultation.followUpAt)} at{" "}
              {formatClock(consultation.followUpAt)}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

function emptyProfileForm(): ProfileFormState {
  return {
    displayName: "",
    birthDateTime: "",
    birthWeightGrams: "",
    birthLengthCm: "",
    headCircumferenceCm: "",
    sex: "UNKNOWN",
    timezone: "UTC",
    notes: "",
  };
}

function toProfileForm(baby: Baby): ProfileFormState {
  return {
    displayName: baby.displayName,
    birthDateTime: toDateTimeLocalValue(baby.birthDateTime),
    birthWeightGrams: baby.birthWeightGrams?.toString() ?? "",
    birthLengthCm: baby.birthLengthCm?.toString() ?? "",
    headCircumferenceCm: baby.headCircumferenceCm?.toString() ?? "",
    sex: baby.sex,
    timezone: baby.timezone,
    notes: baby.notes ?? "",
  };
}

function buildProfileGaps(baby: Baby): string[] {
  const gaps: string[] = [];
  if (baby.sex === "UNKNOWN") gaps.push("sex");
  if (!baby.birthWeightGrams) gaps.push("birth weight");
  if (!baby.birthLengthCm) gaps.push("birth length");
  if (!baby.headCircumferenceCm) gaps.push("head circumference");
  if (!baby.timezone?.trim()) gaps.push("timezone");
  if (!baby.notes?.trim()) gaps.push("notes");
  return gaps;
}

function buildCareSummary(feedings: Feeding[]) {
  const totalMl = feedings.reduce((sum, feeding) => sum + feeding.amountMl, 0);
  return {
    totalMl,
    feedCount: feedings.length,
    averageMl: feedings.length ? Math.round(totalMl / feedings.length) : 0,
  };
}

function optionalPositiveIntOrNull(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

function optionalTextOrNull(value: string): string | null {
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

function toDateTimeLocalValue(date: Date) {
  const value = new Date(date);
  const year = value.getFullYear();
  const month = `${value.getMonth() + 1}`.padStart(2, "0");
  const day = `${value.getDate()}`.padStart(2, "0");
  const hour = `${value.getHours()}`.padStart(2, "0");
  const minute = `${value.getMinutes()}`.padStart(2, "0");
  return `${year}-${month}-${day}T${hour}:${minute}`;
}
