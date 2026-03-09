"use client";

import React, { useMemo, useState } from "react";

import type { IAEvent, IAEventType, PointsRule } from "../../../lib/ia/types";
import { POINT_RULES } from "@/lib/ia/rules";
import { calcLevel } from "../../../lib/ia/level";

import PointsCard from "@/components/analytics/PointsCard";
import PerformanceCard from "@/components/analytics/PerformanceCard";
import WeeklyChart from "@/components/analytics/WeeklyChart";
import PointsRules from "@/components/analytics/PointsRules";
import SimulatorModal from "@/components/analytics/SimulatorModal";
import RecentEvents from "@/components/analytics/RecentEvents";
import StatusCard from "@/components/analytics/StatusCard";
import SimulationPreviewCard from "@/components/analytics/SimulationPreviewCard";

import { MessageCircle, ShoppingCart, TrendingUp, Sparkles, Plus } from "lucide-react";

/* ================= TYPES (local) ================= */

type ChartData = {
  day: string;
  mensagens: number;
  pedidos: number;
};

type Metrics = {
  mensagensRespondidas: number;
  tempoMedioRespostaSeg: number;
  pedidosIniciados: number;
  pedidosConcluidos: number;
  leadsRecuperados: number;
  taxaConversao: number;
  auxiliosVendedor: number;
};

type ImpactoFinanceiro = {
  receitaGerada: number;
  economiaEquipe: number;
  custoMensalIA: number;
  roi: number;
};

/* ================= DATA ================= */

const initialChartData: ChartData[] = [
  { day: "Seg", mensagens: 420, pedidos: 12 },
  { day: "Ter", mensagens: 510, pedidos: 18 },
  { day: "Qua", mensagens: 480, pedidos: 15 },
  { day: "Qui", mensagens: 620, pedidos: 22 },
  { day: "Sex", mensagens: 700, pedidos: 27 },
  { day: "Sáb", mensagens: 330, pedidos: 9 },
  { day: "Dom", mensagens: 260, pedidos: 6 },
];

export default function CentralIAWhatsAppPage() {
  const [points, setPoints] = useState<number>(3450);

  const [previewRule, setPreviewRule] = useState<PointsRule | null>(null);

  const [events, setEvents] = useState<IAEvent[]>([
    {
      id: "evt_1",
      type: "pedido_criado",
      title: "Pedido criado com sucesso",
      points: 25,
      at: "Hoje • 08:12",
    },
    {
      id: "evt_2",
      type: "mensagem_resolvida",
      title: "Atendimento resolvido automaticamente",
      points: 5,
      at: "Hoje • 07:58",
    },
  ]);

  const metrics = useMemo<Metrics>(
    () => ({
      mensagensRespondidas: 3240,
      tempoMedioRespostaSeg: 12,
      pedidosIniciados: 188,
      pedidosConcluidos: 142,
      leadsRecuperados: 61,
      taxaConversao: 0.187,
      auxiliosVendedor: 96,
    }),
    []
  );

  const impactoFinanceiro = useMemo<ImpactoFinanceiro>(() => {
    const receitaGerada = 28750.5;
    const economiaEquipe = 5400;
    const custoMensalIA = 799;

    const ganhoTotal = receitaGerada + economiaEquipe;
    const roi = (ganhoTotal - custoMensalIA) / Math.max(1, custoMensalIA);

    return { receitaGerada, economiaEquipe, custoMensalIA, roi };
  }, []);

  const level = useMemo(() => calcLevel(points), [points]);

  const [activeSimulator, setActiveSimulator] = useState<"mensagens" | "compras" | "impacto" | null>(
    null
  );

  const handleSimulate = (type: IAEventType) => {
    const rule = POINT_RULES.find((r) => r.type === type);
    if (!rule) return;

    setPoints((p) => p + rule.points);

    setEvents((prev) => [
      {
        id: `evt_${Date.now()}`,
        type,
        title: rule.label,
        points: rule.points,
        at: "Agora",
      },
      ...prev,
    ]);
  };

  const handlePreview = (type: IAEventType) => {
    const rule = POINT_RULES.find((r) => r.type === type);
    if (!rule) return;

    setPreviewRule(rule);
  };

  return (
    <div className="min-h-screen text-slate-900 p-4 md:p-8 lg:p-10">
      <div className="w-full space-y-6 md:space-y-8">
        {/* HEADER */}
        <header className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="relative p-6 md:p-8 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Central da IA • WhatsApp Business</span>
              </div>

              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Pontos, performance e impacto da sua IA
              </h1>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveSimulator("mensagens")}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-violet-300 hover:bg-violet-50 transition shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">Simular mensagens</span>
              </button>

              <button
                onClick={() => setActiveSimulator("compras")}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-violet-300 hover:bg-violet-50 transition shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <ShoppingCart className="w-4 h-4" />
                <span className="text-sm">Simular compras</span>
              </button>

              <button
                onClick={() => setActiveSimulator("impacto")}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-violet-300 hover:bg-violet-50 transition shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Impacto</span>
              </button>
            </div>
          </div>
        </header>

        <SimulatorModal
          active={activeSimulator}
          onClose={() => setActiveSimulator(null)}
          onApplyMensagens={(qty: number) => {
            const totalPoints = qty * 5;

            setPoints((prev) => prev + totalPoints);

            setEvents((prev) => [
              {
                id: `evt_${Date.now()}`,
                type: "mensagem_resolvida",
                title: `${qty} mensagens resolvidas`,
                points: totalPoints,
                at: "Agora",
              },
              ...prev,
            ]);

            setActiveSimulator(null);
          }}
          onSimulatePedido={() => handleSimulate("pedido_criado")}
          impactoFinanceiro={impactoFinanceiro}
        />

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <PointsCard points={points} level={level} />
          <PerformanceCard metrics={metrics} />
        </section>

        <section className="space-y-6 overflow-x-auto">
          <WeeklyChart data={initialChartData} metrics={metrics} />
          <PointsRules rules={POINT_RULES} onSimulate={(rule: PointsRule) => handlePreview(rule.type)} />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StatusCard />
          <RecentEvents events={events} />
        </section>

        {previewRule && (
          <SimulationPreviewCard
            rule={previewRule}
            basePoints={points}
            onClose={() => {
              setPreviewRule(null);
            }}
          />
        )}
      </div>
    </div>
  );
}