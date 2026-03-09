import type { Client } from "@/lib/types/clients";

export function exportClientsToCSV(
  clients: Client[],
  filename = "clientes.csv"
) {
  if (!clients?.length) return;

  const headers = [
    "ID",
    "Nome",
    "Email",
    "Telefone",
    "Status",
    "Total gasto",
    "Compras",
    "Data cadastro",
  ];

  const rows = clients.map((c) => [
    c.id,
    c.name,
    c.email,
    c.phone,
    c.status,
    c.totalSpent,
    c.purchasesCount,
    c.registrationDate,
  ]);

  const csvContent = [headers, ...rows]
    .map((row) =>
      row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")
    )
    .join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}