import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import {
  ACCESSIBILITY_LABELS,
  ACCOMMODATION_TYPE_LABELS,
  BADGE_LABELS,
  MEAL_LABELS,
  PARKING_LABELS,
} from "@/constants/Modules/Hospedagens/features";
import { formatDistance } from "@/lib/Modules/Hospedagens/distance";
import { pluralize } from "@/lib/Modules/Hospedagens/format-date";

export type CompareDirection = "min" | "max";

export type CompareCell = {
  text: string;
  isBest: boolean;
  isMissing: boolean;
};

export type CompareRowId =
  | "distancia"
  | "tipo"
  | "alimentacao"
  | "estacionamento"
  | "acessibilidade"
  | "elevador"
  | "cancelamento"
  | "parcelamento"
  | "capacidade"
  | "piscina"
  | "recepcao"
  | "selos";

export type CompareRow = {
  id: CompareRowId;
  label: string;
  cells: CompareCell[];
};

type ComparableValue = number | null;

const YES_LABEL = "Sim";
const NO_LABEL = "Não";
const MIN_ITEMS_TO_COMPARE = 2;

export function findBestIndexes(
  values: ComparableValue[],
  direction: CompareDirection,
): number[] {
  const validValues = values.filter((value): value is number => value !== null);

  if (validValues.length < MIN_ITEMS_TO_COMPARE) return [];

  const best =
    direction === "min" ? Math.min(...validValues) : Math.max(...validValues);
  const allEqual = validValues.every((value) => value === best);

  if (allEqual) return [];

  return values.flatMap((value, index) => (value === best ? [index] : []));
}

function booleanToValue(flag: boolean): number {
  return flag ? 1 : 0;
}

function buildRow(
  id: CompareRowId,
  label: string,
  texts: string[],
  values: ComparableValue[],
  direction: CompareDirection,
  missingIndexes: number[] = [],
): CompareRow {
  const bestIndexes = findBestIndexes(values, direction);

  return {
    id,
    label,
    cells: texts.map((text, index) => ({
      text,
      isBest: bestIndexes.includes(index),
      isMissing: missingIndexes.includes(index),
    })),
  };
}

function booleanRow(
  id: CompareRowId,
  label: string,
  flags: boolean[],
): CompareRow {
  return buildRow(
    id,
    label,
    flags.map((flag) => (flag ? YES_LABEL : NO_LABEL)),
    flags.map(booleanToValue),
    "max",
    flags.flatMap((flag, index) => (flag ? [] : [index])),
  );
}

function joinLabels(labels: string[], fallback: string): string {
  return labels.length > 0 ? labels.join(", ") : fallback;
}

export function maxGuestsPerRoom(accommodation: Accommodation): number {
  return accommodation.rooms.reduce(
    (max, room) => Math.max(max, room.maxGuests),
    0,
  );
}

export function buildCompareRows(
  accommodations: Accommodation[],
): CompareRow[] {
  const distances = accommodations.map(
    (item) => item.distances.santuarioInMeters,
  );
  const meals = accommodations.map((item) =>
    item.meals.map((meal) => MEAL_LABELS[meal].label),
  );
  const parking = accommodations.map((item) =>
    item.parking.map((option) => PARKING_LABELS[option].label),
  );
  const accessibility = accommodations.map((item) =>
    item.accessibility.map((feature) => ACCESSIBILITY_LABELS[feature].label),
  );
  const freeCancellation = accommodations.map((item) =>
    item.booking.includes("cancelamento-gratuito"),
  );
  const capacities = accommodations.map(maxGuestsPerRoom);
  const badges = accommodations.map((item) =>
    item.badges.map((badge) => BADGE_LABELS[badge].label),
  );

  return [
    buildRow(
      "distancia",
      "Distância do Santuário",
      accommodations.map(
        (item, index) =>
          `${formatDistance(distances[index] ?? 0)} · ${pluralize(item.walkingMinutes, "min a pé", "min a pé")}`,
      ),
      distances,
      "min",
    ),
    buildRow(
      "tipo",
      "Tipo",
      accommodations.map((item) => ACCOMMODATION_TYPE_LABELS[item.type]),
      accommodations.map(() => null),
      "max",
    ),
    buildRow(
      "alimentacao",
      "Café da manhã e refeições",
      meals.map((labels) => joinLabels(labels, "Sem refeições incluídas")),
      meals.map((labels) => labels.length),
      "max",
      meals.flatMap((labels, index) => (labels.length === 0 ? [index] : [])),
    ),
    buildRow(
      "estacionamento",
      "Estacionamento",
      parking.map((labels) => joinLabels(labels, "Sem estacionamento")),
      parking.map((labels) => labels.length),
      "max",
      parking.flatMap((labels, index) => (labels.length === 0 ? [index] : [])),
    ),
    buildRow(
      "acessibilidade",
      "Acessibilidade",
      accessibility.map((labels) =>
        joinLabels(labels, "Sem recursos informados"),
      ),
      accessibility.map((labels) => labels.length),
      "max",
      accessibility.flatMap((labels, index) =>
        labels.length === 0 ? [index] : [],
      ),
    ),
    booleanRow(
      "elevador",
      "Elevador",
      accommodations.map((item) => item.structure.includes("elevador")),
    ),
    buildRow(
      "cancelamento",
      "Cancelamento gratuito",
      accommodations.map((item, index) =>
        freeCancellation[index]
          ? `Até ${pluralize(item.cancellationPolicy.freeUntilDaysBefore, "dia", "dias")} antes`
          : NO_LABEL,
      ),
      accommodations.map((item, index) =>
        freeCancellation[index]
          ? item.cancellationPolicy.freeUntilDaysBefore
          : 0,
      ),
      "max",
      freeCancellation.flatMap((flag, index) => (flag ? [] : [index])),
    ),
    booleanRow(
      "parcelamento",
      "Parcelamento sem juros",
      accommodations.map((item) => item.booking.includes("parcelamento")),
    ),
    buildRow(
      "capacidade",
      "Capacidade por quarto",
      capacities.map((capacity) =>
        capacity > 0
          ? `Até ${pluralize(capacity, "pessoa", "pessoas")}`
          : NO_LABEL,
      ),
      capacities,
      "max",
    ),
    booleanRow(
      "piscina",
      "Piscina",
      accommodations.map((item) => item.structure.includes("piscina")),
    ),
    booleanRow(
      "recepcao",
      "Recepção 24h",
      accommodations.map((item) => item.structure.includes("recepcao-24h")),
    ),
    buildRow(
      "selos",
      "Selos",
      badges.map((labels) => joinLabels(labels, "Nenhum selo ainda")),
      accommodations.map(() => null),
      "max",
      badges.flatMap((labels, index) => (labels.length === 0 ? [index] : [])),
    ),
  ];
}
