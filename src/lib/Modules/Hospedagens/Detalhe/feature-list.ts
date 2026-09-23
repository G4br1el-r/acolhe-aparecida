import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import {
  ACCESSIBILITY_LABELS,
  BOOKING_LABELS,
  type FeatureLabel,
  MEAL_LABELS,
  PARKING_LABELS,
  STRUCTURE_LABELS,
} from "@/constants/Modules/Hospedagens/features";

export type FeatureGroup = {
  id: string;
  title: string;
  items: FeatureLabel[];
};

export function buildFeatureGroups(
  accommodation: Accommodation,
): FeatureGroup[] {
  const groups: FeatureGroup[] = [
    {
      id: "alimentacao",
      title: "Alimentação",
      items: accommodation.meals.map((meal) => MEAL_LABELS[meal]),
    },
    {
      id: "estacionamento",
      title: "Estacionamento",
      items: accommodation.parking.map((parking) => PARKING_LABELS[parking]),
    },
    {
      id: "estrutura",
      title: "Estrutura",
      items: accommodation.structure.map(
        (feature) => STRUCTURE_LABELS[feature],
      ),
    },
    {
      id: "acessibilidade",
      title: "Acessibilidade",
      items: accommodation.accessibility.map(
        (feature) => ACCESSIBILITY_LABELS[feature],
      ),
    },
    {
      id: "reserva",
      title: "Reserva",
      items: accommodation.booking.map((feature) => BOOKING_LABELS[feature]),
    },
  ];

  return groups.filter((group) => group.items.length > 0);
}

export function flattenFeatures(accommodation: Accommodation): FeatureLabel[] {
  return buildFeatureGroups(accommodation).flatMap((group) => group.items);
}
