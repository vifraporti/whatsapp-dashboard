"use client";

import React, { useMemo, useState, useRef, useEffect } from "react";

import { seedConversations } from "../../../lib/data/conversations";
import { Conversation } from "../../../lib/types/conversation";

import Toast from "../../../components/ui/Toast";
import TopBar from "../../../components/monitoramento/TopBar";
import ConversationsPanel from "@/components/monitoramento/ConversationsPanel";
import ChatPanel from "../../../components/monitoramento/ChatPanel";
import DetailsScreen from "@/components/monitoramento/DetailsScreen";

/* ================= TYPES ================= */

type DateRange = {
  startDate: string;
  endDate: string;
};

type DashboardProps = {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  query: string;
  setQuery: (q: string) => void;
  statusFilter: string;
  setStatusFilter: (s: string) => void;
  customDate: DateRange | null;
  setCustomDate: (d: DateRange | null) => void;
  openDetails: (id?: string) => void;
};

/* ================= DASHBOARD SCREEN ================= */

function DashboardScreen({
  conversations,
  selectedId,
  onSelect,
  query,
  setQuery,
  statusFilter,
  setStatusFilter,
  customDate,
  setCustomDate,
  openDetails,
}: DashboardProps) {
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return conversations
      .filter((c) =>
        statusFilter !== "Todas" ? c.status === statusFilter : true
      )
      .filter((c) =>
        q
          ? c.nome.toLowerCase().includes(q) ||
            c.telefone.toLowerCase().includes(q) ||
            (c.ultimaMsg || "").toLowerCase().includes(q)
          : true
      )
      .filter((c) => {
        if (!customDate) return true;

        const convoDate = new Date(c.createdAt);
        const start = new Date(customDate.startDate);
        const end = new Date(customDate.endDate);

        return convoDate >= start && convoDate <= end;
      });
  }, [conversations, query, statusFilter, customDate]);

  const selected =
    conversations.find((c) => c.id === selectedId) ||
    filtered[0] ||
    conversations[0];

  return (
    <div className="grid h-full min-h-0 grid-cols-12 gap-4 overflow-hidden px-4 pb-4 pt-4">
      <ConversationsPanel
        className="col-span-4 h-full min-h-0"
        filtered={filtered}
        selected={selected}
        onSelect={onSelect}
        openDetails={openDetails}
        query={query}
        setQuery={setQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        setCustomDate={setCustomDate}
      />

      <ChatPanel
        className="col-span-8 h-full min-h-0"
        selected={selected}
        openDetails={openDetails}
      />
    </div>
  );
}

/* ================= PAGE PRINCIPAL ================= */

export default function WhatsAppMonitoringDemo() {
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const toastTimer = useRef<NodeJS.Timeout | null>(null);

  const [route, setRoute] = useState<{
    name: "dashboard" | "details";
    convoId: string | null;
  }>({
    name: "dashboard",
    convoId: null,
  });

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todas");
  const [customDate, setCustomDate] = useState<DateRange | null>(null);

  const [selectedId, setSelectedId] = useState<string | null>(
    seedConversations[0]?.id || null
  );

  const [toast, setToast] = useState("");

  const selected = useMemo(
    () =>
      seedConversations.find((c) => c.id === selectedId) ||
      seedConversations[0],
    [selectedId]
  );

  const openDetails = (id?: string) => {
    const useId = id || selectedId;
    if (!useId) return;

    setRoute({
      name: "details",
      convoId: useId,
    });
  };

  const onToast = (t: string) => {
    setToast(t);

    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    toastTimer.current = setTimeout(() => {
      setToast("");
    }, 2400);
  };

  return (
    <div className="flex h-[calc(100vh-72px)] flex-col overflow-hidden bg-slate-100 rounded-[28px]">
      <TopBar
        onGoHome={() =>
          setRoute({
            name: "dashboard",
            convoId: null,
          })
        }
      />

      <div className="flex-1 min-h-0 overflow-hidden">
        {route.name === "dashboard" ? (
          <DashboardScreen
            conversations={seedConversations}
            selectedId={selectedId}
            onSelect={(id) => setSelectedId(id)}
            query={query}
            setQuery={setQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            customDate={customDate}
            setCustomDate={setCustomDate}
            openDetails={openDetails}
          />
        ) : (
          <div className="h-full min-h-0 overflow-hidden p-4">
            <DetailsScreen
              convo={
                seedConversations.find((c) => c.id === route.convoId) ||
                selected
              }
              onBack={() =>
                setRoute({
                  name: "dashboard",
                  convoId: null,
                })
              }
              onToast={onToast}
            />
          </div>
        )}
      </div>

      <Toast text={toast} onClose={() => setToast("")} />
    </div>
  );
}