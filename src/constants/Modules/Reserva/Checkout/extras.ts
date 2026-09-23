import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import type { ReservationExtraId } from "@/@types/Modules/Reserva/reservation";

export type ExtraOption = {
  id: ReservationExtraId;
  label: string;
  description: string;
  pricePerNight?: number;
  pricePerStay?: number;
  isPerGuest: boolean;
  isAvailableFor: (accommodation: Accommodation) => boolean;
};

const BREAKFAST_PRICE_PER_NIGHT = 35;
const LUNCH_PRICE_PER_NIGHT = 55;
const EARLY_CHECK_IN_PRICE = 60;

export const EXTRA_OPTIONS: ExtraOption[] = [
  {
    id: "cafe-da-manha",
    label: "Café da manhã",
    description: "Por pessoa, por noite. Servido a partir das 6h.",
    pricePerNight: BREAKFAST_PRICE_PER_NIGHT,
    isPerGuest: true,
    isAvailableFor: (accommodation) =>
      !accommodation.meals.includes("cafe") &&
      accommodation.meals.includes("restaurante"),
  },
  {
    id: "almoco",
    label: "Almoço no restaurante",
    description: "Por pessoa, por dia. Prato feito com opção infantil.",
    pricePerNight: LUNCH_PRICE_PER_NIGHT,
    isPerGuest: true,
    isAvailableFor: (accommodation) =>
      accommodation.meals.includes("almoco") &&
      !accommodation.meals.includes("pensao-completa"),
  },
  {
    id: "berco",
    label: "Berço no quarto",
    description: "Sem custo. Avise para deixarmos montado na chegada.",
    pricePerStay: 0,
    isPerGuest: false,
    isAvailableFor: (accommodation) =>
      accommodation.structure.includes("berco"),
  },
  {
    id: "vaga-van",
    label: "Vaga para van",
    description: "Sem custo. Reservamos o espaço no estacionamento.",
    pricePerStay: 0,
    isPerGuest: false,
    isAvailableFor: (accommodation) => accommodation.parking.includes("van"),
  },
  {
    id: "vaga-onibus",
    label: "Vaga para ônibus",
    description: "Sem custo. Informe a placa na chegada.",
    pricePerStay: 0,
    isPerGuest: false,
    isAvailableFor: (accommodation) => accommodation.parking.includes("onibus"),
  },
  {
    id: "check-in-antecipado",
    label: "Check-in antecipado",
    description: "Entrada a partir das 10h, sujeita a disponibilidade.",
    pricePerStay: EARLY_CHECK_IN_PRICE,
    isPerGuest: false,
    isAvailableFor: (accommodation) =>
      accommodation.structure.includes("recepcao-24h"),
  },
];

export const ARRIVAL_TIME_OPTIONS = [
  "Até 14h",
  "Entre 14h e 18h",
  "Entre 18h e 22h",
  "Depois das 22h",
  "Ainda não sei",
] as const;
