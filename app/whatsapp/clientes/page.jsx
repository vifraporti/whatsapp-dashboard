'use client'

import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { clientsSeed } from "../../../lib/data/clients"
import { Eye, Pencil, History, MessageCircle, Star } from "lucide-react"
import ClientesTabs from "../../../components/clientes/ClientesTabs";



function initials(name = "") {
  const parts = name.trim().split(" ").filter(Boolean)
  return parts.slice(0, 2).map(p => p[0]?.toUpperCase()).join("")
}

function formatDateBR(iso) {
  const [y, m, d] = iso.split("-")
  return `${d}/${m}/${y}`
}

function calcSegment(c) {
  const daysSinceRegistration = Math.floor(
    (Date.now() - new Date(c.registrationDate).getTime()) / (1000 * 60 * 60 * 24)
  )
  if (c.totalSpent > 5000) return "VIP"
  if (daysSinceRegistration < 30) return "Novo"
  if (c.status === "Inativo") return "Inativo"
  return "Regular"
}

function StatusPill({ status }) {
  const isAtivo = status === "Ativo"
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold
      ${isAtivo ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-900"}`}
    >
      {status}
    </span>
  )
}

function SegmentPill({ segment }) {
  if (segment === "VIP") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold bg-slate-900 text-white">
        <Star className="h-3.5 w-3.5" /> VIP
      </span>
    )
  }
  if (segment === "Novo") {
    return (
      <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-white border border-slate-200 text-slate-700">
        Novo
      </span>
    )
  }
  if (segment === "Inativo") {
    return (
      <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-slate-100 text-slate-700">
        Inativo
      </span>
    )
  }
  return (
    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-slate-100 text-slate-900">
      Regular
    </span>
  )
}

function ActionIcon({ title, onClick, children }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="h-10 w-10 rounded-xl border border-slate-200 bg-white shadow-sm hover:bg-slate-50 flex items-center justify-center"
    >
      {children}
    </button>
  )
}

export default function ClientesPage() {
  const router = useRouter()

  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [sortBy, setSortBy] = useState("nome")

  const filteredClients = useMemo(() => {
    let data = [...clientsSeed]

    if (search.trim()) {
      const s = search.toLowerCase()
      data = data.filter(c =>
        c.name.toLowerCase().includes(s) ||
        c.email.toLowerCase().includes(s) ||
        c.phone.toLowerCase().includes(s)
      )
    }

    if (statusFilter !== "todos") {
      data = data.filter(c => c.status.toLowerCase() === statusFilter)
    }

    data.sort((a, b) => {
      if (sortBy === "nome") return a.name.localeCompare(b.name)
      if (sortBy === "cadastro") return new Date(b.registrationDate) - new Date(a.registrationDate)
      if (sortBy === "compras") return b.purchasesCount - a.purchasesCount
      if (sortBy === "gasto") return b.totalSpent - a.totalSpent
      return 0
    })

    return data
  }, [search, statusFilter, sortBy])

  const total = clientsSeed.length
  const ativos = clientsSeed.filter(c => c.status === "Ativo").length
  const inativos = clientsSeed.filter(c => c.status === "Inativo").length

  return (
    <div className="min-h-screen bg-neutral-100 px-4 md:px-6 py-6 text-slate-900">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
            <p className="text-sm text-slate-600 mt-1">
              Gerencie sua base de clientes
            </p>
          </div>
          <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl shadow-sm w-full md:w-auto">
            + Novo Cliente
          </button>
        </div>

        {/* 🔥 AQUI ESTAVA FALTANDO */}
        <ClientesTabs />

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-sm text-slate-500">Total</p>
            <p className="text-3xl font-bold mt-2">{total}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-sm text-slate-500">Ativos</p>
            <p className="text-3xl font-bold mt-2">{ativos}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-sm text-slate-500">Inativos</p>
            <p className="text-3xl font-bold mt-2">{inativos}</p>
          </div>
        </div>

        {/* Tabela */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-[700px] w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="px-6 py-4 text-left">Nome</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Telefone</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-right">Ações</th>
                </tr>
              </thead>

              <tbody>
                {filteredClients.map((c) => (
                 <tr
                    key={c.id}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 font-semibold">
                      <button
                        onClick={() => router.push(`/whatsapp/clientes/${c.id}`)}
                        className="w-full text-left"
                      >
                        {c.name}
                      </button>
                    </td>
                    <td className="px-6 py-4">{c.email}</td>
                    <td className="px-6 py-4">{c.phone}</td>
                    <td className="px-6 py-4">
                      <StatusPill status={c.status} />
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <ActionIcon
                        title="Ver"
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/whatsapp/clientes/${c.id}`)
                        }}
                      >
                        <Eye className="h-5 w-5" />
                      </ActionIcon>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </div>
  )
}