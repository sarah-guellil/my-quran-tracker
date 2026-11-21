// Plantas del jardín, dibujadas en SVG.
// Cada planta tiene su base en (0, 0) y crece hacia arriba,
// así se pueden colocar en cualquier punto con translate().

const STEM = "var(--sage)";

function Leaf({ x, y, flip = false }: { x: number; y: number; flip?: boolean }) {
  return (
    <path
      d="M0 0 C5 -7 15 -8 20 -3 C14 3 5 3 0 0 Z"
      fill={STEM}
      transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}
    />
  );
}

export function Daisy() {
  return (
    <g>
      <path d="M0 0 V-38" stroke={STEM} strokeWidth="2.5" strokeLinecap="round" />
      <Leaf x={0} y={-12} />
      <g transform="translate(0 -40)">
        {Array.from({ length: 10 }, (_, i) => (
          <ellipse
            key={i}
            cx="0"
            cy="-7"
            rx="2.8"
            ry="6.5"
            fill="#FFFFFF"
            stroke="var(--border)"
            strokeWidth="0.6"
            transform={`rotate(${i * 36})`}
          />
        ))}
        <circle r="4" fill="var(--gold)" />
      </g>
    </g>
  );
}

export function Violet() {
  return (
    <g>
      <path d="M0 0 V-26" stroke={STEM} strokeWidth="2.5" strokeLinecap="round" />
      <Leaf x={0} y={-8} flip />
      <g transform="translate(0 -28)">
        {Array.from({ length: 5 }, (_, i) => (
          <ellipse key={i} cx="0" cy="-5" rx="4" ry="5.5" fill="var(--mauve)" transform={`rotate(${i * 72})`} />
        ))}
        <circle r="2.4" fill="var(--gold)" />
      </g>
    </g>
  );
}

export function Tulip({ color = "var(--rose)" }: { color?: string }) {
  return (
    <g>
      <path d="M0 0 V-46" stroke={STEM} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M0 -4 C-4 -16 -12 -26 -14 -36 C-6 -30 -2 -20 0 -10 Z" fill={STEM} />
      <path
        d="M0 -44 C-11 -45 -13 -58 -10 -68 L-4 -60 L0 -68 L4 -60 L10 -68 C13 -58 11 -45 0 -44 Z"
        fill={color}
      />
    </g>
  );
}

export function Rose() {
  return (
    <g>
      <path d="M0 0 C2 -18 -2 -34 0 -48" stroke={STEM} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <Leaf x={0} y={-16} />
      <Leaf x={0} y={-28} flip />
      <g transform="translate(0 -56)">
        <circle r="11" fill="var(--rose)" />
        <path
          d="M1 0 a2 2 0 1 1 -4 0 a4 4 0 1 1 8 0 a6 6 0 1 1 -12 0 a8 8 0 1 1 16 0"
          fill="none"
          stroke="var(--ink)"
          strokeOpacity="0.25"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </g>
    </g>
  );
}

export function Lavender() {
  return (
    <g>
      {[-8, 0, 8].map((dx, i) => (
        <g key={i} transform={`translate(${dx} 0) rotate(${dx * 1.2})`}>
          <path d="M0 0 V-52" stroke={STEM} strokeWidth="2" strokeLinecap="round" />
          {Array.from({ length: 6 }, (_, j) => (
            <ellipse key={j} cx={j % 2 ? 2 : -2} cy={-34 - j * 4} rx="2.6" ry="3.4" fill="var(--mauve)" />
          ))}
        </g>
      ))}
    </g>
  );
}

export function Hydrangea() {
  const blooms: [number, number, string][] = [
    [-16, -40, "var(--mauve)"],
    [0, -50, "var(--rose)"],
    [16, -42, "var(--mauve)"],
    [-6, -30, "var(--rose)"],
    [10, -30, "var(--mauve)"],
  ];
  return (
    <g>
      <ellipse cx="0" cy="-16" rx="30" ry="18" fill={STEM} />
      {blooms.map(([x, y, c], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <circle r="11" fill={c} opacity="0.85" />
          <circle r="11" fill="none" stroke="var(--surface)" strokeOpacity="0.5" strokeDasharray="3 4" />
        </g>
      ))}
    </g>
  );
}

export function BlossomTree() {
  const blossoms: [number, number][] = [
    [-34, -96], [-14, -116], [12, -112], [34, -94], [-24, -80],
    [22, -76], [0, -96], [-40, -74], [40, -72], [6, -128],
  ];
  return (
    <g>
      <path d="M-6 0 C-4 -30 -6 -50 0 -64 C6 -50 4 -30 6 0 Z" fill="var(--mauve)" opacity="0.7" />
      <path d="M0 -50 C-10 -58 -18 -60 -24 -70" stroke="var(--mauve)" strokeOpacity="0.7" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M0 -56 C10 -62 18 -66 22 -76" stroke="var(--mauve)" strokeOpacity="0.7" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="0" cy="-94" r="46" fill={STEM} opacity="0.55" />
      <circle cx="-26" cy="-84" r="28" fill={STEM} opacity="0.5" />
      <circle cx="26" cy="-84" r="28" fill={STEM} opacity="0.5" />
      {blossoms.map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          {Array.from({ length: 5 }, (_, j) => (
            <ellipse key={j} cx="0" cy="-3.5" rx="2.6" ry="3.6" fill="#F6DDE3" transform={`rotate(${j * 72})`} />
          ))}
          <circle r="1.6" fill="var(--rose)" />
        </g>
      ))}
    </g>
  );
}
