import type {
  DemandLevel,
  GuidePlaceCategory,
} from "@/@types/Modules/Cidade/city";

export const GUIDE_CATEGORY_LABELS: Record<GuidePlaceCategory, string> = {
  santuario: "Santuário",
  atracao: "Atração",
  restaurante: "Restaurante",
  estacionamento: "Estacionamento",
  transporte: "Transporte",
  servico: "Serviço",
};

export const DEMAND_LABELS: Record<DemandLevel, string> = {
  normal: "Movimento normal",
  alta: "Movimento alto",
  "muito-alta": "Movimento muito alto",
};
