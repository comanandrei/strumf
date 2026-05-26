"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { api, type RouterOutputs } from "~/trpc/react";

import { useBabySelection } from "./baby-selection-context";

type Feeding = RouterOutputs["feeding"]["listByBaby"][number];
type DailyFeedingTotal = {
  dateKey: string;
  label: string;
  totalMl: number;
  feedCount: number;
  isToday: boolean;
};

export function AppDashboard() {
  const router = useRouter();
  const { babies, selectedBabyId, setSelectedBabyId, isLoading } = useBabySelection();
  const since24h = useMemo(() => new Date(Date.now() - 24 * 60 * 60 * 1000), []);
  const since7d = useMemo(() => startOfLast7Days(), []);

  const { data: feedingsInRange, isLoading: loadingFeeds } = api.feeding.listByBaby.useQuery(
    { babyId: selectedBabyId ?? "", from: since7d, limit: 200 },
    { enabled: !!selectedBabyId },
  );

  const recentFeeds = useMemo(() => {
    const feeds = feedingsInRange ?? [];
    return feeds.filter((feed) => feed.startedAt >= since24h);
  }, [feedingsInRange, since24h]);
  const last = feedingsInRange?.[0];
  const activeBaby = babies.find((b) => b.id === selectedBabyId);
  const last7Days = useMemo(
    () => buildLast7DaysSeries(feedingsInRange ?? []),
    [feedingsInRange],
  );

  const summary = useMemo(() => {
    const feeds = recentFeeds ?? [];
    const totalMl = feeds.reduce((sum, feed) => sum + feed.amountMl, 0);
    const avgMl = feeds.length ? Math.round(totalMl / feeds.length) : 0;
    return {
      totalMl,
      avgMl,
      feedCount: feeds.length,
    };
  }, [recentFeeds]);

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
          icon="♡"
          label="Care team"
          value={activeBaby?.householdLabel ?? "Home"}
          sub="household"
        />
      </section>

      <Last7DaysChart days={last7Days} isLoading={loadingFeeds} />

      <Card>
        <h2 className="font-display mb-3 text-lg font-semibold">Menu</h2>
        <ul className="space-y-2">
          <MenuItem
            href="/app/calendar"
            icon="◷"
            label="Calendar"
            description={`Review daily rhythm for ${activeBaby?.displayName ?? "your baby"}.`}
          />
        </ul>
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
  icon: string;
  label: string;
  description: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className="transition-smooth flex items-center gap-3 rounded-2xl bg-white/55 px-4 py-3 no-underline hover:bg-white/75"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-blue text-lg shadow-card">
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
