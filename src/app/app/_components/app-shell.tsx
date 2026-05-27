"use client";

import type { ReactNode } from "react";

import { LanguageSwitcher } from "~/app/_components/language-switcher";

import { BabySelectionProvider } from "~/app/app/_components/baby-selection-context";
import { AppBottomNav } from "~/app/app/_components/app-bottom-nav";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <BabySelectionProvider>
      <div className="flex min-h-screen flex-col bg-gradient-soft text-strumf-foreground">
        <div className="fixed right-3 top-3 z-40">
          <LanguageSwitcher />
        </div>
        <div className="mx-auto w-full max-w-lg flex-1 px-4 pb-28 pt-6">{children}</div>
        <AppBottomNav />
      </div>
    </BabySelectionProvider>
  );
}
