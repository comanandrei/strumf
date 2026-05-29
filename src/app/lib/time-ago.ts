import { defaultLocale, localeToIntl, type Locale } from "./i18n";

export function formatTimeAgo(from: Date, locale: Locale = defaultLocale, now = new Date()): string {
  const ms = now.getTime() - from.getTime();
  const mins = Math.floor(ms / 60000);
  if (mins < 1) return locale === "ro" ? "chiar acum" : "just now";
  if (mins < 60) return locale === "ro" ? `acum ${mins} min` : `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) {
    return locale === "ro"
      ? `acum ${hrs} ${hrs === 1 ? "ora" : "ore"}`
      : `${hrs} hr${hrs === 1 ? "" : "s"} ago`;
  }
  const days = Math.floor(hrs / 24);
  return locale === "ro"
    ? `acum ${days} ${days === 1 ? "zi" : "zile"}`
    : `${days} day${days === 1 ? "" : "s"} ago`;
}

export function milkTypeLabel(milk: string, locale: Locale = defaultLocale): string {
  switch (milk) {
    case "BREAST_MILK":
      return locale === "ro" ? "Lapte matern" : "Breast milk";
    case "FORMULA":
      return locale === "ro" ? "Formula" : "Formula";
    case "MIXED":
      return locale === "ro" ? "Mixt" : "Mixed";
    default:
      return locale === "ro" ? "Lapte" : "Milk";
  }
}

export function formatClock(date: Date, locale: Locale = defaultLocale): string {
  return new Intl.DateTimeFormat(localeToIntl(locale), {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function formatShortDate(date: Date, locale: Locale = defaultLocale): string {
  return new Intl.DateTimeFormat(localeToIntl(locale), {
    month: "short",
    day: "numeric",
  }).format(date);
}

export function ageLabel(
  birthDateTime: Date,
  locale: Locale = defaultLocale,
  now = new Date(),
): string {
  const diffDays = Math.max(
    0,
    Math.floor((now.getTime() - birthDateTime.getTime()) / 86_400_000),
  );
  if (diffDays < 14) {
    return locale === "ro"
      ? `${diffDays} ${diffDays === 1 ? "zi" : "zile"}`
      : `${diffDays} day${diffDays === 1 ? "" : "s"} old`;
  }

  const weeks = Math.floor(diffDays / 7);
  if (weeks < 12) {
    return locale === "ro"
      ? `${weeks} ${weeks === 1 ? "saptamana" : "saptamani"}`
      : `${weeks} week${weeks === 1 ? "" : "s"} old`;
  }

  const months =
    (now.getFullYear() - birthDateTime.getFullYear()) * 12 +
    now.getMonth() -
    birthDateTime.getMonth();
  if (months < 24) {
    return locale === "ro"
      ? `${months} ${months === 1 ? "luna" : "luni"}`
      : `${months} month${months === 1 ? "" : "s"} old`;
  }

  const years = Math.floor(months / 12);
  return locale === "ro"
    ? `${years} ${years === 1 ? "an" : "ani"}`
    : `${years} year${years === 1 ? "" : "s"} old`;
}
