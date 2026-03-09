"use client";

type Props = {
  onGoHome: () => void;
};

export default function TopBar({ onGoHome }: Props) {
  return (
    <div className="px-4 pt-4">
      <div className="rounded-3xl bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">

          <div>
            <div className="text-lg font-semibold text-slate-900">
              Monitoramento WhatsApp
            </div>

            <div className="text-sm text-slate-500">
              Acompanhe conversas em tempo real
            </div>
          </div>

          <button
            onClick={onGoHome}
            className="text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            Início
          </button>

        </div>
      </div>
    </div>
  );
}