"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";

import { Button } from "~/app/_components/ui/button";
import { Card } from "~/app/_components/ui/card";
import { Chip } from "~/app/_components/ui/chip";
import { formatClock, formatShortDate } from "~/app/lib/time-ago";
import { api, type RouterOutputs } from "~/trpc/react";

import { useBabySelection } from "./baby-selection-context";

type Mode = "consultation" | "appointment";
type Consultation = RouterOutputs["consultation"]["listByBaby"][number];
type Appointment = RouterOutputs["appointment"]["listByBaby"][number];

const inputClass =
  "w-full rounded-xl border border-strumf-border bg-white/70 px-3 py-3 text-sm font-medium outline-none transition-smooth focus:border-strumf-accent";

export function MedicalLogForm({ mode }: { mode: Mode }) {
  const { babies, selectedBabyId, setSelectedBabyId, isLoading } = useBabySelection();
  const activeBaby = babies.find((baby) => baby.id === selectedBabyId);

  const [consultationForm, setConsultationForm] = useState(() => ({
    occurredAt: toDateTimeLocalValue(new Date()),
    location: "",
    reason: "",
    providerName: "",
    outcomeNotes: "",
    followUpAt: "",
  }));
  const [appointmentForm, setAppointmentForm] = useState(() => ({
    title: "",
    startsAt: toDateTimeLocalValue(defaultAppointmentStart()),
    endsAt: "",
    location: "",
    notes: "",
  }));
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const utils = api.useUtils();

  const { data: consultations, isLoading: loadingConsultations } =
    api.consultation.listByBaby.useQuery(
      { babyId: selectedBabyId ?? "" },
      { enabled: !!selectedBabyId },
    );

  const { data: appointments, isLoading: loadingAppointments } =
    api.appointment.listByBaby.useQuery(
      { babyId: selectedBabyId ?? "" },
      { enabled: !!selectedBabyId },
    );

  const upcomingAppointments = useMemo(() => {
    const now = Date.now();
    return (appointments ?? []).filter((appointment) => appointment.startsAt.getTime() >= now);
  }, [appointments]);

  const createConsultation = api.consultation.create.useMutation({
    onSuccess: async (row) => {
      setError(null);
      setMessage("Consultation saved.");
      setConsultationForm({
        occurredAt: toDateTimeLocalValue(new Date()),
        location: "",
        reason: "",
        providerName: "",
        outcomeNotes: "",
        followUpAt: "",
      });
      await utils.consultation.listByBaby.invalidate({ babyId: row.babyId });
    },
    onError: (e) => {
      setMessage(null);
      setError(e.message);
    },
  });

  const createAppointment = api.appointment.create.useMutation({
    onSuccess: async (row) => {
      setError(null);
      setMessage("Appointment scheduled.");
      setAppointmentForm({
        title: "",
        startsAt: toDateTimeLocalValue(defaultAppointmentStart()),
        endsAt: "",
        location: "",
        notes: "",
      });
      await utils.appointment.listByBaby.invalidate({ babyId: row.babyId });
    },
    onError: (e) => {
      setMessage(null);
      setError(e.message);
    },
  });

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 w-40 rounded-2xl bg-white/60" />
        <div className="h-64 w-full rounded-strumf-card bg-white/60" />
      </div>
    );
  }

  if (babies.length === 0) {
    return (
      <Card>
        <p className="text-strumf-muted">Add a baby to your household first.</p>
        <Link href="/app/onboarding" className="mt-4 inline-block text-strumf-accent underline">
          Go to onboarding
        </Link>
      </Card>
    );
  }

  const submitConsultation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedBabyId) return;
    setError(null);
    setMessage(null);
    createConsultation.mutate({
      babyId: selectedBabyId,
      occurredAt: new Date(consultationForm.occurredAt),
      location: consultationForm.location.trim(),
      reason: consultationForm.reason.trim(),
      providerName: optionalText(consultationForm.providerName),
      outcomeNotes: optionalText(consultationForm.outcomeNotes),
      followUpAt: consultationForm.followUpAt ? new Date(consultationForm.followUpAt) : undefined,
    });
  };

  const submitAppointment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedBabyId) return;
    setError(null);
    setMessage(null);
    createAppointment.mutate({
      babyId: selectedBabyId,
      title: appointmentForm.title.trim(),
      startsAt: new Date(appointmentForm.startsAt),
      endsAt: appointmentForm.endsAt ? new Date(appointmentForm.endsAt) : undefined,
      location: optionalText(appointmentForm.location),
      notes: optionalText(appointmentForm.notes),
    });
  };

  return (
    <div className="flex flex-col gap-5 pb-6">
      <header>
        <p className="text-sm text-strumf-muted">Medical care</p>
        <h1 className="font-display text-3xl font-bold tracking-tight">
          {mode === "consultation" ? "Add consultation" : "Schedule appointment"}
        </h1>
        <p className="mt-1 text-sm text-strumf-muted">
          For {activeBaby?.displayName ?? "your baby"}
        </p>
      </header>

      {babies.length > 1 ? (
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-strumf-muted">
            Baby
          </p>
          <div className="flex flex-wrap gap-2">
            {babies.map((baby) => (
              <Chip
                key={baby.id}
                selected={baby.id === selectedBabyId}
                onClick={() => setSelectedBabyId(baby.id)}
              >
                {baby.displayName}
              </Chip>
            ))}
          </div>
        </div>
      ) : null}

      {mode === "consultation" ? (
        <ConsultationForm
          form={consultationForm}
          isPending={createConsultation.isPending}
          onChange={setConsultationForm}
          onSubmit={submitConsultation}
        />
      ) : (
        <AppointmentForm
          form={appointmentForm}
          isPending={createAppointment.isPending}
          onChange={setAppointmentForm}
          onSubmit={submitAppointment}
        />
      )}

      {error ? <p className="text-sm text-strumf-danger">{error}</p> : null}
      {message ? (
        <Card className="border-strumf-accent/40 bg-strumf-accent/15">
          <p className="font-medium text-strumf-accent">{message}</p>
        </Card>
      ) : null}

      {mode === "consultation" ? (
        <ConsultationList consultations={consultations ?? []} isLoading={loadingConsultations} />
      ) : (
        <AppointmentList appointments={upcomingAppointments} isLoading={loadingAppointments} />
      )}
    </div>
  );
}

function ConsultationForm({
  form,
  isPending,
  onChange,
  onSubmit,
}: {
  form: {
    occurredAt: string;
    location: string;
    reason: string;
    providerName: string;
    outcomeNotes: string;
    followUpAt: string;
  };
  isPending: boolean;
  onChange: (next: {
    occurredAt: string;
    location: string;
    reason: string;
    providerName: string;
    outcomeNotes: string;
    followUpAt: string;
  }) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <Card>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="space-y-1.5 text-sm font-bold">
            <span>When</span>
            <input
              required
              type="datetime-local"
              value={form.occurredAt}
              onChange={(e) => onChange({ ...form, occurredAt: e.target.value })}
              className={inputClass}
            />
          </label>
          <label className="space-y-1.5 text-sm font-bold">
            <span>Location</span>
            <input
              required
              value={form.location}
              onChange={(e) => onChange({ ...form, location: e.target.value })}
              placeholder="Clinic, hospital, home"
              className={inputClass}
            />
          </label>
        </div>

        <label className="block space-y-1.5 text-sm font-bold">
          <span>Reason</span>
          <textarea
            required
            value={form.reason}
            onChange={(e) => onChange({ ...form, reason: e.target.value })}
            placeholder="Routine check, vaccine, fever..."
            rows={3}
            className={inputClass}
          />
        </label>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="space-y-1.5 text-sm font-bold">
            <span>Provider</span>
            <input
              value={form.providerName}
              onChange={(e) => onChange({ ...form, providerName: e.target.value })}
              placeholder="Doctor or nurse"
              className={inputClass}
            />
          </label>
          <label className="space-y-1.5 text-sm font-bold">
            <span>Follow-up</span>
            <input
              type="datetime-local"
              value={form.followUpAt}
              onChange={(e) => onChange({ ...form, followUpAt: e.target.value })}
              className={inputClass}
            />
          </label>
        </div>

        <label className="block space-y-1.5 text-sm font-bold">
          <span>Outcome notes</span>
          <textarea
            value={form.outcomeNotes}
            onChange={(e) => onChange({ ...form, outcomeNotes: e.target.value })}
            placeholder="Measurements, advice, prescription..."
            rows={3}
            className={inputClass}
          />
        </label>

        <Button
          type="submit"
          variant="accent"
          fullWidth
          disabled={isPending || !form.location.trim() || !form.reason.trim()}
        >
          {isPending ? "Saving..." : "Save consultation"}
        </Button>
      </form>
    </Card>
  );
}

function AppointmentForm({
  form,
  isPending,
  onChange,
  onSubmit,
}: {
  form: {
    title: string;
    startsAt: string;
    endsAt: string;
    location: string;
    notes: string;
  };
  isPending: boolean;
  onChange: (next: {
    title: string;
    startsAt: string;
    endsAt: string;
    location: string;
    notes: string;
  }) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <Card>
      <form className="space-y-4" onSubmit={onSubmit}>
        <label className="block space-y-1.5 text-sm font-bold">
          <span>Title</span>
          <input
            required
            value={form.title}
            onChange={(e) => onChange({ ...form, title: e.target.value })}
            placeholder="Pediatrician, vaccine, check-up"
            className={inputClass}
          />
        </label>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="space-y-1.5 text-sm font-bold">
            <span>Starts</span>
            <input
              required
              type="datetime-local"
              value={form.startsAt}
              onChange={(e) => onChange({ ...form, startsAt: e.target.value })}
              className={inputClass}
            />
          </label>
          <label className="space-y-1.5 text-sm font-bold">
            <span>Ends</span>
            <input
              type="datetime-local"
              value={form.endsAt}
              onChange={(e) => onChange({ ...form, endsAt: e.target.value })}
              className={inputClass}
            />
          </label>
        </div>

        <label className="block space-y-1.5 text-sm font-bold">
          <span>Location</span>
          <input
            value={form.location}
            onChange={(e) => onChange({ ...form, location: e.target.value })}
            placeholder="Clinic, address, video call"
            className={inputClass}
          />
        </label>

        <label className="block space-y-1.5 text-sm font-bold">
          <span>Notes</span>
          <textarea
            value={form.notes}
            onChange={(e) => onChange({ ...form, notes: e.target.value })}
            placeholder="What to bring, questions for the doctor..."
            rows={3}
            className={inputClass}
          />
        </label>

        <Button type="submit" variant="accent" fullWidth disabled={isPending || !form.title.trim()}>
          {isPending ? "Scheduling..." : "Schedule appointment"}
        </Button>
      </form>
    </Card>
  );
}

function ConsultationList({
  consultations,
  isLoading,
}: {
  consultations: Consultation[];
  isLoading: boolean;
}) {
  if (isLoading) {
    return <div className="h-28 animate-pulse rounded-strumf-card bg-white/60" />;
  }

  return (
    <section className="space-y-2">
      <h2 className="font-display text-lg font-semibold">Consultation history</h2>
      {consultations.length ? (
        <ul className="space-y-2">
          {consultations.map((consultation) => (
            <li
              key={consultation.id}
              className="rounded-2xl bg-strumf-surface px-4 py-3 shadow-card backdrop-blur"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-base font-semibold">{consultation.reason}</p>
                  <p className="text-xs text-strumf-muted">
                    {formatShortDate(consultation.occurredAt)} at{" "}
                    {formatClock(consultation.occurredAt)}
                    {consultation.providerName ? ` - ${consultation.providerName}` : ""}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-strumf-accent-muted/70 px-3 py-1 text-xs font-bold text-strumf-foreground">
                  Visit
                </span>
              </div>
              <p className="mt-2 text-xs text-strumf-muted">{consultation.location}</p>
              {consultation.outcomeNotes ? (
                <p className="mt-2 whitespace-pre-wrap text-sm text-strumf-foreground/80">
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
      ) : (
        <Card>
          <p className="text-center text-sm text-strumf-muted">
            No consultations recorded yet.
          </p>
        </Card>
      )}
    </section>
  );
}

function AppointmentList({
  appointments,
  isLoading,
}: {
  appointments: Appointment[];
  isLoading: boolean;
}) {
  if (isLoading) {
    return <div className="h-28 animate-pulse rounded-strumf-card bg-white/60" />;
  }

  return (
    <section className="space-y-2">
      <h2 className="font-display text-lg font-semibold">Upcoming appointments</h2>
      {appointments.length ? (
        <ul className="space-y-2">
          {appointments.map((appointment) => (
            <li
              key={appointment.id}
              className="rounded-2xl bg-strumf-surface px-4 py-3 shadow-card backdrop-blur"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-base font-semibold">{appointment.title}</p>
                  <p className="text-xs text-strumf-muted">
                    {formatShortDate(appointment.startsAt)} at {formatClock(appointment.startsAt)}
                    {appointment.endsAt ? `-${formatClock(appointment.endsAt)}` : ""}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-gradient-blue px-3 py-1 text-xs font-bold text-strumf-foreground">
                  Planned
                </span>
              </div>
              {appointment.location ? (
                <p className="mt-2 text-xs text-strumf-muted">{appointment.location}</p>
              ) : null}
              {appointment.notes ? (
                <p className="mt-2 whitespace-pre-wrap text-sm text-strumf-foreground/80">
                  {appointment.notes}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <Card>
          <p className="text-center text-sm text-strumf-muted">
            No upcoming appointments scheduled.
          </p>
        </Card>
      )}
    </section>
  );
}

function optionalText(value: string) {
  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
}

function defaultAppointmentStart() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(9, 0, 0, 0);
  return date;
}

function toDateTimeLocalValue(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  const hour = `${date.getHours()}`.padStart(2, "0");
  const minute = `${date.getMinutes()}`.padStart(2, "0");
  return `${year}-${month}-${day}T${hour}:${minute}`;
}
