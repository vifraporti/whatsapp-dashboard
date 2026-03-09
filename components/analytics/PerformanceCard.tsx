import { Brain, MessageCircle, Clock, ShoppingCart, Zap } from "lucide-react";
import MetricCard from "./MetricCard";

type Props = {
  metrics: {
    mensagensRespondidas: number;
    tempoMedioRespostaSeg: number;
    pedidosIniciados: number;
    pedidosConcluidos: number;
    leadsRecuperados: number;
    taxaConversao: number;
    auxiliosVendedor: number;
  };
};

export default function PerformanceCard({ metrics }: Props) {
  return (
    <div className="rounded-3xl p-5 bg-white border border-slate-200 shadow-sm">
      <div className="inline-flex items-center gap-2">
        <Brain className="w-5 h-5 text-violet-700" />
        <h2 className="font-semibold">Performance</h2>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <MetricCard
          icon={MessageCircle}
          label="Mensagens respondidas"
          value={metrics.mensagensRespondidas.toLocaleString("pt-BR")}
        />
        <MetricCard
          icon={Clock}
          label="Tempo médio"
          value={`${metrics.tempoMedioRespostaSeg}s`}
          accent
        />
        <MetricCard
          icon={ShoppingCart}
          label="Pedidos concluídos"
          value={metrics.pedidosConcluidos.toLocaleString("pt-BR")}
        />
        <MetricCard
          icon={Zap}
          label="Taxa conversão"
          value={`${(metrics.taxaConversao * 100).toFixed(1)}%`}
          accent
        />
      </div>

      <div className="mt-4 rounded-2xl bg-slate-50 border border-slate-200 p-4">
        <p className="text-xs text-slate-600 mb-1">Resumo rápido</p>
        <p className="text-sm text-slate-700">
          A IA iniciou <b>{metrics.pedidosIniciados}</b> pedidos e recuperou{" "}
          <b className="text-violet-800">
            {metrics.leadsRecuperados}
          </b>{" "}
          leads na semana.
        </p>
      </div>
    </div>
  );
}