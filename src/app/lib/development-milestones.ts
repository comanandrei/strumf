import rawMilestoneData from "~/data/development-milestones.json";

import { defaultLocale, localeToIntl, type Locale } from "./i18n";

const DAY_MS = 86_400_000;
const AVG_MONTH_DAYS = 30.4375;

export type MilestoneCategory = "pulseu_de_crestere" | "dezvoltare";
export type MilestoneStatus = "completed" | "current" | "upcoming";

export type DevelopmentMilestone = {
  id: string;
  categorie: MilestoneCategory;
  titlu: string;
  varstaMinZile: number;
  varstaTintaZile: number;
  varstaMaxZile: number;
  etichetaVarsta: string;
  rezumat: string;
  cePotiObserva: string[];
  sprijin: string[];
  candDiscutiCuMedicul: string[];
};

export type DevelopmentMilestoneSource = {
  nume: string;
  url: string;
  nota: string;
};

type DevelopmentMilestoneDataset = {
  metadate: {
    titlu: string;
    limba: string;
    descriere: string;
    actualizatLa: string;
  };
  surse: DevelopmentMilestoneSource[];
  milestoneuri: DevelopmentMilestone[];
};

export type BabyMilestone = DevelopmentMilestone & {
  status: MilestoneStatus;
  startDate: Date;
  targetDate: Date;
  endDate: Date;
  daysUntilStart: number;
  daysUntilTarget: number;
};

export const developmentMilestoneData = rawMilestoneData as DevelopmentMilestoneDataset;
export const developmentMilestones = developmentMilestoneData.milestoneuri;
export const developmentMilestoneSources = developmentMilestoneData.surse;

export function getBabyAgeDays(birthDateTime: Date, now = new Date()) {
  return Math.max(0, Math.floor((now.getTime() - birthDateTime.getTime()) / DAY_MS));
}

export function getMilestonesForBaby(birthDateTime: Date, now = new Date()): BabyMilestone[] {
  const ageDays = getBabyAgeDays(birthDateTime, now);

  return developmentMilestones
    .map((milestone) => {
      const status = getMilestoneStatus(milestone, ageDays);

      return {
        ...milestone,
        status,
        startDate: addDays(birthDateTime, milestone.varstaMinZile),
        targetDate: addDays(birthDateTime, milestone.varstaTintaZile),
        endDate: addDays(birthDateTime, milestone.varstaMaxZile),
        daysUntilStart: milestone.varstaMinZile - ageDays,
        daysUntilTarget: milestone.varstaTintaZile - ageDays,
      };
    })
    .sort((a, b) => a.varstaTintaZile - b.varstaTintaZile);
}

export function getDashboardMilestones(
  birthDateTime: Date,
  now = new Date(),
  limit = 3,
): BabyMilestone[] {
  const milestones = getMilestonesForBaby(birthDateTime, now);
  const current = milestones.filter((milestone) => milestone.status === "current");
  const upcoming = milestones.filter((milestone) => milestone.status === "upcoming");

  if (current.length + upcoming.length > 0) {
    return [...current, ...upcoming].slice(0, limit);
  }

  return milestones.slice(-limit).reverse();
}

export function formatMilestoneCategory(
  category: MilestoneCategory,
  locale: Locale = defaultLocale,
) {
  if (category === "pulseu_de_crestere") {
    return locale === "ro" ? "Pulseu de crestere" : "Growth spurt";
  }
  return locale === "ro" ? "Dezvoltare" : "Development";
}

export function formatMilestoneStatus(status: MilestoneStatus, locale: Locale = defaultLocale) {
  switch (status) {
    case "current":
      return locale === "ro" ? "Acum" : "Now";
    case "completed":
      return locale === "ro" ? "Trecut" : "Past";
    case "upcoming":
      return locale === "ro" ? "Urmeaza" : "Upcoming";
  }
}

export function formatRelativeMilestoneTime(
  milestone: BabyMilestone,
  locale: Locale = defaultLocale,
) {
  if (milestone.status === "current") {
    return locale === "ro"
      ? `fereastra activa pana pe ${formatLocalizedDate(milestone.endDate, locale)}`
      : `active window until ${formatLocalizedDate(milestone.endDate, locale)}`;
  }

  if (milestone.status === "completed") {
    return locale === "ro"
      ? `a fost in jur de ${formatLocalizedDate(milestone.targetDate, locale)}`
      : `was around ${formatLocalizedDate(milestone.targetDate, locale)}`;
  }

  return formatDaysFromNow(milestone.daysUntilStart, locale);
}

export function formatDaysFromNow(days: number, locale: Locale = defaultLocale) {
  if (locale === "en") {
    if (days <= 0) return "now";
    if (days === 1) return "tomorrow";
    if (days < 14) return `in ${days} day${days === 1 ? "" : "s"}`;

    const weeks = Math.round(days / 7);
    if (weeks < 9) return `in ${weeks} week${weeks === 1 ? "" : "s"}`;

    const months = Math.round(days / AVG_MONTH_DAYS);
    if (months < 24) return `in ${months} month${months === 1 ? "" : "s"}`;

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (!remainingMonths) return `in ${years} year${years === 1 ? "" : "s"}`;
    return `in ${years} year${years === 1 ? "" : "s"} and ${remainingMonths} month${
      remainingMonths === 1 ? "" : "s"
    }`;
  }

  if (days <= 0) return "acum";
  if (days === 1) return "maine";
  if (days < 14) return `in ${days} ${plural(days, "zi", "zile")}`;

  const weeks = Math.round(days / 7);
  if (weeks < 9) return `in ${weeks} ${plural(weeks, "saptamana", "saptamani")}`;

  const months = Math.round(days / AVG_MONTH_DAYS);
  if (months < 24) return `in ${months} ${plural(months, "luna", "luni")}`;

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (!remainingMonths) return `in ${years} ${plural(years, "an", "ani")}`;
  return `in ${years} ${plural(years, "an", "ani")} si ${remainingMonths} ${plural(
    remainingMonths,
    "luna",
    "luni",
  )}`;
}

export function formatAgeInRomanian(ageDays: number) {
  if (ageDays < 14) return `${ageDays} ${plural(ageDays, "zi", "zile")}`;

  const weeks = Math.floor(ageDays / 7);
  if (weeks < 12) return `${weeks} ${plural(weeks, "saptamana", "saptamani")}`;

  const months = Math.floor(ageDays / AVG_MONTH_DAYS);
  if (months < 24) return `${months} ${plural(months, "luna", "luni")}`;

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (!remainingMonths) return `${years} ${plural(years, "an", "ani")}`;
  return `${years} ${plural(years, "an", "ani")} si ${remainingMonths} ${plural(
    remainingMonths,
    "luna",
    "luni",
  )}`;
}

export function formatRomanianDate(date: Date) {
  return formatLocalizedDate(date, "ro");
}

export function formatLocalizedDate(date: Date, locale: Locale = defaultLocale) {
  return new Intl.DateTimeFormat(localeToIntl(locale), {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getMilestoneStatus(
  milestone: DevelopmentMilestone,
  ageDays: number,
): MilestoneStatus {
  if (ageDays < milestone.varstaMinZile) return "upcoming";
  if (ageDays <= milestone.varstaMaxZile) return "current";
  return "completed";
}

function addDays(date: Date, days: number) {
  return new Date(date.getTime() + days * DAY_MS);
}

function plural(count: number, singular: string, pluralForm: string) {
  return count === 1 ? singular : pluralForm;
}
