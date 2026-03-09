import { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  tone?: "slate" | "green" | "amber" | "red" | "blue";
};

export default function Badge({ children, tone = "slate" }: BadgeProps) {
  const tones = {
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    green: "bg-emerald-50 text-emerald-700 border-emerald-200",
    amber: "bg-amber-50 text-amber-800 border-amber-200",
    red: "bg-rose-50 text-rose-700 border-rose-200",
    blue: "bg-sky-50 text-sky-700 border-sky-200",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${
        tones[tone]
      }`}
    >
      {children}
    </span>
  );
}