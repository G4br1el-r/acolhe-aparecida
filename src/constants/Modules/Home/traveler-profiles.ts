import {
  Accessibility,
  Bus,
  Coffee,
  type LucideIcon,
  PersonStanding,
  Users,
  UsersRound,
} from "lucide-react";

export type TravelerProfileId =
  | "familia-criancas"
  | "idosos"
  | "grupo-romarias"
  | "acessibilidade"
  | "estacionamento-van"
  | "cafe-manha";

export type TravelerProfile = {
  id: TravelerProfileId;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
};

export const TRAVELER_PROFILES: TravelerProfile[] = [
  {
    id: "familia-criancas",
    label: "Família com crianças",
    shortLabel: "Com crianças",
    icon: Users,
  },
  {
    id: "idosos",
    label: "Viajando com idosos",
    shortLabel: "Com idosos",
    icon: PersonStanding,
  },
  {
    id: "grupo-romarias",
    label: "Grupo ou romaria",
    shortLabel: "Grupo",
    icon: UsersRound,
  },
  {
    id: "acessibilidade",
    label: "Preciso de acessibilidade",
    shortLabel: "Acessível",
    icon: Accessibility,
  },
  {
    id: "estacionamento-van",
    label: "Vou de van ou ônibus",
    shortLabel: "Van e ônibus",
    icon: Bus,
  },
  {
    id: "cafe-manha",
    label: "Café da manhã incluso",
    shortLabel: "Com café",
    icon: Coffee,
  },
];
