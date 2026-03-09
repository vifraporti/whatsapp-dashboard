"use client";

import { PointsRule } from "../../lib/ia/types";

type Props = {
  rule: PointsRule;
  basePoints: number;
  onClose: () => void;
};

export default function SimulationPreviewCard({
  rule,
  basePoints,
  onClose,
}: Props) {
  const simulatedTotal = basePoints + rule.points;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 rounded-2xl bg-white border border-violet-200 shadow-2xl p-5">
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-violet-800">
          Simulação ativa
        </h3>

        <button
          onClick={onClose}
          className="text-xs text-slate-500 hover:text-slate-700"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4 text-sm">

        <div>
          <p className="text-slate-500 text-xs">Evento</p>
          <p className="font-medium">{rule.label}</p>
        </div>

        <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
          
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Pontos atuais</span>
            <span className="font-medium">
              {basePoints.toLocaleString("pt-BR")}
            </span>
          </div>

          <div className="flex justify-between text-sm mt-2 text-emerald-600">
            <span>Ganho simulado</span>
            <span className="font-semibold">
              +{rule.points}
            </span>
          </div>

          <div className="border-t mt-3 pt-3 flex justify-between text-base font-semibold text-violet-700">
            <span>Total após simulação</span>
            <span>
              {simulatedTotal.toLocaleString("pt-BR")}
            </span>
          </div>

        </div>

      </div>

      <button
        onClick={onClose}
        className="mt-5 w-full rounded-xl bg-violet-600 text-white py-2 text-sm hover:bg-violet-700 transition"
      >
        Encerrar simulação
      </button>
    </div>
  );
}