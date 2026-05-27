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
type ReminderPreset = "none" | "10m" | "1h" | "24h" | "2d";

const REMINDER_OPTIONS: Array<{
  value: ReminderPreset;
  label: string;
  description: string;
  minutes: number | null;
}> = [
  { value: "none", label: "Off", description: "No reminder", minutes: null },
  { value: "10m", label: "10 min", description: "Last check", minutes: 10 },
  { value: "1h", label: "1 hour", description: "Pack up", minutes: 60 },
  { value: "24h", label: "1 day", description: "Best default", minutes: 24 * 60 },
  { value: "2d", label: "2 days", description: "Plan ahead", minutes: 2 * 24 * 60 },
];

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
    reminderPreset: "24h" as ReminderPreset,
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
        reminderPreset: "24h",
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
    const reminderAt = calculateReminderAt(appointmentForm.startsAt, appointmentForm.reminderPreset);
    if (appointmentForm.reminderPreset !== "none" && !reminderAt) {
      setError("Pick a shorter reminder or move the appointment later.");
      return;
    }
    createAppointment.mutate({
      babyId: selectedBabyId,
      title: appointmentForm.title.trim(),
      startsAt: new Date(appointmentForm.startsAt),
      endsAt: appointmentForm.endsAt ? new Date(appointmentForm.endsAt) : undefined,
      location: optionalText(appointmentForm.location),
      notes: optionalText(appointmentForm.notes),
      reminderAt,
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
    reminderPreset: ReminderPreset;
  };
  isPending: boolean;
  onChange: (next: {
    title: string;
    startsAt: string;
    endsAt: string;
    location: string;
    notes: string;
    reminderPreset: ReminderPreset;
  }) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const reminderAt = calculateReminderAt(form.startsAt, form.reminderPreset);
  const reminderIsInvalid = form.reminderPreset !== "none" && !reminderAt;

  return (
    <Card className="overflow-hidden bg-white/80 p-0">
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="relative overflow-hidden bg-gradient-blue p-5">
          <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-white/45" />
          <div className="relative">
            <span className="inline-flex rounded-full bg-white/70 px-3 py-1 text-xs font-black uppercase tracking-wide text-strumf-muted shadow-card">
              Smart reminder
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold leading-none tracking-tight">
              Never miss a visit
            </h2>
            <p className="mt-2 text-sm text-strumf-muted">
              Save the appointment, then send a timely household email reminder before the visit.
            </p>
          </div>
        </div>

        <div className="space-y-4 p-5 pt-0">
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

          <div className="rounded-3xl border border-strumf-border bg-white/60 p-4 shadow-card">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-strumf-muted">
                  Reminder
                </p>
                <p className="font-display text-lg font-semibold">
                  {reminderAt ? formatReminderDate(reminderAt) : "No reminder scheduled"}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-strumf-accent-muted/70 px-3 py-1 text-xs font-bold text-strumf-foreground">
                Email
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {REMINDER_OPTIONS.map((option) => {
                const selected = form.reminderPreset === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    className={[
                      "transition-smooth min-h-16 rounded-2xl border px-3 py-2 text-left active:scale-[0.98]",
                      selected
                        ? "border-strumf-accent bg-gradient-primary text-white shadow-soft"
                        : "border-strumf-border bg-white/70 text-strumf-foreground hover:border-strumf-accent/40",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => onChange({ ...form, reminderPreset: option.value })}
                  >
                    <span className="block text-sm font-black">{option.label}</span>
                    <span className="block text-[11px] opacity-75">{option.description}</span>
                  </button>
                );
              })}
            </div>
            {reminderIsInvalid ? (
              <p className="mt-3 text-xs font-bold text-strumf-danger">
                This reminder would be in the past. Pick a shorter reminder or move the appointment later.
              </p>
            ) : (
              <p className="mt-3 text-xs text-strumf-muted">
                Email reminders go to active caregivers in the household.
              </p>
            )}
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

          <Button
            type="submit"
            variant="accent"
            fullWidth
            disabled={isPending || !form.title.trim() || reminderIsInvalid}
          >
            {isPending ? "Scheduling..." : "Schedule appointment"}
          </Button>
        </div>
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
        <ul className="space-y-3">
          {appointments.map((appointment) => (
            <li
              key={appointment.id}
              className="relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-strumf-surface px-4 py-4 shadow-card backdrop-blur"
            >
              <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-primary" />
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 pl-2">
                  <p className="mb-1 text-[11px] font-black uppercase tracking-wide text-strumf-accent">
                    {formatAppointmentCountdown(appointment.startsAt)}
                  </p>
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
              <div className="mt-3 flex flex-wrap gap-2 pl-2">
                <span className="rounded-full bg-strumf-accent-muted/70 px-3 py-1 text-xs font-bold text-strumf-foreground">
                  {appointment.reminderAt
                    ? `Reminder ${formatReminderDate(appointment.reminderAt)}`
                    : "No reminder"}
                </span>
                {appointment.reminderSentAt ? (
                  <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-strumf-muted">
                    Sent
                  </span>
                ) : null}
              </div>
              {appointment.location ? (
                <p className="mt-2 pl-2 text-xs text-strumf-muted">{appointment.location}</p>
              ) : null}
              {appointment.notes ? (
                <p className="mt-2 whitespace-pre-wrap pl-2 text-sm text-strumf-foreground/80">
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

function calculateReminderAt(startsAtValue: string, preset: ReminderPreset) {
  const option = REMINDER_OPTIONS.find((item) => item.value === preset);
  if (!option?.minutes) return undefined;

  const startsAt = new Date(startsAtValue);
  if (Number.isNaN(startsAt.getTime())) return undefined;

  const reminderAt = new Date(startsAt.getTime() - option.minutes * 60 * 1000);
  return reminderAt.getTime() > Date.now() ? reminderAt : undefined;
}

function formatReminderDate(value: Date) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(value);
}

function formatAppointmentCountdown(value: Date) {
  const ms = value.getTime() - Date.now();
  if (ms <= 0) return "Due now";

  const totalHours = Math.round(ms / (60 * 60 * 1000));
  if (totalHours < 24) {
    return `In ${Math.max(1, totalHours)}h`;
  }

  const days = Math.round(totalHours / 24);
  return `In ${days} day${days === 1 ? "" : "s"}`;
}

function toDateTimeLocalValue(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  const hour = `${date.getHours()}`.padStart(2, "0");
  const minute = `${date.getMinutes()}`.padStart(2, "0");
  return `${year}-${month}-${day}T${hour}:${minute}`;
}
