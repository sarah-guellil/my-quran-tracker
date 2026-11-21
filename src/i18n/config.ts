// Idiomas disponibles. Para añadir uno nuevo:
// 1. Añádelo a esta lista.
// 2. Crea su archivo en src/i18n/messages/ (por ejemplo, fr.json).
// 3. Regístralo en src/i18n/dictionaries.ts.
export const locales = ["es", "en"] as const;
export const defaultLocale = "es";

export type Locale = (typeof locales)[number];

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

// Nombre de cada idioma escrito en ese mismo idioma (para el selector)
export const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
};

// Cookie donde se guarda el idioma elegido por la usuaria
export const LOCALE_COOKIE = "NEXT_LOCALE";
