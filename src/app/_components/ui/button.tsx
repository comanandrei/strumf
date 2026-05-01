import type { ButtonHTMLAttributes } from "react";

const variants = {
  primary:
    "border border-strumf-border bg-strumf-surface-strong text-[#22332d] shadow-sm hover:bg-white active:scale-[0.99]",
  accent:
    "bg-strumf-accent text-white font-semibold hover:bg-strumf-accent-muted active:scale-[0.99]",
  ghost: "bg-transparent text-[#42564e] hover:bg-white/70",
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
        "min-h-12 min-w-12 rounded-strumf-pill px-5 py-3 text-base transition disabled:cursor-not-allowed disabled:opacity-45",
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
