import { Conversation } from "@/lib/types/conversation";

export function exportConversationsToCSV(
  conversations: Conversation[],
  filename = "conversas.csv"
) {
  if (!conversations?.length) return;

  const headers = [
    "ID",
    "Nome",
    "Telefone",
    "Status",
    "Última Mensagem",
    "Mensagens",
    "Atualizado Em",
    "Criado Em",
  ];

  const rows = conversations.map((c) => [
    c.id,
    c.nome,
    c.telefone,
    c.status,
    c.ultimaMsg || "",
    c.mensagensCount ?? "",
    c.updatedAtLabel || "",
    c.createdAt || "",
  ]);

  const csvContent = [headers, ...rows]
    .map((row) =>
      row
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(",")
    )
    .join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}