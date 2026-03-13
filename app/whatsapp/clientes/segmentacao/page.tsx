"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Star,
  Users,
  TrendingUp,
  UserX,
  Download,
  Plus,
  ChevronDown,
} from "lucide-react";

import { clientsSeed } from "../../../../lib/data/clients";

import CampanhaModal from "@/components/clientes/CampanhaModal";
import { exportClientsToCSV } from "@/lib/utils/exportClients";


/* ================= TYPES ================= */

type Client = {
  id: number | string;
  name: string;
  email: string;
  phone: string;
  status: string;
  totalSpent: number;
  purchasesCount: number;
  registrationDate: string;
};

type SegmentKey = string;
type SegmentFilter = "todos" | SegmentKey;

type Segment = {
  key: SegmentKey;
  label: string;
  data: Client[];
  icon: React.ReactNode;
};

/* ===== Formatador BRL ===== */

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function SegmentacaoPage() {
  const router = useRouter();

  const clients: Client[] = clientsSeed;

  const [selectedSegment, setSelectedSegment] = useState<SegmentKey | null>(null);

  const [modalSegmento, setModalSegmento] = useState(false);
  const [nomeSegmento, setNomeSegmento] = useState("");
  const [gastoMinimo, setGastoMinimo] = useState("");

  const [segmentFilter, setSegmentFilter] = useState<SegmentFilter>("todos");
  const [filterOpen, setFilterOpen] = useState(false);
  const [campanhaOpen, setCampanhaOpen] = useState(false);
  const [customSegments, setCustomSegments] = useState<Segment[]>([]);

  /* ================= MODAL ================= */

  function criarSegmento() {
    setModalSegmento(true);
  }

  function fecharModalSegmento() {
    setModalSegmento(false);
    setNomeSegmento("");
    setGastoMinimo("");
  }

  function salvarSegmento() {
    const nome = nomeSegmento.trim();
    const gastoMin = Number(gastoMinimo);

    if (!nome) {
      alert("Informe o nome do segmento.");
      return;
    }

    if (!gastoMinimo || isNaN(gastoMin) || gastoMin < 0) {
      alert("Informe um valor mínimo válido.");
      return;
    }

    const chaveNormalizada = nome.toLowerCase();

    const jaExiste = customSegments.some(
      (seg) => seg.key.toLowerCase() === chaveNormalizada
    );

    if (jaExiste) {
      alert("Já existe um segmento com esse nome.");
      return;
    }

    const filtrados = clients.filter((c) => c.totalSpent >= gastoMin);

    const novoSegmento: Segment = {
      key: nome,
      label: nome,
      data: filtrados,
      icon: <Users className="h-5 w-5" />,
    };

    setCustomSegments((prev) => [...prev, novoSegmento]);
    setSegmentFilter(nome);
    setSelectedSegment(nome);

    fecharModalSegmento();
  }


  /* ================= SEGMENTAÇÃO ================= */

  const vip = useMemo(() => clients.filter((c) => c.totalSpent > 5000), [clients]);

  const regular = useMemo(
    () => clients.filter((c) => c.totalSpent >= 1000 && c.totalSpent <= 5000),
    [clients]
  );

  const novo = useMemo(() => {
    const hoje = new Date();
    return clients.filter((c) => {
      const data = new Date(c.registrationDate);
      const diffDays = (hoje.getTime() - data.getTime()) / (1000 * 60 * 60 * 24);
      return diffDays <= 30;
    });
  }, [clients]);

  const inativo = useMemo(
    () => clients.filter((c) => c.status === "Inativo"),
    [clients]
  );

  const total = clients.length;

  const segments = useMemo<Segment[]>(
    () => [
      { key: "VIP", label: "VIP", data: vip, icon: <Star className="h-5 w-5" /> },
      { key: "Regular", label: "Regulares", data: regular, icon: <TrendingUp className="h-5 w-5" /> },
      { key: "Novo", label: "Novos", data: novo, icon: <Users className="h-5 w-5" /> },
      { key: "Inativo", label: "Inativos", data: inativo, icon: <UserX className="h-5 w-5" /> },
      ...customSegments,
    ],
    [vip, regular, novo, inativo, customSegments]
  );


  const filteredSegments = useMemo(() => {
    if (segmentFilter === "todos") return segments;
    return segments.filter((seg) => seg.key === segmentFilter);
  }, [segments, segmentFilter]);

  const filterLabel = useMemo(() => {
    if (segmentFilter === "todos") return "Todos";
    return segments.find((s) => s.key === segmentFilter)?.label ?? "Todos";
  }, [segmentFilter, segments]);

  const selectedSegmentObj = useMemo(() => {
    if (!selectedSegment) return null;
    return segments.find((s) => s.key === selectedSegment) ?? null;
  }, [selectedSegment, segments]);

/* ================= UI ================= */

  return (
    <div className="min-h-screen bg-neutral-100 p-8 text-slate-900">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* ================= HEADER ================= */}
        <div className="flex items-start gap-4">
          <button
            onClick={() => router.push("/whatsapp/clientes")}
            className="h-10 w-10 rounded-xl border border-slate-200 bg-white hover:shadow-sm flex items-center justify-center"
            aria-label="Voltar"
            type="button"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div>
            <h1 className="text-3xl font-bold tracking-tight">Segmentação de Clientes</h1>
            <p className="text-sm text-slate-500 mt-2">
              Analise e atue estrategicamente sobre sua base.
            </p>
          </div>
        </div>

        {/* ================= FILTRO (CARD EXPANSÍVEL) ================= */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <button
            type="button"
            onClick={() => setFilterOpen((v) => !v)}
            className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition"
          >
            <div className="text-left">
              <p className="text-xs text-slate-500">Filtro de segmento</p>
              <p className="text-sm font-semibold text-slate-900">{filterLabel}</p>
            </div>

            <ChevronDown
              className={`h-4 w-4 text-slate-500 transition-transform ${
                filterOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {filterOpen && (
            <div className="border-t border-slate-200 p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSegmentFilter("todos");
                    setFilterOpen(false);
                  }}
                  className={`px-4 py-3 rounded-xl border text-sm text-left ${
                    segmentFilter === "todos"
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  Todos
                </button>

                {segments.map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => {
                      setSegmentFilter(s.key);
                      setFilterOpen(false);
                    }}
                    className={`px-4 py-3 rounded-xl border text-sm text-left flex items-center gap-2 ${
                      segmentFilter === s.key
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <span className="opacity-80">{s.icon}</span>
                    <span>{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ================= TABELA ================= */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 font-semibold">
            Tabela de Segmentos
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="px-6 py-4 text-left">Segmento</th>
                <th className="px-6 py-4 text-left">Quantidade</th>
                <th className="px-6 py-4 text-left">Valor Total</th>
                <th className="px-6 py-4 text-left">Ticket Médio</th>
              </tr>
            </thead>

            <tbody>
              {filteredSegments.map((seg) => {
                const totalValue = seg.data.reduce((acc, c) => acc + (c.totalSpent ?? 0), 0);
                const ticket = seg.data.length > 0 ? totalValue / seg.data.length : 0;

                return (
                  <tr
                    key={seg.key}
                    className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer"
                    onClick={() => setSelectedSegment(seg.key)}
                  >
                    <td className="px-6 py-4 font-semibold">{seg.label}</td>
                    <td className="px-6 py-4">{seg.data.length}</td>
                    <td className="px-6 py-4">{formatCurrency(totalValue)}</td>
                    <td className="px-6 py-4">{formatCurrency(ticket)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ================= AÇÕES ================= */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-wrap gap-4">
          <button
            onClick={() => setCampanhaOpen(true)}
            className="bg-slate-900 text-white px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            Enviar campanha
          </button>

      <button
        onClick={() =>
          exportClientsToCSV(
            selectedSegmentObj ? selectedSegmentObj.data : clients
          )
        }
        className="bg-white border border-slate-200 px-6 py-3 rounded-xl flex items-center gap-2"
      >
        <Download className="h-4 w-4" />
        Exportar lista
      </button>

          <button
            onClick={criarSegmento}
            className="bg-white border border-slate-200 px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Criar novo segmento
          </button>
        </div>
        

        {/* ================= PREVIEW RÁPIDO + ATALHOS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Preview Segmentos */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="font-semibold mb-6">
              Clientes por segmento (preview rápido)
            </div>

            {segments.map((seg) => {
              const percentage = total > 0 ? Math.round((seg.data.length / total) * 100) : 0;

              return (
                <div key={seg.key} className="mb-5">
                  <div className="flex justify-between text-sm mb-2">
                    <span>{seg.label}</span>
                    <span>{seg.data.length}</span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-100">
                    <div
                      className="h-2 rounded-full bg-slate-900"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Atalhos */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="font-semibold mb-6">Atalhos de teste</div>

            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:shadow-sm">
                Testar busca “João”
              </button>
              <button className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:shadow-sm">
                Filtrar Ativos
              </button>
              <button className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:shadow-sm">
                Ordenar por compras
              </button>
              <button className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:shadow-sm">
                Abrir João (detalhes)
              </button>
              <button className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:shadow-sm">
                Cadastros últimos 30 dias
              </button>
              <button
                className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:shadow-sm"
                onClick={() => {
                  setSegmentFilter("todos");
                  setSelectedSegment(null);
                }}
                type="button"
              >
                Resetar filtros
              </button>
            </div>
          </div>
        </div>
      </div>

      <CampanhaModal
        open={campanhaOpen}
        onClose={() => setCampanhaOpen(false)}
      />

{modalSegmento && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-4">
    <div className="w-full max-w-md rounded-3xl border border-slate-200/10 bg-slate-900 shadow-2xl">
      <div className="border-b border-white/10 px-6 py-5">
        <h2 className="text-lg font-semibold text-white">
          Criar novo segmento
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Defina um nome e o valor mínimo gasto para agrupar os clientes.
        </p>
      </div>

      <div className="space-y-5 px-6 py-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Nome do segmento
          </label>
          <input
            type="text"
            value={nomeSegmento}
            onChange={(e) => setNomeSegmento(e.target.value)}
            placeholder="Ex: Clientes Premium"
            className="w-full rounded-2xl border border-white/10 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Valor mínimo gasto
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={gastoMinimo}
            onChange={(e) => setGastoMinimo(e.target.value)}
            placeholder="Ex: 5000"
            className="w-full rounded-2xl border border-white/10 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-white/10 px-6 py-5">
        <button
          type="button"
          onClick={fecharModalSegmento}
          className="rounded-2xl border border-white/10 bg-slate-800 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
        >
          Cancelar
        </button>

        <button
          type="button"
          onClick={salvarSegmento}
          className="rounded-2xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          Criar segmento
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}