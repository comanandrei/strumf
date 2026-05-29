"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState, type FormEvent } from "react";

import { Button } from "~/app/_components/ui/button";
import { Card } from "~/app/_components/ui/card";
import { useI18n } from "~/app/lib/i18n-provider";
import { localeToIntl, type Locale } from "~/app/lib/i18n";
import {
  ageLabel,
  formatClock,
  formatShortDate,
  formatTimeAgo,
  milkTypeLabel,
} from "~/app/lib/time-ago";
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

function babySexOptions(locale: Locale): { value: BabySex; label: string }[] {
  return locale === "ro"
    ? [
        { value: "UNKNOWN", label: "Prefer sa nu spun" },
        { value: "FEMALE", label: "Fata" },
        { value: "MALE", label: "Baiat" },
        { value: "OTHER", label: "Altul" },
      ]
    : [
        { value: "UNKNOWN", label: "Prefer not to say" },
        { value: "FEMALE", label: "Female" },
        { value: "MALE", label: "Male" },
        { value: "OTHER", label: "Other" },
      ];
}

const inputClass =
  "w-full rounded-xl border border-strumf-border bg-white/70 px-3 py-3 text-sm font-medium text-strumf-foreground outline-none transition-smooth placeholder:text-strumf-muted/70 focus:border-strumf-accent";

function formatDateTime(value: Date, locale: Locale) {
  return new Intl.DateTimeFormat(localeToIntl(locale), {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function profileValue(
  value: string | number | null | undefined,
  fallback: string,
  suffix = "",
) {
  if (value === null || value === undefined || value === "") return fallback;
  return `${value}${suffix}`;
}

export default function BabyProfilePage() {
  const params = useParams<{ babyId: string }>();
  const babyId = Array.isArray(params.babyId) ? params.babyId[0] : params.babyId;
  const { locale } = useI18n();
  const copy = locale === "ro"
    ? {
        profileUpdated: "Profilul bebelusului a fost actualizat.",
        nameRequired: "Adauga numele bebelusului.",
        birthRequired: "Adauga o data si ora nasterii valide.",
        notFound: "Profilul bebelusului nu a fost gasit",
        notFoundDescription: "Alege alt bebelus sau adauga un profil in onboarding.",
        onboarding: "Mergi la onboarding",
        profile: "Profil bebe",
        close: "Inchide",
        edit: "Editeaza",
        completeTitle: "Profil complet",
        completeHeadline: "Detaliile profilului par complete.",
        completeDescription:
          "Poti edita masuratorile, fusul orar sau notele oricand se schimba ceva.",
        birthDetails: "Detalii nastere",
        born: "Nascut",
        sex: "Sex",
        weight: "Greutate la nastere",
        length: "Lungime la nastere",
        head: "Circumferinta capului",
        timezone: "Fus orar",
        notAdded: "Neadaugat",
        notes: "Note",
        noNotes: "Nu exista note inca.",
        medicalCare: "Ingrijire medicala",
        upcomingAppointments: "Programari viitoare",
        add: "Adauga",
        medicalHistory: "Istoric medical",
        consultations: "Consultatii",
        record: "Noteaza",
      }
    : {
        profileUpdated: "Baby profile updated.",
        nameRequired: "Add the baby's name.",
        birthRequired: "Add a valid birth date and time.",
        notFound: "Baby profile not found",
        notFoundDescription: "Choose another baby or add a baby profile during onboarding.",
        onboarding: "Go to onboarding",
        profile: "Baby profile",
        close: "Close",
        edit: "Edit",
        completeTitle: "Profile complete",
        completeHeadline: "Profile details look complete.",
        completeDescription:
          "You can still edit measurements, timezone, or notes whenever something changes.",
        birthDetails: "Birth details",
        born: "Born",
        sex: "Sex",
        weight: "Birth weight",
        length: "Birth length",
        head: "Head circumference",
        timezone: "Timezone",
        notAdded: "Not added",
        notes: "Notes",
        noNotes: "No notes added yet.",
        medicalCare: "Medical care",
        upcomingAppointments: "Upcoming appointments",
        add: "Add",
        medicalHistory: "Medical history",
        consultations: "Consultations",
        record: "Record",
      };
  const utils = api.useUtils();
  const now = useMemo(() => new Date(), []);
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
    api.consultation.listByBaby.useQuery(
      { babyId: babyId ?? "", limit: 5 },
      { enabled: !!babyId },
    );
  const { data: appointments, isLoading: loadingAppointments } =
    api.appointment.listByBaby.useQuery(
      { babyId: babyId ?? "", from: now, limit: 5 },
      { enabled: !!babyId },
    );
  const updateBaby = api.baby.update.useMutation({
    onSuccess: async (updatedBaby) => {
      setFormError(null);
      setFormMessage(copy.profileUpdated);
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
    const nowMs = now.getTime();
    return (appointments ?? []).filter((appointment) => appointment.startsAt.getTime() >= nowMs);
  }, [appointments, now]);
  const careSummary = useMemo(
    () => buildCareSummary(recentFeedings ?? []),
    [recentFeedings],
  );
  const profileGaps = useMemo(
    () => (baby ? buildProfileGaps(baby, locale) : []),
    [baby, locale],
  );

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
      setFormError(copy.nameRequired);
      return;
    }
    if (!birthDateTime || Number.isNaN(birthDateTime.getTime())) {
      setFormError(copy.birthRequired);
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
        <h1 className="text-lg font-semibold">{copy.notFound}</h1>
        <p className="mt-2 text-sm text-strumf-muted">{copy.notFoundDescription}</p>
        <Link href="/app/onboarding" className="mt-4 inline-block text-strumf-accent underline">
          {copy.onboarding}
        </Link>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-5 pb-6">
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-strumf-muted">{copy.profile}</p>
          <h1 className="font-display mt-1 text-3xl font-bold tracking-tight">
            {baby.displayName}
          </h1>
          <p className="mt-1 text-sm text-strumf-accent">{ageLabel(baby.birthDateTime, locale)}</p>
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
          {isEditing ? copy.close : copy.edit}
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
          <p className="text-sm font-bold text-strumf-accent">{copy.completeHeadline}</p>
          <p className="mt-1 text-sm text-strumf-muted">{copy.completeDescription}</p>
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
          {copy.birthDetails}
        </p>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ProfileField label={copy.born} value={formatDateTime(baby.birthDateTime, locale)} />
          <ProfileField label={copy.sex} value={baby.sex.toLowerCase()} />
          <ProfileField
            label={copy.weight}
            value={profileValue(baby.birthWeightGrams, copy.notAdded, " g")}
          />
          <ProfileField label={copy.length} value={profileValue(baby.birthLengthCm, copy.notAdded, " cm")} />
          <ProfileField
            label={copy.head}
            value={profileValue(baby.headCircumferenceCm, copy.notAdded, " cm")}
          />
          <ProfileField label={copy.timezone} value={baby.timezone} />
        </dl>
      </Card>

      <Card>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-strumf-muted">
          {copy.notes}
        </p>
        <p className="whitespace-pre-wrap text-sm text-strumf-muted">
          {baby.notes?.trim() || copy.noNotes}
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
              {copy.medicalCare}
            </p>
            <h2 className="font-display mt-1 text-xl font-semibold">
              {copy.upcomingAppointments}
            </h2>
          </div>
          <Link href="/app/log" className="shrink-0 text-xs font-bold text-strumf-accent">
            {copy.add}
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
              {copy.medicalHistory}
            </p>
            <h2 className="font-display mt-1 text-xl font-semibold">{copy.consultations}</h2>
          </div>
          <Link href="/app/log" className="shrink-0 text-xs font-bold text-strumf-accent">
            {copy.record}
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
  const { locale } = useI18n();
  const copy = locale === "ro"
    ? {
        eyebrow: "Completeaza profilul",
        title: "Adauga detaliile de care au nevoie ingrijitorii",
        missing: "Lipsesc:",
        more: (count: number) => `, +${count} in plus`,
        addInfo: "Adauga info",
      }
    : {
        eyebrow: "Complete profile",
        title: "Add details caregivers need",
        missing: "Missing:",
        more: (count: number) => `, +${count} more`,
        addInfo: "Add info",
      };

  return (
    <Card className="border-strumf-warm bg-gradient-warm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-strumf-muted">
            {copy.eyebrow}
          </p>
          <h2 className="font-display mt-1 text-xl font-semibold">{copy.title}</h2>
          <p className="mt-2 text-sm text-strumf-muted">
            {copy.missing} {gaps.slice(0, 4).join(", ")}
            {gaps.length > 4 ? copy.more(gaps.length - 4) : ""}.
          </p>
        </div>
        <Button
          type="button"
          variant="accent"
          className="!min-h-10 shrink-0 px-4 py-2 text-sm"
          onClick={onEdit}
        >
          {copy.addInfo}
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
  const { locale } = useI18n();
  const copy = locale === "ro"
    ? {
        inputs: "Date profil",
        title: "Editeaza detaliile bebelusului",
        babyName: "Nume bebe",
        babyNamePlaceholder: "ex. Emma",
        birthDateTime: "Data si ora nasterii",
        sex: "Sex",
        birthWeight: "Greutate la nastere, g",
        birthLength: "Lungime la nastere, cm",
        head: "Cap, cm",
        timezone: "Fus orar",
        notes: "Note",
        notesPlaceholder: "Alergii, preferinte, note despre nastere sau ingrijire",
        optional: "Optional",
        saving: "Se salveaza...",
        save: "Salveaza profilul",
        cancel: "Anuleaza",
      }
    : {
        inputs: "Profile inputs",
        title: "Edit baby details",
        babyName: "Baby name",
        babyNamePlaceholder: "e.g. Emma",
        birthDateTime: "Birth date and time",
        sex: "Sex",
        birthWeight: "Birth weight, g",
        birthLength: "Birth length, cm",
        head: "Head, cm",
        timezone: "Timezone",
        notes: "Notes",
        notesPlaceholder: "Allergies, preferences, birth notes, or care reminders",
        optional: "Optional",
        saving: "Saving...",
        save: "Save profile",
        cancel: "Cancel",
      };

  return (
    <Card>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-strumf-muted">
            {copy.inputs}
          </p>
          <h2 className="font-display mt-1 text-xl font-semibold">{copy.title}</h2>
        </div>

        <label className="block space-y-1.5 text-sm font-bold">
          <span>{copy.babyName}</span>
          <input
            required
            value={form.displayName}
            onChange={(e) => onChange({ ...form, displayName: e.target.value })}
            placeholder={copy.babyNamePlaceholder}
            className={inputClass}
          />
        </label>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="space-y-1.5 text-sm font-bold">
            <span>{copy.birthDateTime}</span>
            <input
              required
              type="datetime-local"
              value={form.birthDateTime}
              onChange={(e) => onChange({ ...form, birthDateTime: e.target.value })}
              className={inputClass}
            />
          </label>
          <label className="space-y-1.5 text-sm font-bold">
            <span>{copy.sex}</span>
            <select
              value={form.sex}
              onChange={(e) => onChange({ ...form, sex: e.target.value as BabySex })}
              className={inputClass}
            >
              {babySexOptions(locale).map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <label className="space-y-1.5 text-sm font-bold">
            <span>{copy.birthWeight}</span>
            <input
              type="number"
              min={1}
              inputMode="numeric"
              value={form.birthWeightGrams}
              onChange={(e) => onChange({ ...form, birthWeightGrams: e.target.value })}
              placeholder={copy.optional}
              className={inputClass}
            />
          </label>
          <label className="space-y-1.5 text-sm font-bold">
            <span>{copy.birthLength}</span>
            <input
              type="number"
              min={1}
              inputMode="numeric"
              value={form.birthLengthCm}
              onChange={(e) => onChange({ ...form, birthLengthCm: e.target.value })}
              placeholder={copy.optional}
              className={inputClass}
            />
          </label>
          <label className="space-y-1.5 text-sm font-bold">
            <span>{copy.head}</span>
            <input
              type="number"
              min={1}
              inputMode="numeric"
              value={form.headCircumferenceCm}
              onChange={(e) => onChange({ ...form, headCircumferenceCm: e.target.value })}
              placeholder={copy.optional}
              className={inputClass}
            />
          </label>
        </div>

        <label className="block space-y-1.5 text-sm font-bold">
          <span>{copy.timezone}</span>
          <input
            value={form.timezone}
            onChange={(e) => onChange({ ...form, timezone: e.target.value })}
            placeholder="UTC"
            className={inputClass}
          />
        </label>

        <label className="block space-y-1.5 text-sm font-bold">
          <span>{copy.notes}</span>
          <textarea
            value={form.notes}
            onChange={(e) => onChange({ ...form, notes: e.target.value })}
            placeholder={copy.notesPlaceholder}
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
            {isPending ? copy.saving : copy.save}
          </Button>
          <Button
            type="button"
            variant="ghost"
            fullWidth
            className="border border-strumf-border"
            disabled={isPending}
            onClick={onCancel}
          >
            {copy.cancel}
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
  const { locale } = useI18n();
  const copy = locale === "ro"
    ? {
        eyebrow: "Instantaneu ingrijire",
        title: "Ultimele 24 de ore",
        milk: "Lapte",
        average: "Medie",
        perFeed: "per hranire",
        lastFeed: "Ultima hranire",
        none: "Niciuna",
        noFeeds: "fara hraniri",
        feeds: (count: number) => `${count} ${count === 1 ? "hranire" : "hraniri"}`,
      }
    : {
        eyebrow: "Care snapshot",
        title: "Last 24 hours",
        milk: "Milk",
        average: "Average",
        perFeed: "per feed",
        lastFeed: "Last feed",
        none: "None",
        noFeeds: "no feeds yet",
        feeds: (count: number) => `${count} feed${count === 1 ? "" : "s"}`,
      };

  return (
    <Card>
      <div className="mb-4">
        <p className="text-xs font-medium uppercase tracking-wide text-strumf-muted">
          {copy.eyebrow}
        </p>
        <h2 className="font-display mt-1 text-xl font-semibold">{copy.title}</h2>
      </div>

      {isLoading ? (
        <div className="h-28 animate-pulse rounded-2xl bg-white/60" />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <SnapshotStat
            label={copy.milk}
            value={`${summary.totalMl} ml`}
            sub={copy.feeds(summary.feedCount)}
          />
          <SnapshotStat
            label={copy.average}
            value={`${summary.averageMl} ml`}
            sub={copy.perFeed}
          />
          <SnapshotStat
            label={copy.lastFeed}
            value={lastFeed ? formatClock(lastFeed.startedAt, locale) : copy.none}
            sub={
              lastFeed
                ? `${milkTypeLabel(lastFeed.milkType, locale)} - ${formatTimeAgo(lastFeed.startedAt, locale)}`
                : copy.noFeeds
            }
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
  const { locale } = useI18n();
  const copy = locale === "ro"
    ? {
        empty: "Nu exista programari viitoare.",
        at: "la",
        upcoming: "Urmeaza",
        reminder: "Reminder:",
        sent: " · trimis",
      }
    : {
        empty: "No upcoming appointments.",
        at: "at",
        upcoming: "Upcoming",
        reminder: "Reminder:",
        sent: " · sent",
      };

  if (isLoading) {
    return <div className="h-20 animate-pulse rounded-2xl bg-white/60" />;
  }

  if (!appointments.length) {
    return (
      <p className="rounded-2xl bg-white/55 px-4 py-5 text-center text-sm text-strumf-muted">
        {copy.empty}
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
                {formatShortDate(appointment.startsAt, locale)} {copy.at}{" "}
                {formatClock(appointment.startsAt, locale)}
                {appointment.endsAt ? `-${formatClock(appointment.endsAt, locale)}` : ""}
              </p>
            </div>
            <span className="rounded-full bg-strumf-accent/25 px-3 py-1 text-xs font-bold text-strumf-accent">
              {copy.upcoming}
            </span>
          </div>
          {appointment.location ? (
            <p className="mt-2 text-xs text-strumf-muted">{appointment.location}</p>
          ) : null}
          {appointment.reminderAt ? (
            <p className="mt-2 text-xs font-bold text-strumf-accent">
              {copy.reminder} {formatShortDate(appointment.reminderAt, locale)} {copy.at}{" "}
              {formatClock(appointment.reminderAt, locale)}
              {appointment.reminderSentAt ? copy.sent : ""}
            </p>
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
  const { locale } = useI18n();
  const copy = locale === "ro"
    ? {
        empty: "Nu exista consultatii inregistrate.",
        at: "la",
        visit: "Vizita",
        followUp: "Control:",
      }
    : {
        empty: "No consultations recorded.",
        at: "at",
        visit: "Visit",
        followUp: "Follow-up:",
      };

  if (isLoading) {
    return <div className="h-20 animate-pulse rounded-2xl bg-white/60" />;
  }

  if (!consultations.length) {
    return (
      <p className="rounded-2xl bg-white/55 px-4 py-5 text-center text-sm text-strumf-muted">
        {copy.empty}
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
                {formatShortDate(consultation.occurredAt, locale)} {copy.at}{" "}
                {formatClock(consultation.occurredAt, locale)}
                {consultation.providerName ? ` - ${consultation.providerName}` : ""}
              </p>
            </div>
            <span className="rounded-full bg-strumf-accent-muted/70 px-3 py-1 text-xs font-bold text-strumf-foreground">
              {copy.visit}
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
              {copy.followUp} {formatShortDate(consultation.followUpAt, locale)} {copy.at}{" "}
              {formatClock(consultation.followUpAt, locale)}
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

function buildProfileGaps(baby: Baby, locale: Locale): string[] {
  const labels = locale === "ro"
    ? {
        sex: "sex",
        birthWeight: "greutate la nastere",
        birthLength: "lungime la nastere",
        headCircumference: "circumferinta capului",
        timezone: "fus orar",
        notes: "note",
      }
    : {
        sex: "sex",
        birthWeight: "birth weight",
        birthLength: "birth length",
        headCircumference: "head circumference",
        timezone: "timezone",
        notes: "notes",
      };
  const gaps: string[] = [];
  if (baby.sex === "UNKNOWN") gaps.push(labels.sex);
  if (!baby.birthWeightGrams) gaps.push(labels.birthWeight);
  if (!baby.birthLengthCm) gaps.push(labels.birthLength);
  if (!baby.headCircumferenceCm) gaps.push(labels.headCircumference);
  if (!baby.timezone?.trim()) gaps.push(labels.timezone);
  if (!baby.notes?.trim()) gaps.push(labels.notes);
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
