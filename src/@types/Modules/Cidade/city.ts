import type { Coordinates } from "@/@types/Modules/Hospedagens/accommodation";

export type DemandLevel = "normal" | "alta" | "muito-alta";

export type CityEventKind =
  | "festa"
  | "romaria"
  | "feriado"
  | "celebracao"
  | "evento";

export type CityEvent = {
  id: string;
  name: string;
  kind: CityEventKind;
  startDate: string;
  endDate: string;
  demand: DemandLevel;
  summary: string;
  tips: string[];
  image: string;
};

export type GuidePlaceCategory =
  | "santuario"
  | "atracao"
  | "restaurante"
  | "estacionamento"
  | "transporte"
  | "servico";

export type GuidePlace = {
  id: string;
  name: string;
  category: GuidePlaceCategory;
  summary: string;
  details: string[];
  openingHours?: string;
  priceLabel?: string;
  distanceFromSanctuaryInMeters: number;
  coordinates: Coordinates;
  image: string;
  isAccessible: boolean;
  goodForGroups: boolean;
};
