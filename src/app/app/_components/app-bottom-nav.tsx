"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/app", label: "Home", match: (p: string) => p === "/app" },
  { href: "/app/log", label: "Log", match: (p: string) => p.startsWith("/app/log") },
  { href: "/app/you", label: "You", match: (p: string) => p.startsWith("/app/you") },
] as const;

export function AppBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-strumf-border bg-strumf-bg-bottom pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md"
      aria-label="Main"
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-around px-2">
        {tabs.map((tab) => {
          const active = tab.match(pathname);
          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                className={`flex min-h-12 flex-col items-center justify-center rounded-lg text-sm font-medium transition ${
                  active ? "text-strumf-accent" : "text-white/65 hover:text-white"
                }`}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
