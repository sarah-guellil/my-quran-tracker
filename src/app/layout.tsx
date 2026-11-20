import type { Metadata } from "next";
import { Amiri, Amiri_Quran, Figtree } from "next/font/google";
import "./globals.css";

// Interfaz
const figtree = Figtree({
  subsets: ["latin", "latin-ext"],
  variable: "--font-figtree",
});

// Títulos (tiene letras latinas y árabes con el mismo estilo)
const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["latin", "arabic"],
  variable: "--font-amiri",
});

// Texto del Corán
const amiriQuran = Amiri_Quran({
  weight: "400",
  subsets: ["arabic"],
  variable: "--font-amiri-quran",
});

export const metadata: Metadata = {
  title: "The Wird Garden",
  description: "Memoriza el Corán a tu ritmo y haz crecer tu jardín.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${figtree.variable} ${amiri.variable} ${amiriQuran.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
