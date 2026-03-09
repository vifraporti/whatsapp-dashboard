"use client";

import { IAEvent, IAEventType } from "../../lib/ia/types";
import {
  MessageCircle,
  ShoppingCart,
  TrendingUp,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";

type Props = {
  events: IAEvent[];
};

export default function RecentEvents({ events }: Props) {
  return (
    <div className="rounded-3xl p-5 bg-white border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2">
          <Zap className="w-5 h-5 text-violet-700" />
          <h2 className="font-semibold">Eventos recentes</h2>
        </div>
        <span className="text-xs text-slate-500">
          Clique em simular para adicionar
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        {events.slice(0, 6).map((e) => (
          <div
            key={e.id}
            className="rounded-2xl bg-slate-50 border border-slate-200 p-4 flex items-start gap-3 hover:border-violet-200 hover:bg-violet-50/40 transition"
          >
            <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center">
              <EventIcon type={e.type} />
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{e.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{e.at}</p>
                </div>

                <span className="text-xs px-2 py-1 rounded-full bg-white border border-violet-200 text-violet-800 whitespace-nowrap font-medium">
                  +{e.points} pts
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-200 p-4">
        <p className="text-xs text-violet-700 font-medium mb-1">
          Próximo upgrade
        </p>
        <p className="text-sm text-slate-700">
          Chegando no próximo nível: desbloqueia recuperação de carrinho,
          follow-up inteligente e relatório diário.
        </p>
      </div>
    </div>
  );
}

function EventIcon({ type }: { type: IAEventType }) {
  const map: Record<IAEventType, React.ElementType> = {
    mensagem_resolvida: MessageCircle,
    pedido_criado: ShoppingCart,
    lead_recuperado: TrendingUp,
    suporte_finalizado: ShieldCheck,
    auxilio_vendedor: Users,
  };

  const Icon = map[type] ?? Zap;
  return <Icon className="w-5 h-5 text-violet-700" />;
}