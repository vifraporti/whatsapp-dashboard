"use client";

type Props = {
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
  tone?: "neutral" | "danger" | "success" | "info" | "warn";
  disabled?: boolean;
};

export default function ActionButton({
  icon,
  children,
  onClick,
  tone = "neutral",
  disabled = false,
}: Props) {

  const tones = {
    neutral: "bg-white hover:bg-slate-50 border-slate-200 text-slate-800",
    danger: "bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-800",
    success: "bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-800",
    info: "bg-sky-50 hover:bg-sky-100 border-sky-200 text-sky-800",
    warn: "bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-900",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-black transition
        ${tones[tone]}
        ${disabled ? "opacity-40 cursor-not-allowed hover:bg-inherit" : ""}
      `}
    >
      {icon ? <span className="opacity-90">{icon}</span> : null}
      {children}
    </button>
  );
}