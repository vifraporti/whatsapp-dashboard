"use client";

import { useState, useEffect, useMemo } from "react";
import { Users, Send, Smile } from "lucide-react";


type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CampanhaModal({ open, onClose }: Props) {

  const [titulo, setTitulo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [segmento, setSegmento] = useState("VIP");
  const [imagem, setImagem] = useState<string | null>(null);

  useEffect(() => {
  if (open) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [open]);

   const enviarCampanha = async () => {

    if (!titulo || !mensagem) {
      alert("Preencha título e mensagem");
      return;
    }

    console.log("Campanha enviada (MOCK)", {
      titulo,
      mensagem,
      segmento
    });

    // simula envio
    await new Promise((resolve) => setTimeout(resolve, 1000));

    alert("Campanha enviada com sucesso!");

    onClose();
  };

  if (!open) return null;

  const mensagemPreview = mensagem.replace("{{nome}}", "João");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-[720px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl p-6 space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Criar campanha</h2>

          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-900"
          >
            ✕
          </button>
        </div>

        {/* Título */}
        <div>
          <label className="text-sm text-slate-500">
            Título da campanha
          </label>

          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ex: Promoção Black Friday"
            className="w-full border rounded-lg p-3 mt-1"
          />
        </div>

        {/* Segmento */}
        <div>
          <label className="text-sm text-slate-500">
            Segmento
          </label>

          <select
            value={segmento}
            onChange={(e) => setSegmento(e.target.value)}
            className="w-full border rounded-lg p-3 mt-1"
          >
            <option>VIP</option>
            <option>Regular</option>
            <option>Novo</option>
            <option>Inativo</option>
          </select>
        </div>

        {/* Editor */}
        <div>
          <label className="text-sm text-slate-500">
            Mensagem
          </label>

          <textarea
            rows={5}
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder="Olá {{nome}}, temos uma promoção especial para você!"
            className="w-full border rounded-lg p-3 mt-1"
          />

          {/* ferramentas do editor */}
            <div className="flex justify-between items-center mt-2 text-xs text-slate-500">

              <div className="flex gap-3">

                <button
                  onClick={() => setMensagem(mensagem + " {{nome}}")}
                  className="flex items-center gap-1 hover:text-slate-900"
                >
                  <Users className="h-3 w-3"/>
                  Nome
                </button>

                <button
                  onClick={() => setMensagem(mensagem + " 😊")}
                  className="flex items-center gap-1 hover:text-slate-900"
                >
                  <Smile className="h-3 w-3"/>
                  Emoji
                </button>

              </div>

              <span>{mensagem.length} caracteres</span>

            </div>

          {/* Upload de imagem */}
           <div className="mt-3">

              <label className="text-sm text-slate-500">
                Imagem da campanha
              </label>

              <label className="block mt-2 cursor-pointer">

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const reader = new FileReader();

                    reader.onload = () => {
                      setImagem(reader.result as string);
                    };

                    reader.readAsDataURL(file);
                  }}
                />

                <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-slate-400 transition">

                  {!imagem ? (
                    <div className="space-y-2">

                      <div className="text-3xl">🖼</div>

                      <p className="text-sm font-medium">
                        Clique para adicionar imagem
                      </p>

                      <p className="text-xs text-slate-500">
                        PNG ou JPG
                      </p>

                    </div>
                  ) : (

                    <div className="space-y-3">

                      <img
                        src={imagem}
                        className="rounded-lg max-h-[180px] mx-auto"
                      />

                      <p className="text-xs text-slate-500">
                        Clique para trocar a imagem
                      </p>

                    </div>

                  )}

                </div>

              </label>

            </div>

        </div>

        {/* Preview WhatsApp */}
        <div className="bg-neutral-100 rounded-xl p-4">

          <p className="text-xs text-slate-500 mb-2">
            Preview WhatsApp
          </p>

          <div className="bg-green-100 rounded-xl p-3 max-w-[320px] text-sm space-y-2">

            {imagem && (
              <img
                src={imagem}
                className="rounded-lg"
                alt="preview"
              />
            )}

            <p>
              {mensagemPreview || "Sua mensagem aparecerá aqui"}
            </p>

          </div>
        </div>

        {/* Destinatários */}
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Users className="h-4 w-4"/>
          Enviar para clientes do segmento: <b>{segmento}</b>
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Cancelar
          </button>

          <button
            onClick={enviarCampanha}
            className="px-5 py-2 bg-slate-900 text-white rounded-lg flex items-center gap-2"
          >
            <Send className="h-4 w-4"/>
            Enviar campanha
          </button>

        </div>

      </div>

    </div>
  );
}