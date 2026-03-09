"use client";

import { useMemo } from "react";

type AvatarProps = {
  name?: string;
};

export default function Avatar({ name }: AvatarProps) {
  const initials = useMemo(() => {
    const parts = (name || "?").trim().split(/\s+/);
    const a = (parts[0] || "?")[0] || "?";
    const b = (parts[1] || "")[0] || "";
    return (a + b).toUpperCase();
  }, [name]);

  return (
    <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-sm">
      {initials}
    </div>
  );
}