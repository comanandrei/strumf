"use client";

import Link from "next/link";
import { useMemo } from "react";

import { Card } from "~/app/_components/ui/card";
import { Chip } from "~/app/_components/ui/chip";
import {
  developmentMilestoneSources,
  formatAgeInRomanian,
  formatLocalizedDate,
  formatMilestoneCategory,
  formatMilestoneStatus,
  formatRelativeMilestoneTime,
  getBabyAgeDays,
  getDashboardMilestones,
  getMilestonesForBaby,
  type BabyMilestone,
} from "~/app/lib/development-milestones";
import { useI18n } from "~/app/lib/i18n-provider";

import { useBabySelection } from "../_components/baby-selection-context";

export default function MilestonesPage() {
  const { babies, selectedBabyId, setSelectedBabyId, isLoading } = useBabySelection();
  const { locale } = useI18n();
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
  const copy = locale === "ro"
    ? {
        eyebrow: "Repere",
        title: "Repere 0-3 ani",
        noBaby: "Adauga un profil de bebelus ca sa vezi datele estimate pentru fiecare reper.",
        onboarding: "Mergi la onboarding ->",
        intro: (name: string) => `Timeline orientativ pentru ${name}: pulseuri de crestere, dezvoltare motorie, limbaj si autonomie.`,
        age: "varsta",
        now: "acum",
        upcoming: "urmeaza",
        baby: "Bebe",
        focus: "Focus",
        fullTimeline: "Timeline complet",
        allAvailable: "Toate milestone-urile din intervalul 0-3 ani sunt disponibile mai jos.",
        medicalNote: "Nota medicala",
        medicalNoteText: "Fiecare copil are propriul ritm. Datele sunt repere pentru observatie si discutii cu pediatrul, nu diagnostic. Daca un copil pierde abilitati, nu raspunde la sunete, nu creste conform recomandarilor sau ai orice ingrijorare, discuta cu medicul.",
        groups: [
          { title: "Acum", description: "Ferestre care se potrivesc cu varsta curenta." },
          { title: "Urmeaza", description: "Repere estimate in urmatoarele luni." },
          { title: "Trecute", description: "Repere pe care copilul le-a depasit ca varsta orientativa." },
        ],
        emptyGroup: "Nu exista repere in aceasta categorie pentru varsta curenta.",
        sources: "Surse pentru date",
      }
    : {
        eyebrow: "Milestones",
        title: "Milestones 0-3 years",
        noBaby: "Add a baby profile to see estimated dates for each milestone.",
        onboarding: "Go to onboarding ->",
        intro: (name: string) => `Guidance timeline for ${name}: growth spurts, motor development, language, and autonomy.`,
        age: "age",
        now: "now",
        upcoming: "upcoming",
        baby: "Baby",
        focus: "Focus",
        fullTimeline: "Full timeline",
        allAvailable: "All milestones from 0-3 years are available below.",
        medicalNote: "Medical note",
        medicalNoteText: "Every child has their own rhythm. These dates are observation and pediatrician discussion guides, not a diagnosis. If a child loses skills, does not respond to sounds, does not grow as expected, or you have any concern, talk to a doctor.",
        groups: [
          { title: "Now", description: "Windows that match the current age." },
          { title: "Upcoming", description: "Estimated milestones in the coming months." },
          { title: "Past", description: "Milestones the child has passed by indicative age." },
        ],
        emptyGroup: "No milestones in this category for the current age.",
        sources: "Data sources",
      };

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
          <p className="text-sm text-strumf-muted">{copy.eyebrow}</p>
          <h1 className="font-display text-4xl font-bold tracking-tight">{copy.title}</h1>
        </header>
        <Card>
          <p className="text-sm text-strumf-muted">
            {copy.noBaby}
          </p>
          <Link href="/app/onboarding" className="mt-4 inline-block text-sm font-bold text-strumf-accent">
            {copy.onboarding}
          </Link>
        </Card>
      </div>
    );
  }

  const groupedMilestones = [
    {
      title: copy.groups[0]!.title,
      description: copy.groups[0]!.description,
      items: currentMilestones,
    },
    {
      title: copy.groups[1]!.title,
      description: copy.groups[1]!.description,
      items: upcomingMilestones,
    },
    {
      title: copy.groups[2]!.title,
      description: copy.groups[2]!.description,
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
            {copy.eyebrow}
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold leading-none tracking-tight">
            {copy.title}
          </h1>
          <p className="mt-2 max-w-sm text-sm text-strumf-muted">
            {copy.intro(activeBaby.displayName)}
          </p>
          <div className="mt-5 grid grid-cols-3 gap-2">
            <MilestoneMetric
              value={locale === "ro" ? formatAgeInRomanian(ageDays) : formatAgeInEnglish(ageDays)}
              label={copy.age}
            />
            <MilestoneMetric value={`${currentMilestones.length}`} label={copy.now} />
            <MilestoneMetric value={`${upcomingMilestones.length}`} label={copy.upcoming} />
          </div>
        </div>
      </header>

      {babies.length > 1 ? (
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-strumf-muted">
            {copy.baby}
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
              {copy.focus}
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold">
              {nextMilestone ? nextMilestone.titlu : copy.fullTimeline}
            </h2>
          </div>
          {nextMilestone ? <StatusBadge status={nextMilestone.status} /> : null}
        </div>

        {nextMilestone ? (
          <div className="mt-4 rounded-3xl bg-gradient-primary p-4 text-white shadow-card">
            <p className="text-xs font-bold uppercase tracking-wide opacity-80">
              {formatMilestoneCategory(nextMilestone.categorie, locale)} · {nextMilestone.etichetaVarsta}
            </p>
            <p className="mt-2 text-sm opacity-90">{nextMilestone.rezumat}</p>
            <p className="mt-3 text-xs font-bold opacity-90">
              {formatRelativeMilestoneTime(nextMilestone, locale)}
            </p>
          </div>
        ) : (
          <p className="mt-3 text-sm text-strumf-muted">
            {copy.allAvailable}
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
                      {milestone.etichetaVarsta} · {formatRelativeMilestoneTime(milestone, locale)}
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
          {copy.medicalNote}
        </p>
        <p className="mt-2 text-sm text-strumf-foreground/80">
          {copy.medicalNoteText}
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
              {copy.emptyGroup}
            </p>
          )}
        </section>
      ))}

      <Card>
        <h2 className="font-display text-lg font-semibold">{copy.sources}</h2>
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

function formatAgeInEnglish(ageDays: number) {
  if (ageDays < 14) return `${ageDays} day${ageDays === 1 ? "" : "s"}`;
  const weeks = Math.floor(ageDays / 7);
  if (weeks < 12) return `${weeks} week${weeks === 1 ? "" : "s"}`;
  const months = Math.floor(ageDays / 30.4375);
  if (months < 24) return `${months} month${months === 1 ? "" : "s"}`;
  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? "" : "s"}`;
}

function MilestoneCard({ milestone }: { milestone: BabyMilestone }) {
  const { locale } = useI18n();
  const copy = locale === "ro"
    ? { start: "start", target: "tinta", observe: "Ce poti observa", support: "Cum poti sprijini" }
    : { start: "start", target: "target", observe: "What you may notice", support: "How to support" };

  return (
    <Card className="bg-white/72">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-strumf-muted">
            {formatMilestoneCategory(milestone.categorie, locale)} · {milestone.etichetaVarsta}
          </p>
          <h3 className="mt-1 font-display text-xl font-bold leading-tight">{milestone.titlu}</h3>
        </div>
        <StatusBadge status={milestone.status} />
      </div>
      <p className="mt-3 text-sm text-strumf-foreground/80">{milestone.rezumat}</p>
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <DatePill label={copy.start} value={formatLocalizedDate(milestone.startDate, locale)} />
        <DatePill label={copy.target} value={formatLocalizedDate(milestone.targetDate, locale)} />
      </div>
      <MilestoneDetails title={copy.observe} items={milestone.cePotiObserva} />
      <MilestoneDetails title={copy.support} items={milestone.sprijin} />
    </Card>
  );
}

function StatusBadge({ status }: { status: BabyMilestone["status"] }) {
  const { locale } = useI18n();
  const className = {
    current: "bg-gradient-primary text-white",
    upcoming: "bg-gradient-blue text-strumf-foreground",
    completed: "bg-white/70 text-strumf-muted",
  }[status];

  return (
    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold shadow-card ${className}`}>
      {formatMilestoneStatus(status, locale)}
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
