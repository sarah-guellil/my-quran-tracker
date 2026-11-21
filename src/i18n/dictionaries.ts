import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "./config";
import type es from "./messages/es.json";

// El español es la referencia: el resto de idiomas tiene que tener
// exactamente las mismas claves, o TypeScript dará error.
export type Dictionary = typeof es;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  es: () => import("./messages/es.json").then((m) => m.default),
  en: () => import("./messages/en.json").then((m): Dictionary => m.default),
};

// Devuelve los textos del idioma de la URL actual (/es/... o /en/...)
export async function getDictionary() {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  return dictionaries[locale]();
}

// Devuelve el idioma de la URL actual
export async function getLocale(): Promise<Locale> {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  return locale;
}
