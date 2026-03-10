import { Trophy } from "lucide-react";
import { classNames } from "../../lib/ia/helpers";

type Props = {
  points: number;
  level: {
    levelName: string;
    gradient: string;
    ring: string;
    progress: number;
    missing: number;
    nextName: string;
  };
  previewPoints?: number | null; // 👈 NOVO
  onClearPreview?: () => void;   // 👈 OPCIONAL
};

export default function PointsCard({
  points,
  level,
  previewPoints,
  onClearPreview,
}: Props) {

  const displayPoints =
    previewPoints != null
      ? points + previewPoints
      : points;

  return (
    <div
      className={classNames(
        "rounded-3xl p-5 bg-white border border-slate-200 shadow-sm ring-1",
        level.ring
      )}
    >
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2">
          <Trophy className="w-5 h-5 text-violet-700" />
          <h2 className="font-semibold">Programa de pontos</h2>
        </div>
        <span
          className={classNames(
            "text-xs px-3 py-1 rounded-full text-white bg-linear-to-r",
            level.gradient
          )}
        >
          Nível: {level.levelName}
        </span>
      </div>

      <div className="mt-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-slate-600">Pontos atuais</p>

            <p className="text-3xl font-semibold">
              {displayPoints.toLocaleString("pt-BR")}
            </p>

            {previewPoints != null && (
              <p className="text-xs text-amber-600 mt-1">
                Modo simulação (+{previewPoints})
              </p>
            )}
          </div>

          <div className="text-right">
            <p className="text-sm text-slate-600">Faltam</p>
            <p className="text-xl font-semibold text-violet-800">
              {level.missing.toLocaleString("pt-BR")}
            </p>
            <p className="text-xs text-slate-500">
              Próximo: {level.nextName}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
            <div
              className={classNames(
                "h-full rounded-full bg-gradient-to-r transition-all",
                level.gradient
              )}
              style={{ width: `${Math.round(level.progress * 100)}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span>Progresso do nível</span>
            <span className="font-medium text-violet-700">
              {Math.round(level.progress * 100)}%
            </span>
          </div>
        </div>

        {previewPoints != null && onClearPreview && (
          <button
            onClick={onClearPreview}
            className="mt-3 text-xs underline text-slate-500"
          >
            Encerrar simulação
          </button>
        )}

        <div className="mt-4 rounded-2xl bg-gradient-to-r from-violet-50 to-fuchsia-50 border border-violet-200 p-4">
          <p className="text-xs text-violet-700 font-medium mb-1">
            Boost de pontuação
          </p>
          <p className="text-sm text-slate-700">
            Ative “Recuperação de carrinho” para ganhar pontos extra por conversões.
          </p>
        </div>
      </div>
    </div>
  );
}