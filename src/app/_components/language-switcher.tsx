"use client";

import { localeNames, locales, type Locale } from "~/app/lib/i18n";
import { useI18n } from "~/app/lib/i18n-provider";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useI18n();

  return (
    <div
      className={`inline-flex rounded-full border border-strumf-border bg-white/65 p-1 text-xs font-bold shadow-card backdrop-blur ${className}`}
      aria-label={locale === "ro" ? "Schimba limba" : "Change language"}
    >
      {locales.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLocale(option)}
          className={`rounded-full px-3 py-1.5 transition-smooth ${
            locale === option
              ? "bg-gradient-primary text-white shadow-card"
              : "text-strumf-muted hover:text-strumf-foreground"
          }`}
          aria-pressed={locale === option}
          aria-label={localeNames[option]}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function localized<T>(locale: Locale, ro: T, en: T): T {
  return locale === "ro" ? ro : en;
}
