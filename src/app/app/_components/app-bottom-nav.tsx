"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { useI18n } from "~/app/lib/i18n-provider";

import { CalendarColorIcon } from "./app-icons";
import { useBabySelection } from "./baby-selection-context";

type NavTab = {
  href: string;
  label: string;
  icon: ReactNode;
  match: (pathname: string) => boolean;
};

export function AppBottomNav() {
  const pathname = usePathname();
  const { selectedBabyId } = useBabySelection();
  const { locale } = useI18n();
  const babyHref = selectedBabyId ? `/app/baby/${selectedBabyId}` : "/app/onboarding";
  const labels = locale === "ro"
    ? {
        main: "Principal",
        dashboard: "Acasa",
        log: "Jurnal",
        calendar: "Calendar",
        outside: "Afara",
        baby: "Bebe",
        nearby: "Aproape",
        you: "Tu",
      }
    : {
        main: "Main",
        dashboard: "Dashboard",
        log: "Log",
        calendar: "Calendar",
        outside: "Outside",
        baby: "Baby",
        nearby: "Nearby",
        you: "You",
      };
  const tabs: NavTab[] = [
    { href: "/app", label: labels.dashboard, icon: "✦", match: (p: string) => p === "/app" },
    { href: "/app/log", label: labels.log, icon: "🍼", match: (p: string) => p.startsWith("/app/log") },
    {
      href: "/app/calendar",
      label: labels.calendar,
      icon: <CalendarColorIcon className="h-5 w-5" />,
      match: (p: string) => p.startsWith("/app/calendar"),
    },
    {
      href: "/app/go-outside",
      label: labels.outside,
      icon: "☁",
      match: (p: string) => p.startsWith("/app/go-outside"),
    },
    { href: babyHref, label: labels.baby, icon: "👶", match: (p: string) => p.startsWith("/app/baby") },
    {
      href: "/app/nearby",
      label: labels.nearby,
      icon: "🌳",
      match: (p: string) => p.startsWith("/app/nearby"),
    },
    {
      href: "/app/you",
      label: labels.you,
      icon: "♡",
      match: (p: string) => p.startsWith("/app/you") || p.startsWith("/app/onboarding"),
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-strumf-border bg-strumf-surface/90 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-soft backdrop-blur-md"
      aria-label={labels.main}
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
                <span className="flex h-5 items-center justify-center text-base leading-none">
                  {tab.icon}
                </span>
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
