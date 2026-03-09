"use client";

import { Brain } from "lucide-react";

function StatusRow({
  label,
  value,
  badge,
}: {
  label: string;
  value: string;
  badge?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 border border-slate-200 p-4">
      <p className="text-sm text-slate-600">{label}</p>

      {badge ? (
        <span className="text-xs px-3 py-1 rounded-full bg-white border border-violet-200 text-violet-800 font-medium">
          {value}
        </span>
      ) : (
        <p className="text-sm text-slate-800">{value}</p>
      )}
    </div>
  );
}

export default function StatusCard() {
  return (
    <div className="rounded-3xl p-5 bg-white border border-slate-200 shadow-sm">
      <div className="inline-flex items-center gap-2">
        <Brain className="w-5 h-5 text-violet-700" />
        <h2 className="font-semibold">Modo inteligência</h2>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatusRow label="Status" value="Treinada • Produção" badge />
        <StatusRow
          label="Base de conhecimento"
          value="Catálogo + Políticas + FAQ"
        />
        <StatusRow label="Embeddings" value="12.480 vetores" />
        <StatusRow label="Última atualização" value="Hoje • 07:30" />
        <StatusRow
          label="Segurança"
          value="Logs + Auditoria + Rate-limit"
        />
      </div>

      <div className="mt-4 rounded-2xl bg-gradient-to-r from-violet-50 to-fuchsia-50 border border-violet-200 p-4">
        <p className="text-xs text-violet-700 font-medium mb-1">
          Dica de produto
        </p>
        <p className="text-sm text-slate-700">
          Mostre “Top 5 dúvidas” e “Respostas reprovadas” pra virar um cockpit
          real da IA.
        </p>
      </div>
    </div>
  );
}