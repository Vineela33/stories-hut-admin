const PALETTES = [
  ["#5b21b6", "#c026d3"],
  ["#0f766e", "#2dd4bf"],
  ["#9a3412", "#f59e0b"],
  ["#1e3a8a", "#38bdf8"],
  ["#7f1d1d", "#fb7185"],
  ["#14532d", "#84cc16"],
  ["#3b0764", "#a855f7"],
  ["#78350f", "#fbbf24"],
  ["#0c4a6e", "#67e8f9"],
  ["#4a044e", "#f472b6"],
];

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function Cover({ title, badge, size }: { title: string; badge?: string; size?: "lg" }) {
  const [a, b] = PALETTES[hash(title) % PALETTES.length];
  const angle = 120 + (hash(title) % 90);
  const initial = title.replace(/^(The|A|An)\s+/i, "").charAt(0).toUpperCase();
  return (
    <div
      className={`cover ${size ?? ""}`}
      style={{ background: `linear-gradient(${angle}deg, ${a}, ${b})` }}
      aria-hidden="true"
    >
      <span>{initial}</span>
      {badge && <em className="badge">{badge}</em>}
    </div>
  );
}
