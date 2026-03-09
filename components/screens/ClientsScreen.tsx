"use client";

import { useState } from "react";

export default function ClientsScreen() {
  const [search, setSearch] = useState("");

  const clients = [
    { name: "João Silva", phone: "11999990001", messages: 45, status: "Ativo" },
    { name: "Maria Souza", phone: "11999990002", messages: 12, status: "Inativo" },
    { name: "Carlos Lima", phone: "11999990003", messages: 30, status: "Ativo" },
  ];

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Clientes</h2>

      {/* Filtro */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar cliente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-xl"
        />
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto border rounded-2xl">
        <table className="w-full text-left">
          <thead className="bg-neutral-100">
            <tr>
              <th className="p-3">Nome</th>
              <th className="p-3">Telefone</th>
              <th className="p-3">Mensagens</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((client, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{client.name}</td>
                <td className="p-3">{client.phone}</td>
                <td className="p-3 font-semibold">{client.messages}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      client.status === "Ativo"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {client.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}