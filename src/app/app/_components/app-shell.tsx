"use client";

import type { ReactNode } from "react";

import { AppTopMenu } from "~/app/app/_components/app-top-menu";
import { BabySelectionProvider } from "~/app/app/_components/baby-selection-context";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <BabySelectionProvider>
      <div className="flex min-h-screen flex-col bg-gradient-soft text-strumf-foreground">
        <AppTopMenu />
        <div className="mx-auto w-full max-w-lg flex-1 px-4 pb-8 pt-6">{children}</div>
      </div>
    </BabySelectionProvider>
  );
}
