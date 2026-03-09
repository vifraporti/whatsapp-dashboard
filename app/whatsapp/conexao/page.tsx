"use client";

import { useState } from "react";
import { QrCode, RefreshCw, CheckCircle2, Shield, Smartphone, Link2 } from "lucide-react";

type StatusPillProps = { connected: boolean };

function StatusPill({ connected }: StatusPillProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
        connected ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full ${connected ? "bg-green-500" : "bg-yellow-500"}`}
      />
      {connected ? "Conectado" : "Aguardando"}
    </span>
  );
}

function makeFakeQrValue() {
  // Preferência: crypto.randomUUID (moderno)
  // Fallback: Math.random (caso algum ambiente não suporte)
  const seed =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8).toUpperCase()
      : Math.random().toString(36).slice(2, 10).toUpperCase();

  return `WA-${seed}-SESSION`;
}

export default function ConectarWhatsAppPage() {
  const [connected, setConnected] = useState(false);

  const [fakeQrValue, setFakeQrValue] = useState(() => {
  if (typeof window === "undefined") return "";
  return makeFakeQrValue();
});


 const handleGerarNovoQr = () => {
  setConnected(false);
  setFakeQrValue(makeFakeQrValue());
};

  return (
    <div className="p-10">
      {/* HEADER */}
      <div className="bg-white rounded-3xl shadow-sm p-6 mb-8">
        <h1 className="text-2xl font-bold text-neutral-800">Conectar WhatsApp Business</h1>
        <p className="text-neutral-500">
          Vincule o WhatsApp empresarial para monitorar mensagens e automatizar atendimentos.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CARD QR */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-neutral-800">QR Code de Conexão</h2>
                <StatusPill connected={connected} />
              </div>
              <p className="text-neutral-500 mt-1">
                Abra o WhatsApp Business no celular e escaneie o QR Code.
              </p>
            </div>

            <button
              onClick={handleGerarNovoQr}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-neutral-900 text-white hover:bg-neutral-800 transition shadow-sm"
              title="Gerar novo QR"
              type="button"
            >
              <RefreshCw size={18} />
              Gerar novo
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex items-center justify-center">
              <div className="w-full max-w-sm bg-neutral-50 rounded-3xl border border-neutral-200 p-8 flex flex-col items-center justify-center">
                {!connected ? (
                  <>
                    <div className="w-44 h-44 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center">
                      <QrCode size={120} className="text-neutral-700" />
                    </div>

                    <p className="text-xs text-neutral-500 mt-4 text-center">{fakeQrValue}</p>

                    <button
                      onClick={() => setConnected(true)}
                      className="mt-5 w-full bg-neutral-900 text-white py-3 rounded-2xl hover:opacity-90 transition"
                      type="button"
                    >
                      Simular conexão
                    </button>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={64} className="text-green-500" />
                    <p className="mt-3 font-semibold text-green-700">
                      WhatsApp conectado com sucesso
                    </p>
                    <p className="text-sm text-neutral-500 mt-1 text-center">
                      Sua sessão está ativa e pronta para monitoramento.
                    </p>

                    <button
                      onClick={() => setConnected(false)}
                      className="mt-5 w-full border border-neutral-200 py-3 rounded-2xl hover:bg-neutral-50 transition"
                      type="button"
                    >
                      Desconectar (simulado)
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl border border-neutral-200 p-5">
                <div className="flex items-center gap-3">
                  <Smartphone className="text-neutral-700" size={20} />
                  <p className="font-semibold text-neutral-800">Passo a passo</p>
                </div>
                <ol className="mt-3 text-sm text-neutral-600 space-y-2 list-decimal list-inside">
                  <li>Abra o WhatsApp Business no celular.</li>
                  <li>
                    Vá em <b>Configurações</b> → <b>Aparelhos conectados</b>.
                  </li>
                  <li>
                    Toque em <b>Conectar um aparelho</b>.
                  </li>
                  <li>Aponte a câmera para este QR Code.</li>
                </ol>
              </div>

              <div className="rounded-3xl border border-neutral-200 p-5">
                <div className="flex items-center gap-3">
                  <Shield className="text-neutral-700" size={20} />
                  <p className="font-semibold text-neutral-800">Segurança</p>
                </div>
                <p className="mt-2 text-sm text-neutral-600">
                  A conexão cria uma sessão segura. Você pode desconectar a qualquer momento
                  pelo WhatsApp Business.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CARD INFO / STATUS */}
        <div className="bg-white rounded-3xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-neutral-800">Detalhes da Conexão</h2>
          <p className="text-neutral-500 mt-1">Informações do número e sessão.</p>

          <div className="mt-6 space-y-4">
            <div className="rounded-3xl border border-neutral-200 p-5">
              <p className="text-sm text-neutral-500">Status</p>
              <div className="mt-2">
                <StatusPill connected={connected} />
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 p-5">
              <p className="text-sm text-neutral-500">Número vinculado</p>
              <p className="mt-1 font-semibold text-neutral-800">
                {connected ? "+55 11 99999-9999" : "Nenhum"}
              </p>
              <p className="text-sm text-neutral-500 mt-2">
                {connected ? "Sessão ativa" : "Conecte para ativar"}
              </p>
            </div>

            <div className="rounded-3xl border border-neutral-200 p-5">
              <div className="flex items-center gap-3">
                <Link2 className="text-neutral-700" size={20} />
                <p className="font-semibold text-neutral-800">Dica</p>
              </div>
              <p className="mt-2 text-sm text-neutral-600">
                Depois de conectar, você poderá ver as conversas em tempo real no Monitoramento.
              </p>
            </div>

            <button
              onClick={() => alert("Aqui você chama sua API de conexão/refresh do QR")}
              className="w-full bg-neutral-900 text-white py-3 rounded-2xl hover:opacity-90 transition"
              type="button"
            >
              Conectar via API (placeholder)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}