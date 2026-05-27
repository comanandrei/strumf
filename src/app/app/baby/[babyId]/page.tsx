"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";

import { Card } from "~/app/_components/ui/card";
import { useI18n } from "~/app/lib/i18n-provider";
import { localeToIntl, type Locale } from "~/app/lib/i18n";
import { ageLabel, formatClock, formatShortDate } from "~/app/lib/time-ago";
import { api, type RouterOutputs } from "~/trpc/react";

import { useBabySelection } from "../../_components/baby-selection-context";

type Consultation = RouterOutputs["consultation"]["listByBaby"][number];
type Appointment = RouterOutputs["appointment"]["listByBaby"][number];

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
  const { babies, selectedBabyId, setSelectedBabyId, isLoading: loadingBabies } =
    useBabySelection();
  const copy = locale === "ro"
    ? {
        notFound: "Profilul bebelusului nu a fost gasit",
        notFoundDescription: "Alege alt bebelus sau adauga un profil in onboarding.",
        onboarding: "Mergi la onboarding",
        profile: "Profil bebe",
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
        notFound: "Baby profile not found",
        notFoundDescription: "Choose another baby or add a baby profile during onboarding.",
        onboarding: "Go to onboarding",
        profile: "Baby profile",
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

  const { data: baby, isLoading, error } = api.baby.get.useQuery(
    { babyId: babyId ?? "" },
    { enabled: !!babyId },
  );
  const { data: consultations, isLoading: loadingConsultations } =
    api.consultation.listByBaby.useQuery({ babyId: babyId ?? "" }, { enabled: !!babyId });
  const { data: appointments, isLoading: loadingAppointments } =
    api.appointment.listByBaby.useQuery({ babyId: babyId ?? "" }, { enabled: !!babyId });

  const upcomingAppointments = useMemo(() => {
    const now = Date.now();
    return (appointments ?? []).filter((appointment) => appointment.startsAt.getTime() >= now);
  }, [appointments]);

  useEffect(() => {
    if (!babyId || selectedBabyId === babyId) return;
    if (babies.some((b) => b.id === babyId)) {
      setSelectedBabyId(babyId);
    }
  }, [babies, babyId, selectedBabyId, setSelectedBabyId]);

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
        <p className="mt-2 text-sm text-white/70">{copy.notFoundDescription}</p>
        <Link href="/app/onboarding" className="mt-4 inline-block text-strumf-accent underline">
          {copy.onboarding}
        </Link>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-5 pb-6">
      <header>
        <p className="text-sm text-white/65">{copy.profile}</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">{baby.displayName}</h1>
        <p className="mt-1 text-sm text-strumf-accent">{ageLabel(baby.birthDateTime, locale)}</p>
      </header>

      <Card>
        <p className="mb-4 text-xs font-medium uppercase tracking-wide text-white/50">
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
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-white/50">
          {copy.notes}
        </p>
        <p className="whitespace-pre-wrap text-sm text-white/75">
          {baby.notes?.trim() || copy.noNotes}
        </p>
      </Card>

      <Card>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-white/50">
              {copy.medicalCare}
            </p>
            <h2 className="mt-1 text-xl font-semibold text-white">{copy.upcomingAppointments}</h2>
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
            <p className="text-xs font-medium uppercase tracking-wide text-white/50">
              {copy.medicalHistory}
            </p>
            <h2 className="mt-1 text-xl font-semibold text-white">{copy.consultations}</h2>
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

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-white/45">{label}</dt>
      <dd className="mt-1 text-base font-medium capitalize text-white">{value}</dd>
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
    ? { empty: "Nu exista programari viitoare.", at: "la", upcoming: "Urmeaza" }
    : { empty: "No upcoming appointments.", at: "at", upcoming: "Upcoming" };
  if (isLoading) {
    return <div className="h-20 animate-pulse rounded-2xl bg-white/10" />;
  }

  if (!appointments.length) {
    return <p className="rounded-2xl bg-white/10 px-4 py-5 text-center text-sm text-white/65">
      {copy.empty}
    </p>;
  }

  return (
    <ul className="space-y-2">
      {appointments.slice(0, 5).map((appointment) => (
        <li key={appointment.id} className="rounded-2xl bg-white/10 px-4 py-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-medium text-white">{appointment.title}</p>
              <p className="text-xs text-white/60">
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
            <p className="mt-2 text-xs text-white/60">{appointment.location}</p>
          ) : null}
          {appointment.notes ? (
            <p className="mt-2 whitespace-pre-wrap text-sm text-white/75">{appointment.notes}</p>
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
    return <div className="h-20 animate-pulse rounded-2xl bg-white/10" />;
  }

  if (!consultations.length) {
    return <p className="rounded-2xl bg-white/10 px-4 py-5 text-center text-sm text-white/65">
      {copy.empty}
    </p>;
  }

  return (
    <ul className="space-y-2">
      {consultations.slice(0, 5).map((consultation) => (
        <li key={consultation.id} className="rounded-2xl bg-white/10 px-4 py-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-medium text-white">{consultation.reason}</p>
              <p className="text-xs text-white/60">
                {formatShortDate(consultation.occurredAt, locale)} {copy.at}{" "}
                {formatClock(consultation.occurredAt, locale)}
                {consultation.providerName ? ` - ${consultation.providerName}` : ""}
              </p>
            </div>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/70">
              {copy.visit}
            </span>
          </div>
          <p className="mt-2 text-xs text-white/60">{consultation.location}</p>
          {consultation.outcomeNotes ? (
            <p className="mt-2 whitespace-pre-wrap text-sm text-white/75">
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
