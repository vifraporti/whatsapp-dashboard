"use client";

import React from "react";
import { ShoppingCart } from "lucide-react";


type ImpactoFinanceiro = {
  receitaGerada: number;
  economiaEquipe: number;
  custoMensalIA: number;
  roi: number;
};

type Props = {
  active: "mensagens" | "compras" | "impacto" | null;
  onClose: () => void;
  onApplyMensagens: (qty: number) => void;
  onSimulatePedido: () => void;
  impactoFinanceiro: ImpactoFinanceiro;
};

export default function SimulatorModal({
  active,
  onClose,
  onApplyMensagens,
  onSimulatePedido,
  impactoFinanceiro,
}: Props) {
  if (!active) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg mx-4 bg-white rounded-3xl shadow-2xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {active === "mensagens" && "Simulação de Mensagens"}
            {active === "compras" && "Simulação de Compras"}
            {active === "impacto" && "Impacto Financeiro"}
          </h2>

          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800 text-sm"
          >
            Fechar
          </button>
        </div>

        {active === "mensagens" && (
          <MensagensSimulador onApply={onApplyMensagens} />
        )}

        {active === "compras" && (
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Simule pedidos criados pela IA.
            </p>

            <button
              onClick={onSimulatePedido}
              className="w-full bg-violet-600 text-white rounded-xl py-2 hover:bg-violet-700 transition"
            >
              Simular pedido (+25 pts)
            </button>
          </div>
        )}

        {active === "impacto" && (
          <ImpactoView impacto={impactoFinanceiro} />
        )}
      </div>
    </div>
  );
}

function MensagensSimulador({
  onApply,
}: {
  onApply: (qty: number) => void;
}) {
  const [qty, setQty] = React.useState("");

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">
        Informe a quantidade de mensagens resolvidas pela IA:
      </p>

      <input
        type="number"
        min="0"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
        className="w-full border border-slate-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-400"
        placeholder="Ex: 100"
      />

      {Number(qty) > 0 && (
        <div className="p-4 rounded-xl bg-violet-50 border border-violet-200">
          <p className="text-sm text-slate-700">
            {qty} mensagens × 5 pontos =
          </p>
          <p className="text-xl font-semibold text-violet-800">
            {Number(qty) * 5} pontos
          </p>
        </div>
      )}

      <button
        disabled={Number(qty) <= 0}
        onClick={() => {
          onApply(Number(qty));
          setQty("");
        }}
        className="w-full bg-violet-600 text-white py-2 rounded-xl hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        Aplicar simulação
      </button>
    </div>
  );
}

function ImpactoView({ impacto }: { impacto: ImpactoFinanceiro }) {
  return (
    <div className="space-y-3">
      <Row label="Receita gerada" value={impacto.receitaGerada} />
      <Row label="Economia equipe" value={impacto.economiaEquipe} />
      <Row label="Custo mensal IA" value={impacto.custoMensalIA} muted />

      <div className="mt-4 p-4 rounded-xl bg-violet-50 border border-violet-200 text-center">
        ROI estimado: <b>{(impacto.roi * 100).toFixed(0)}%</b>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  muted,
}: {
  label: string;
  value: number;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <p className={muted ? "text-slate-500" : "text-slate-700"}>
        {label}
      </p>
      <p className="font-semibold">
        {value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </p>
    </div>
  );
}