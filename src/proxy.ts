import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, LOCALE_COOKIE } from "./i18n/config";

// Elige el idioma: primero el que la usuaria eligió antes (cookie),
// luego el de su navegador y, si no coincide ninguno, el español.
function getLocale(request: NextRequest) {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (saved && hasLocale(saved)) return saved;

  const header = request.headers.get("accept-language") ?? "";
  const preferred = header
    .split(",")
    .map((part) => part.split(";")[0].trim().slice(0, 2).toLowerCase());

  return preferred.find(hasLocale) ?? defaultLocale;
}

// Si la URL no empieza por un idioma (/es o /en), redirige a la que toca.
// Ejemplo: /today → /es/today
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];

  if (hasLocale(firstSegment)) return;

  request.nextUrl.pathname = `/${getLocale(request)}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // No se aplica a archivos internos de Next.js, a la API
  // ni a archivos con extensión (logo.png, icon.png…)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
