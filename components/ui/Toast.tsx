"use client";

type Props = {
  text?: string | null;
  onClose: () => void;
};

export default function Toast({ text, onClose }: Props) {
  if (!text) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-3 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-lg border border-white/10">
        <span className="text-sm">{text}</span>

        <button
          onClick={onClose}
          className="text-xs font-black px-2 py-1 rounded-xl bg-white/10 hover:bg-white/20"
        >
          Ok
        </button>
      </div>
    </div>
  );
}