import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
};

export function Chip({ selected, className = "", type = "button", ...props }: Props) {
  return (
    <button
      type={type}
      className={[
        "transition-smooth min-h-11 rounded-strumf-pill border px-4 py-2 text-sm font-semibold",
        selected
          ? "border-strumf-accent bg-strumf-accent/35 text-strumf-foreground shadow-card"
          : "border-strumf-border bg-white/45 text-strumf-foreground/80 hover:bg-white/75",
        className,
      ].join(" ")}
      {...props}
    />
  );
}
