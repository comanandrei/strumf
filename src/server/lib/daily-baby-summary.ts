import { z } from "zod";

import {
  formatMilestoneCategory,
  formatMilestoneStatus,
  formatRelativeMilestoneTime,
  getDashboardMilestones,
} from "~/app/lib/development-milestones";
import { ageLabel, milkTypeLabel } from "~/app/lib/time-ago";
import { env } from "~/env";

import type { Baby, PrismaClient } from "../../../generated/prisma";

const DAY_MS = 24 * 60 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;
const MINUTE_MS = 60 * 1000;

export const DAILY_BABY_SUMMARY_KIND = "daily_baby_summary_v1";

export const DailyBabySummarySchema = z.object({
  headline: z.string().min(1),
  feedingRhythm: z.string().min(1),
  changesToNotice: z.array(z.string()).max(6),
  developmentTip: z.string().min(1),
  watchTomorrow: z.array(z.string()).max(6),
  medicalReminders: z.array(z.string()).max(6),
  doctorQuestions: z.array(z.string()).max(6),
  safetyNote: z.string().min(1),
});

export const DailyBabySummaryPayloadSchema = z.object({
  version: z.literal(1),
  dateKey: z.string().min(1),
  generatedAt: z.string().min(1),
  model: z.string().min(1),
  prompt: z.string().min(1),
  summary: DailyBabySummarySchema,
});

export type DailyBabySummaryPayload = z.infer<typeof DailyBabySummaryPayloadSchema>;

type FeedingForSummary = Awaited<
  ReturnType<PrismaClient["feedingEvent"]["findMany"]>
>[number];

type SummaryContext = {
  baby: {
    name: string;
    age: string;
    birthDate: string;
    timezone: string;
  };
  feedingLast24h: {
    totalMl: number;
    feedCount: number;
    averageMl: number;
    averageInterval: string | null;
    lastFeedAt: string | null;
    estimatedNextFeedAt: string | null;
    milkBreakdown: Record<string, { totalMl: number; feedCount: number }>;
  };
  last7Days: Array<{
    date: string;
    label: string;
    totalMl: number;
    feedCount: number;
  }>;
  milestones: Array<{
    title: string;
    category: string;
    status: string;
    ageWindow: string;
    summary: string;
    timing: string;
  }>;
  upcomingAppointments: Array<{
    title: string;
    startsAt: string;
    location: string | null;
    notes: string | null;
  }>;
  recentConsultations: Array<{
    occurredAt: string;
    location: string;
    reason: string;
    providerName: string | null;
    outcomeNotes: string | null;
    followUpAt: string | null;
  }>;
};

export async function buildDailyBabySummaryPrompt(
  db: PrismaClient,
  baby: Baby,
  now = new Date(),
) {
  const dateKey = dateKeyInTimeZone(now, baby.timezone);
  const since24h = new Date(now.getTime() - DAY_MS);
  const since7d = new Date(now.getTime() - 7 * DAY_MS);
  const since30d = new Date(now.getTime() - 30 * DAY_MS);

  const [feedings, appointments, consultations] = await Promise.all([
    db.feedingEvent.findMany({
      where: { babyId: baby.id, startedAt: { gte: since7d } },
      orderBy: { startedAt: "desc" },
      take: 200,
    }),
    db.appointment.findMany({
      where: { babyId: baby.id, startsAt: { gte: now } },
      orderBy: { startsAt: "asc" },
      take: 3,
    }),
    db.consultation.findMany({
      where: { babyId: baby.id, occurredAt: { gte: since30d } },
      orderBy: { occurredAt: "desc" },
      take: 5,
    }),
  ]);

  const recentFeeds = feedings.filter((feed) => feed.startedAt >= since24h);
  const context: SummaryContext = {
    baby: {
      name: baby.displayName,
      age: ageLabel(baby.birthDateTime, now),
      birthDate: formatDateTime(baby.birthDateTime, baby.timezone),
      timezone: baby.timezone,
    },
    feedingLast24h: summarizeFeedings(recentFeeds, baby.timezone),
    last7Days: buildLast7Days(feedings, baby.timezone, now),
    milestones: getDashboardMilestones(baby.birthDateTime, now, 3).map((milestone) => ({
      title: milestone.titlu,
      category: formatMilestoneCategory(milestone.categorie),
      status: formatMilestoneStatus(milestone.status),
      ageWindow: milestone.etichetaVarsta,
      summary: milestone.rezumat,
      timing: formatRelativeMilestoneTime(milestone),
    })),
    upcomingAppointments: appointments.map((appointment) => ({
      title: appointment.title,
      startsAt: formatDateTime(appointment.startsAt, baby.timezone),
      location: appointment.location,
      notes: appointment.notes,
    })),
    recentConsultations: consultations.map((consultation) => ({
      occurredAt: formatDateTime(consultation.occurredAt, baby.timezone),
      location: consultation.location,
      reason: consultation.reason,
      providerName: consultation.providerName,
      outcomeNotes: consultation.outcomeNotes,
      followUpAt: consultation.followUpAt
        ? formatDateTime(consultation.followUpAt, baby.timezone)
        : null,
    })),
  };

  return {
    dateKey,
    prompt: renderDailyPrompt(context),
  };
}

export async function getCachedDailyBabySummary(
  db: PrismaClient,
  babyId: string,
  dateKey: string,
) {
  const row = await db.predictionCache.findFirst({
    where: {
      babyId,
      kind: DAILY_BABY_SUMMARY_KIND,
      inputFingerprint: dateKey,
    },
    orderBy: { createdAt: "desc" },
  });

  if (!row) return null;

  const parsed = DailyBabySummaryPayloadSchema.safeParse(row.payload);
  if (!parsed.success) return null;

  return parsed.data;
}

export async function requestGptBabySummary(prompt: string) {
  if (!env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  const model = env.OPENAI_MODEL ?? "gpt-4o-mini";
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You summarize baby-care dashboard data for parents. Be calm, practical, concise, and never diagnose. Return only valid JSON.",
        },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`GPT request failed with status ${response.status}.`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string | null } }>;
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("GPT returned an empty response.");
  }

  const parsedJson = JSON.parse(content) as unknown;
  return {
    model,
    summary: DailyBabySummarySchema.parse(parsedJson),
  };
}

export function makeDailyBabySummaryPayload({
  dateKey,
  model,
  prompt,
  summary,
  generatedAt = new Date(),
}: {
  dateKey: string;
  model: string;
  prompt: string;
  summary: z.infer<typeof DailyBabySummarySchema>;
  generatedAt?: Date;
}): DailyBabySummaryPayload {
  return {
    version: 1,
    dateKey,
    generatedAt: generatedAt.toISOString(),
    model,
    prompt,
    summary,
  };
}

export function dailyBabySummaryExpiresAt(now = new Date()) {
  return new Date(now.getTime() + 3 * 365 * DAY_MS);
}

function summarizeFeedings(feedings: FeedingForSummary[], timeZone: string) {
  const totalMl = feedings.reduce((sum, feed) => sum + feed.amountMl, 0);
  const feedCount = feedings.length;
  const averageMl = feedCount ? Math.round(totalMl / feedCount) : 0;
  const feedTimes = feedings.map((feed) => feed.startedAt.getTime());
  const intervalTotalMs = feedTimes
    .slice(0, -1)
    .reduce((sum, startedAtMs, index) => sum + startedAtMs - feedTimes[index + 1]!, 0);
  const averageIntervalMs =
    feedTimes.length > 1 ? Math.round(intervalTotalMs / (feedTimes.length - 1)) : null;
  const lastFeed = feedings[0];
  const estimatedNextFeedAt =
    lastFeed && averageIntervalMs && averageIntervalMs > 0
      ? new Date(lastFeed.startedAt.getTime() + averageIntervalMs)
      : null;

  return {
    totalMl,
    feedCount,
    averageMl,
    averageInterval: averageIntervalMs ? formatDuration(averageIntervalMs) : null,
    lastFeedAt: lastFeed ? formatDateTime(lastFeed.startedAt, timeZone) : null,
    estimatedNextFeedAt: estimatedNextFeedAt ? formatDateTime(estimatedNextFeedAt, timeZone) : null,
    milkBreakdown: feedings.reduce<Record<string, { totalMl: number; feedCount: number }>>(
      (breakdown, feed) => {
        const label = milkTypeLabel(feed.milkType);
        breakdown[label] ??= { totalMl: 0, feedCount: 0 };
        breakdown[label].totalMl += feed.amountMl;
        breakdown[label].feedCount += 1;
        return breakdown;
      },
      {},
    ),
  };
}

function buildLast7Days(feedings: FeedingForSummary[], timeZone: string, now: Date) {
  const days = new Map<string, { date: string; label: string; totalMl: number; feedCount: number }>();

  for (let daysAgo = 6; daysAgo >= 0; daysAgo -= 1) {
    const date = new Date(now.getTime() - daysAgo * DAY_MS);
    const dateKey = dateKeyInTimeZone(date, timeZone);
    days.set(dateKey, {
      date: dateKey,
      label: formatShortDate(date, timeZone),
      totalMl: 0,
      feedCount: 0,
    });
  }

  for (const feeding of feedings) {
    const dateKey = dateKeyInTimeZone(feeding.startedAt, timeZone);
    const day = days.get(dateKey);
    if (!day) continue;

    day.totalMl += feeding.amountMl;
    day.feedCount += 1;
  }

  return Array.from(days.values());
}

function renderDailyPrompt(context: SummaryContext) {
  return `You are preparing the one daily GPT baby summary for the parent dashboard.

Use only the data below. Do not diagnose, do not create panic, and do not replace medical care.
If the data is limited, say that clearly. Focus on what is useful for parents to know today.

Return valid JSON with exactly these keys:
- headline: one short sentence
- feedingRhythm: one concise paragraph about feeds
- changesToNotice: array of short bullets about unusual or useful changes
- developmentTip: one practical age-appropriate tip
- watchTomorrow: array of short bullets
- medicalReminders: array of short bullets about appointments/follow-ups
- doctorQuestions: array of short questions to prepare if relevant
- safetyNote: one calm reminder about when to contact a clinician

Dashboard data:
${JSON.stringify(context, null, 2)}`;
}

function dateKeyInTimeZone(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  return `${year}-${month}-${day}`;
}

function formatDateTime(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en", {
    timeZone,
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function formatShortDate(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en", {
    timeZone,
    month: "short",
    day: "numeric",
  }).format(date);
}

function formatDuration(ms: number): string {
  const totalMinutes = Math.max(1, Math.round(ms / MINUTE_MS));
  if (totalMinutes < 60) return `${totalMinutes} min`;

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return minutes ? `${hours}h ${minutes}m` : `${hours}h`;
}

