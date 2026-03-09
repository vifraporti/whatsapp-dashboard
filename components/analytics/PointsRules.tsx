"use client";

import { PointsRule } from "../../lib/ia/types";

type Props = {
  rules: PointsRule[];
  onSimulate: (rule: PointsRule) => void;
};

export default function PointsRules({ rules, onSimulate }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Como ganhar pontos</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rules.map((rule) => (
          <div
            key={rule.type}
            className="rounded-3xl p-5 bg-white border border-slate-200 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{rule.label}</h3>
                <p className="text-sm text-slate-600 mt-1">
                  {rule.hint}
                </p>
              </div>

              <span className="text-xs px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-800 font-medium">
                +{rule.points}
              </span>
            </div>

            <button
              onClick={() => onSimulate(rule)}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-violet-300 hover:bg-violet-50 transition shadow-sm"
            >
              Simular evento
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}