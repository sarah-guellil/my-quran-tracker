import type { Metadata } from "next";
import { Amiri, Amiri_Quran, Figtree } from "next/font/google";
import { locales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import "../globals.css";

// Interfaz
const figtree = Figtree({
  subsets: ["latin", "latin-ext"],
  variable: "--font-figtree",
});

// Títulos (letras latinas y árabes con el mismo estilo)
const amiri = Amiri({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin", "arabic"],
  variable: "--font-amiri",
});

// Texto del Corán
const amiriQuran = Amiri_Quran({
  weight: "400",
  subsets: ["arabic"],
  variable: "--font-amiri-quran",
});

// Genera de antemano una versión de la web por idioma
export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${figtree.variable} ${amiri.variable} ${amiriQuran.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
