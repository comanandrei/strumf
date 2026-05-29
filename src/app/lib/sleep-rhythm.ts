const MINUTE_MS = 60 * 1000;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;

type WakeWindow = {
  label: string;
  minMinutes: number;
  maxMinutes: number;
};

type SleepAnchor = {
  endedAt: Date;
};

export type WakeWindowGuide = {
  label: string;
  windowStart: Date;
  windowEnd: Date;
  state: "ready" | "soon" | "later";
  stateLabel: string;
};

export function formatSleepDuration(ms: number): string {
  const totalMinutes = Math.max(1, Math.round(ms / MINUTE_MS));
  if (totalMinutes < 60) return `${totalMinutes} min`;

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return minutes ? `${hours}h ${minutes}m` : `${hours}h`;
}

export function sleepDurationMs(sleep: { startedAt: Date; endedAt: Date }) {
  return Math.max(0, sleep.endedAt.getTime() - sleep.startedAt.getTime());
}

export function buildWakeWindowGuide(
  birthDateTime: Date,
  lastSleep: SleepAnchor | undefined,
  now = new Date(),
): WakeWindowGuide | null {
  if (!lastSleep) return null;

  const wakeWindow = getWakeWindow(birthDateTime, now);
  const windowStart = new Date(lastSleep.endedAt.getTime() + wakeWindow.minMinutes * MINUTE_MS);
  const windowEnd = new Date(lastSleep.endedAt.getTime() + wakeWindow.maxMinutes * MINUTE_MS);
  const nowMs = now.getTime();

  if (nowMs >= windowStart.getTime()) {
    return {
      label: wakeWindow.label,
      windowStart,
      windowEnd,
      state: "ready",
      stateLabel: nowMs > windowEnd.getTime() ? "Over wake window" : "Nap window open",
    };
  }

  if (windowStart.getTime() - nowMs <= 30 * MINUTE_MS) {
    return {
      label: wakeWindow.label,
      windowStart,
      windowEnd,
      state: "soon",
      stateLabel: "Prep for sleep soon",
    };
  }

  return {
    label: wakeWindow.label,
    windowStart,
    windowEnd,
    state: "later",
    stateLabel: "Still in wake window",
  };
}

function getWakeWindow(birthDateTime: Date, now: Date): WakeWindow {
  const ageDays = Math.max(0, Math.floor((now.getTime() - birthDateTime.getTime()) / DAY_MS));

  if (ageDays < 56) return { label: "newborn wake window", minMinutes: 45, maxMinutes: 90 };
  if (ageDays < 112) return { label: "2-3 month wake window", minMinutes: 75, maxMinutes: 120 };
  if (ageDays < 168) return { label: "4-5 month wake window", minMinutes: 120, maxMinutes: 150 };
  if (ageDays < 274) return { label: "6-8 month wake window", minMinutes: 150, maxMinutes: 210 };
  if (ageDays < 365) return { label: "9-11 month wake window", minMinutes: 180, maxMinutes: 240 };
  if (ageDays < 548) return { label: "12-17 month wake window", minMinutes: 240, maxMinutes: 300 };
  return { label: "toddler wake window", minMinutes: 300, maxMinutes: 360 };
}
