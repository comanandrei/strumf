"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "~/app/_components/ui/button";
import { Card } from "~/app/_components/ui/card";
import { Chip } from "~/app/_components/ui/chip";
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

  const { data: lastFeeds } = api.feeding.listByBaby.useQuery(
    { babyId: selectedBabyId ?? "", limit: 1 },
    { enabled: !!selectedBabyId },
  );
  const last = lastFeeds?.[0];

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
        <div className="h-10 w-40 rounded-lg bg-white/10" />
        <div className="h-48 w-full rounded-strumf-card bg-white/10" />
      </div>
    );
  }

  if (babies.length === 0) {
    return (
      <Card>
        <p className="text-white/80">Add a baby to your household first.</p>
        <Link href="/app" className="mt-4 inline-block text-strumf-accent underline">
          Go home
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
        <h1 className="text-2xl font-bold tracking-tight">Log feed</h1>
        <p className="mt-1 text-sm text-white/65">Big targets · defaults first</p>
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
        </div>
      ) : null}

      <Card>
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-white/50">
          Amount (ml)
        </p>
        <div className="flex flex-wrap gap-2">
          {AMOUNT_PRESETS.map((n) => (
            <Chip key={n} selected={amountMl === n} onClick={() => setAmountMl(n)}>
              {n}
            </Chip>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-white/80">
            <span>Custom</span>
            <input
              type="number"
              min={1}
              max={2000}
              value={amountMl}
              onChange={(e) => setAmountMl(Number(e.target.value) || 0)}
              className="w-24 rounded-lg border border-strumf-border bg-white/10 px-3 py-2 text-white"
            />
          </label>
          {last ? (
            <Button type="button" variant="ghost" className="!min-h-10 py-2 text-sm" onClick={applyLastAmount}>
              Same as last ({last.amountMl} ml)
            </Button>
          ) : null}
        </div>
      </Card>

      <Card>
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-white/50">
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

      <Card>
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-white/50">
          Started
        </p>
        <div className="flex flex-wrap gap-2">
          {TIME_OPTIONS.map((opt) => (
            <Chip
              key={opt.min}
              selected={offsetMin === opt.min}
              onClick={() => setOffsetMin(opt.min)}
            >
              {opt.label}
            </Chip>
          ))}
        </div>
      </Card>

      {error ? <p className="text-sm text-strumf-danger">{error}</p> : null}

      {undoId ? (
        <Card className="flex flex-col gap-3 border-strumf-accent/40 bg-strumf-accent/10 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-medium text-strumf-accent">Saved.</p>
          <Button
            type="button"
            variant="ghost"
            className="!min-h-10 border border-white/20"
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
    </div>
  );
}
