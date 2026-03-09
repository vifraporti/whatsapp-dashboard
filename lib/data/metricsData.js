export function clampNumber(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export function makeSeriesHourly() {
  return Array.from({ length: 24 }).map((_, h) => {
    const peak = Math.exp(-Math.pow((h - 13) / 4.5, 2));
    const base = 12 + 6 * Math.sin((h / 24) * Math.PI * 2 + 1.2);
    const noise = (Math.sin(h * 1.7) + Math.cos(h * 0.9)) * 1.6;
    const v = Math.round(clampNumber(base + 30 * peak + noise, 0, 60));
    const resp =
      Math.round(clampNumber(1.6 - peak * 0.6 + Math.cos(h * 0.7) * 0.05, 0.7, 2.2) * 10) / 10;

    return { hour: `${h}h`, msgs: v, resp };
  });
}

export function makeSeriesDays(days) {
  return Array.from({ length: days }).map((_, i) => {
    const d = i + 1;
    const wave = 0.5 + 0.5 * Math.sin(i * 0.7 + 0.6);
    const msgs = Math.round(320 + 220 * wave + Math.cos(i * 1.3) * 25);
    const resp = Math.round((1.4 - wave * 0.4 + Math.sin(i * 0.9) * 0.06) * 10) / 10;
    const pos = Math.round(55 + 12 * wave);
    const neu = Math.round(30 - 6 * wave);
    const neg = 100 - pos - neu;

    return { day: `Dia ${d}`, msgs, resp, pos, neu, neg };
  });
}

// ✅ aqui SEM JSX
export function makeSentimentBars() {
  return [
    { name: "Positivo", value: 65 },
    { name: "Neutro", value: 25 },
    { name: "Negativo", value: 10 },
  ];
}