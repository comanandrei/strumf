"use client";

import Link from "next/link";
import { useMemo } from "react";

import { Card } from "~/app/_components/ui/card";
import { Chip } from "~/app/_components/ui/chip";
import { CreateHouseholdForm } from "~/app/_components/create-household-form";
import { formatTimeAgo, milkTypeLabel } from "~/app/lib/time-ago";
import { api } from "~/trpc/react";

import { useBabySelection } from "./baby-selection-context";

export function AppDashboard() {
  const { babies, selectedBabyId, setSelectedBabyId, isLoading } = useBabySelection();

  const { data: lastFeeds, isLoading: loadingFeeds } = api.feeding.listByBaby.useQuery(
    { babyId: selectedBabyId ?? "", limit: 1 },
    { enabled: !!selectedBabyId },
  );

  const last = lastFeeds?.[0];

  const summary = useMemo(() => {
    if (!last) return null;
    return {
      line: `${last.amountMl} ml · ${milkTypeLabel(last.milkType)}`,
      when: formatTimeAgo(last.startedAt),
    };
  }, [last]);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 w-48 rounded-lg bg-white/10" />
        <div className="h-32 w-full rounded-strumf-card bg-white/10" />
      </div>
    );
  }

  if (babies.length === 0) {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-bold tracking-tight">Welcome</h1>
          <p className="mt-1 text-white/70">
            Add a household, then add a baby (API or future UI) to start logging feeds.
          </p>
        </header>
        <Card>
          <CreateHouseholdForm />
        </Card>
        <p className="text-center text-sm text-white/55">
          <Link href="/" className="underline hover:text-white">
            Marketing home
          </Link>
        </p>
      </div>
    );
  }

  const activeBaby = babies.find((b) => b.id === selectedBabyId);

  return (
    <div className="flex flex-col gap-6 pb-8">
      <header className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Home</h1>
          <p className="text-sm text-white/65">Quick glance · one-thumb friendly</p>
        </div>
        <Link href="/" className="shrink-0 text-sm text-strumf-accent underline-offset-2 hover:underline">
          Exit
        </Link>
      </header>

      {babies.length > 1 ? (
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-white/50">
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
            <p className="mt-2 text-xs text-white/45">{activeBaby.householdLabel}</p>
          ) : null}
        </div>
      ) : null}

      <Card className="border-strumf-border/80 py-6">
        <p className="text-xs font-medium uppercase tracking-wide text-white/50">
          Last feed
        </p>
        {loadingFeeds ? (
          <div className="mt-3 h-14 w-full animate-pulse rounded-lg bg-white/10" />
        ) : summary ? (
          <>
            <p className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-white">
              {summary.when}
            </p>
            <p className="mt-2 text-lg text-white/80">{summary.line}</p>
          </>
        ) : (
          <p className="mt-3 text-lg text-white/70">No feeds logged yet.</p>
        )}
      </Card>

      <div className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] left-0 right-0 z-30 px-4">
        <div className="mx-auto w-full max-w-lg">
          <Link
            href="/app/log"
            className="flex min-h-12 w-full items-center justify-center rounded-strumf-pill bg-strumf-accent px-5 py-3 text-base font-semibold text-strumf-bg-bottom no-underline shadow-md transition hover:brightness-110 active:scale-[0.99]"
          >
            Log feed
          </Link>
        </div>
      </div>
    </div>
  );
}
