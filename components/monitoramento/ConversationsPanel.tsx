"use client";

import React from "react";
import ConversationRow from "./ConversationRow";
import { Conversation } from "@/lib/types/conversation";

type DateRange = {
  startDate: string;
  endDate: string;
};

type Props = {
  className?: string;
  filtered: Conversation[];
  selected?: Conversation;
  onSelect: (id: string) => void;
  openDetails: (id?: string) => void;
  query: string;
  setQuery: (v: string) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  setCustomDate: (range: DateRange | null) => void;
};

export default function ConversationsPanel({
  className = "",
  filtered,
  selected,
  onSelect,
  query,
  setQuery,
}: Props) {
  return (
    <div className={`col-span-12 lg:col-span-4 min-h-0 flex ${className}`}>
      <div className="flex flex-col flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-0">

        {/* HEADER */}
        <div className="p-4 border-b border-slate-200">
          <div className="text-sm font-black text-slate-700 mb-3">
            Lista de Conversas
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-2xl border border-slate-200 bg-slate-50">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar conversas..."
              className="w-full bg-transparent outline-none text-sm font-semibold text-slate-800 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* LISTA */}
        <div className="flex flex-col flex-1 min-h-0">
          <div className="p-3 flex-1 overflow-y-auto space-y-2 min-h-0">
            {filtered.map((c) => (
              <ConversationRow
                key={c.id}
                convo={c}
                active={selected?.id === c.id}
                onOpen={() => onSelect(c.id)}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}