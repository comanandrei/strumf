"use client";

import Link from "next/link";
import { useMemo } from "react";

import { Card } from "~/app/_components/ui/card";
import { Chip } from "~/app/_components/ui/chip";
import {
  developmentMilestoneSources,
  formatAgeInRomanian,
  formatMilestoneCategory,
  formatMilestoneStatus,
  formatRelativeMilestoneTime,
  formatRomanianDate,
  getBabyAgeDays,
  getDashboardMilestones,
  getMilestonesForBaby,
  type BabyMilestone,
} from "~/app/lib/development-milestones";

import { useBabySelection } from "../_components/baby-selection-context";

export default function MilestonesPage() {
  const { babies, selectedBabyId, setSelectedBabyId, isLoading } = useBabySelection();
  const now = useMemo(() => new Date(), []);
  const activeBaby = babies.find((baby) => baby.id === selectedBabyId);
  const ageDays = activeBaby ? getBabyAgeDays(activeBaby.birthDateTime, now) : 0;
  const milestones = useMemo(
    () => (activeBaby ? getMilestonesForBaby(activeBaby.birthDateTime, now) : []),
    [activeBaby, now],
  );
  const focusMilestones = useMemo(
    () => (activeBaby ? getDashboardMilestones(activeBaby.birthDateTime, now, 2) : []),
    [activeBaby, now],
  );

  const currentMilestones = milestones.filter((milestone) => milestone.status === "current");
  const upcomingMilestones = milestones.filter((milestone) => milestone.status === "upcoming");
  const completedMilestones = milestones.filter((milestone) => milestone.status === "completed");
  const nextMilestone = focusMilestones[0];

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 w-48 rounded-2xl bg-white/60" />
        <div className="h-56 w-full rounded-strumf-card bg-white/60" />
        <div className="h-40 w-full rounded-strumf-card bg-white/60" />
      </div>
    );
  }

  if (!activeBaby) {
    return (
      <div className="flex flex-col gap-5 pb-8">
        <header>
          <p className="text-sm text-strumf-muted">Milestones</p>
          <h1 className="font-display text-4xl font-bold tracking-tight">Repere 0-3 ani</h1>
        </header>
        <Card>
          <p className="text-sm text-strumf-muted">
            Adauga un profil de bebelus ca sa vezi datele estimate pentru fiecare reper.
          </p>
          <Link href="/app/onboarding" className="mt-4 inline-block text-sm font-bold text-strumf-accent">
            Mergi la onboarding →
          </Link>
        </Card>
      </div>
    );
  }

  const groupedMilestones = [
    {
      title: "Acum",
      description: "Ferestre care se potrivesc cu varsta curenta.",
      items: currentMilestones,
    },
    {
      title: "Urmeaza",
      description: "Repere estimate in urmatoarele luni.",
      items: upcomingMilestones,
    },
    {
      title: "Trecute",
      description: "Repere pe care copilul le-a depasit ca varsta orientativa.",
      items: completedMilestones.slice().reverse(),
    },
  ];

  return (
    <div className="flex flex-col gap-5 pb-8">
      <header className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-gradient-warm p-5 shadow-soft">
        <div className="absolute -right-10 -top-12 h-32 w-32 rounded-full bg-white/45" />
        <div className="absolute bottom-5 right-6 h-16 w-16 rounded-[1.5rem] bg-strumf-blue/70 blur-sm" />
        <div className="relative">
          <span className="inline-flex rounded-full bg-white/60 px-3 py-1 text-xs font-black uppercase tracking-wide text-strumf-muted shadow-card">
            Milestones
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold leading-none tracking-tight">
            Repere 0-3 ani
          </h1>
          <p className="mt-2 max-w-sm text-sm text-strumf-muted">
            Timeline orientativ pentru {activeBaby.displayName}: pulseuri de crestere,
            dezvoltare motorie, limbaj si autonomie.
          </p>
          <div className="mt-5 grid grid-cols-3 gap-2">
            <MilestoneMetric value={formatAgeInRomanian(ageDays)} label="varsta" />
            <MilestoneMetric value={`${currentMilestones.length}`} label="acum" />
            <MilestoneMetric value={`${upcomingMilestones.length}`} label="urmeaza" />
          </div>
        </div>
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

      <Card className="overflow-hidden bg-white/75">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-strumf-muted">
              Focus
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold">
              {nextMilestone ? nextMilestone.titlu : "Timeline complet"}
            </h2>
          </div>
          {nextMilestone ? <StatusBadge status={nextMilestone.status} /> : null}
        </div>

        {nextMilestone ? (
          <div className="mt-4 rounded-3xl bg-gradient-primary p-4 text-white shadow-card">
            <p className="text-xs font-bold uppercase tracking-wide opacity-80">
              {formatMilestoneCategory(nextMilestone.categorie)} · {nextMilestone.etichetaVarsta}
            </p>
            <p className="mt-2 text-sm opacity-90">{nextMilestone.rezumat}</p>
            <p className="mt-3 text-xs font-bold opacity-90">
              {formatRelativeMilestoneTime(nextMilestone)}
            </p>
          </div>
        ) : (
          <p className="mt-3 text-sm text-strumf-muted">
            Toate milestone-urile din intervalul 0-3 ani sunt disponibile mai jos.
          </p>
        )}

        {focusMilestones.length > 1 ? (
          <ul className="mt-3 space-y-2">
            {focusMilestones.slice(1).map((milestone) => (
              <li key={milestone.id} className="rounded-2xl bg-white/55 px-4 py-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-base font-semibold">{milestone.titlu}</p>
                    <p className="text-xs text-strumf-muted">
                      {milestone.etichetaVarsta} · {formatRelativeMilestoneTime(milestone)}
                    </p>
                  </div>
                  <StatusBadge status={milestone.status} />
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </Card>

      <Card className="bg-strumf-accent-muted/45">
        <p className="text-xs font-bold uppercase tracking-wide text-strumf-muted">
          Nota medicala
        </p>
        <p className="mt-2 text-sm text-strumf-foreground/80">
          Fiecare copil are propriul ritm. Datele sunt repere pentru observatie si discutii cu
          pediatrul, nu diagnostic. Daca un copil pierde abilitati, nu raspunde la sunete, nu
          creste conform recomandarilor sau ai orice ingrijorare, discuta cu medicul.
        </p>
      </Card>

      {groupedMilestones.map((group) => (
        <section key={group.title} className="space-y-3">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-bold">{group.title}</h2>
              <p className="text-xs text-strumf-muted">{group.description}</p>
            </div>
            <span className="rounded-full bg-white/60 px-3 py-1 text-xs font-bold text-strumf-muted shadow-card">
              {group.items.length}
            </span>
          </div>

          {group.items.length ? (
            <ul className="space-y-3">
              {group.items.map((milestone) => (
                <li key={milestone.id}>
                  <MilestoneCard milestone={milestone} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-3xl bg-white/55 px-4 py-6 text-center text-sm text-strumf-muted">
              Nu exista repere in aceasta categorie pentru varsta curenta.
            </p>
          )}
        </section>
      ))}

      <Card>
        <h2 className="font-display text-lg font-semibold">Surse pentru date</h2>
        <ul className="mt-3 space-y-2">
          {developmentMilestoneSources.map((source) => (
            <li key={source.url} className="rounded-2xl bg-white/55 px-4 py-3">
              <a
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="font-display text-base font-semibold text-strumf-foreground no-underline"
              >
                {source.nume}
              </a>
              <p className="mt-1 text-xs text-strumf-muted">{source.nota}</p>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function MilestoneMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-white/60 px-3 py-2 shadow-card backdrop-blur">
      <p className="font-display text-lg font-bold leading-none">{value}</p>
      <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-strumf-muted">
        {label}
      </p>
    </div>
  );
}

function MilestoneCard({ milestone }: { milestone: BabyMilestone }) {
  return (
    <Card className="bg-white/72">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-strumf-muted">
            {formatMilestoneCategory(milestone.categorie)} · {milestone.etichetaVarsta}
          </p>
          <h3 className="mt-1 font-display text-xl font-bold leading-tight">{milestone.titlu}</h3>
        </div>
        <StatusBadge status={milestone.status} />
      </div>
      <p className="mt-3 text-sm text-strumf-foreground/80">{milestone.rezumat}</p>
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <DatePill label="start" value={formatRomanianDate(milestone.startDate)} />
        <DatePill label="tinta" value={formatRomanianDate(milestone.targetDate)} />
      </div>
      <MilestoneDetails title="Ce poti observa" items={milestone.cePotiObserva} />
      <MilestoneDetails title="Cum poti sprijini" items={milestone.sprijin} />
    </Card>
  );
}

function StatusBadge({ status }: { status: BabyMilestone["status"] }) {
  const className = {
    current: "bg-gradient-primary text-white",
    upcoming: "bg-gradient-blue text-strumf-foreground",
    completed: "bg-white/70 text-strumf-muted",
  }[status];

  return (
    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold shadow-card ${className}`}>
      {formatMilestoneStatus(status)}
    </span>
  );
}

function DatePill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/55 px-3 py-2">
      <p className="font-bold uppercase tracking-wide text-strumf-muted">{label}</p>
      <p className="font-display text-base font-semibold text-strumf-foreground">{value}</p>
    </div>
  );
}

function MilestoneDetails({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-4">
      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-strumf-muted">{title}</p>
      <ul className="space-y-1.5">
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
