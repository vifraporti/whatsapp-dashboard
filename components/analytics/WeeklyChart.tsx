"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

import { Zap } from "lucide-react";

type ChartData = {
  day: string;
  mensagens: number;
  pedidos: number;
};

type Metrics = {
  leadsRecuperados: number;
  auxiliosVendedor: number;
};

type Props = {
  data: ChartData[];
  metrics: Metrics;
};

function classNames(...s: Array<string | false | undefined | null>) {
  return s.filter(Boolean).join(" ");
}

function MiniStat({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div
      className={classNames(
        "rounded-2xl border p-4 shadow-sm",
        accent
          ? "bg-gradient-to-r from-violet-50 to-indigo-50 border-violet-200"
          : "bg-slate-50 border-slate-200"
      )}
    >
      <p className={classNames("text-xs", accent ? "text-violet-800" : "text-slate-600")}>
        {label}
      </p>
      <p
        className={classNames(
          "mt-1 text-lg font-semibold",
          accent ? "text-violet-900" : "text-slate-900"
        )}
      >
        {value.toLocaleString("pt-BR")}
      </p>
    </div>
  );
}

export default function WeeklyChart({ data, metrics }: Props) {
  return (
    <div className="lg:col-span-2 rounded-3xl p-5 bg-white border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2">
          <Zap className="w-5 h-5 text-violet-700" />
          <h2 className="font-semibold">Atividade semanal</h2>
        </div>
        <span className="text-xs text-slate-500">Mock data</span>
      </div>


    <div className="mt-4 h-[300px]">

  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="mensagens" strokeWidth={2} dot={false} />
      <Line type="monotone" dataKey="pedidos" strokeWidth={2} dot={false} />
    </LineChart>
  </ResponsiveContainer>

</div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <MiniStat label="Leads recuperados" value={metrics.leadsRecuperados} />
        <MiniStat
          label="Auxílios ao vendedor"
          value={metrics.auxiliosVendedor}
          accent
        />
        <MiniStat label="Suportes finalizados" value={74} />
      </div>
    </div>
  );
}