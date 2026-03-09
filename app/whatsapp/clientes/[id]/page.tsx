"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { clientsSeed } from "@/lib/data/clients";
import { ArrowLeft, Star } from "lucide-react";

/* ================= TYPES ================= */

type Client = {
  id: number | string;
  name: string;
  email: string;
  phone: string;
  status: "Ativo" | "Inativo" | string;
  totalSpent: number;
  purchasesCount: number;
  registrationDate: string;
};

type TabButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

type ResumoTabProps = {
  client: Client;
  ticketMedio: number;
};

type AtividadesTabProps = {
  client: Client;
};

type StatusBadgeProps = {
  status: string;
};

type DataCardProps = {
  label: string;
  value: string;
};

type AnalysisCardProps = {
  label: string;
  value: string;
};

/* ================= HELPERS ================= */

function initials(name: string = ""): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

/* ================= PAGE ================= */

export default function ClienteDetalhePage() {
  const params = useParams<{ id: string | string[] }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"resumo" | "compras" | "conversas" | "atividades">("resumo");
  const [search, setSearch] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [campanhaOpen, setCampanhaOpen] = useState(false);

  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editEmail, setEditEmail] = useState("");

  // garante tipo do seed
  const clients = clientsSeed as Client[];

  const client = useMemo(() => {
    return clients.find((c) => String(c.id) === String(id)) ?? null;
  }, [clients, id]);

  const [clientData, setClientData] = useState(client);

  const searchResults = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return [];

    return clients.filter(
      (c) =>
        c.name.toLowerCase().includes(s) ||
        c.email.toLowerCase().includes(s) ||
        c.phone.toLowerCase().includes(s)
    );
  }, [search, clients]);

  if (!client) {
    return <div className="p-10 text-center">Cliente não encontrado</div>;
  }

  const ticketMedio =
    client.purchasesCount > 0 ? client.totalSpent / client.purchasesCount : 0;

  return (
    <div className="min-h-screen px-4 md:px-6 py-6 text-slate-900">
      <div className="w-full max-w-[1400px] mx-auto space-y-8">
        {/* Top */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/whatsapp/clientes")}
            className="h-10 w-10 rounded-xl border border-slate-200 bg-white hover:shadow-sm flex items-center justify-center"
          >
            <ArrowLeft className="h-4 w-4 text-slate-700" />
          </button>

          <div>
            <h1 className="text-3xl font-bold tracking-tight">Detalhes do Cliente</h1>
            <p className="text-sm text-slate-500 mt-2">
              Visualize as informações completas do cliente.
            </p>
          </div>
        </div>

        {/* Pesquisa rápida de cliente */}
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Buscar outro cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-slate-200"
          />

          {search.trim() && (
            <div className="absolute mt-2 w-full bg-white border border-slate-200 rounded-2xl shadow-lg max-h-60 overflow-auto z-50">
              {searchResults.length === 0 ? (
                <div className="p-4 text-sm text-slate-500">Nenhum cliente encontrado</div>
              ) : (
                searchResults.map((c) => (
                  <div
                    key={String(c.id)}
                    onClick={() => {
                      setSearch("");
                      router.push(`/whatsapp/clientes/${c.id}`);
                    }}
                    className="px-4 py-3 hover:bg-slate-100 cursor-pointer text-sm"
                  >
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-slate-500 text-xs">
                      {c.email} • {c.phone}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Header card */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:justify-between md:items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center text-2xl font-bold text-slate-700">
              {initials(clientData?.name || "")}
            </div>

            <div>
              <h2 className="text-2xl font-bold">{clientData?.name}</h2>
              <p className="text-slate-600">{clientData?.email}</p>

              <div className="flex gap-3 mt-3">
                <span
                  className={`px-3 py-1 text-xs rounded-full font-semibold ${
                    client.status === "Ativo"
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {client.status}
                </span>

                {client.totalSpent > 5000 && (
                  <span className="px-3 py-1 text-xs rounded-full font-semibold bg-slate-900 text-white flex items-center gap-1">
                    <Star className="h-3 w-3" /> VIP
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setEditName(clientData?.name || "");
              setEditPhone(clientData?.phone || "");
              setEditEmail(clientData?.email || "");
              setEditOpen(true);
            }}
            className="bg-slate-900 text-white px-5 py-2.5 rounded-xl"
          >
            Editar Cliente
          </button>
        </div>

        {/* Abas */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          <TabButton label="Resumo" active={activeTab === "resumo"} onClick={() => setActiveTab("resumo")} />
          <TabButton label="Compras" active={activeTab === "compras"} onClick={() => setActiveTab("compras")} />
          <TabButton label="Conversas" active={activeTab === "conversas"} onClick={() => setActiveTab("conversas")} />
          <TabButton label="Atividades" active={activeTab === "atividades"} onClick={() => setActiveTab("atividades")} />
        </div>

        {/* Conteúdo */}
        <div className="space-y-6">
          {activeTab === "resumo" && <ResumoTab client={clientData!} ticketMedio={ticketMedio} />}
          {activeTab === "compras" && <ComprasTab />}
          {activeTab === "conversas" && <ConversasTab />}
          {activeTab === "atividades" && <AtividadesTab client={client} />}
        </div>
      </div>
      {editOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl p-6 w-[420px] shadow-xl">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">
                Editar Cliente
              </h2>

              <button
                onClick={() => setEditOpen(false)}
                className="text-slate-500 hover:text-slate-900 text-lg"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3">

              <input
                className="w-full border rounded-lg p-2"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />

              <input
                className="w-full border rounded-lg p-2"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
              />

              <input
                className="w-full border rounded-lg p-2"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />

            </div>

            <div className="flex justify-end gap-2 mt-5">

              <button
                onClick={() => setEditOpen(false)}
                className="px-4 py-2 rounded-lg border"
              >
                Cancelar
              </button>

              <button
                onClick={() => {
                  setClientData({
                    ...clientData!,
                    name: editName,
                    phone: editPhone,
                    email: editEmail
                  });

                  setEditOpen(false);
                }}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg"
              >
                Salvar
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

/* ================= COMPONENTS ================= */

function TabButton({ label, active, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-2xl text-sm font-semibold transition whitespace-nowrap ${
        active
          ? "bg-slate-900 text-white"
          : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300"
      }`}
    >
      {label}
    </button>
  );
}

function ResumoTab({ client, ticketMedio }: ResumoTabProps) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h2 className="text-xl font-bold text-slate-900">Dados Pessoais</h2>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-sm">
            💬 Enviar mensagem
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DataCard label="Nome" value={client.name} />
        <DataCard label="Email" value={client.email} />
        <DataCard label="Telefone" value={client.phone} />
        <DataCard label="Data de cadastro" value={client.registrationDate} />
        <DataCard label="Total gasto" value={formatCurrency(client.totalSpent)} />
        <DataCard label="Ticket médio" value={formatCurrency(ticketMedio)} />
      </div>
    </div>
  );
}

function ComprasTab() {
  const compras = [
    { id: 1, date: "15/01/2024", product: "Notebook", value: 2999, status: "Entregue" },
    { id: 2, date: "10/12/2023", product: "Monitor", value: 899, status: "Entregue" },
    { id: 3, date: "02/11/2023", product: "Teclado", value: 350, status: "Entregue" },
    { id: 4, date: "21/10/2023", product: "Headset", value: 480, status: "Entregue" },
    { id: 5, date: "01/08/2023", product: "Mouse", value: 220, status: "Entregue" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-slate-900">Histórico de Compras</h2>

      <div className="rounded-2xl border border-slate-200 bg-transparent overflow-x-auto">
        <table className="min-w-[600px] w-full text-sm">
          <thead className="bg-neutral-50 text-slate-500">
            <tr>
              <th className="text-left px-6 py-4 font-semibold">Data</th>
              <th className="text-left px-6 py-4 font-semibold">Produto</th>
              <th className="text-left px-6 py-4 font-semibold">Valor</th>
              <th className="text-left px-6 py-4 font-semibold">Status</th>
            </tr>
          </thead>

          <tbody>
            {compras.map((compra) => (
              <tr
                key={compra.id}
                className="border-t border-slate-100 hover:bg-slate-50 transition"
              >
                <td className="px-6 py-4">{compra.date}</td>
                <td className="px-6 py-4 font-medium">{compra.product}</td>
                <td className="px-6 py-4">{formatCurrency(compra.value)}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={compra.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
      {status}
    </span>
  );
}

function ConversasTab() {
  const conversas = [
    { id: 1, canal: "WhatsApp", resumo: "Perguntou sobre prazo de entrega e forma de pagamento.", data: "2026-02-24 09:10" },
    { id: 2, canal: "WhatsApp", resumo: "Solicitou segunda via da nota fiscal.", data: "2026-02-20 15:44" },
    { id: 3, canal: "WhatsApp", resumo: "Confirmou compra de monitor e endereço de entrega.", data: "2026-02-18 11:05" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-slate-900">Histórico de Conversas</h2>
        <p className="text-sm text-slate-600 mt-1">
          Últimas 10 conversas via WhatsApp e resumo de cada conversa
        </p>
      </div>

      <div className="space-y-4">
        {conversas.map((conversa) => (
          <div
            key={conversa.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 flex justify-between items-start hover:shadow-sm transition"
          >
            <div className="flex gap-3">
              <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                💬
              </div>

              <div>
                <div className="font-semibold text-slate-900">{conversa.canal}</div>
                <div className="text-sm text-slate-600 mt-1">{conversa.resumo}</div>
              </div>
            </div>

            <div className="text-xs text-slate-500 whitespace-nowrap">{conversa.data}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AtividadesTab({ client }: AtividadesTabProps) {
  const frequencia = client.purchasesCount;
  const totalGasto = client.totalSpent;

  const classificacao =
    totalGasto > 5000 ? "VIP" : totalGasto > 2000 ? "Frequente" : "Comum";

  const produtosFavoritos = "Notebook, Monitor, Mouse";

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-300 shadow-sm space-y-8">
      <h2 className="text-xl font-bold text-slate-900">Análise</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnalysisCard label="Classificação" value={classificacao} />
        <AnalysisCard label="Valor total gasto" value={formatCurrency(totalGasto)} />
        <AnalysisCard label="Frequência de compra" value={`${frequencia} compra(s)`} />
        <AnalysisCard label="Produtos favoritos" value={produtosFavoritos} />
      </div>
    </div>
  );
}

function DataCard({ label, value }: DataCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-300 shadow-sm">
      <p className="text-sm text-slate-600 mb-2 font-medium">{label}</p>
      <p className="text-lg font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function AnalysisCard({ label, value }: AnalysisCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200">
      <p className="text-sm text-slate-500 mb-2">{label}</p>
      <p className="text-lg font-semibold text-slate-900">{value}</p>
    </div>
  );
}