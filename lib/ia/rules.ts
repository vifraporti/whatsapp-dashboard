import {
  MessageCircle,
  ShoppingCart,
  TrendingUp,
  ShieldCheck,
  Users,
} from "lucide-react";

import { PointsRule } from "./types";

export const POINT_RULES: PointsRule[] = [
  {
    type: "mensagem_resolvida",
    label: "Mensagem resolvida",
    points: 5,
    icon: MessageCircle,
    hint: "A IA respondeu e encerrou um atendimento com sucesso.",
  },
  {
    type: "pedido_criado",
    label: "Pedido criado",
    points: 25,
    icon: ShoppingCart,
    hint: "A IA coletou itens/quantidade e gerou um pedido.",
  },
  {
    type: "lead_recuperado",
    label: "Lead recuperado",
    points: 15,
    icon: TrendingUp,
    hint: "A IA reativou um cliente que estava parado.",
  },
  {
    type: "suporte_finalizado",
    label: "Suporte finalizado",
    points: 10,
    icon: ShieldCheck,
    hint: "A IA resolveu uma dúvida/defeito e finalizou o suporte.",
  },
  {
    type: "auxilio_vendedor",
    label: "Auxílio ao vendedor",
    points: 8,
    icon: Users,
    hint: "A IA sugeriu resposta/argumento/preço e ajudou a equipe.",
  },
];