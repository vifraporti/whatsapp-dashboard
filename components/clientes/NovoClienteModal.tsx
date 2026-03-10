"use client";

import { useState } from "react";
import { X } from "lucide-react";

type Client = {
  id: number | string
  name: string
  email: string
  phone: string
  status: string
  totalSpent: number
  purchasesCount: number
  registrationDate: string
}

type Props = {
  open: boolean
  onClose: () => void
  onCreate: (client: Client) => void
}

export default function NovoClienteModal({ open, onClose, onCreate }: Props) {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  if (!open) return null

  function salvarCliente() {

    if (!name.trim()) return

    const novoCliente: Client = {
      id: Date.now(),
      name,
      email,
      phone,
      status: "Ativo",
      totalSpent: 0,
      purchasesCount: 0,
      registrationDate: new Date().toISOString()
    }

    onCreate(novoCliente)

    setName("")
    setEmail("")
    setPhone("")

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 space-y-5">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            Novo Cliente
          </h2>

          <button onClick={onClose}>
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-3">

          <input
            placeholder="Nome do cliente"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
          />

          <input
            placeholder="Telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm"
          />

        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2">

          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border border-slate-200 rounded-lg"
          >
            Cancelar
          </button>

          <button
            onClick={salvarCliente}
            className="px-4 py-2 text-sm bg-slate-900 text-white rounded-lg"
          >
            Salvar
          </button>

        </div>

      </div>
    </div>
  )
}