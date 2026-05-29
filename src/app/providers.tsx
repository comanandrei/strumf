"use client";

import { SessionProvider } from "next-auth/react";

import { I18nProvider } from "~/app/lib/i18n-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <SessionProvider basePath="/api/auth">
        {children}
      </SessionProvider>
    </I18nProvider>
  );
}
