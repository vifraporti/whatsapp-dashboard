"use client";

import Icon from "../ui/Icon";

type BubbleProps = {
  who: "bot" | "user" | "atendente";
  at: string;
  text: string;
};

export default function Bubble({ who, at, text }: BubbleProps) {
  const isClient = who === "user";

  return (
    <div className={`flex ${isClient ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[82%] rounded-3xl px-4 py-3 border shadow-sm ${
          isClient
            ? "bg-white border-slate-200"
            : "bg-slate-900 text-white border-slate-900"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center justify-center w-6 h-6 rounded-2xl ${
                isClient
                  ? "bg-slate-100 text-slate-700"
                  : "bg-white/10 text-white"
              }`}
            >
              <Icon name={isClient ? "user" : "bot"} />
            </span>

            <div
              className={`text-[11px] font-black ${
                isClient ? "text-slate-700" : "text-white/90"
              }`}
            >
              {who}
            </div>
          </div>

          <div
            className={`text-[11px] font-semibold ${
              isClient ? "text-slate-400" : "text-white/60"
            }`}
          >
            {at}
          </div>
        </div>

        <div
          className={`mt-2 text-sm leading-relaxed ${
            isClient ? "text-slate-800" : "text-white"
          }`}
        >
          {text}
        </div>
      </div>
    </div>
  );
}