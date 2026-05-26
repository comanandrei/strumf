"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

import { Card } from "~/app/_components/ui/card";
import { Chip } from "~/app/_components/ui/chip";
import {
  ageLabel,
  formatClock,
  formatTimeAgo,
  milkTypeLabel,
} from "~/app/lib/time-ago";
import { api } from "~/trpc/react";

import { useBabySelection } from "./baby-selection-context";

export function AppDashboard() {
  const router = useRouter();
  const { babies, selectedBabyId, setSelectedBabyId, isLoading } = useBabySelection();
  const since24h = useMemo(() => new Date(Date.now() - 24 * 60 * 60 * 1000), []);

  const { data: recentFeeds, isLoading: loadingFeeds } = api.feeding.listByBaby.useQuery(
    { babyId: selectedBabyId ?? "", from: since24h, limit: 50 },
    { enabled: !!selectedBabyId },
  );

  const last = recentFeeds?.[0];
  const activeBaby = babies.find((b) => b.id === selectedBabyId);

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
    <div className="flex flex-col gap-6 pb-24">
      <header>
        <p className="text-sm text-strumf-muted">Dashboard</p>
        <h1 className="font-display text-4xl font-bold tracking-tight">
          {activeBaby?.displayName ?? "Home"}
        </h1>
        {activeBaby?.birthDateTime ? (
          <p className="mt-1 text-sm text-strumf-muted">
            {ageLabel(activeBaby.birthDateTime)}
          </p>
        ) : null}
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

      <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-0 right-0 z-30 px-4">
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
