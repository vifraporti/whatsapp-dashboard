export type Message = {
  at: string;
  who: "user" | "bot" | "atendente";
  text: string;
};

export type Conversation = {
  id: string;
  createdAt: string;
  nome: string;
  telefone: string;

  status: "Ativa" | "Aguardando" | "Encerrada";

  updatedAtLabel?: string;
  ultimaMsg?: string;
  mensagensCount?: number;

  cliente: {
    nomeCompleto: string;
    telefone: string;
    email: string;
    historicoCompras: string;
    ultimaCompra: string;
  };

  analise: {
    sentimento: "Positivo" | "Neutro" | "Negativo";
    intencao: string;
    produtosMencionados: string[];
    tokensUtilizados: number;
  };

  tempoConversa: string;

  historico: Message[];
};