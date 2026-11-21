// Ruta: app/style-guide/page.tsx
// Página interna para comprobar colores, tipografía y componentes base.

const colors = [
  { name: "Fondo", className: "bg-background", hex: "#FCF8F8" },
  { name: "Superficie", className: "bg-surface", hex: "#FFFFFF" },
  { name: "Rosa", className: "bg-rose", hex: "#D98BA0" },
  { name: "Rosa suave", className: "bg-rose-soft", hex: "#F6DDE3" },
  { name: "Salvia", className: "bg-sage", hex: "#8FA98B" },
  { name: "Malva", className: "bg-mauve", hex: "#9C7A97" },
  { name: "Dorado", className: "bg-gold", hex: "#C9A86A" },
  { name: "Tinta", className: "bg-ink", hex: "#3D2B33" },
];

// El texto coránico siempre viene de la API, nunca escrito a mano
async function getFirstVerse(): Promise<string | null> {
  try {
    const res = await fetch(
      "https://api.quran.com/api/v4/verses/by_key/1:1?fields=text_uthmani",
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.verse?.text_uthmani ?? null;
  } catch {
    return null;
  }
}

export default async function StyleGuidePage() {
  const verse = await getFirstVerse();

  return (
    <main className="mx-auto max-w-3xl space-y-16 px-6 py-16">
      <header>
        <h1 className="font-display text-5xl text-ink">The Wird Garden</h1>
        <p className="mt-3 text-lg text-ink-soft">
          Guía de estilo: colores, tipografía y componentes base.
        </p>
      </header>

      <section>
        <h2 className="mb-6 font-display text-3xl">Colores</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {colors.map((c) => (
            <div key={c.name}>
              <div
                className={`${c.className} h-20 rounded-2xl border border-border`}
              />
              <p className="mt-2 text-sm font-semibold">{c.name}</p>
              <p className="text-sm text-ink-soft">{c.hex}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="font-display text-3xl">Tipografía</h2>
        <p className="font-display text-4xl">Tu jardín crece contigo</p>
        <p className="max-w-prose text-lg leading-relaxed">
          Texto de interfaz en Figtree. Se usa para botones, menús, descripciones
          y todo lo que no es el texto del Corán.
        </p>
        <div className="rounded-3xl bg-surface p-8">
          {verse ? (
            <p lang="ar" className="quran">
              {verse}
            </p>
          ) : (
            <p className="text-ink-soft">
              No se ha podido cargar el texto de la API.
            </p>
          )}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="font-display text-3xl">Componentes</h2>
        <div className="flex flex-wrap gap-4">
          <button className="rounded-full bg-rose px-6 py-3 font-semibold text-ink transition-colors hover:bg-rose-soft">
            Empezar a memorizar
          </button>
          <button className="rounded-full border border-border px-6 py-3 font-semibold text-ink transition-colors hover:bg-rose-soft">
            Ver mi jardín
          </button>
        </div>
        <div className="max-w-sm rounded-3xl border border-border bg-surface p-6">
          <p className="text-sm text-ink-soft">Memorizar hoy</p>
          <p className="mt-1 font-display text-2xl">Al-Mulk, aleyas 1-5</p>
          <div className="mt-4 h-2 rounded-full bg-rose-soft">
            <div className="h-2 w-2/5 rounded-full bg-sage" />
          </div>
          <p className="mt-2 text-sm text-ink-soft">2 de 5 aleyas</p>
        </div>
      </section>
    </main>
  );
}
