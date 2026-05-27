"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useMemo } from "react";

import { Button } from "~/app/_components/ui/button";
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
import { api, type RouterOutputs } from "~/trpc/react";

import { CalendarColorIcon } from "./app-icons";
import { useBabySelection } from "./baby-selection-context";

type Feeding = RouterOutputs["feeding"]["listByBaby"][number];
type DailySummaryToday = RouterOutputs["dailySummary"]["today"];
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
  const since24h = useMemo(() => new Date(Date.now() - 24 * 60 * 60 * 1000), []);
  const since7d = useMemo(() => startOfLast7Days(), []);

  const { data: feedingsInRange, isLoading: loadingFeeds } = api.feeding.listByBaby.useQuery(
    { babyId: selectedBabyId ?? "", from: since7d, limit: 200 },
    { enabled: !!selectedBabyId },
  );
  const { data: appointments, isLoading: loadingAppointments } =
    api.appointment.listByBaby.useQuery(
      { babyId: selectedBabyId ?? "" },
      { enabled: !!selectedBabyId },
    );
  const { data: dailySummary, isLoading: loadingDailySummary } =
    api.dailySummary.today.useQuery(
      { babyId: selectedBabyId ?? "" },
      { enabled: !!selectedBabyId },
    );
  const utils = api.useUtils();
  const generateDailySummary = api.dailySummary.generate.useMutation({
    onSuccess: async () => {
      if (selectedBabyId) {
        await utils.dailySummary.today.invalidate({ babyId: selectedBabyId });
      }
    },
  });

  const recentFeeds = useMemo(() => {
    const feeds = feedingsInRange ?? [];
    return feeds.filter((feed) => feed.startedAt >= since24h);
  }, [feedingsInRange, since24h]);
  const last = feedingsInRange?.[0];
  const activeBaby = babies.find((b) => b.id === selectedBabyId);
  const milestoneHighlights = useMemo(
    () => (activeBaby ? getDashboardMilestones(activeBaby.birthDateTime, new Date(), 2) : []),
    [activeBaby],
  );
  const last7Days = useMemo(
    () => buildLast7DaysSeries(feedingsInRange ?? []),
    [feedingsInRange],
  );
  const upcomingAppointments = useMemo(() => {
    const now = Date.now();
    return (appointments ?? []).filter((appointment) => appointment.startsAt.getTime() >= now);
  }, [appointments]);
  const nextAppointment = upcomingAppointments[0];

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
          <h1 className="font-display text-3xl font-bold tracking-tight">Setting up...</h1>
          <p className="mt-2 text-sm text-strumf-muted">Taking you to onboarding.</p>
        </header>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-8">
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-strumf-muted">Dashboard</p>
          <h1 className="font-display text-4xl font-bold tracking-tight">
            {activeBaby?.displayName ?? "Home"}
          </h1>
          {activeBaby?.birthDateTime ? (
            <p className="mt-1 text-sm text-strumf-muted">
              {ageLabel(activeBaby.birthDateTime)}
            </p>
          ) : null}
        </div>
        <Link
          href="/"
          className="shrink-0 rounded-full bg-white/60 px-3 py-1.5 text-sm font-bold text-strumf-muted shadow-card transition-smooth hover:text-strumf-foreground"
        >
          Exit
        </Link>
      </header>

      {babies.length > 1 ? (
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-strumf-muted">
            Baby
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
          label="Milk last 24h"
          value={`${summary.totalMl} ml`}
          sub={`${summary.feedCount} feed${summary.feedCount === 1 ? "" : "s"}`}
        />
        <StatCard
          tone="mint"
          icon="↗"
          label="Avg / feed"
          value={`${summary.avgMl} ml`}
          sub="last 24h"
        />
        <StatCard
          tone="blue"
          icon="◷"
          label="Last feed"
          value={last ? formatClock(last.startedAt) : "—"}
          sub={last ? formatTimeAgo(last.startedAt) : "no feeds yet"}
        />
        <StatCard
          tone="warm"
          icon="+"
          label="Next appointment"
          value={nextAppointment ? formatShortDate(nextAppointment.startsAt) : "None"}
          sub={nextAppointment ? formatClock(nextAppointment.startsAt) : "not scheduled"}
        />
        <StatCard
          tone="mint"
          icon="⏱"
          label="Interval mediu între hrăniri"
          value={
            summary.averageIntervalMs ? formatDuration(summary.averageIntervalMs) : "—"
          }
          sub={summary.averageIntervalMs ? "last 24h" : "need 2 feeds"}
        />
        <StatCard
          tone="blue"
          icon="⌁"
          label="Estimare „următoarea hrănire”"
          value={summary.nextFeedAt ? formatClock(summary.nextFeedAt) : "—"}
          sub={
            summary.nextFeedAt ? formatFutureDistance(summary.nextFeedAt) : "need 2 feeds"
          }
        />
      </section>

      <Last7DaysChart days={last7Days} isLoading={loadingFeeds} />

      <MilestonesWidget milestones={milestoneHighlights} babyName={activeBaby?.displayName} />

      <DailyBabySummaryCard
        babyName={activeBaby?.displayName}
        data={dailySummary}
        error={generateDailySummary.error?.message}
        isGenerating={generateDailySummary.isPending}
        isLoading={loadingDailySummary}
        onGenerate={() => {
          if (selectedBabyId) generateDailySummary.mutate({ babyId: selectedBabyId });
        }}
      />

      <Card>
        <h2 className="font-display mb-3 text-lg font-semibold">Menu</h2>
        <ul className="space-y-2">
          <MenuItem
            href="/app/calendar"
            icon={<CalendarColorIcon className="h-7 w-7" />}
            label="Calendar"
            description={`Review daily rhythm for ${activeBaby?.displayName ?? "your baby"}.`}
          />
          <MenuItem
            href="/app/log"
            icon="+"
            label="Medical log"
            description="Record consultations and schedule appointments."
          />
          <MenuItem
            href="/app/milestones"
            icon="🌱"
            label="Repere 0-3 ani"
            description={`Pulseuri de crestere si dezvoltare pentru ${activeBaby?.displayName ?? "baby"}.`}
          />
        </ul>
      </Card>

      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Upcoming appointments</h2>
          <Link href="/app/log" className="text-xs font-bold text-strumf-accent">
            Add →
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
                      {formatShortDate(appointment.startsAt)} ·{" "}
                      {formatClock(appointment.startsAt)}
                      {appointment.location ? ` · ${appointment.location}` : ""}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-gradient-blue px-3 py-1 text-xs font-bold text-strumf-foreground">
                    Planned
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-6 text-center text-sm text-strumf-muted">
            No upcoming appointments scheduled.
          </p>
        )}
      </Card>

      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Recent feedings</h2>
          <Link href="/app/log" className="text-xs font-bold text-strumf-accent">
            View all →
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
                    {formatClock(feed.startedAt)} · {formatTimeAgo(feed.startedAt)}
                  </p>
                </div>
                <span className="rounded-full bg-strumf-accent-muted/60 px-3 py-1 text-xs font-bold text-strumf-foreground">
                  {milkTypeLabel(feed.milkType)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-6 text-center text-sm text-strumf-muted">
            No feedings logged in the last 24h.
          </p>
        )}
      </Card>

      <div className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] left-0 right-0 z-30 px-4">
        <div className="mx-auto w-full max-w-lg">
          <Link
            href="/app/log"
            className="transition-smooth flex min-h-12 w-full items-center justify-center rounded-strumf-pill bg-gradient-primary px-5 py-3 text-base font-bold text-white no-underline shadow-soft hover:shadow-glow active:scale-[0.99]"
          >
            Log a feeding
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

  return (
    <Card className="overflow-hidden bg-white/75">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-strumf-muted">
            Milestones
          </p>
          <h2 className="font-display text-lg font-semibold">Repere 0-3 ani</h2>
        </div>
        <Link href="/app/milestones" className="text-xs font-bold text-strumf-accent">
          Vezi →
        </Link>
      </div>

      {primaryMilestone ? (
        <div className="rounded-3xl bg-gradient-warm p-4 shadow-card">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-strumf-muted">
                {formatMilestoneCategory(primaryMilestone.categorie)} ·{" "}
                {primaryMilestone.etichetaVarsta}
              </p>
              <h3 className="mt-1 font-display text-xl font-bold leading-tight">
                {primaryMilestone.titlu}
              </h3>
            </div>
            <span className="shrink-0 rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-strumf-muted shadow-card">
              {formatMilestoneStatus(primaryMilestone.status)}
            </span>
          </div>
          <p className="mt-2 text-sm text-strumf-foreground/80">{primaryMilestone.rezumat}</p>
          <p className="mt-3 text-xs font-bold text-strumf-muted">
            {formatRelativeMilestoneTime(primaryMilestone)}
          </p>
        </div>
      ) : (
        <p className="rounded-3xl bg-white/45 px-4 py-6 text-center text-sm text-strumf-muted">
          Adauga data nasterii pentru {babyName ?? "baby"} ca sa vezi urmatorul reper.
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
                    {milestone.etichetaVarsta} · {formatRelativeMilestoneTime(milestone)}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-gradient-blue px-3 py-1 text-xs font-bold text-strumf-foreground">
                  {formatMilestoneStatus(milestone.status)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </Card>
  );
}

function DailyBabySummaryCard({
  babyName,
  data,
  error,
  isGenerating,
  isLoading,
  onGenerate,
}: {
  babyName?: string;
  data?: DailySummaryToday;
  error?: string;
  isGenerating: boolean;
  isLoading: boolean;
  onGenerate: () => void;
}) {
  const dailySummary = data?.summary?.summary;
  const generatedAt = data?.summary ? new Date(data.summary.generatedAt) : null;

  return (
    <Card className="overflow-hidden bg-white/80">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-strumf-muted">
            Daily GPT
          </p>
          <h2 className="font-display text-lg font-semibold">
            {babyName ? `${babyName}'s daily summary` : "Daily baby summary"}
          </h2>
          <p className="mt-1 text-xs text-strumf-muted">
            One GPT prompt per baby per day, based on feeds, milestones, and care notes.
          </p>
        </div>
        {data?.dateKey ? (
          <span className="shrink-0 rounded-full bg-strumf-accent-muted/60 px-3 py-1 text-xs font-bold text-strumf-foreground">
            {data.dateKey}
          </span>
        ) : null}
      </div>

      {isLoading ? (
        <div className="h-28 w-full animate-pulse rounded-3xl bg-white/60" />
      ) : dailySummary ? (
        <div className="space-y-3">
          <div className="rounded-3xl bg-gradient-blue p-4 shadow-card">
            <p className="font-display text-xl font-bold leading-tight">
              {dailySummary.headline}
            </p>
            <p className="mt-2 text-sm text-strumf-foreground/80">
              {dailySummary.feedingRhythm}
            </p>
            {generatedAt ? (
              <p className="mt-3 text-xs font-bold text-strumf-muted">
                Generated {formatShortDate(generatedAt)} · {formatClock(generatedAt)}
              </p>
            ) : null}
          </div>

          <SummaryBulletList title="Useful changes" items={dailySummary.changesToNotice} />
          <SummaryBulletList title="Watch tomorrow" items={dailySummary.watchTomorrow} />
          <SummaryBulletList title="Medical reminders" items={dailySummary.medicalReminders} />
          <SummaryBulletList title="Doctor questions" items={dailySummary.doctorQuestions} />

          <div className="rounded-2xl bg-strumf-accent-muted/45 px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-wide text-strumf-muted">
              Development tip
            </p>
            <p className="mt-1 text-sm text-strumf-foreground/80">
              {dailySummary.developmentTip}
            </p>
          </div>

          <p className="rounded-2xl bg-white/55 px-4 py-3 text-xs text-strumf-muted">
            {dailySummary.safetyNote}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="rounded-3xl bg-gradient-warm p-4 shadow-card">
            <p className="font-display text-xl font-bold leading-tight">
              Ready for today's parent summary
            </p>
            <p className="mt-2 text-sm text-strumf-foreground/80">
              GPT will look for feeding rhythm, useful changes, milestones, appointment reminders,
              and what to watch tomorrow.
            </p>
          </div>

          {data?.isGptConfigured === false ? (
            <p className="rounded-2xl bg-white/60 px-4 py-3 text-sm text-strumf-muted">
              OpenAI is not configured yet. Add OPENAI_API_KEY on the server to generate summaries,
              or copy the prompt below into GPT manually.
            </p>
          ) : null}

          {error ? (
            <p className="rounded-2xl bg-strumf-danger/10 px-4 py-3 text-sm text-strumf-danger">
              {error}
            </p>
          ) : null}

          <Button
            type="button"
            variant="accent"
            fullWidth
            disabled={!data?.isGptConfigured || isGenerating}
            onClick={onGenerate}
          >
            {isGenerating ? "Asking GPT..." : "Generate today's GPT summary"}
          </Button>
        </div>
      )}

      {data?.prompt ? (
        <details className="mt-3 rounded-2xl bg-white/55 px-4 py-3">
          <summary className="cursor-pointer text-xs font-bold uppercase tracking-wide text-strumf-muted">
            View daily prompt
          </summary>
          <pre className="mt-3 max-h-64 overflow-auto whitespace-pre-wrap text-xs leading-relaxed text-strumf-muted">
            {data.prompt}
          </pre>
        </details>
      ) : null}
    </Card>
  );
}

function SummaryBulletList({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;

  return (
    <div className="rounded-2xl bg-white/55 px-4 py-3">
      <p className="text-xs font-bold uppercase tracking-wide text-strumf-muted">{title}</p>
      <ul className="mt-2 space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-strumf-foreground/80">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-strumf-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
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

  return (
    <Card>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-semibold">Last 7 days</h2>
          <p className="text-xs text-strumf-muted">Daily milk totals</p>
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
          aria-label={`Milk total for the last 7 days is ${totalMl} milliliters`}
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
                      title={`${day.label}: ${day.totalMl} ml across ${day.feedCount} feed${
                        day.feedCount === 1 ? "" : "s"
                      }`}
                    />
                  </div>
                  <div className="text-center">
                    <p className="truncate text-[10px] font-bold text-strumf-muted">
                      {day.isToday ? "Today" : day.label}
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
          No feedings logged in the last 7 days.
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

function buildLast7DaysSeries(feedings: Feeding[]): DailyFeedingTotal[] {
  const start = startOfLast7Days();
  const todayKey = toDateKey(new Date());
  const days = new Map<string, DailyFeedingTotal>();

  for (let index = 0; index < 7; index++) {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const dateKey = toDateKey(date);

    days.set(dateKey, {
      dateKey,
      label: formatShortDate(date),
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

function formatDuration(ms: number): string {
  const totalMinutes = Math.max(1, Math.round(ms / MINUTE_MS));
  if (totalMinutes < 60) return `${totalMinutes} min`;

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return minutes ? `${hours}h ${minutes}m` : `${hours}h`;
}

function formatFutureDistance(date: Date, now = new Date()): string {
  const ms = date.getTime() - now.getTime();
  if (ms <= 0) return "due now";

  if (ms < HOUR_MS) {
    const minutes = Math.max(1, Math.round(ms / MINUTE_MS));
    return `in ${minutes} min`;
  }

  return `in ${formatDuration(ms)}`;
}
