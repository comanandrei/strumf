"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useMemo, useState } from "react";

import { useBabySelection } from "~/app/app/_components/baby-selection-context";

const menuItems = [
  { href: "/app", label: "Dashboard", match: (path: string) => path === "/app" },
  { href: "/app/log", label: "Log feeding", match: (path: string) => path.startsWith("/app/log") },
  { href: "/app/calendar", label: "Calendar", match: (path: string) => path.startsWith("/app/calendar") },
  {
    href: "/app/nearby",
    label: "Nearby",
    match: (path: string) => path.startsWith("/app/nearby"),
  },
  { href: "/app/baby", label: "Baby profile", match: (path: string) => path.startsWith("/app/baby") },
  { href: "/app/you", label: "Account", match: (path: string) => path.startsWith("/app/you") },
] as const;

export function AppTopMenu() {
  const pathname = usePathname();
  const { babies, selectedBabyId } = useBabySelection();
  const [open, setOpen] = useState(false);

  const activeBaby = useMemo(
    () => babies.find((baby) => baby.id === selectedBabyId),
    [babies, selectedBabyId],
  );

  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-strumf-border bg-strumf-surface/90 px-4 py-3 shadow-card backdrop-blur-md">
      <div className="relative mx-auto flex w-full max-w-lg items-center justify-between gap-3">
        <Link href="/app" className="min-w-0 no-underline" onClick={closeMenu}>
          <p className="text-xs font-bold uppercase tracking-wide text-strumf-muted">Strumf</p>
          <p className="truncate font-display text-xl font-bold text-strumf-foreground">
            {activeBaby?.displayName ?? "Dashboard"}
          </p>
        </Link>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="app-top-menu"
          onClick={() => setOpen((value) => !value)}
          className="flex min-h-11 items-center gap-2 rounded-strumf-pill border border-strumf-border bg-white/60 px-4 py-2 text-sm font-bold text-strumf-foreground transition-smooth hover:bg-white/85"
        >
          Menu
          <span aria-hidden="true" className="text-lg leading-none">
            {open ? "x" : "="}
          </span>
        </button>

        {open ? (
          <div
            id="app-top-menu"
            className="absolute right-0 top-[calc(100%+0.75rem)] w-64 rounded-strumf-card border border-strumf-border bg-strumf-surface-strong p-2 shadow-soft backdrop-blur"
          >
            <nav aria-label="App menu" className="flex flex-col gap-1">
              {menuItems.map((item) => {
                const active = item.match(pathname);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className={`rounded-lg px-4 py-3 text-sm font-bold no-underline transition ${
                      active
                        ? "bg-gradient-primary text-white shadow-card"
                        : "text-strumf-foreground/80 hover:bg-white/65 hover:text-strumf-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-bold text-strumf-muted no-underline transition-smooth hover:bg-white/65 hover:text-strumf-foreground"
              >
                Marketing home
              </Link>
              <button
                type="button"
                onClick={() => void signOut({ callbackUrl: "/" })}
                className="mt-2 rounded-lg border border-strumf-border px-4 py-3 text-left text-sm font-bold text-strumf-danger transition-smooth hover:bg-strumf-danger/10"
              >
                Log out
              </button>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
