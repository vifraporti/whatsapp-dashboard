"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type ChartPoint = {
  hour?: string;
  day?: string;
  msgs: number;
};

type Props = {
  series: ChartPoint[];
  period: "24h" | "7d" | "30d";
};

export default function MetricsChart({ series, period }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-4">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={series}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={period === "24h" ? "hour" : "day"} />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="msgs"
              stroke="#111827"
              fill="#111827"
              strokeWidth={2}
              fillOpacity={0.15}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}