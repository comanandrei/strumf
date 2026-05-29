export const locales = ["ro", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ro";

export const localeNames: Record<Locale, string> = {
  ro: "Romana",
  en: "English",
};

export function isLocale(value: string | null | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function localeToIntl(locale: Locale): string {
  return locale === "ro" ? "ro-RO" : "en-US";
}

export function localize<T>(locale: Locale, values: Record<Locale, T>): T {
  return values[locale];
}

export function pluralize(
  locale: Locale,
  count: number,
  forms: { one: string; other: string },
) {
  if (locale === "ro") return count === 1 ? forms.one : forms.other;
  return count === 1 ? forms.one : forms.other;
}
