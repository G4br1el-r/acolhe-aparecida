import type { DemandLevel } from "@/@types/Modules/Cidade/city";

export type DemandLevelInfo = {
  label: string;
  description: string;
  toneClassName: string;
  dotClassName: string;
};

export const DEMAND_LEVELS: Record<DemandLevel, DemandLevelInfo> = {
  normal: {
    label: "Procura normal",
    description: "Boa oferta de quartos e diárias na faixa habitual.",
    toneClassName: "bg-blue-50 text-blue-950/70",
    dotClassName: "bg-blue-900/40",
  },
  alta: {
    label: "Alta procura",
    description:
      "Diárias um pouco mais altas e hospedagens perto do Santuário esgotam primeiro.",
    toneClassName: "bg-amber-50 text-amber-800",
    dotClassName: "bg-amber-500",
  },
  "muito-alta": {
    label: "Procura muito alta",
    description:
      "Diárias no valor mais alto do ano e a maioria das hospedagens esgota com semanas de antecedência.",
    toneClassName: "bg-cta/10 text-cta",
    dotClassName: "bg-cta",
  },
};

export const DEMAND_EXPLANATION =
  "Em datas de alta procura as diárias sobem e as vagas perto do Santuário acabam primeiro. Reservar antes garante preço e lugar.";
