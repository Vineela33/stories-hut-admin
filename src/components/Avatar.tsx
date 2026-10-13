const TONES = [
  "linear-gradient(135deg,#7c3aed,#db2777)",
  "linear-gradient(135deg,#0ea5e9,#6366f1)",
  "linear-gradient(135deg,#f59e0b,#ef4444)",
  "linear-gradient(135deg,#10b981,#0d9488)",
  "linear-gradient(135deg,#a855f7,#f43f5e)",
];

export function Avatar({ name, size, soft }: { name: string; size?: "sm" | "lg"; soft?: boolean }) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
  const idx = name.split("").reduce((h, c) => h + c.charCodeAt(0), 0) % TONES.length;
  return (
    <span
      className={`avatar ${size ?? ""} ${soft ? "soft" : ""}`}
      style={soft ? undefined : { background: TONES[idx] }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}
