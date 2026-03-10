"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Plug,
  Brain,
} from "lucide-react";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const menu = [
    { label: "Monitoramento", icon: LayoutDashboard, path: "/whatsapp/monitoramento" },
    { label: "Métricas", icon: BarChart3, path: "/whatsapp/metricas" },
    { label: "Clientes", icon: Users, path: "/whatsapp/clientes" },
    { label: "Conexão", icon: Plug, path: "/whatsapp/conexao" },
    { label: "IA", icon: Brain, path: "/whatsapp/ia" },
  ];

  const isActive = (path: string) => {
    if (path === "/whatsapp") {
      return pathname === "/whatsapp";
    }
    return pathname.startsWith(path);
  };

  return (
    <div className="group fixed left-6 top-6 h-[calc(100vh-48px)] w-16 hover:w-56 bg-neutral-900 rounded-3xl shadow-2xl flex flex-col transition-all duration-300 z-50">

      {/* LOGO */}
      <div className="flex justify-center items-center h-16 border-b border-white/10">
        <div className="w-10 h-10 rounded-2xl bg-white text-neutral-900 flex items-center justify-center font-bold">
          WA
        </div>
      </div>

      {/* MENU */}
      <div className="flex flex-col gap-2 px-2 mt-4">

        {menu.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`flex items-center gap-3 h-12 px-3 rounded-xl transition-all duration-200 w-full ${
                active ? "bg-white/20" : "hover:bg-white/10"
              }`}
            >
              <Icon size={20} className="text-white min-w-[20px]" />

              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}

      </div>
    </div>
  );
}