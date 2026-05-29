"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useMemo } from "react";

import { Card } from "~/app/_components/ui/card";
import { Chip } from "~/app/_components/ui/chip";
import {
  ageLabel,
  formatClock,
  formatShortDate,
  formatTimeAgo,
  milkTypeLabel,
} from "~/app/lib/time-ago";
import {
  formatMilestoneCategory,
  formatMilestoneStatus,
  formatRelativeMilestoneTime,
  getDashboardMilestones,
  type BabyMilestone,
} from "~/app/lib/development-milestones";
import { useI18n } from "~/app/lib/i18n-provider";
import { buildWakeWindowGuide, formatSleepDuration, sleepDurationMs } from "~/app/lib/sleep-rhythm";
import { api, type RouterOutputs } from "~/trpc/react";

import { CalendarColorIcon } from "./app-icons";
import { useBabySelection } from "./baby-selection-context";

type Feeding = RouterOutputs["feeding"]["listByBaby"][number];
type Sleep = RouterOutputs["sleep"]["listByBaby"][number];
type DailyFeedingTotal = {
  dateKey: string;
  label: string;
  totalMl: number;
  feedCount: number;
  isToday: boolean;
};

const MINUTE_MS = 60 * 1000;
const HOUR_MS = 60 * MINUTE_MS;

export function AppDashboard() {
  const router = useRouter();
  const { babies, selectedBabyId, setSelectedBabyId, isLoading } = useBabySelection();
  const { locale } = useI18n();
  const now = useMemo(() => new Date(), []);
  const copy = locale === "ro"
    ? {
        settingUp: "Se configureaza...",
        onboarding: "Te ducem la onboarding.",
        dashboard: "Acasa",
        home: "Acasa",
        exit: "Iesire",
        baby: "Bebe",
        milkLast24h: "Lapte in ultimele 24h",
        feeds: (count: number) => `${count} ${count === 1 ? "hranire" : "hraniri"}`,
        avgFeed: "Medie / hranire",
        last24h: "ultimele 24h",
        lastFeed: "Ultima hranire",
        noFeedsYet: "fara hraniri",
        nextAppointment: "Urmatoarea programare",
        none: "Niciuna",
        notScheduled: "neprogramat",
        averageInterval: "Interval mediu intre hraniri",
        need2Feeds: "necesita 2 hraniri",
        nextFeedEstimate: "Estimare urmatoarea hranire",
        menu: "Meniu",
        calendar: "Calendar",
        calendarDescription: (name: string) => `Revizuieste ritmul zilnic pentru ${name}.`,
        yourBaby: "bebelusul tau",
        medicalLog: "Jurnal medical",
        medicalDescription: "Inregistreaza consultatii si programeaza vizite.",
        milestones: "Repere 0-3 ani",
        milestonesDescription: (name: string) => `Pulseuri de crestere si dezvoltare pentru ${name}.`,
        babyFallback: "bebe",
        upcomingAppointments: "Programari viitoare",
        add: "Adauga ->",
        planned: "Planificat",
        noUpcoming: "Nu exista programari viitoare.",
        recentFeedings: "Hraniri recente",
        viewAll: "Vezi toate ->",
        noRecentFeeds: "Nu exista hraniri in ultimele 24h.",
        logFeeding: "Noteaza o hranire",
        sleepLast24h: "Somn in ultimele 24h",
        sleeps: (count: number) => `${count} ${count === 1 ? "somn" : "somnuri"}`,
        nextNapGuide: "Ghid urmatorul somn",
        logOneSleep: "noteaza un somn",
      }
    : {
        settingUp: "Setting up...",
        onboarding: "Taking you to onboarding.",
        dashboard: "Dashboard",
        home: "Home",
        exit: "Exit",
        baby: "Baby",
        milkLast24h: "Milk last 24h",
        feeds: (count: number) => `${count} feed${count === 1 ? "" : "s"}`,
        avgFeed: "Avg / feed",
        last24h: "last 24h",
        lastFeed: "Last feed",
        noFeedsYet: "no feeds yet",
        nextAppointment: "Next appointment",
        none: "None",
        notScheduled: "not scheduled",
        averageInterval: "Average interval",
        need2Feeds: "need 2 feeds",
        nextFeedEstimate: "Next feed estimate",
        menu: "Menu",
        calendar: "Calendar",
        calendarDescription: (name: string) => `Review daily rhythm for ${name}.`,
        yourBaby: "your baby",
        medicalLog: "Medical log",
        medicalDescription: "Record consultations and schedule appointments.",
        milestones: "Milestones 0-3 years",
        milestonesDescription: (name: string) => `Growth and development pulses for ${name}.`,
        babyFallback: "baby",
        upcomingAppointments: "Upcoming appointments",
        add: "Add ->",
        planned: "Planned",
        noUpcoming: "No upcoming appointments scheduled.",
        recentFeedings: "Recent feedings",
        viewAll: "View all ->",
        noRecentFeeds: "No feedings logged in the last 24h.",
        logFeeding: "Log a feeding",
        sleepLast24h: "Sleep last 24h",
        sleeps: (count: number) => `${count} sleep${count === 1 ? "" : "s"}`,
        nextNapGuide: "Next nap guide",
        logOneSleep: "log one sleep",
      };
  const since24h = useMemo(() => new Date(Date.now() - 24 * 60 * 60 * 1000), []);
  const since7d = useMemo(() => startOfLast7Days(), []);

  const { data: feedingsInRange, isLoading: loadingFeeds } = api.feeding.listByBaby.useQuery(
    { babyId: selectedBabyId ?? "", from: since7d, limit: 200 },
    { enabled: !!selectedBabyId },
  );
  const { data: appointments, isLoading: loadingAppointments } =
    api.appointment.listByBaby.useQuery(
      { babyId: selectedBabyId ?? "", from: now, limit: 5 },
      { enabled: !!selectedBabyId },
    );
  const { data: sleepsInRange, isLoading: loadingSleeps } = api.sleep.listByBaby.useQuery(
    { babyId: selectedBabyId ?? "", from: since7d, limit: 200 },
    { enabled: !!selectedBabyId },
  );

  const recentFeeds = useMemo(() => {
    const feeds = feedingsInRange ?? [];
    return feeds.filter((feed) => feed.startedAt >= since24h);
  }, [feedingsInRange, since24h]);
  const recentSleeps = useMemo(() => {
    const sleeps = sleepsInRange ?? [];
    return sleeps.filter((sleep) => sleep.endedAt >= since24h || sleep.startedAt >= since24h);
  }, [sleepsInRange, since24h]);
  const last = feedingsInRange?.[0];
  const lastSleep = sleepsInRange?.[0];
  const activeBaby = babies.find((b) => b.id === selectedBabyId);
  const milestoneHighlights = useMemo(
    () => (activeBaby ? getDashboardMilestones(activeBaby.birthDateTime, new Date(), 2) : []),
    [activeBaby],
  );
  const last7Days = useMemo(
    () => buildLast7DaysSeries(feedingsInRange ?? [], locale),
    [feedingsInRange, locale],
  );
  const upcomingAppointments = useMemo(() => {
    const nowMs = now.getTime();
    return (appointments ?? []).filter((appointment) => appointment.startsAt.getTime() >= nowMs);
  }, [appointments, now]);
  const nextAppointment = upcomingAppointments[0];
  const sleepSummary = useMemo(() => {
    const totalMs = recentSleeps.reduce(
      (sum, sleep) => sum + sleepOverlapMs(sleep, since24h, new Date()),
      0,
    );
    return {
      totalMs,
      sleepCount: recentSleeps.length,
      lastSleepDurationMs: lastSleep ? sleepDurationMs(lastSleep) : null,
    };
  }, [lastSleep, recentSleeps, since24h]);
  const sleepGuide = useMemo(
    () => (activeBaby ? buildWakeWindowGuide(activeBaby.birthDateTime, lastSleep, new Date()) : null),
    [activeBaby, lastSleep],
  );

  const summary = useMemo(() => {
    const feeds = recentFeeds ?? [];
    const totalMl = feeds.reduce((sum, feed) => sum + feed.amountMl, 0);
    const avgMl = feeds.length ? Math.round(totalMl / feeds.length) : 0;
    const feedTimes = feeds.map((feed) => feed.startedAt.getTime());
    const intervalTotalMs = feedTimes
      .slice(0, -1)
      .reduce((sum, startedAtMs, index) => sum + startedAtMs - feedTimes[index + 1]!, 0);
    const averageIntervalMs =
      feedTimes.length > 1 ? Math.round(intervalTotalMs / (feedTimes.length - 1)) : null;
    const nextFeedAt =
      last && averageIntervalMs && averageIntervalMs > 0
        ? new Date(last.startedAt.getTime() + averageIntervalMs)
        : null;

    return {
      totalMl,
      avgMl,
      feedCount: feeds.length,
      averageIntervalMs,
      nextFeedAt,
    };
  }, [last, recentFeeds]);

  useEffect(() => {
    if (!isLoading && babies.length === 0) {
      router.replace("/app/onboarding");
    }
  }, [babies.length, isLoading, router]);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 w-48 rounded-2xl bg-white/60" />
        <div className="h-32 w-full rounded-strumf-card bg-white/60" />
      </div>
    );
  }

  if (babies.length === 0) {
    return (
      <div className="space-y-6">
        <header className="text-center">
          <div className="animate-float mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-primary text-4xl shadow-glow">
            ✦
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight">{copy.settingUp}</h1>
          <p className="mt-2 text-sm text-strumf-muted">{copy.onboarding}</p>
        </header>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-24">
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-strumf-muted">{copy.dashboard}</p>
          <h1 className="font-display text-4xl font-bold tracking-tight">
            {activeBaby?.displayName ?? copy.home}
          </h1>
          {activeBaby?.birthDateTime ? (
            <p className="mt-1 text-sm text-strumf-muted">
              {ageLabel(activeBaby.birthDateTime, locale)}
            </p>
          ) : null}
        </div>
        <Link
          href="/"
          className="shrink-0 rounded-full bg-white/60 px-3 py-1.5 text-sm font-bold text-strumf-muted shadow-card transition-smooth hover:text-strumf-foreground"
        >
          {copy.exit}
        </Link>
      </header>

      {babies.length > 1 ? (
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-strumf-muted">
            {copy.baby}
          </p>
          <div className="flex flex-wrap gap-2">
            {babies.map((b) => (
              <Chip
                key={b.id}
                selected={b.id === selectedBabyId}
                onClick={() => setSelectedBabyId(b.id)}
              >
                {b.displayName}
              </Chip>
            ))}
          </div>
          {activeBaby ? (
            <p className="mt-2 text-xs text-strumf-muted">{activeBaby.householdLabel}</p>
          ) : null}
        </div>
      ) : null}

      <section className="grid grid-cols-2 gap-3">
        <StatCard
          tone="primary"
          icon="🍼"
          label={copy.milkLast24h}
          value={`${summary.totalMl} ml`}
          sub={copy.feeds(summary.feedCount)}
        />
        <StatCard
          tone="mint"
          icon="↗"
          label={copy.avgFeed}
          value={`${summary.avgMl} ml`}
          sub={copy.last24h}
        />
        <StatCard
          tone="blue"
          icon="◷"
          label={copy.lastFeed}
          value={last ? formatClock(last.startedAt, locale) : "—"}
          sub={last ? formatTimeAgo(last.startedAt, locale) : copy.noFeedsYet}
        />
        <StatCard
          tone="warm"
          icon="+"
          label={copy.nextAppointment}
          value={nextAppointment ? formatShortDate(nextAppointment.startsAt, locale) : copy.none}
          sub={
            nextAppointment?.reminderAt
              ? `${locale === "ro" ? "reminder" : "reminder"} ${formatShortDate(nextAppointment.reminderAt, locale)}`
              : nextAppointment
                ? formatClock(nextAppointment.startsAt, locale)
                : copy.notScheduled
          }
        />
        <StatCard
          tone="mint"
          icon="⏱"
          label={copy.averageInterval}
          value={
            summary.averageIntervalMs ? formatDuration(summary.averageIntervalMs, locale) : "—"
          }
          sub={summary.averageIntervalMs ? copy.last24h : copy.need2Feeds}
        />
        <StatCard
          tone="blue"
          icon="⌁"
          label={copy.nextFeedEstimate}
          value={summary.nextFeedAt ? formatClock(summary.nextFeedAt, locale) : "—"}
          sub={
            summary.nextFeedAt ? formatFutureDistance(summary.nextFeedAt, locale) : copy.need2Feeds
          }
        />
        <StatCard
          tone="warm"
          icon="☾"
          label={copy.sleepLast24h}
          value={sleepSummary.totalMs ? formatSleepDuration(sleepSummary.totalMs) : "—"}
          sub={copy.sleeps(sleepSummary.sleepCount)}
        />
        <StatCard
          tone="blue"
          icon="☁"
          label={copy.nextNapGuide}
          value={sleepGuide ? formatClock(sleepGuide.windowStart, locale) : "—"}
          sub={sleepGuide ? formatWakeWindowState(sleepGuide.state, locale, sleepGuide.windowEnd.getTime() < Date.now()) : copy.logOneSleep}
        />
      </section>

      <Last7DaysChart days={last7Days} isLoading={loadingFeeds} />

      <SleepRhythmCard
        isLoading={loadingSleeps}
        lastSleep={lastSleep}
        sleepGuide={sleepGuide}
        totalSleepMs={sleepSummary.totalMs}
      />

      <MilestonesWidget milestones={milestoneHighlights} babyName={activeBaby?.displayName} />

      <Card>
        <h2 className="font-display mb-3 text-lg font-semibold">{copy.menu}</h2>
        <ul className="space-y-2">
          <MenuItem
            href="/app/calendar"
            icon={<CalendarColorIcon className="h-7 w-7" />}
            label={copy.calendar}
            description={copy.calendarDescription(activeBaby?.displayName ?? copy.yourBaby)}
          />
          <MenuItem
            href="/app/log"
            icon="+"
            label={copy.medicalLog}
            description={copy.medicalDescription}
          />
          <MenuItem
            href="/app/milestones"
            icon="🌱"
            label={copy.milestones}
            description={copy.milestonesDescription(activeBaby?.displayName ?? copy.babyFallback)}
          />
        </ul>
      </Card>

      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">{copy.upcomingAppointments}</h2>
          <Link href="/app/log" className="text-xs font-bold text-strumf-accent">
            {copy.add}
          </Link>
        </div>
        {loadingAppointments ? (
          <div className="h-20 w-full animate-pulse rounded-2xl bg-white/60" />
        ) : upcomingAppointments.length ? (
          <ul className="space-y-2">
            {upcomingAppointments.slice(0, 3).map((appointment) => (
              <li
                key={appointment.id}
                className="rounded-2xl bg-white/55 px-4 py-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-base font-semibold">{appointment.title}</p>
                    <p className="text-xs text-strumf-muted">
                      {formatShortDate(appointment.startsAt, locale)} ·{" "}
                      {formatClock(appointment.startsAt, locale)}
                      {appointment.location ? ` · ${appointment.location}` : ""}
                    </p>
                  {appointment.reminderAt ? (
                    <p className="mt-1 text-xs font-bold text-strumf-accent">
                      Reminder {formatShortDate(appointment.reminderAt)} ·{" "}
                      {formatClock(appointment.reminderAt)}
                    </p>
                  ) : null}
                  </div>
                  <span className="shrink-0 rounded-full bg-gradient-blue px-3 py-1 text-xs font-bold text-strumf-foreground">
                    {copy.planned}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-6 text-center text-sm text-strumf-muted">
            {copy.noUpcoming}
          </p>
        )}
      </Card>

      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">{copy.recentFeedings}</h2>
          <Link href="/app/log" className="text-xs font-bold text-strumf-accent">
            {copy.viewAll}
          </Link>
        </div>
        {loadingFeeds ? (
          <div className="h-20 w-full animate-pulse rounded-2xl bg-white/60" />
        ) : recentFeeds?.length ? (
          <ul className="space-y-2">
            {recentFeeds.slice(0, 5).map((feed) => (
              <li
                key={feed.id}
                className="flex items-center justify-between rounded-2xl bg-white/55 px-4 py-3"
              >
                <div>
                  <p className="font-display text-base font-semibold">{feed.amountMl} ml</p>
                  <p className="text-xs text-strumf-muted">
                    {formatClock(feed.startedAt, locale)} · {formatTimeAgo(feed.startedAt, locale)}
                  </p>
                </div>
                <span className="rounded-full bg-strumf-accent-muted/60 px-3 py-1 text-xs font-bold text-strumf-foreground">
                  {milkTypeLabel(feed.milkType, locale)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-6 text-center text-sm text-strumf-muted">
            {copy.noRecentFeeds}
          </p>
        )}
      </Card>

      <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-0 right-0 z-30 px-4">
        <div className="mx-auto w-full max-w-lg">
          <Link
            href="/app/log"
            className="transition-smooth flex min-h-12 w-full items-center justify-center rounded-strumf-pill bg-gradient-primary px-5 py-3 text-base font-bold text-white no-underline shadow-soft hover:shadow-glow active:scale-[0.99]"
          >
            {copy.logFeeding}
          </Link>
        </div>
      </div>
    </div>
  );
}

function MilestonesWidget({
  milestones,
  babyName,
}: {
  milestones: BabyMilestone[];
  babyName?: string;
}) {
  const primaryMilestone = milestones[0];
  const { locale } = useI18n();
  const copy = locale === "ro"
    ? {
        eyebrow: "Repere",
        title: "Repere 0-3 ani",
        view: "Vezi ->",
        empty: (name: string) => `Adauga data nasterii pentru ${name} ca sa vezi urmatorul reper.`,
        baby: "bebe",
      }
    : {
        eyebrow: "Milestones",
        title: "Milestones 0-3 years",
        view: "View ->",
        empty: (name: string) => `Add a birth date for ${name} to see the next milestone.`,
        baby: "baby",
      };

  return (
    <Card className="overflow-hidden bg-white/75">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-strumf-muted">
            {copy.eyebrow}
          </p>
          <h2 className="font-display text-lg font-semibold">{copy.title}</h2>
        </div>
        <Link href="/app/milestones" className="text-xs font-bold text-strumf-accent">
          {copy.view}
        </Link>
      </div>

      {primaryMilestone ? (
        <div className="rounded-3xl bg-gradient-warm p-4 shadow-card">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-strumf-muted">
                {formatMilestoneCategory(primaryMilestone.categorie, locale)} ·{" "}
                {primaryMilestone.etichetaVarsta}
              </p>
              <h3 className="mt-1 font-display text-xl font-bold leading-tight">
                {primaryMilestone.titlu}
              </h3>
            </div>
            <span className="shrink-0 rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-strumf-muted shadow-card">
              {formatMilestoneStatus(primaryMilestone.status, locale)}
            </span>
          </div>
          <p className="mt-2 text-sm text-strumf-foreground/80">{primaryMilestone.rezumat}</p>
          <p className="mt-3 text-xs font-bold text-strumf-muted">
            {formatRelativeMilestoneTime(primaryMilestone, locale)}
          </p>
        </div>
      ) : (
        <p className="rounded-3xl bg-white/45 px-4 py-6 text-center text-sm text-strumf-muted">
          {copy.empty(babyName ?? copy.baby)}
        </p>
      )}

      {milestones.length > 1 ? (
        <ul className="mt-3 space-y-2">
          {milestones.slice(1).map((milestone) => (
            <li key={milestone.id} className="rounded-2xl bg-white/55 px-4 py-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-base font-semibold">{milestone.titlu}</p>
                  <p className="text-xs text-strumf-muted">
                    {milestone.etichetaVarsta} · {formatRelativeMilestoneTime(milestone, locale)}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-gradient-blue px-3 py-1 text-xs font-bold text-strumf-foreground">
                  {formatMilestoneStatus(milestone.status, locale)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </Card>
  );
}

function Last7DaysChart({
  days,
  isLoading,
}: {
  days: DailyFeedingTotal[];
  isLoading: boolean;
}) {
  const totalMl = days.reduce((sum, day) => sum + day.totalMl, 0);
  const totalFeeds = days.reduce((sum, day) => sum + day.feedCount, 0);
  const maxMl = Math.max(...days.map((day) => day.totalMl), 1);
  const { locale } = useI18n();
  const copy = locale === "ro"
    ? {
        title: "Ultimele 7 zile",
        subtitle: "Totaluri zilnice de lapte",
        aria: (ml: number) => `Totalul de lapte pe ultimele 7 zile este ${ml} mililitri`,
        chartTitle: (label: string, ml: number, count: number) =>
          `${label}: ${ml} ml in ${count} ${count === 1 ? "hranire" : "hraniri"}`,
        today: "Azi",
        empty: "Nu exista hraniri in ultimele 7 zile.",
      }
    : {
        title: "Last 7 days",
        subtitle: "Daily milk totals",
        aria: (ml: number) => `Milk total for the last 7 days is ${ml} milliliters`,
        chartTitle: (label: string, ml: number, count: number) =>
          `${label}: ${ml} ml across ${count} feed${count === 1 ? "" : "s"}`,
        today: "Today",
        empty: "No feedings logged in the last 7 days.",
      };

  return (
    <Card>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-semibold">{copy.title}</h2>
          <p className="text-xs text-strumf-muted">{copy.subtitle}</p>
        </div>
        <div className="rounded-full bg-strumf-accent-muted/60 px-3 py-1 text-right text-xs font-bold text-strumf-foreground">
          {totalMl} ml
        </div>
      </div>

      {isLoading ? (
        <div className="h-44 w-full animate-pulse rounded-3xl bg-white/60" />
      ) : totalFeeds ? (
        <div
          className="rounded-3xl bg-white/45 px-3 pb-3 pt-4"
          role="img"
          aria-label={copy.aria(totalMl)}
        >
          <div className="flex h-40 items-end gap-2">
            {days.map((day) => {
              const height = day.totalMl ? Math.max((day.totalMl / maxMl) * 100, 8) : 0;

              return (
                <div key={day.dateKey} className="flex h-full min-w-0 flex-1 flex-col gap-2">
                  <div className="flex min-h-0 flex-1 items-end rounded-full bg-white/65 p-1 shadow-inner">
                    <div
                      className="w-full rounded-full bg-gradient-primary shadow-card transition-smooth"
                      style={{ height: `${height}%` }}
                      title={copy.chartTitle(day.label, day.totalMl, day.feedCount)}
                    />
                  </div>
                  <div className="text-center">
                    <p className="truncate text-[10px] font-bold text-strumf-muted">
                      {day.isToday ? copy.today : day.label}
                    </p>
                    <p className="text-[10px] text-strumf-muted">{day.totalMl} ml</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="rounded-3xl bg-white/45 py-8 text-center text-sm text-strumf-muted">
          {copy.empty}
        </p>
      )}
    </Card>
  );
}

function SleepRhythmCard({
  isLoading,
  lastSleep,
  sleepGuide,
  totalSleepMs,
}: {
  isLoading: boolean;
  lastSleep?: Sleep;
  sleepGuide: ReturnType<typeof buildWakeWindowGuide>;
  totalSleepMs: number;
}) {
  const { locale } = useI18n();
  const copy = locale === "ro"
    ? {
        title: "Ritm de somn",
        subtitle: "Ghid pentru somnuri inspirat de aplicatii dedicate",
        logSleep: "Noteaza somn ->",
        nextNapGuide: "Ghid urmatorul somn",
        windowCloses: "Fereastra se inchide",
        lastSleep: "Ultimul somn",
        ended: "S-a terminat",
        total24h: "Total 24h",
        completedOnly: "doar somnuri finalizate",
        empty: "Noteaza un somn finalizat ca sa activezi ghidul urmatorului somn.",
      }
    : {
        title: "Sleep Rhythm",
        subtitle: "Competitor-inspired nap guidance",
        logSleep: "Log sleep ->",
        nextNapGuide: "Next nap guide",
        windowCloses: "Window closes",
        lastSleep: "Last sleep",
        ended: "Ended",
        total24h: "24h total",
        completedOnly: "completed sleep only",
        empty: "Log one completed sleep to unlock the next nap guide.",
      };

  return (
    <Card>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-semibold">{copy.title}</h2>
          <p className="text-xs text-strumf-muted">{copy.subtitle}</p>
        </div>
        <Link href="/app/log" className="text-xs font-bold text-strumf-accent">
          {copy.logSleep}
        </Link>
      </div>

      {isLoading ? (
        <div className="h-32 w-full animate-pulse rounded-3xl bg-white/60" />
      ) : lastSleep && sleepGuide ? (
        <div className="space-y-3">
          <div className="rounded-3xl bg-gradient-blue p-4 shadow-card">
            <p className="text-xs font-bold uppercase tracking-wide text-strumf-muted">
              {copy.nextNapGuide}
            </p>
            <div className="mt-2 flex items-end justify-between gap-3">
              <div>
                <p className="font-display text-3xl font-bold leading-none">
                  {formatClock(sleepGuide.windowStart, locale)}
                </p>
                <p className="mt-1 text-xs text-strumf-muted">
                  {copy.windowCloses} {formatClock(sleepGuide.windowEnd, locale)}
                </p>
              </div>
              <span className="rounded-full bg-white/65 px-3 py-1 text-xs font-bold shadow-card">
                {formatWakeWindowState(
                  sleepGuide.state,
                  locale,
                  sleepGuide.windowEnd.getTime() < Date.now(),
                )}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-2xl bg-white/55 px-4 py-3">
              <p className="text-xs text-strumf-muted">{copy.lastSleep}</p>
              <p className="font-display text-lg font-semibold">
                {formatSleepDuration(sleepDurationMs(lastSleep))}
              </p>
              <p className="text-[11px] text-strumf-muted">
                {copy.ended} {formatTimeAgo(lastSleep.endedAt, locale)}
              </p>
            </div>
            <div className="rounded-2xl bg-white/55 px-4 py-3">
              <p className="text-xs text-strumf-muted">{copy.total24h}</p>
              <p className="font-display text-lg font-semibold">
                {totalSleepMs ? formatSleepDuration(totalSleepMs) : "-"}
              </p>
              <p className="text-[11px] text-strumf-muted">{copy.completedOnly}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="rounded-3xl bg-white/45 px-4 py-6 text-center text-sm text-strumf-muted">
          {copy.empty}
        </p>
      )}
    </Card>
  );
}

function MenuItem({
  href,
  icon,
  label,
  description,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  description: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className="transition-smooth flex items-center gap-3 rounded-2xl bg-white/55 px-4 py-3 no-underline hover:bg-white/75"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-blue text-lg shadow-card">
          {icon}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-base font-semibold text-strumf-foreground">
            {label}
          </span>
          <span className="block text-xs text-strumf-muted">{description}</span>
        </span>
        <span className="text-strumf-muted">→</span>
      </Link>
    </li>
  );
}

function buildLast7DaysSeries(feedings: Feeding[], locale: "ro" | "en"): DailyFeedingTotal[] {
  const start = startOfLast7Days();
  const todayKey = toDateKey(new Date());
  const days = new Map<string, DailyFeedingTotal>();

  for (let index = 0; index < 7; index++) {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const dateKey = toDateKey(date);

    days.set(dateKey, {
      dateKey,
      label: formatShortDate(date, locale),
      totalMl: 0,
      feedCount: 0,
      isToday: dateKey === todayKey,
    });
  }

  for (const feeding of feedings) {
    const dateKey = toDateKey(feeding.startedAt);
    const day = days.get(dateKey);
    if (!day) continue;

    day.totalMl += feeding.amountMl;
    day.feedCount += 1;
  }

  return Array.from(days.values());
}

function startOfLast7Days() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - 6);
  return date;
}

function toDateKey(value: Date) {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function sleepOverlapMs(sleep: Sleep, from: Date, to: Date) {
  const start = Math.max(sleep.startedAt.getTime(), from.getTime());
  const end = Math.min(sleep.endedAt.getTime(), to.getTime());
  return Math.max(0, end - start);
}

function StatCard({
  tone,
  icon,
  label,
  value,
  sub,
}: {
  tone: "primary" | "mint" | "blue" | "warm";
  icon: string;
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
    <div className={`relative overflow-hidden rounded-3xl p-4 shadow-card ${toneClass}`}>
      <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/55 text-lg backdrop-blur">
        {icon}
      </div>
      <p className="text-xs opacity-80">{label}</p>
      <p className="font-display text-2xl font-bold leading-tight">{value}</p>
      <p className="text-[11px] opacity-75">{sub}</p>
    </div>
  );
}

function formatDuration(ms: number, locale: "ro" | "en"): string {
  const totalMinutes = Math.max(1, Math.round(ms / MINUTE_MS));
  if (totalMinutes < 60) return `${totalMinutes} min`;

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return locale === "ro"
    ? minutes ? `${hours} h ${minutes} min` : `${hours} h`
    : minutes ? `${hours}h ${minutes}m` : `${hours}h`;
}

function formatFutureDistance(date: Date, locale: "ro" | "en", now = new Date()): string {
  const ms = date.getTime() - now.getTime();
  if (ms <= 0) return locale === "ro" ? "acum" : "due now";

  if (ms < HOUR_MS) {
    const minutes = Math.max(1, Math.round(ms / MINUTE_MS));
    return locale === "ro" ? `in ${minutes} min` : `in ${minutes} min`;
  }

  return locale === "ro" ? `in ${formatDuration(ms, locale)}` : `in ${formatDuration(ms, locale)}`;
}

function formatWakeWindowState(state: "ready" | "soon" | "later", locale: "ro" | "en", isOver: boolean) {
  if (locale === "ro") {
    if (state === "ready") return isOver ? "Fereastra de veghe depasita" : "Fereastra de somn deschisa";
    if (state === "soon") return "Pregateste somnul in curand";
    return "Inca in fereastra de veghe";
  }

  if (state === "ready") return isOver ? "Over wake window" : "Nap window open";
  if (state === "soon") return "Prep for sleep soon";
  return "Still in wake window";
}
