import type { SortOption } from "@/schemas/Modules/Hospedagens/Busca/search-params";

export const SORT_LABELS: Record<SortOption, string> = {
  recomendados: "Recomendados",
  "menor-preco": "Menor preço",
  "melhor-avaliacao": "Melhor avaliação",
  "mais-proximo": "Mais perto do Santuário",
  "mais-populares": "Mais reservados",
  "custo-beneficio": "Melhor custo-benefício",
};

export const PRICE_RANGE = {
  min: 100,
  max: 1500,
  step: 10,
} as const;

export const DISTANCE_OPTIONS = [
  { value: 300, label: "Até 300 m" },
  { value: 500, label: "Até 500 m" },
  { value: 1000, label: "Até 1 km" },
  { value: 2000, label: "Até 2 km" },
] as const;

export const RATING_OPTIONS = [
  { value: 4, label: "4,0 ou mais" },
  { value: 4.5, label: "4,5 ou mais" },
  { value: 4.8, label: "4,8 ou mais" },
] as const;

export const RESULTS_PAGE_SIZE = 12;
