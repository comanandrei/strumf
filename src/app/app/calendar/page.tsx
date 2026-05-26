"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { Button } from "~/app/_components/ui/button";
import { Card } from "~/app/_components/ui/card";
import { Chip } from "~/app/_components/ui/chip";
import { formatClock, formatTimeAgo, milkTypeLabel } from "~/app/lib/time-ago";
import { api, type RouterOutputs } from "~/trpc/react";

import { useBabySelection } from "../_components/baby-selection-context";

type Feeding = RouterOutputs["feeding"]["listByBaby"][number];

type CalendarDay = {
  date: Date;
  dayNumber: number;
  key: string;
  isToday: boolean;
  isCurrentMonth: boolean;
};

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarPage() {
  const { babies, selectedBabyId, setSelectedBabyId, isLoading: loadingBabies } =
    useBabySelection();
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

  const feedingsByDay = useMemo(() => groupFeedingsByDay(feedings ?? []), [feedings]);
  const selectedFeedings = selectedDay ? (feedingsByDay.get(selectedDay.key) ?? []) : [];
  const selectedSummary = useMemo(() => summarizeFeedings(selectedFeedings), [selectedFeedings]);

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
          <p className="text-sm text-strumf-muted">Calendar</p>
          <h1 className="font-display text-4xl font-bold tracking-tight">Daily rhythm</h1>
        </header>
        <Card>
          <p className="text-sm text-strumf-muted">
            Add a baby profile first, then your daily feeding inputs will appear here.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 pb-8">
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-strumf-muted">Calendar</p>
          <h1 className="font-display text-4xl font-bold tracking-tight">Daily rhythm</h1>
          <p className="mt-2 text-sm text-strumf-muted">
            Tap a day to see the dashboard for {activeBaby?.displayName ?? "your baby"}.
          </p>
        </div>
        <span className="rounded-full bg-white/60 px-3 py-1.5 text-xs font-bold text-strumf-muted shadow-card">
          {countInputDays(feedingsByDay)} days
        </span>
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

      <Card className="overflow-hidden">
        <div className="mb-4 flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="ghost"
            className="px-3"
            aria-label="Previous month"
            onClick={() => moveMonth(-1)}
          >
            Prev
          </Button>
          <div className="text-center">
            <p className="font-display text-2xl font-bold">{formatMonth(visibleMonth)}</p>
            <p className="text-xs font-bold uppercase tracking-wide text-strumf-muted">
              {loadingFeedings ? "Loading inputs" : `${feedings?.length ?? 0} inputs`}
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            className="px-3"
            aria-label="Next month"
            onClick={() => moveMonth(1)}
          >
            Next
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {WEEKDAY_LABELS.map((label) => (
            <div
              key={label}
              className="pb-2 text-[11px] font-bold uppercase tracking-wide text-strumf-muted"
            >
              {label}
            </div>
          ))}

          {days.map((day) => {
            const dayFeedings = feedingsByDay.get(day.key) ?? [];
            const hasInput = dayFeedings.length > 0;
            return (
              <button
                key={day.key}
                type="button"
                className={[
                  "transition-smooth relative min-h-16 rounded-3xl border p-1.5 text-left shadow-sm",
                  day.isCurrentMonth
                    ? "border-strumf-border bg-white/55 text-strumf-foreground"
                    : "border-transparent bg-white/25 text-strumf-muted/70",
                  day.isToday ? "ring-2 ring-strumf-accent/50" : "",
                  hasInput ? "shadow-card" : "hover:bg-white/70",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => setSelectedDay(day)}
                aria-label={`${formatDayFull(day.date)}${hasInput ? `, ${dayFeedings.length} inputs` : ""}`}
              >
                <span className="font-display text-base font-bold">{day.dayNumber}</span>
                {hasInput ? (
                  <span className="absolute bottom-1.5 right-1.5 flex min-h-6 min-w-6 items-center justify-center rounded-full bg-gradient-primary px-1.5 text-[11px] font-black text-white shadow-card">
                    {dayFeedings.length}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        <p className="mt-4 rounded-2xl bg-white/45 px-4 py-3 text-center text-xs text-strumf-muted">
          Badges show days with feeding inputs. Open any day for the daily dashboard.
        </p>
      </Card>

      {selectedDay ? (
        <DayDashboardModal
          day={selectedDay}
          feedings={selectedFeedings}
          summary={selectedSummary}
          onClose={() => setSelectedDay(null)}
        />
      ) : null}
    </div>
  );
}

function DayDashboardModal({
  day,
  feedings,
  summary,
  onClose,
}: {
  day: CalendarDay;
  feedings: Feeding[];
  summary: ReturnType<typeof summarizeFeedings>;
  onClose: () => void;
}) {
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
            <p className="text-sm text-strumf-muted">Daily dashboard</p>
            <h2 id="day-dashboard-title" className="font-display text-3xl font-bold tracking-tight">
              {formatDayTitle(day.date)}
            </h2>
          </div>
          <Button type="button" variant="ghost" className="shrink-0 px-4" onClick={onClose}>
            Close
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <DailyStatCard
            tone="primary"
            label="Total milk"
            value={`${summary.totalMl} ml`}
            sub={`${summary.feedCount} feed${summary.feedCount === 1 ? "" : "s"}`}
          />
          <DailyStatCard
            tone="mint"
            label="Average"
            value={`${summary.avgMl} ml`}
            sub="per feed"
          />
          <DailyStatCard
            tone="blue"
            label="First feed"
            value={summary.firstFeed ? formatClock(summary.firstFeed.startedAt) : "-"}
            sub={summary.firstFeed ? formatTimeAgo(summary.firstFeed.startedAt) : "no input"}
          />
          <DailyStatCard
            tone="warm"
            label="Last feed"
            value={summary.lastFeed ? formatClock(summary.lastFeed.startedAt) : "-"}
            sub={summary.lastFeed ? formatTimeAgo(summary.lastFeed.startedAt) : "no input"}
          />
        </div>

        <div className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Inputs</h3>
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
                      {formatClock(feeding.startedAt)}
                      {feeding.notes ? ` · ${feeding.notes}` : ""}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-strumf-accent-muted/70 px-3 py-1 text-xs font-bold text-strumf-foreground">
                    {milkTypeLabel(feeding.milkType)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-2xl bg-white/60 px-4 py-6 text-center text-sm text-strumf-muted">
              No feeding inputs logged for this day yet.
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

function toDateKey(value: Date) {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatMonth(value: Date) {
  return new Intl.DateTimeFormat(undefined, {
    month: "long",
    year: "numeric",
  }).format(value);
}

function formatDayFull(value: Date) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "full",
  }).format(value);
}

function formatDayTitle(value: Date) {
  return new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(value);
}
