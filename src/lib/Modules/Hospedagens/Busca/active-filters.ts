import { EDITORIAL_CRITERIA } from "@/constants/Modules/Home/editorial-criteria";
import { TRAVELER_PROFILES } from "@/constants/Modules/Home/traveler-profiles";
import { DISTANCE_OPTIONS } from "@/constants/Modules/Hospedagens/Busca/filter-options";
import {
  ACCESSIBILITY_LABELS,
  ACCOMMODATION_TYPE_LABELS,
  BOOKING_LABELS,
  MEAL_LABELS,
  PARKING_LABELS,
  STRUCTURE_LABELS,
} from "@/constants/Modules/Hospedagens/features";
import { formatCurrency } from "@/lib/Modules/Reserva/Checkout/price-summary";
import type { SearchParams } from "@/schemas/Modules/Hospedagens/Busca/search-params";

export type ActiveFilter = {
  id: string;
  label: string;
  remove: Partial<SearchParams>;
};

export function listActiveFilters(params: SearchParams): ActiveFilter[] {
  const filters: ActiveFilter[] = [];

  if (params.preco_min !== undefined || params.preco_max !== undefined) {
    const min =
      params.preco_min !== undefined ? formatCurrency(params.preco_min) : null;
    const max =
      params.preco_max !== undefined ? formatCurrency(params.preco_max) : null;
    const label =
      min && max
        ? `${min} a ${max}`
        : min
          ? `A partir de ${min}`
          : `Até ${max}`;
    filters.push({
      id: "preco",
      label,
      remove: { preco_min: undefined, preco_max: undefined },
    });
  }

  if (params.distancia !== undefined) {
    const option = DISTANCE_OPTIONS.find(
      (item) => item.value === params.distancia,
    );
    filters.push({
      id: "distancia",
      label: option?.label ?? `Até ${params.distancia} m`,
      remove: { distancia: undefined },
    });
  }

  for (const type of params.tipo) {
    filters.push({
      id: `tipo-${type}`,
      label: ACCOMMODATION_TYPE_LABELS[type],
      remove: { tipo: params.tipo.filter((item) => item !== type) },
    });
  }
  for (const meal of params.alimentacao) {
    filters.push({
      id: `alimentacao-${meal}`,
      label: MEAL_LABELS[meal].label,
      remove: {
        alimentacao: params.alimentacao.filter((item) => item !== meal),
      },
    });
  }
  for (const parking of params.estacionamento) {
    filters.push({
      id: `estacionamento-${parking}`,
      label: PARKING_LABELS[parking].label,
      remove: {
        estacionamento: params.estacionamento.filter(
          (item) => item !== parking,
        ),
      },
    });
  }
  for (const feature of params.estrutura) {
    filters.push({
      id: `estrutura-${feature}`,
      label: STRUCTURE_LABELS[feature].label,
      remove: {
        estrutura: params.estrutura.filter((item) => item !== feature),
      },
    });
  }
  for (const feature of params.acesso) {
    filters.push({
      id: `acesso-${feature}`,
      label: ACCESSIBILITY_LABELS[feature].label,
      remove: { acesso: params.acesso.filter((item) => item !== feature) },
    });
  }
  for (const feature of params.reserva) {
    filters.push({
      id: `reserva-${feature}`,
      label: BOOKING_LABELS[feature].label,
      remove: { reserva: params.reserva.filter((item) => item !== feature) },
    });
  }
  for (const profile of params.perfis) {
    const option = TRAVELER_PROFILES.find((item) => item.id === profile);
    filters.push({
      id: `perfil-${profile}`,
      label: option?.label ?? profile,
      remove: { perfis: params.perfis.filter((item) => item !== profile) },
    });
  }
  if (params.criterio) {
    const criterion = EDITORIAL_CRITERIA.find(
      (item) => item.id === params.criterio,
    );
    if (criterion) {
      filters.push({
        id: "criterio",
        label: criterion.title,
        remove: { criterio: undefined },
      });
    }
  }
  if (params.nota !== undefined) {
    filters.push({
      id: "nota",
      label: `Nota ${params.nota.toLocaleString("pt-BR", { minimumFractionDigits: 1 })}+`,
      remove: { nota: undefined },
    });
  }
  if (params.acessibilidade) {
    filters.push({
      id: "acessibilidade",
      label: "Quarto acessível",
      remove: { acessibilidade: false },
    });
  }

  return filters;
}

export function clearAllFilters(): Partial<SearchParams> {
  return {
    preco_min: undefined,
    preco_max: undefined,
    distancia: undefined,
    tipo: [],
    alimentacao: [],
    estacionamento: [],
    estrutura: [],
    acesso: [],
    reserva: [],
    perfis: [],
    criterio: undefined,
    nota: undefined,
    acessibilidade: false,
  };
}
