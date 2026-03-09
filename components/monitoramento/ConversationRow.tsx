"use client";

import Avatar from "./Avatar";
import Badge from "./Badge";
import { Conversation } from "@/lib/types/conversation";

/* ================= TYPES ================= */

type Props = {
  convo: Conversation;
  active?: boolean;
  onOpen: () => void;
};

/* ================= COMPONENT ================= */

export default function ConversationRow({ convo, active, onOpen }: Props) {
  const tone =
    convo.status === "Ativa"
      ? "green"
      : convo.status === "Aguardando"
      ? "amber"
      : "slate";

  return (
    <button
      onClick={onOpen}
      className={`w-full text-left p-3 rounded-2xl border transition ${
        active
          ? "border-slate-300 bg-white shadow-sm"
          : "border-slate-200 bg-white/60 hover:bg-white"
      }`}
    >
      <div className="flex items-start gap-3">
        <Avatar name={convo.nome} />

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <div className="font-black text-slate-900 truncate">
              {convo.nome}
            </div>

            <div className="text-[11px] font-semibold text-slate-500">
              {convo.updatedAtLabel}
            </div>
          </div>

          <div className="text-xs text-slate-500 truncate">
            {convo.telefone}
          </div>

          <div className="mt-1 text-sm text-slate-800 truncate">
            {convo.ultimaMsg}
          </div>

          <div className="mt-2 flex items-center gap-2">
            <Badge tone={tone}>{convo.status}</Badge>

            <span className="text-[11px] font-semibold text-slate-500">
              {convo.mensagensCount} mensagens
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}