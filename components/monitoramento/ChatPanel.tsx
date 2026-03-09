"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Badge from "./Badge";
import Bubble from "./Bubble";
import ActionButton from "./ActionButton";
import Icon from "../ui/Icon";

/* ================= TYPES ================= */

type Message = {
  who: "bot" | "user" | "atendente";
  at: string;
  text: string;
};

type Conversation = {
  id: string;
  nome?: string;
  telefone?: string;
  status?: string;
  historico?: Message[];
};

type Props = {
  className?: string;
  selected?: Conversation;
  openDetails: (id?: string) => void;
};

/* ================= COMPONENT ================= */

export default function ChatPanel({ className = "", selected, openDetails }: Props) {

  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [extraMessages, setExtraMessages] = useState<Record<string, Message[]>>({});

  const messages = useMemo(() => {

    const base = selected?.historico ?? [];
    const extras = selected?.id ? extraMessages[selected.id] ?? [] : [];

    return [...base, ...extras];

  }, [selected, extraMessages]);

  /* ================= AUTO SCROLL ================= */

  useEffect(() => {

    const el = scrollRef.current;
    if (!el) return;

    const isNearBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < 120;

    if (isNearBottom) {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: "smooth",
      });
    }

  }, [messages]);

  /* ================= SEND ================= */

const selectedId = selected?.id ?? "";

const handleSend = useCallback(() => {

  const text = input.trim();
  if (!text || !selectedId) return;

 const novaMensagem: Message = {
  who: "atendente",
  at: new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }),
  text,
};

 setExtraMessages((prev) => ({
  ...prev,
  [selectedId]: [...(prev[selectedId] || []), novaMensagem],
}));

  setInput("");

}, [input, selectedId]);
  /* ================= UI ================= */

  return (

    <div className={`col-span-12 lg:col-span-8 flex flex-col h-full min-h-0 ${className}`}>

      <div className="flex flex-col flex-1 h-full min-h-0 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

        {/* HEADER */}

        <div className="shrink-0 p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">

          <div className="min-w-0">

            <div className="flex items-center gap-2">

              <div className="font-black text-slate-900 truncate">
                {selected?.nome || "Selecione uma conversa"}
              </div>

              {selected?.status && (
                <Badge
                  tone={
                    selected.status === "Ativa"
                      ? "green"
                      : selected.status === "Aguardando"
                      ? "amber"
                      : "slate"
                  }
                >
                  {selected.status}
                </Badge>
              )}

            </div>

            <div className="text-xs text-slate-500 truncate">
              {selected?.telefone}
            </div>

          </div>

          <ActionButton
            tone="info"
            icon={<Icon name="wand" />}
            onClick={() => openDetails(selected?.id)}
            disabled={!selected?.id}
          >
            Detalhes
          </ActionButton>

        </div>

        {/* MESSAGES */}

        <div className="flex-1 min-h-0 overflow-hidden bg-slate-50">

          <div
            ref={scrollRef}
            className="h-full overflow-y-auto px-4 py-4 space-y-3 scroll-invisible"
          >

            {messages.map((m, idx) => (
              <Bubble key={`${m.at}-${idx}`} who={m.who} at={m.at} text={m.text} />
            ))}

          </div>

        </div>

        {/* INPUT */}

        <div className="shrink-0 p-4 border-t border-slate-200 bg-white flex gap-2">

          <input
            type="text"
            placeholder="Digite sua resposta..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            disabled={!selected?.id}
            className="flex-1 rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-slate-200"
          />

          <button
            onClick={handleSend}
            disabled={!selected?.id || !input.trim()}
            className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-semibold disabled:opacity-50"
          >
            Enviar
          </button>

        </div>

      </div>

    </div>

  );
}