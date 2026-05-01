import type { ButtonHTMLAttributes } from "react";

const variants = {
  primary:
    "bg-strumf-surface-strong text-strumf-foreground shadow-card hover:shadow-soft active:scale-[0.99]",
  accent:
    "bg-gradient-primary text-white font-semibold shadow-soft hover:shadow-glow active:scale-[0.99]",
  mint:
    "bg-gradient-mint text-strumf-foreground font-semibold shadow-card hover:shadow-soft active:scale-[0.99]",
  ghost: "bg-transparent text-strumf-foreground/80 hover:bg-white/45",
} as const;

type Variant = keyof typeof variants;

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  fullWidth?: boolean;
};

export function Button({
  variant = "primary",
  fullWidth,
  className = "",
  type = "button",
  ...props
}: Props) {
  return (
    <button
      type={type}
      className={[
        "transition-smooth min-h-12 min-w-12 rounded-strumf-pill px-5 py-3 text-base disabled:cursor-not-allowed disabled:opacity-45",
        variants[variant],
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
