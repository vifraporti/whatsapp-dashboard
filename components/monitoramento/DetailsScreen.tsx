"use client";

import React, { ReactNode } from "react";
import Badge from "./Badge";
import Avatar from "./Avatar";
import Icon from "../ui/Icon";
import ActionButton from "./ActionButton";

import type { Conversation } from "@/lib/types/conversation";

/* ================= TYPES ================= */


type Props = {
  convo: Conversation;
  onBack: () => void;
  onToast: (msg: string) => void;
};

type DetailCardProps = {
  title: string;
  children: ReactNode;
  right?: ReactNode;
};

type KeyValueProps = {
  k: string;
  v: ReactNode;
};

/* ================= COMPONENTS ================= */

function DetailCard({ title, children, right }: DetailCardProps) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-200 flex items-center justify-between gap-3">
        <div className="text-sm font-black text-slate-900">{title}</div>
        {right}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function KeyValue({ k, v }: KeyValueProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-2 border-b border-slate-100 last:border-b-0">
      <div className="text-xs font-black text-slate-600">{k}</div>
      <div className="text-sm font-semibold text-slate-900 text-right">{v}</div>
    </div>
  );
}

/* ================= SCREEN ================= */

export default function DetailsScreen({ convo, onBack, onToast }: Props) {
  const tone =
    convo.status === "Ativa"
      ? "green"
      : convo.status === "Aguardando"
      ? "amber"
      : "slate";

  return (
    <div className="p-4">
      {/* HEADER */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar name={convo.nome} />

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="text-lg font-black text-slate-900 truncate">
                {convo.nome}
              </div>

              <Badge tone={tone}>{convo.status}</Badge>
            </div>

            <div className="text-xs text-slate-500 truncate">
              {convo.telefone}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <ActionButton tone="neutral" onClick={onBack}>
            Voltar
          </ActionButton>

          <ActionButton
            tone="warn"
            icon={<Icon name="user" />}
            onClick={() => onToast("Transferido para suporte.")}
          >
            Transferir
          </ActionButton>

          <ActionButton
            tone="success"
            onClick={() => onToast("Marcada como resolvida.")}
          >
            Resolver
          </ActionButton>

          <ActionButton
            tone="danger"
            onClick={() => onToast("Conversa encerrada.")}
          >
            Encerrar
          </ActionButton>

          <ActionButton
            tone="info"
            icon={<Icon name="export" />}
            onClick={() => onToast("Exportação iniciada.")}
          >
            Exportar
          </ActionButton>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-12 gap-4">
        {/* LEFT */}
        <div className="col-span-12 lg:col-span-4 space-y-4">

          <DetailCard title="Informações do Cliente">
            <KeyValue k="Cliente" v={convo.nome} />
            <KeyValue k="Telefone" v={convo.telefone} />
            <KeyValue k="Email" v={convo.cliente.email} />
            <KeyValue k="Status" v={convo.status} />
            <KeyValue k="Tempo" v={convo.tempoConversa} />
            <KeyValue k="Mensagens" v={convo.mensagensCount} />
            <KeyValue k="Histórico" v={convo.cliente.historicoCompras} />
            <KeyValue k="Última compra" v={convo.cliente.ultimaCompra} />
          </DetailCard>

          <DetailCard title="Análise da Conversa">
            <KeyValue k="Sentimento" v={convo.analise.sentimento} />
            <KeyValue k="Intenção" v={convo.analise.intencao} />
            <KeyValue
              k="Produtos"
              v={convo.analise.produtosMencionados.join(", ")}
            />
            <KeyValue
              k="Tokens"
              v={convo.analise.tokensUtilizados.toLocaleString("pt-BR")}
            />
          </DetailCard>

        </div>

        {/* RIGHT */}
        <div className="col-span-12 lg:col-span-8">
          <DetailCard title="Histórico Completo">
            <div className="space-y-3 max-h-[70vh] overflow-auto">

              {convo.historico.map((m, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-slate-200 p-3"
                >
                  <div className="text-xs font-black text-slate-700">
                    [{m.at}] {m.who}
                  </div>

                  <div className="mt-1 text-sm text-slate-900">
                    {m.text}
                  </div>
                </div>
              ))}

            </div>
          </DetailCard>
        </div>

      </div>
    </div>
  );
}