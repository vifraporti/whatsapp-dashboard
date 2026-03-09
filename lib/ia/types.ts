import { LucideIcon } from "lucide-react";

export type IAEventType =
  | "mensagem_resolvida"
  | "pedido_criado"
  | "lead_recuperado"
  | "suporte_finalizado"
  | "auxilio_vendedor";

export type IAEvent = {
  id: string;
  type: IAEventType;
  title: string;
  points: number;
  at: string;
};

export type PointsRule = {
  type: IAEventType;
  label: string;
  points: number;
  icon: LucideIcon;
  hint: string;
};