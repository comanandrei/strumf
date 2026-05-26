"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useBabySelection } from "./baby-selection-context";

export function AppBottomNav() {
  const pathname = usePathname();
  const { selectedBabyId } = useBabySelection();
  const babyHref = selectedBabyId ? `/app/baby/${selectedBabyId}` : "/app/onboarding";
  const tabs = [
    { href: "/app", label: "Dashboard", icon: "✦", match: (p: string) => p === "/app" },
    { href: "/app/log", label: "Log", icon: "🍼", match: (p: string) => p.startsWith("/app/log") },
    {
      href: "/app/calendar",
      label: "Calendar",
      icon: "◷",
      match: (p: string) => p.startsWith("/app/calendar"),
    },
    {
      href: "/app/go-outside",
      label: "Outside",
      icon: "☁",
      match: (p: string) => p.startsWith("/app/go-outside"),
    },
    { href: babyHref, label: "Baby", icon: "👶", match: (p: string) => p.startsWith("/app/baby") },
    {
      href: "/app/nearby",
      label: "Nearby",
      icon: "🌳",
      match: (p: string) => p.startsWith("/app/nearby"),
    },
    {
      href: "/app/you",
      label: "You",
      icon: "♡",
      match: (p: string) => p.startsWith("/app/you") || p.startsWith("/app/onboarding"),
    },
  ] as const;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-strumf-border bg-strumf-surface/90 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-soft backdrop-blur-md"
      aria-label="Main"
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-around px-2">
        {tabs.map((tab) => {
          const active = tab.match(pathname);
          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                className={`transition-smooth flex min-h-12 flex-col items-center justify-center rounded-2xl px-1 text-[11px] font-bold sm:text-sm ${
                  active
                    ? "bg-gradient-primary text-white shadow-card"
                    : "text-strumf-muted hover:bg-white/50 hover:text-strumf-foreground"
                }`}
              >
                <span className="text-base leading-none">{tab.icon}</span>
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
