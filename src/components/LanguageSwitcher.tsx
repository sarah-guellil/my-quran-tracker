"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, localeNames, locales, type Locale } from "@/i18n/config";

// Enlace a la misma página en el otro idioma: /es/today ↔ /en/today
export function LanguageSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 text-sm">
      {locales
        .filter((l) => l !== current)
        .map((locale) => {
          const segments = pathname.split("/");
          segments[1] = locale;
          return (
            <Link
              key={locale}
              href={segments.join("/") || `/${locale}`}
              hrefLang={locale}
              lang={locale}
              onClick={() => {
                document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
              }}
              className="rounded-full px-3 py-1.5 text-ink-soft transition-colors hover:bg-rose-soft hover:text-ink"
            >
              {localeNames[locale]}
            </Link>
          );
        })}
    </div>
  );
}
