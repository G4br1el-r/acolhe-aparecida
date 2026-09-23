import { z } from "zod";
import type { TravelerProfileId } from "@/constants/Modules/Home/traveler-profiles";

export const SORT_OPTIONS = [
  "recomendados",
  "menor-preco",
  "melhor-avaliacao",
  "mais-proximo",
  "mais-populares",
  "custo-beneficio",
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number];

export const MIN_RATING_OPTIONS = [4, 4.5, 4.8] as const;

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const MAX_ADULTS = 40;
const MAX_CHILDREN = 20;
const MAX_SENIORS = 30;
const MAX_ROOMS = 20;
const MAX_CHILD_AGE = 17;
const MAX_PRICE = 2000;

const TRAVELER_PROFILE_IDS: TravelerProfileId[] = [
  "familia-criancas",
  "idosos",
  "grupo-romarias",
  "acessibilidade",
  "estacionamento-van",
  "cafe-manha",
];

function csv<Value extends string>(values: readonly Value[]) {
  return z
    .string()
    .optional()
    .transform((raw) =>
      raw
        ? raw
            .split(",")
            .filter((item): item is Value => values.includes(item as Value))
        : [],
    );
}

function numberParam(max: number, fallback: number) {
  return z.coerce
    .number()
    .int()
    .min(0)
    .max(max)
    .catch(fallback)
    .default(fallback);
}

const optionalIsoDate = z
  .string()
  .regex(ISO_DATE_PATTERN)
  .optional()
  .catch(undefined);

export const searchParamsSchema = z.object({
  checkin: optionalIsoDate,
  checkout: optionalIsoDate,
  adultos: numberParam(MAX_ADULTS, 2),
  criancas: numberParam(MAX_CHILDREN, 0),
  idosos: numberParam(MAX_SENIORS, 0),
  quartos: numberParam(MAX_ROOMS, 1),
  idades: z
    .string()
    .optional()
    .transform((raw) =>
      raw
        ? raw
            .split(",")
            .map((age) => Number.parseInt(age, 10))
            .filter(
              (age) =>
                Number.isInteger(age) && age >= 0 && age <= MAX_CHILD_AGE,
            )
        : [],
    ),
  acessibilidade: z
    .string()
    .optional()
    .transform((raw) => raw === "1" || raw === "true"),
  perfis: csv(TRAVELER_PROFILE_IDS),
  criterio: z.string().optional(),
  ordenar: z.enum(SORT_OPTIONS).catch("recomendados").default("recomendados"),
  preco_min: z.coerce
    .number()
    .min(0)
    .max(MAX_PRICE)
    .optional()
    .catch(undefined),
  preco_max: z.coerce
    .number()
    .min(0)
    .max(MAX_PRICE)
    .optional()
    .catch(undefined),
  tipo: csv(["hotel", "pousada", "casa", "apartamento", "quarto"] as const),
  distancia: z.coerce.number().min(100).max(5000).optional().catch(undefined),
  alimentacao: csv([
    "cafe",
    "almoco",
    "jantar",
    "meia-pensao",
    "pensao-completa",
    "restaurante",
  ] as const),
  estacionamento: csv(["carro", "van", "onibus", "gratuito", "pago"] as const),
  estrutura: csv([
    "wifi",
    "ar-condicionado",
    "piscina",
    "elevador",
    "recepcao-24h",
    "pet-friendly",
    "quartos-familiares",
    "berco",
  ] as const),
  acesso: csv([
    "entrada-acessivel",
    "banheiro-adaptado",
    "barras-de-apoio",
    "quarto-acessivel",
    "elevador",
  ] as const),
  reserva: csv([
    "cancelamento-gratuito",
    "parcelamento",
    "confirmacao-imediata",
  ] as const),
  nota: z.coerce
    .number()
    .refine((value) => MIN_RATING_OPTIONS.includes(value as 4 | 4.5 | 4.8))
    .optional()
    .catch(undefined),
  cenario: z.string().optional(),
  ver: z.enum(["lista", "mapa"]).catch("lista").default("lista"),
});

export type SearchParams = z.infer<typeof searchParamsSchema>;

export type RawSearchParams = Record<string, string | string[] | undefined>;

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function parseSearchParams(raw: RawSearchParams): SearchParams {
  const flattened = Object.fromEntries(
    Object.entries(raw).map(([key, value]) => [key, firstValue(value)]),
  );

  return searchParamsSchema.parse(flattened);
}

export function searchParamsToQueryString(
  params: Partial<SearchParams>,
): string {
  const query = new URLSearchParams();

  const setIfPresent = (key: string, value: unknown) => {
    if (value === undefined || value === null || value === "") return;
    if (Array.isArray(value)) {
      if (value.length > 0) query.set(key, value.join(","));
      return;
    }
    if (typeof value === "boolean") {
      if (value) query.set(key, "1");
      return;
    }
    query.set(key, String(value));
  };

  setIfPresent("checkin", params.checkin);
  setIfPresent("checkout", params.checkout);
  if (params.adultos !== undefined && params.adultos !== 2) {
    setIfPresent("adultos", params.adultos);
  }
  if (params.criancas) setIfPresent("criancas", params.criancas);
  if (params.idosos) setIfPresent("idosos", params.idosos);
  if (params.quartos !== undefined && params.quartos !== 1) {
    setIfPresent("quartos", params.quartos);
  }
  setIfPresent("idades", params.idades);
  setIfPresent("acessibilidade", params.acessibilidade);
  setIfPresent("perfis", params.perfis);
  setIfPresent("criterio", params.criterio);
  if (params.ordenar && params.ordenar !== "recomendados") {
    setIfPresent("ordenar", params.ordenar);
  }
  setIfPresent("preco_min", params.preco_min);
  setIfPresent("preco_max", params.preco_max);
  setIfPresent("tipo", params.tipo);
  setIfPresent("distancia", params.distancia);
  setIfPresent("alimentacao", params.alimentacao);
  setIfPresent("estacionamento", params.estacionamento);
  setIfPresent("estrutura", params.estrutura);
  setIfPresent("acesso", params.acesso);
  setIfPresent("reserva", params.reserva);
  setIfPresent("nota", params.nota);
  setIfPresent("cenario", params.cenario);
  if (params.ver && params.ver !== "lista") setIfPresent("ver", params.ver);

  return query.toString();
}

export function totalGuests(
  params: Pick<SearchParams, "adultos" | "criancas" | "idosos">,
): number {
  return params.adultos + params.criancas + params.idosos;
}
