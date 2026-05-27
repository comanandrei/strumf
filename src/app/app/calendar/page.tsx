"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { Button } from "~/app/_components/ui/button";
import { Card } from "~/app/_components/ui/card";
import { Chip } from "~/app/_components/ui/chip";
import { localeToIntl, type Locale } from "~/app/lib/i18n";
import { useI18n } from "~/app/lib/i18n-provider";
import { formatClock, formatTimeAgo, milkTypeLabel } from "~/app/lib/time-ago";
import { api, type RouterOutputs } from "~/trpc/react";

import { useBabySelection } from "../_components/baby-selection-context";

type Feeding = RouterOutputs["feeding"]["listByBaby"][number];
type Consultation = RouterOutputs["consultation"]["listByBaby"][number];
type Appointment = RouterOutputs["appointment"]["listByBaby"][number];

type CalendarDay = {
  date: Date;
  dayNumber: number;
  key: string;
  isToday: boolean;
  isCurrentMonth: boolean;
};

const WEEKDAY_LABELS: Record<Locale, string[]> = {
  ro: ["Dum", "Lun", "Mar", "Mie", "Joi", "Vin", "Sam"],
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};

export default function CalendarPage() {
  const { babies, selectedBabyId, setSelectedBabyId, isLoading: loadingBabies } =
    useBabySelection();
  const { locale } = useI18n();
  const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(new Date()));
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);

  const monthRange = useMemo(() => monthBounds(visibleMonth), [visibleMonth]);
  const days = useMemo(() => buildCalendarDays(visibleMonth), [visibleMonth]);
  const activeBaby = babies.find((baby) => baby.id === selectedBabyId);

  const { data: feedings, isLoading: loadingFeedings } = api.feeding.listByBaby.useQuery(
    {
      babyId: selectedBabyId ?? "",
      from: monthRange.from,
      to: monthRange.to,
      limit: 200,
    },
    { enabled: !!selectedBabyId },
  );
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

  const feedingsByDay = useMemo(() => groupFeedingsByDay(feedings ?? []), [feedings]);
  const consultationsByDay = useMemo(
    () => groupConsultationsByDay(consultations ?? []),
    [consultations],
  );
  const appointmentsByDay = useMemo(
    () => groupAppointmentsByDay(appointments ?? []),
    [appointments],
  );
  const selectedFeedings = selectedDay ? (feedingsByDay.get(selectedDay.key) ?? []) : [];
  const selectedConsultations = selectedDay
    ? (consultationsByDay.get(selectedDay.key) ?? [])
    : [];
  const selectedAppointments = selectedDay ? (appointmentsByDay.get(selectedDay.key) ?? []) : [];
  const selectedSummary = useMemo(() => summarizeFeedings(selectedFeedings), [selectedFeedings]);
  const inputDayCount = countInputDays(feedingsByDay);
  const medicalEventDays = useMemo(
    () => countMedicalEventDays(consultationsByDay, appointmentsByDay),
    [consultationsByDay, appointmentsByDay],
  );
  const isLoadingCalendarItems = loadingFeedings || loadingConsultations || loadingAppointments;
  const copy = locale === "ro"
    ? {
        calendar: "Calendar",
        rhythm: "Ritm zilnic",
        emptyBaby: "Adauga mai intai un profil de bebe, apoi hranirile zilnice vor aparea aici.",
        intro: (name: string) => `Atinge o zi din calendar ca sa vezi hranirile si tiparele pentru ${name}.`,
        yourBaby: "bebelusul tau",
        inputDays: "zile cu date",
        inputs: "intrari",
        careDays: "zile ingrijire",
        baby: "Bebe",
        prev: "Inapoi",
        next: "Inainte",
        previousMonth: "Luna precedenta",
        nextMonth: "Luna urmatoare",
        loading: "Se incarca calendarul",
        summary: (inputCount: number, careCount: number) => `${inputCount} intrari · ${careCount} zile ingrijire`,
        dayInput: (count: number) => `${count} ${count === 1 ? "intrare" : "intrari"}`,
        medicalEvents: (count: number) => `${count} evenimente medicale`,
        feedingLogged: "Hranire notata",
        medicalCare: "Ingrijire medicala",
        today: "Azi",
      }
    : {
        calendar: "Calendar",
        rhythm: "Daily rhythm",
        emptyBaby: "Add a baby profile first, then your daily feeding inputs will appear here.",
        intro: (name: string) => `Tap a square day to review feeds and spot patterns for ${name}.`,
        yourBaby: "your baby",
        inputDays: "input days",
        inputs: "inputs",
        careDays: "care days",
        baby: "Baby",
        prev: "Prev",
        next: "Next",
        previousMonth: "Previous month",
        nextMonth: "Next month",
        loading: "Loading calendar",
        summary: (inputCount: number, careCount: number) => `${inputCount} inputs · ${careCount} care days`,
        dayInput: (count: number) => `${count} inputs`,
        medicalEvents: (count: number) => `${count} medical events`,
        feedingLogged: "Feeding logged",
        medicalCare: "Medical care",
        today: "Today",
      };

  const moveMonth = useCallback((offset: number) => {
    setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1));
    setSelectedDay(null);
  }, []);

  useEffect(() => {
    if (!selectedDay) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedDay(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedDay]);

  if (loadingBabies) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 w-48 rounded-2xl bg-white/60" />
        <div className="h-[28rem] w-full rounded-strumf-card bg-white/60" />
      </div>
    );
  }

  if (!selectedBabyId || babies.length === 0) {
    return (
      <div className="flex flex-col gap-5 pb-8">
        <header>
          <p className="text-sm text-strumf-muted">{copy.calendar}</p>
          <h1 className="font-display text-4xl font-bold tracking-tight">{copy.rhythm}</h1>
        </header>
        <Card>
          <p className="text-sm text-strumf-muted">
            {copy.emptyBaby}
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 pb-8">
      <header className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-gradient-warm p-5 shadow-soft">
        <div className="absolute -right-10 -top-12 h-32 w-32 rounded-full bg-white/45" />
        <div className="absolute bottom-4 right-5 h-16 w-16 rounded-[1.5rem] bg-strumf-mint/70 blur-sm" />
        <div className="relative">
          <span className="inline-flex rounded-full bg-white/60 px-3 py-1 text-xs font-black uppercase tracking-wide text-strumf-muted shadow-card">
            {copy.calendar}
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold leading-none tracking-tight">
            {copy.rhythm}
          </h1>
          <p className="mt-2 max-w-xs text-sm text-strumf-muted">
            {copy.intro(activeBaby?.displayName ?? copy.yourBaby)}
          </p>
          <div className="mt-5 grid grid-cols-3 gap-2">
            <CalendarMetric value={`${inputDayCount}`} label={copy.inputDays} />
            <CalendarMetric value={`${feedings?.length ?? 0}`} label={copy.inputs} />
            <CalendarMetric value={`${medicalEventDays}`} label={copy.careDays} />
          </div>
        </div>
      </header>

      {babies.length > 1 ? (
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-strumf-muted">
            {copy.baby}
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

      <Card className="overflow-hidden bg-white/75 p-0">
        <div className="border-b border-strumf-border/70 bg-white/45 px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="ghost"
              className="min-h-10 min-w-10 px-3 text-sm"
              aria-label={copy.previousMonth}
              onClick={() => moveMonth(-1)}
            >
              {copy.prev}
            </Button>
            <div className="text-center">
              <p className="font-display text-2xl font-bold">{formatMonth(visibleMonth, locale)}</p>
              <p className="text-xs font-bold uppercase tracking-wide text-strumf-muted">
                {isLoadingCalendarItems
                  ? copy.loading
                  : copy.summary(feedings?.length ?? 0, medicalEventDays)}
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              className="min-h-10 min-w-10 px-3 text-sm"
              aria-label={copy.nextMonth}
              onClick={() => moveMonth(1)}
            >
              {copy.next}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1.5 p-4 text-center">
          {WEEKDAY_LABELS[locale].map((label) => (
            <div
              key={label}
              className="pb-1 text-[10px] font-black uppercase tracking-wide text-strumf-muted"
            >
              {label}
            </div>
          ))}

          {days.map((day) => {
            const dayFeedings = feedingsByDay.get(day.key) ?? [];
            const dayConsultations = consultationsByDay.get(day.key) ?? [];
            const dayAppointments = appointmentsByDay.get(day.key) ?? [];
            const hasInput = dayFeedings.length > 0;
            const medicalCount = dayConsultations.length + dayAppointments.length;
            const hasMedical = medicalCount > 0;
            return (
              <button
                key={day.key}
                type="button"
                className={[
                  "transition-smooth relative aspect-square rounded-[1.15rem] border p-1 text-center shadow-sm active:scale-[0.98]",
                  day.isCurrentMonth
                    ? "border-strumf-border bg-white/70 text-strumf-foreground"
                    : "border-transparent bg-white/25 text-strumf-muted/55",
                  day.isToday ? "ring-2 ring-strumf-accent/60 ring-offset-2 ring-offset-white" : "",
                  hasInput ? "border-strumf-accent/35 bg-strumf-accent-muted/55" : "",
                  hasMedical && !hasInput ? "border-strumf-accent/20 bg-strumf-blue/70" : "",
                  hasInput || hasMedical
                    ? "shadow-card"
                    : "hover:border-strumf-accent/25 hover:bg-white/90",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => setSelectedDay(day)}
                aria-label={`${formatDayFull(day.date, locale)}${hasInput ? `, ${copy.dayInput(dayFeedings.length)}` : ""}${hasMedical ? `, ${copy.medicalEvents(medicalCount)}` : ""}`}
              >
                <span className="flex h-full items-center justify-center font-display text-base font-bold">
                  {day.dayNumber}
                </span>
                {hasMedical ? (
                  <span className="absolute bottom-1 left-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gradient-blue px-1 text-[9px] font-black leading-none text-strumf-foreground shadow-card">
                    {medicalCount}
                  </span>
                ) : null}
                {hasInput ? (
                  <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-strumf-foreground px-1 text-[9px] font-black leading-none text-white shadow-card">
                    {dayFeedings.length}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="mx-4 mb-4 flex flex-wrap items-center justify-center gap-4 rounded-2xl bg-strumf-surface-strong/70 px-4 py-3 text-xs text-strumf-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-strumf-accent" />
            {copy.feedingLogged}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-strumf-blue ring-1 ring-strumf-accent/30" />
            {copy.medicalCare}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full ring-2 ring-strumf-accent/60" />
            {copy.today}
          </span>
        </div>
      </Card>

      {selectedDay ? (
        <DayDashboardModal
          day={selectedDay}
          feedings={selectedFeedings}
          consultations={selectedConsultations}
          appointments={selectedAppointments}
          summary={selectedSummary}
          onClose={() => setSelectedDay(null)}
        />
      ) : null}
    </div>
  );
}

function CalendarMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-white/60 px-3 py-2 shadow-card backdrop-blur">
      <p className="font-display text-xl font-bold leading-none">{value}</p>
      <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-strumf-muted">
        {label}
      </p>
    </div>
  );
}

function DayDashboardModal({
  day,
  feedings,
  consultations,
  appointments,
  summary,
  onClose,
}: {
  day: CalendarDay;
  feedings: Feeding[];
  consultations: Consultation[];
  appointments: Appointment[];
  summary: ReturnType<typeof summarizeFeedings>;
  onClose: () => void;
}) {
  const medicalCount = consultations.length + appointments.length;
  const { locale } = useI18n();
  const copy = locale === "ro"
    ? {
        dailyDashboard: "Panou zilnic",
        close: "Inchide",
        totalMilk: "Total lapte",
        feeds: (count: number) => `${count} ${count === 1 ? "hranire" : "hraniri"}`,
        average: "Medie",
        perFeed: "per hranire",
        firstFeed: "Prima hranire",
        lastFeed: "Ultima hranire",
        noInput: "fara intrari",
        inputs: "Intrari",
        emptyInputs: "Nu exista hraniri notate pentru aceasta zi.",
        medicalCare: "Ingrijire medicala",
        appointments: "Programari",
        planned: "Planificat",
        consultations: "Consultatii",
        visit: "Vizita",
        emptyMedical: "Nu exista evenimente medicale pentru aceasta zi.",
      }
    : {
        dailyDashboard: "Daily dashboard",
        close: "Close",
        totalMilk: "Total milk",
        feeds: (count: number) => `${count} feed${count === 1 ? "" : "s"}`,
        average: "Average",
        perFeed: "per feed",
        firstFeed: "First feed",
        lastFeed: "Last feed",
        noInput: "no input",
        inputs: "Inputs",
        emptyInputs: "No feeding inputs logged for this day yet.",
        medicalCare: "Medical care",
        appointments: "Appointments",
        planned: "Planned",
        consultations: "Consultations",
        visit: "Visit",
        emptyMedical: "No medical events for this day yet.",
      };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-strumf-foreground/35 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-12 backdrop-blur-sm sm:items-center sm:justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="day-dashboard-title"
      onClick={onClose}
    >
      <section
        className="animate-fade-up max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-[2rem] border border-strumf-border bg-strumf-surface-strong p-5 shadow-soft"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-strumf-muted">{copy.dailyDashboard}</p>
            <h2 id="day-dashboard-title" className="font-display text-3xl font-bold tracking-tight">
              {formatDayTitle(day.date, locale)}
            </h2>
          </div>
          <Button type="button" variant="ghost" className="shrink-0 px-4" onClick={onClose}>
            {copy.close}
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <DailyStatCard
            tone="primary"
            label={copy.totalMilk}
            value={`${summary.totalMl} ml`}
            sub={copy.feeds(summary.feedCount)}
          />
          <DailyStatCard
            tone="mint"
            label={copy.average}
            value={`${summary.avgMl} ml`}
            sub={copy.perFeed}
          />
          <DailyStatCard
            tone="blue"
            label={copy.firstFeed}
            value={summary.firstFeed ? formatClock(summary.firstFeed.startedAt, locale) : "-"}
            sub={summary.firstFeed ? formatTimeAgo(summary.firstFeed.startedAt, locale) : copy.noInput}
          />
          <DailyStatCard
            tone="warm"
            label={copy.lastFeed}
            value={summary.lastFeed ? formatClock(summary.lastFeed.startedAt, locale) : "-"}
            sub={summary.lastFeed ? formatTimeAgo(summary.lastFeed.startedAt, locale) : copy.noInput}
          />
        </div>

        <div className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">{copy.inputs}</h3>
            <span className="rounded-full bg-strumf-accent-muted/70 px-3 py-1 text-xs font-bold text-strumf-foreground">
              {feedings.length}
            </span>
          </div>

          {feedings.length ? (
            <ul className="space-y-2">
              {feedings.map((feeding) => (
                <li
                  key={feeding.id}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-white/60 px-4 py-3"
                >
                  <div>
                    <p className="font-display text-lg font-semibold">{feeding.amountMl} ml</p>
                    <p className="text-xs text-strumf-muted">
                      {formatClock(feeding.startedAt, locale)}
                      {feeding.notes ? ` · ${feeding.notes}` : ""}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-strumf-accent-muted/70 px-3 py-1 text-xs font-bold text-strumf-foreground">
                    {milkTypeLabel(feeding.milkType, locale)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-2xl bg-white/60 px-4 py-6 text-center text-sm text-strumf-muted">
              {copy.emptyInputs}
            </p>
          )}
        </div>

        <div className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">{copy.medicalCare}</h3>
            <span className="rounded-full bg-gradient-blue px-3 py-1 text-xs font-bold text-strumf-foreground">
              {medicalCount}
            </span>
          </div>

          {medicalCount ? (
            <div className="space-y-3">
              {appointments.length ? (
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-strumf-muted">
                    {copy.appointments}
                  </p>
                  <ul className="space-y-2">
                    {appointments.map((appointment) => (
                      <li
                        key={appointment.id}
                        className="rounded-2xl bg-white/60 px-4 py-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-display text-base font-semibold">
                              {appointment.title}
                            </p>
                            <p className="text-xs text-strumf-muted">
                              {formatClock(appointment.startsAt, locale)}
                              {appointment.endsAt ? `-${formatClock(appointment.endsAt, locale)}` : ""}
                            </p>
                          </div>
                          <span className="rounded-full bg-gradient-blue px-3 py-1 text-xs font-bold text-strumf-foreground">
                            {copy.planned}
                          </span>
                        </div>
                        {appointment.location ? (
                          <p className="mt-2 text-xs text-strumf-muted">
                            {appointment.location}
                          </p>
                        ) : null}
                        {appointment.notes ? (
                          <p className="mt-2 whitespace-pre-wrap text-sm text-strumf-foreground/80">
                            {appointment.notes}
                          </p>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {consultations.length ? (
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-strumf-muted">
                    {copy.consultations}
                  </p>
                  <ul className="space-y-2">
                    {consultations.map((consultation) => (
                      <li
                        key={consultation.id}
                        className="rounded-2xl bg-white/60 px-4 py-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-display text-base font-semibold">
                              {consultation.reason}
                            </p>
                            <p className="text-xs text-strumf-muted">
                              {formatClock(consultation.occurredAt, locale)}
                              {consultation.providerName
                                ? ` · ${consultation.providerName}`
                                : ""}
                            </p>
                          </div>
                          <span className="rounded-full bg-strumf-accent-muted/70 px-3 py-1 text-xs font-bold text-strumf-foreground">
                            {copy.visit}
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-strumf-muted">
                          {consultation.location}
                        </p>
                        {consultation.outcomeNotes ? (
                          <p className="mt-2 whitespace-pre-wrap text-sm text-strumf-foreground/80">
                            {consultation.outcomeNotes}
                          </p>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          ) : (
            <p className="rounded-2xl bg-white/60 px-4 py-6 text-center text-sm text-strumf-muted">
              {copy.emptyMedical}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

function DailyStatCard({
  tone,
  label,
  value,
  sub,
}: {
  tone: "primary" | "mint" | "blue" | "warm";
  label: string;
  value: string;
  sub: string;
}) {
  const toneClass = {
    primary: "bg-gradient-primary text-white",
    mint: "bg-gradient-mint text-strumf-foreground",
    blue: "bg-gradient-blue text-strumf-foreground",
    warm: "bg-gradient-warm text-strumf-foreground",
  }[tone];

  return (
    <div className={`rounded-3xl p-4 shadow-card ${toneClass}`}>
      <p className="text-xs opacity-80">{label}</p>
      <p className="font-display text-2xl font-bold leading-tight">{value}</p>
      <p className="text-[11px] opacity-75">{sub}</p>
    </div>
  );
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function monthBounds(date: Date) {
  const from = startOfMonth(date);
  const to = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
  return { from, to };
}

function buildCalendarDays(date: Date): CalendarDay[] {
  const firstDay = startOfMonth(date);
  const gridStart = new Date(firstDay);
  gridStart.setDate(firstDay.getDate() - firstDay.getDay());

  const todayKey = toDateKey(new Date());
  const month = date.getMonth();

  return Array.from({ length: 42 }, (_, index) => {
    const day = new Date(gridStart);
    day.setDate(gridStart.getDate() + index);
    const key = toDateKey(day);
    return {
      date: day,
      dayNumber: day.getDate(),
      key,
      isToday: key === todayKey,
      isCurrentMonth: day.getMonth() === month,
    };
  });
}

function groupFeedingsByDay(feedings: Feeding[]) {
  const grouped = new Map<string, Feeding[]>();

  for (const feeding of feedings) {
    const key = toDateKey(feeding.startedAt);
    const dayFeedings = grouped.get(key) ?? [];
    dayFeedings.push(feeding);
    grouped.set(key, dayFeedings);
  }

  for (const dayFeedings of grouped.values()) {
    dayFeedings.sort((a, b) => new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime());
  }

  return grouped;
}

function groupConsultationsByDay(consultations: Consultation[]) {
  const grouped = new Map<string, Consultation[]>();

  for (const consultation of consultations) {
    const key = toDateKey(consultation.occurredAt);
    const dayConsultations = grouped.get(key) ?? [];
    dayConsultations.push(consultation);
    grouped.set(key, dayConsultations);
  }

  for (const dayConsultations of grouped.values()) {
    dayConsultations.sort(
      (a, b) => new Date(a.occurredAt).getTime() - new Date(b.occurredAt).getTime(),
    );
  }

  return grouped;
}

function groupAppointmentsByDay(appointments: Appointment[]) {
  const grouped = new Map<string, Appointment[]>();

  for (const appointment of appointments) {
    const key = toDateKey(appointment.startsAt);
    const dayAppointments = grouped.get(key) ?? [];
    dayAppointments.push(appointment);
    grouped.set(key, dayAppointments);
  }

  for (const dayAppointments of grouped.values()) {
    dayAppointments.sort(
      (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
    );
  }

  return grouped;
}

function summarizeFeedings(feedings: Feeding[]) {
  const totalMl = feedings.reduce((sum, feeding) => sum + feeding.amountMl, 0);
  const feedCount = feedings.length;
  return {
    totalMl,
    feedCount,
    avgMl: feedCount ? Math.round(totalMl / feedCount) : 0,
    firstFeed: feedings[0],
    lastFeed: feedings[feedings.length - 1],
  };
}

function countInputDays(feedingsByDay: Map<string, Feeding[]>) {
  return Array.from(feedingsByDay.values()).filter((feedings) => feedings.length > 0).length;
}

function countMedicalEventDays(
  consultationsByDay: Map<string, Consultation[]>,
  appointmentsByDay: Map<string, Appointment[]>,
) {
  return new Set([...consultationsByDay.keys(), ...appointmentsByDay.keys()]).size;
}

function toDateKey(value: Date) {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatMonth(value: Date, locale: Locale) {
  return new Intl.DateTimeFormat(localeToIntl(locale), {
    month: "long",
    year: "numeric",
  }).format(value);
}

function formatDayFull(value: Date, locale: Locale) {
  return new Intl.DateTimeFormat(localeToIntl(locale), {
    dateStyle: "full",
  }).format(value);
}

function formatDayTitle(value: Date, locale: Locale) {
  return new Intl.DateTimeFormat(localeToIntl(locale), {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(value);
}
