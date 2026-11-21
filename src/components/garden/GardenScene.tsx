import {
  BlossomTree,
  Daisy,
  Hydrangea,
  Lavender,
  Rose,
  Tulip,
  Violet,
} from "./plants";

// Jardín panorámico de la portada. Las plantas brotan desde el centro
// (el arco) hacia los lados al cargar la página.

type Plant = { x: number; y: number; s: number; el: React.ReactNode };

const CENTER = 600;

const plants: Plant[] = [
  // Izquierda
  { x: 120, y: 305, s: 0.9, el: <BlossomTree /> },
  { x: 60, y: 330, s: 1, el: <Daisy /> },
  { x: 205, y: 318, s: 1, el: <Lavender /> },
  { x: 255, y: 336, s: 1, el: <Daisy /> },
  { x: 300, y: 300, s: 0.9, el: <Tulip color="var(--mauve)" /> },
  { x: 345, y: 328, s: 1, el: <Rose /> },
  { x: 395, y: 296, s: 0.8, el: <Violet /> },
  { x: 430, y: 340, s: 1, el: <Daisy /> },
  { x: 470, y: 308, s: 0.9, el: <Tulip /> },
  { x: 505, y: 286, s: 0.75, el: <Violet /> },
  // Derecha
  { x: 695, y: 286, s: 0.75, el: <Violet /> },
  { x: 730, y: 310, s: 0.9, el: <Tulip /> },
  { x: 770, y: 340, s: 1, el: <Daisy /> },
  { x: 815, y: 300, s: 0.9, el: <Rose /> },
  { x: 865, y: 330, s: 1, el: <Tulip color="var(--mauve)" /> },
  { x: 930, y: 318, s: 1, el: <Hydrangea /> },
  { x: 990, y: 338, s: 1, el: <Daisy /> },
  { x: 1040, y: 304, s: 1, el: <Lavender /> },
  { x: 1095, y: 334, s: 1, el: <Rose /> },
  { x: 1150, y: 312, s: 0.85, el: <Violet /> },
];

export function GardenScene() {
  return (
    <svg
      viewBox="0 140 1200 220"
      preserveAspectRatio="xMidYMax slice"
      className="block h-[200px] w-full sm:h-auto"
      aria-hidden="true"
    >
      {/* Sol */}
      <circle cx="930" cy="190" r="28" fill="var(--gold)" opacity="0.35" />
      <circle cx="930" cy="190" r="18" fill="var(--gold)" opacity="0.5" />

      {/* Colinas */}
      <path d="M0 250 C200 200 380 225 600 215 C820 205 1000 190 1200 230 V360 H0 Z" fill="var(--sage)" opacity="0.18" />
      <path d="M0 290 C220 260 420 275 600 268 C800 262 1000 250 1200 280 V360 H0 Z" fill="var(--sage)" opacity="0.28" />

      {/* Camino */}
      <path d="M585 262 H615 L690 360 H510 Z" fill="var(--rose-soft)" opacity="0.8" />

      {/* Arco del jardín */}
      <g className="garden-grow" style={{ animationDelay: "0s" }}>
        <path
          d="M556 268 V216 a44 44 0 0 1 88 0 V268"
          fill="none"
          stroke="var(--sage)"
          strokeWidth="9"
          strokeLinecap="round"
        />
        {[[556, 232], [556, 254], [644, 224], [644, 250], [572, 186], [628, 186]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="6" fill="var(--rose)" opacity="0.9" />
        ))}
      </g>

      {plants.map((p, i) => (
        <g key={i} transform={`translate(${p.x} ${p.y}) scale(${p.s})`}>
          <g
            className="garden-grow"
            style={{ animationDelay: `${0.15 + (Math.abs(p.x - CENTER) / CENTER) * 1.4}s` }}
          >
            {p.el}
          </g>
        </g>
      ))}
    </svg>
  );
}