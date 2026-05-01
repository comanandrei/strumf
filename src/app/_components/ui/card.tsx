import type { HTMLAttributes } from "react";

export function Card({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-strumf-card border border-strumf-border bg-strumf-surface p-5 shadow-card backdrop-blur ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
