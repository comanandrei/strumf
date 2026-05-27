"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";

import { Card } from "~/app/_components/ui/card";
import { formatClock, formatShortDate } from "~/app/lib/time-ago";
import { api, type RouterOutputs } from "~/trpc/react";

import { useBabySelection } from "../../_components/baby-selection-context";

type Consultation = RouterOutputs["consultation"]["listByBaby"][number];
type Appointment = RouterOutputs["appointment"]["listByBaby"][number];

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
  const now = useMemo(() => new Date(), []);
  const { babies, selectedBabyId, setSelectedBabyId, isLoading: loadingBabies } =
    useBabySelection();

  const { data: baby, isLoading, error } = api.baby.get.useQuery(
    { babyId: babyId ?? "" },
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

  const upcomingAppointments = useMemo(() => {
    const nowMs = now.getTime();
    return (appointments ?? []).filter((appointment) => appointment.startsAt.getTime() >= nowMs);
  }, [appointments, now]);

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
        <h1 className="text-lg font-semibold">Baby profile not found</h1>
        <p className="mt-2 text-sm text-white/70">
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
      <header>
        <p className="text-sm text-white/65">Baby profile</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">{baby.displayName}</h1>
        <p className="mt-1 text-sm text-strumf-accent">{formatAge(baby.birthDateTime)}</p>
      </header>

      <Card>
        <p className="mb-4 text-xs font-medium uppercase tracking-wide text-white/50">
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
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-white/50">
          Notes
        </p>
        <p className="whitespace-pre-wrap text-sm text-white/75">
          {baby.notes?.trim() || "No notes added yet."}
        </p>
      </Card>

      <Card>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-white/50">
              Medical care
            </p>
            <h2 className="mt-1 text-xl font-semibold text-white">Upcoming appointments</h2>
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
            <p className="text-xs font-medium uppercase tracking-wide text-white/50">
              Medical history
            </p>
            <h2 className="mt-1 text-xl font-semibold text-white">Consultations</h2>
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
  if (isLoading) {
    return <div className="h-20 animate-pulse rounded-2xl bg-white/10" />;
  }

  if (!appointments.length) {
    return <p className="rounded-2xl bg-white/10 px-4 py-5 text-center text-sm text-white/65">
      No upcoming appointments.
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
                {formatShortDate(appointment.startsAt)} at {formatClock(appointment.startsAt)}
                {appointment.endsAt ? `-${formatClock(appointment.endsAt)}` : ""}
              </p>
            </div>
            <span className="rounded-full bg-strumf-accent/25 px-3 py-1 text-xs font-bold text-strumf-accent">
              Upcoming
            </span>
          </div>
          {appointment.location ? (
            <p className="mt-2 text-xs text-white/60">{appointment.location}</p>
          ) : null}
          {appointment.reminderAt ? (
            <p className="mt-2 text-xs font-bold text-strumf-accent">
              Reminder: {formatShortDate(appointment.reminderAt)} at{" "}
              {formatClock(appointment.reminderAt)}
              {appointment.reminderSentAt ? " · sent" : ""}
            </p>
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
  if (isLoading) {
    return <div className="h-20 animate-pulse rounded-2xl bg-white/10" />;
  }

  if (!consultations.length) {
    return <p className="rounded-2xl bg-white/10 px-4 py-5 text-center text-sm text-white/65">
      No consultations recorded.
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
                {formatShortDate(consultation.occurredAt)} at{" "}
                {formatClock(consultation.occurredAt)}
                {consultation.providerName ? ` - ${consultation.providerName}` : ""}
              </p>
            </div>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/70">
              Visit
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
              Follow-up: {formatShortDate(consultation.followUpAt)} at{" "}
              {formatClock(consultation.followUpAt)}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
