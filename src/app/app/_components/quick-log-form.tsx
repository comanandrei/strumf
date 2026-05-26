"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "~/app/_components/ui/button";
import { Card } from "~/app/_components/ui/card";
import { Chip } from "~/app/_components/ui/chip";
import { formatClock, formatShortDate, formatTimeAgo, milkTypeLabel } from "~/app/lib/time-ago";
import { api } from "~/trpc/react";

import { useBabySelection } from "./baby-selection-context";

const AMOUNT_PRESETS = [30, 60, 90, 120, 150] as const;

const MILK_OPTIONS = [
  { value: "FORMULA" as const, label: "Formula" },
  { value: "BREAST_MILK" as const, label: "Breast" },
  { value: "MIXED" as const, label: "Mixed" },
  { value: "UNKNOWN" as const, label: "Any" },
];

const TIME_OPTIONS = [
  { min: 0, label: "Now" },
  { min: 5, label: "−5 m" },
  { min: 15, label: "−15 m" },
] as const;

export function QuickLogForm() {
  const { babies, selectedBabyId, setSelectedBabyId, isLoading } = useBabySelection();
  const [amountMl, setAmountMl] = useState(90);
  const [milkType, setMilkType] = useState<(typeof MILK_OPTIONS)[number]["value"]>("FORMULA");
  const [offsetMin, setOffsetMin] = useState<(typeof TIME_OPTIONS)[number]["min"]>(0);
  const [undoId, setUndoId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data: recentFeeds } = api.feeding.listByBaby.useQuery(
    { babyId: selectedBabyId ?? "", limit: 50 },
    { enabled: !!selectedBabyId },
  );
  const last = recentFeeds?.[0];

  const utils = api.useUtils();

  const create = api.feeding.create.useMutation({
    onSuccess: async (row) => {
      setError(null);
      setUndoId(row.id);
      await utils.feeding.listByBaby.invalidate({ babyId: row.babyId });
    },
    onError: (e) => setError(e.message),
  });

  const remove = api.feeding.deleteOwn.useMutation({
    onSuccess: async () => {
      setUndoId(null);
      if (selectedBabyId) {
        await utils.feeding.listByBaby.invalidate({ babyId: selectedBabyId });
      }
    },
    onError: (e) => setError(e.message),
  });

  useEffect(() => {
    if (!undoId) return;
    const t = window.setTimeout(() => setUndoId(null), 8000);
    return () => window.clearTimeout(t);
  }, [undoId]);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 w-40 rounded-2xl bg-white/60" />
        <div className="h-48 w-full rounded-strumf-card bg-white/60" />
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

  const applyLastAmount = () => {
    if (last) setAmountMl(last.amountMl);
  };

  const submit = () => {
    if (!selectedBabyId) return;
    setError(null);
    const startedAt = new Date(Date.now() - offsetMin * 60_000);
    create.mutate({
      babyId: selectedBabyId,
      startedAt,
      amountMl,
      milkType: milkType === "UNKNOWN" ? undefined : milkType,
    });
  };

  return (
    <div className="flex flex-col gap-5 pb-6">
      <header>
        <h1 className="font-display text-3xl font-bold tracking-tight">Log moments</h1>
        <p className="mt-1 text-sm text-strumf-muted">Big targets · defaults first</p>
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
        </div>
      ) : null}

      {last ? (
        <button
          type="button"
          onClick={applyLastAmount}
          className="transition-smooth flex w-full items-center justify-between rounded-3xl bg-gradient-blue px-5 py-3 text-left shadow-card hover:shadow-soft"
        >
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-strumf-muted">
              Same as last
            </p>
            <p className="font-display text-lg font-bold">
              {last.amountMl} ml · {milkTypeLabel(last.milkType)}
            </p>
          </div>
          <div className="rounded-full bg-white/65 px-3 py-1 text-xs font-bold">
            Tap to fill
          </div>
        </button>
      ) : null}

      <Card className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <label className="space-y-1.5 text-sm font-bold">
            <span>Amount (ml)</span>
            <input
              type="number"
              min={1}
              max={2000}
              value={amountMl}
              onChange={(e) => setAmountMl(Number(e.target.value) || 0)}
              className="font-display w-full rounded-xl border border-strumf-border bg-white/70 px-3 py-3 text-lg font-semibold"
            />
          </label>
          <div className="space-y-1.5">
            <p className="text-sm font-bold">Started</p>
            <div className="flex rounded-xl bg-white/60 p-1">
              {TIME_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt.min}
                  onClick={() => setOffsetMin(opt.min)}
                  className={`transition-smooth flex-1 rounded-lg py-2 text-sm font-bold ${
                    offsetMin === opt.min ? "bg-strumf-card shadow-card" : "text-strumf-muted"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {AMOUNT_PRESETS.map((n) => (
            <Chip key={n} selected={amountMl === n} onClick={() => setAmountMl(n)}>
              {n} ml
            </Chip>
          ))}
        </div>
      </Card>

      <Card>
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-strumf-muted">
          Milk type
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {MILK_OPTIONS.map((opt) => (
            <Chip
              key={opt.value}
              selected={milkType === opt.value}
              onClick={() => setMilkType(opt.value)}
              className="!min-h-12"
            >
              {opt.label}
            </Chip>
          ))}
        </div>
      </Card>

      {error ? <p className="text-sm text-strumf-danger">{error}</p> : null}

      {undoId ? (
        <Card className="flex flex-col gap-3 border-strumf-accent/40 bg-strumf-accent/15 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-medium text-strumf-accent">Saved.</p>
          <Button
            type="button"
            variant="ghost"
            className="!min-h-10 border border-strumf-border"
            disabled={remove.isPending}
            onClick={() => remove.mutate({ feedingEventId: undoId })}
          >
            Undo
          </Button>
        </Card>
      ) : null}

      <Button
        type="button"
        variant="accent"
        fullWidth
        disabled={create.isPending || !selectedBabyId || amountMl < 1}
        onClick={submit}
      >
        {create.isPending ? "Saving…" : "Save feed"}
      </Button>

      {recentFeeds?.length ? (
        <section className="space-y-2">
          <h2 className="font-display text-lg font-semibold">All feedings</h2>
          <ul className="space-y-2">
            {recentFeeds.map((feed) => (
              <li
                key={feed.id}
                className="flex items-center justify-between rounded-2xl bg-strumf-surface px-4 py-3 shadow-card backdrop-blur"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-lg text-white">
                    🍼
                  </div>
                  <div>
                    <p className="font-display text-base font-semibold">
                      {feed.amountMl} ml
                      <span className="ml-2 text-xs font-normal text-strumf-muted">
                        {milkTypeLabel(feed.milkType)}
                      </span>
                    </p>
                    <p className="text-xs text-strumf-muted">
                      {formatShortDate(feed.startedAt)} · {formatClock(feed.startedAt)} ·{" "}
                      {formatTimeAgo(feed.startedAt)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => remove.mutate({ feedingEventId: feed.id })}
                  className="transition-smooth text-strumf-muted hover:text-strumf-danger"
                  aria-label="Delete feeding"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
