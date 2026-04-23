import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
};

export function Chip({ selected, className = "", type = "button", ...props }: Props) {
  return (
    <button
      type={type}
      className={[
        "min-h-11 rounded-strumf-pill border px-4 py-2 text-sm font-medium transition",
        selected
          ? "border-strumf-accent bg-strumf-accent/25 text-white"
          : "border-strumf-border bg-white/5 text-white/85 hover:bg-white/10",
        className,
      ].join(" ")}
      {...props}
    />
  );
}
