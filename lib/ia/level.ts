export function calcLevel(points: number) {
  const levels = [
    {
      name: "Iniciante",
      min: 0,
      max: 999,
      gradient: "from-slate-600 to-slate-800",
      ring: "ring-slate-200",
    },
    {
      name: "Operacional",
      min: 1000,
      max: 2999,
      gradient: "from-purple-600 to-indigo-700",
      ring: "ring-purple-200",
    },
    {
      name: "Eficiente",
      min: 3000,
      max: 5999,
      gradient: "from-fuchsia-600 to-purple-700",
      ring: "ring-fuchsia-200",
    },
    {
      name: "Estratégica",
      min: 6000,
      max: 9999,
      gradient: "from-indigo-700 to-purple-800",
      ring: "ring-indigo-200",
    },
    {
      name: "Autônoma",
      min: 10000,
      max: Infinity,
      gradient: "from-violet-600 to-fuchsia-700",
      ring: "ring-violet-200",
    },
  ];

  const current =
    levels.find((l) => points >= l.min && points <= l.max) ?? levels[0];

  const next = levels.find((l) => l.min === current.max + 1);

  const currentMax = Number.isFinite(current.max) ? current.max : points;
  const denom = Math.max(1, currentMax - current.min + 1);
  const progress = Math.min(1, Math.max(0, (points - current.min) / denom));
  const missing = next ? Math.max(0, next.min - points) : 0;

  return {
    levelName: current.name,
    gradient: current.gradient,
    ring: current.ring,
    progress,
    missing,
    nextName: next?.name ?? "—",
  };
}