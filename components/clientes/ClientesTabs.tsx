"use client";

import { usePathname, useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { clientsSeed } from "../../lib/data/clients";

function isActive(pathname, href) {
  return pathname.startsWith(href);
}

export default function ClientesTabs() {
  const pathname = usePathname();
  const router = useRouter();

  const firstClientId = clientsSeed[0]?.id;

  const tabs = [
    {
      label: "Detalhes do Cliente",
      href: firstClientId
        ? `/whatsapp/clientes/${firstClientId}`
        : "/whatsapp/clientes",
    },
    {
      label: "Segmentação de Clientes",
      href: "/whatsapp/clientes/segmentacao",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tabs.map((t) => {
        const active = isActive(pathname, t.href);

        return (
          <button
            key={t.href}
            onClick={() => router.push(t.href)}
            type="button"
            className={`
              group h-16 rounded-2xl px-6 text-sm font-semibold transition-all duration-200
              border text-left flex items-center justify-between
              cursor-pointer
              ${
                active
                  ? "bg-white border-slate-900 text-slate-900 shadow-md"
                  : "bg-white border-slate-200 text-slate-600 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-slate-300"
              }
            `}
          >
            <span>{t.label}</span>

            <ChevronRight
              className={`h-5 w-5 transition-all ${
                active
                  ? "text-slate-900"
                  : "text-slate-400 group-hover:text-slate-700 group-hover:translate-x-1"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}