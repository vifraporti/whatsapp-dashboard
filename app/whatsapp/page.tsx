"use client";

import { useState } from "react";
import MetricsScreen from "../../components/screens/MetricsScreen";

export default function Page() {
  const [period, setPeriod] = useState("24h");

  return (
    <>
      {/* HEADER */}
      <div className="mb-6 rounded-3xl p-6">
        <div className="flex items-center justify-between">

          {/* ESQUERDA */}
          <div>
            <div className="text-xl font-semibold text-neutral-900">
              WhatsApp
            </div>
            <div className="text-sm text-neutral-600">
              Acompanhar performance do WhatsApp
            </div>
          </div>

          {/* DIREITA — FILTRO */}
          <div className="flex items-center gap-3">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm outline-none"
            >
              <option value="24h">Últimas 24h</option>
              <option value="7d">7 dias</option>
              <option value="30d">30 dias</option>
              <option value="custom">Personalizado</option>
            </select>

            {period === "custom" && (
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm shadow-sm outline-none"
                />
                <input
                  type="date"
                  className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm shadow-sm outline-none"
                />
              </div>
            )}
          </div>

        </div>
      </div>

      {/* CONTEÚDO */}
      <MetricsScreen period={period} />
    </>
  );
}