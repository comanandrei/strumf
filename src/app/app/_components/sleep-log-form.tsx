"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";

import { Button } from "~/app/_components/ui/button";
import { Card } from "~/app/_components/ui/card";
import { Chip } from "~/app/_components/ui/chip";
import { buildWakeWindowGuide, formatSleepDuration, sleepDurationMs } from "~/app/lib/sleep-rhythm";
import { formatClock, formatShortDate, formatTimeAgo } from "~/app/lib/time-ago";
import { api, type RouterOutputs } from "~/trpc/react";

import { useBabySelection } from "./baby-selection-context";

type Sleep = RouterOutputs["sleep"]["listByBaby"][number];

const DURATION_PRESETS = [
  { minutes: 30, label: "30m" },
  { minutes: 60, label: "1h" },
  { minutes: 90, label: "1h 30m" },
  { minutes: 120, label: "2h" },
] as const;

const inputClass =
  "w-full rounded-xl border border-strumf-border bg-white/70 px-3 py-3 text-sm font-medium outline-none transition-smooth focus:border-strumf-accent";

export function SleepLogForm() {
  const { babies, selectedBabyId, setSelectedBabyId, isLoading } = useBabySelection();
  const activeBaby = babies.find((baby) => baby.id === selectedBabyId);
  const [form, setForm] = useState(() => defaultSleepForm());
  const [undoId, setUndoId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const utils = api.useUtils();
  const { data: recentSleeps, isLoading: loadingSleeps } = api.sleep.listByBaby.useQuery(
    { babyId: selectedBabyId ?? "", limit: 50 },
    { enabled: !!selectedBabyId },
  );
  const lastSleep = recentSleeps?.[0];
  const sleepGuide = useMemo(
    () =>
      activeBaby ? buildWakeWindowGuide(activeBaby.birthDateTime, lastSleep, new Date()) : null,
    [activeBaby, lastSleep],
  );

  const create = api.sleep.create.useMutation({
    onSuccess: async (row) => {
      setError(null);
      setMessage("Sleep saved.");
      setUndoId(row.id);
      setForm(defaultSleepForm());
      await utils.sleep.listByBaby.invalidate({ babyId: row.babyId });
    },
    onError: (e) => {
      setMessage(null);
      setError(e.message);
    },
  });

  const remove = api.sleep.deleteOwn.useMutation({
    onSuccess: async () => {
      setUndoId(null);
      setMessage("Sleep removed.");
      if (selectedBabyId) {
        await utils.sleep.listByBaby.invalidate({ babyId: selectedBabyId });
      }
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

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedBabyId) return;

    setError(null);
    setMessage(null);
    create.mutate({
      babyId: selectedBabyId,
      startedAt: new Date(form.startedAt),
      endedAt: new Date(form.endedAt),
      notes: optionalText(form.notes),
    });
  };

  const applyDuration = (minutes: number) => {
    const endedAt = new Date();
    const startedAt = new Date(endedAt.getTime() - minutes * 60_000);
    setForm({
      ...form,
      startedAt: toDateTimeLocalValue(startedAt),
      endedAt: toDateTimeLocalValue(endedAt),
    });
  };

  const startedAt = new Date(form.startedAt);
  const endedAt = new Date(form.endedAt);
  const durationMs = endedAt.getTime() - startedAt.getTime();
  const canSubmit = !!selectedBabyId && durationMs > 0 && !Number.isNaN(durationMs);

  return (
    <div className="flex flex-col gap-5 pb-6">
      <header>
        <p className="text-sm text-strumf-muted">Sleep Rhythm</p>
        <h1 className="font-display text-3xl font-bold tracking-tight">Log sleep</h1>
        <p className="mt-1 text-sm text-strumf-muted">
          Record completed rest, then Strumf estimates the next nap window.
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

      {sleepGuide ? (
        <Card className="bg-gradient-blue">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-strumf-muted">
                Next nap guide
              </p>
              <h2 className="font-display text-2xl font-bold">
                {formatClock(sleepGuide.windowStart)} - {formatClock(sleepGuide.windowEnd)}
              </h2>
              <p className="mt-1 text-sm text-strumf-muted">
                Based on {sleepGuide.label}; adjust to {activeBaby?.displayName ?? "baby"}'s cues.
              </p>
            </div>
            <span className="rounded-full bg-white/65 px-3 py-1 text-xs font-bold shadow-card">
              {sleepGuide.stateLabel}
            </span>
          </div>
        </Card>
      ) : null}

      <Card>
        <form className="space-y-4" onSubmit={submit}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="space-y-1.5 text-sm font-bold">
              <span>Started</span>
              <input
                required
                type="datetime-local"
                value={form.startedAt}
                onChange={(e) => setForm({ ...form, startedAt: e.target.value })}
                className={inputClass}
              />
            </label>
            <label className="space-y-1.5 text-sm font-bold">
              <span>Ended</span>
              <input
                required
                type="datetime-local"
                value={form.endedAt}
                onChange={(e) => setForm({ ...form, endedAt: e.target.value })}
                className={inputClass}
              />
            </label>
          </div>

          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-strumf-muted">
              Quick duration
            </p>
            <div className="flex flex-wrap gap-2">
              {DURATION_PRESETS.map((preset) => (
                <Chip
                  key={preset.minutes}
                  selected={durationMs === preset.minutes * 60_000}
                  onClick={() => applyDuration(preset.minutes)}
                >
                  {preset.label}
                </Chip>
              ))}
            </div>
          </div>

          <label className="block space-y-1.5 text-sm font-bold">
            <span>Notes</span>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Nap in stroller, woke calm, restless night..."
              rows={3}
              className={inputClass}
            />
          </label>

          <div className="rounded-2xl bg-white/55 px-4 py-3 text-sm text-strumf-muted">
            Duration:{" "}
            <span className="font-display text-lg font-bold text-strumf-foreground">
              {durationMs > 0 ? formatSleepDuration(durationMs) : "-"}
            </span>
          </div>

          <Button type="submit" variant="accent" fullWidth disabled={create.isPending || !canSubmit}>
            {create.isPending ? "Saving..." : "Save sleep"}
          </Button>
        </form>
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
            onClick={() => remove.mutate({ sleepEventId: undoId })}
          >
            Undo
          </Button>
        </Card>
      ) : message ? (
        <Card className="border-strumf-accent/40 bg-strumf-accent/15">
          <p className="font-medium text-strumf-accent">{message}</p>
        </Card>
      ) : null}

      <SleepHistory sleeps={recentSleeps ?? []} isLoading={loadingSleeps} onDelete={remove.mutate} />
    </div>
  );
}

function SleepHistory({
  sleeps,
  isLoading,
  onDelete,
}: {
  sleeps: Sleep[];
  isLoading: boolean;
  onDelete: (input: { sleepEventId: string }) => void;
}) {
  if (isLoading) {
    return <div className="h-28 animate-pulse rounded-strumf-card bg-white/60" />;
  }

  return (
    <section className="space-y-2">
      <h2 className="font-display text-lg font-semibold">Recent sleep</h2>
      {sleeps.length ? (
        <ul className="space-y-2">
          {sleeps.map((sleep) => (
            <li
              key={sleep.id}
              className="flex items-center justify-between gap-3 rounded-2xl bg-strumf-surface px-4 py-3 shadow-card backdrop-blur"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-blue text-lg">
                  ☾
                </div>
                <div className="min-w-0">
                  <p className="font-display text-base font-semibold">
                    {formatSleepDuration(sleepDurationMs(sleep))}
                  </p>
                  <p className="text-xs text-strumf-muted">
                    {formatShortDate(sleep.startedAt)} · {formatClock(sleep.startedAt)}-
                    {formatClock(sleep.endedAt)} · ended {formatTimeAgo(sleep.endedAt)}
                  </p>
                  {sleep.notes ? (
                    <p className="mt-1 truncate text-xs text-strumf-muted">{sleep.notes}</p>
                  ) : null}
                </div>
              </div>
              <button
                type="button"
                onClick={() => onDelete({ sleepEventId: sleep.id })}
                className="transition-smooth shrink-0 text-strumf-muted hover:text-strumf-danger"
                aria-label="Delete sleep"
              >
                x
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <Card>
          <p className="text-center text-sm text-strumf-muted">No sleep logged yet.</p>
        </Card>
      )}
    </section>
  );
}

function defaultSleepForm() {
  const endedAt = new Date();
  const startedAt = new Date(endedAt.getTime() - 60 * 60_000);
  return {
    startedAt: toDateTimeLocalValue(startedAt),
    endedAt: toDateTimeLocalValue(endedAt),
    notes: "",
  };
}

function optionalText(value: string) {
  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
}

function toDateTimeLocalValue(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  const hour = `${date.getHours()}`.padStart(2, "0");
  const minute = `${date.getMinutes()}`.padStart(2, "0");
  return `${year}-${month}-${day}T${hour}:${minute}`;
}
