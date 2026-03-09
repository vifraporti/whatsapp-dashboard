"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { ReactNode } from "react";

type Trend = "up" | "down" | "flat";

type Props = {
  label: string;
  value: string | number;
  delta: string | number;
  trend?: Trend;
  icon?: ReactNode;
};

export default function KpiCard({ label, value, delta, trend = "flat", icon }: Props) {

  const tone =
    trend === "up"
      ? "text-emerald-600"
      : trend === "down"
      ? "text-rose-600"
      : "text-neutral-600";

  const bg =
    trend === "up"
      ? "bg-emerald-50"
      : trend === "down"
      ? "bg-rose-50"
      : "bg-neutral-50";

  const iconTrend =
    trend === "up"
      ? <TrendingUp className="h-4 w-4" />
      : trend === "down"
      ? <TrendingDown className="h-4 w-4" />
      : <Minus className="h-4 w-4" />;

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="flex justify-between">
        <div>
          <div className="text-xs text-neutral-500">{label}</div>
          <div className="text-2xl font-semibold">{value}</div>
        </div>

        <div>{icon}</div>
      </div>

      <div className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${bg} ${tone}`}>
        {iconTrend}
        {delta}
      </div>
    </div>
  );
}