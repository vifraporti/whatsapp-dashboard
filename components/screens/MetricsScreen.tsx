"use client";

import React, { ReactNode, useMemo } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
  Legend,
} from "recharts";

const pieColors = ["#111827", "#6b7280", "#9ca3af"] as const;

/* ================= TYPES ================= */

type CardProps = {
  children: ReactNode;
};

type CardHeaderProps = {
  title: string;
};

type CardBodyProps = {
  children: ReactNode;
};

type TrendType = "up" | "down" | "flat";

type TableColumn = {
  key: string;
  label: string;
};

type TableRow = Record<string, ReactNode>;

type TableProps = {
  columns: TableColumn[];
  rows: TableRow[];
};

type TrendPillProps = {
  trend: TrendType;
};

type HourlyPoint = {
  hour: string;
  msgs: number;
  resp: number;
};

type PiePoint = {
  name: string;
  value: number;
};

type ProductRow = {
  product: string;
  mentions: number;
  trend: TrendType;
  sentiment: string;
};

type MetricsScreenProps = {
  period?: string;
};

/* ================= COMPONENTES BASE ================= */

function Card({ children }: CardProps) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
      {children}
    </div>
  );
}

function CardHeader({ title }: CardHeaderProps) {
  return (
    <div className="border-b border-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-800">
      {title}
    </div>
  );
}

function CardBody({ children }: CardBodyProps) {
  return <div className="p-4">{children}</div>;
}

function Table({ columns, rows }: TableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200">
      <div className="overflow-auto">
        <table className="min-w-[700px] w-full border-collapse bg-white">
          <thead>
            <tr className="bg-neutral-50">
              {columns.map((c) => (
                <th
                  key={c.key}
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-600 border-b border-neutral-200"
                >
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr
                key={idx}
                className="border-b last:border-b-0 border-neutral-200 hover:bg-neutral-50/60"
              >
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className="px-4 py-3 text-sm text-neutral-800"
                  >
                    {r[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TrendPill({ trend }: TrendPillProps) {
  const label =
    trend === "up"
      ? "Subindo"
      : trend === "down"
      ? "Caindo"
      : "Estável";

  const cls =
    trend === "up"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : trend === "down"
      ? "border-rose-200 bg-rose-50 text-rose-700"
      : "border-neutral-200 bg-neutral-50 text-neutral-700";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-semibold ${cls}`}
    >
      {label}
    </span>
  );
}

/* ================= MOCK DATA ================= */

function makeSeriesHourly(): HourlyPoint[] {
  return Array.from({ length: 24 }).map((_, h) => {
    const v = 20 + Math.sin(h / 2) * 10 + Math.random() * 5;

    return {
      hour: `${h}h`,
      msgs: Math.round(v),
      resp: Number((1 + Math.random()).toFixed(2)),
    };
  });
}

/* ================= SCREEN ================= */

export default function MetricsScreen({ period }: MetricsScreenProps) {
  const data = useMemo<HourlyPoint[]>(() => makeSeriesHourly(), []);

  const pieData: PiePoint[] = [
    { name: "Compra", value: 55 },
    { name: "Dúvida", value: 30 },
    { name: "Outros", value: 15 },
  ];

  const sentimentData: PiePoint[] = [
    { name: "Positivo", value: 65 },
    { name: "Neutro", value: 25 },
    { name: "Negativo", value: 10 },
  ];

  const products: ProductRow[] = [
    { product: "Notebook", mentions: 145, trend: "up", sentiment: "Positivo" },
    { product: "Monitor", mentions: 98, trend: "flat", sentiment: "Neutro" },
    { product: "Teclado", mentions: 67, trend: "down", sentiment: "Negativo" },
  ];

  return (
    <div className="space-y-6 min-w-0">
      {period ? (
        <div className="text-sm text-neutral-500">Período: {period}</div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 min-w-0">
        {[
          { label: "Total de Mensagens", value: "1.250" },
          { label: "Clientes Únicos", value: "342" },
          { label: "Taxa de Resposta", value: "98.5%" },
          { label: "Tempo Médio", value: "1.2s" },
        ].map((kpi, i) => (
          <Card key={i}>
            <CardBody>
              <div className="text-xs text-neutral-500">{kpi.label}</div>
              <div className="mt-2 text-2xl font-semibold text-neutral-900">
                {kpi.value}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader title="Mensagens por Hora (24h)" />
        <CardBody>
          <div className="w-full h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="msgs"
                  stroke="#111827"
                  fill="#111827"
                  fillOpacity={0.1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 min-w-0">
        <Card>
          <CardHeader title="Distribuição por Tipo" />
          <CardBody>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip />
                  <Legend />
                  <Pie
                    data={pieData}
                    dataKey="value"
                    innerRadius={50}
                    outerRadius={80}
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={pieColors[i]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Sentimento das Conversas" />
          <CardBody>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sentimentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="value"
                    fill="#111827"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Tempo Médio de Resposta" />
          <CardBody>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="resp"
                    stroke="#2563eb"
                    fill="#2563eb"
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader title="Top Produtos Mencionados" />
        <CardBody>
          <Table
            columns={[
              { key: "product", label: "Produto" },
              { key: "mentions", label: "Menções" },
              { key: "trend", label: "Trend" },
              { key: "sentiment", label: "Sentimento" },
            ]}
            rows={products.map((p) => ({
              product: <span className="font-semibold">{p.product}</span>,
              mentions: <span className="font-semibold">{p.mentions}</span>,
              trend: <TrendPill trend={p.trend} />,
              sentiment: (
                <span className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2 py-1 text-xs font-semibold text-neutral-800">
                  {p.sentiment}
                </span>
              ),
            }))}
          />
        </CardBody>
      </Card>
    </div>
  );
}