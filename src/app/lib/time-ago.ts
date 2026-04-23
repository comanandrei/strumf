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
