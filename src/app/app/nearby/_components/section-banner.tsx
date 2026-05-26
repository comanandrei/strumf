import type { ReactNode } from "react";

type Tone = "info" | "warn" | "error";

const TONE_CLASS: Record<Tone, string> = {
  info: "bg-white/70 text-strumf-foreground/85",
  warn: "bg-amber-100/80 text-amber-900",
  error: "bg-rose-100/80 text-rose-900",
};

export function SectionBanner({
  tone = "info",
  title,
  description,
  action,
}: {
  tone?: Tone;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div
      className={`flex flex-col gap-2 rounded-2xl px-4 py-3 text-sm ${TONE_CLASS[tone]}`}
      role={tone === "error" ? "alert" : "status"}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="font-semibold leading-snug">{title}</p>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      {description ? (
        <p className="text-xs leading-snug opacity-90">{description}</p>
      ) : null}
    </div>
  );
}
