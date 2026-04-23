import type { ButtonHTMLAttributes } from "react";

const variants = {
  primary:
    "bg-strumf-surface-strong text-white shadow-sm hover:bg-white/20 active:scale-[0.99]",
  accent:
    "bg-strumf-accent text-strumf-bg-bottom font-semibold hover:brightness-110 active:scale-[0.99]",
  ghost: "bg-transparent text-white/90 hover:bg-white/10",
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
