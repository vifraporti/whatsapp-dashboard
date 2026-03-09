export type Conversation = {
  id: string
  createdAt: string

  nome: string
  telefone: string
  status: string

  updatedAtLabel: string
  ultimaMsg: string
  mensagensCount: number

  cliente: {
    nomeCompleto: string
    telefone: string
    email: string
    historicoCompras: string
    ultimaCompra: string
  }

  analise: {
    sentimento: string
    intencao: string
    produtosMencionados: string[]
    tokensUtilizados: number
  }

  tempoConversa: string

  historico: {
    at: string
    who: string
    text: string
  }[]
}