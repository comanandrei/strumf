export function formatTimeAgo(from: Date, now = new Date()): string {
  const ms = now.getTime() - from.getTime();
  const mins = Math.floor(ms / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr${hrs === 1 ? "" : "s"} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

export function milkTypeLabel(milk: string): string {
  switch (milk) {
    case "BREAST_MILK":
      return "Breast milk";
    case "FORMULA":
      return "Formula";
    case "MIXED":
      return "Mixed";
    default:
      return "Milk";
  }
}

export function formatClock(date: Date): string {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function formatShortDate(date: Date): string {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
  }).format(date);
}

export function ageLabel(birthDateTime: Date, now = new Date()): string {
  const diffDays = Math.max(
    0,
    Math.floor((now.getTime() - birthDateTime.getTime()) / 86_400_000),
  );
  if (diffDays < 14) return `${diffDays} day${diffDays === 1 ? "" : "s"} old`;

  const weeks = Math.floor(diffDays / 7);
  if (weeks < 12) return `${weeks} week${weeks === 1 ? "" : "s"} old`;

  const months =
    (now.getFullYear() - birthDateTime.getFullYear()) * 12 +
    now.getMonth() -
    birthDateTime.getMonth();
  if (months < 24) return `${months} month${months === 1 ? "" : "s"} old`;

  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? "" : "s"} old`;
}
