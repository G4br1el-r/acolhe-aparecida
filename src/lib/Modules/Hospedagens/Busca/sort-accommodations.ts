import type { SortOption } from "@/schemas/Modules/Hospedagens/Busca/search-params";
import type { SearchResult } from "./filter-accommodations";

const RATING_WEIGHT = 0.5;
const DISTANCE_WEIGHT = 0.3;
const POPULARITY_WEIGHT = 0.2;
const MAX_RATING = 5;
const DISTANCE_SCALE_IN_METERS = 1500;
const POPULARITY_SCALE = 140;
const VALUE_PRICE_SCALE = 500;

function recommendationScore(result: SearchResult): number {
  const { accommodation } = result;
  const ratingScore = accommodation.rating / MAX_RATING;
  const distanceScore = Math.max(
    0,
    1 - accommodation.distances.santuarioInMeters / DISTANCE_SCALE_IN_METERS,
  );
  const popularityScore = Math.min(
    1,
    accommodation.bookingsLastMonth / POPULARITY_SCALE,
  );

  return (
    ratingScore * RATING_WEIGHT +
    distanceScore * DISTANCE_WEIGHT +
    popularityScore * POPULARITY_WEIGHT
  );
}

function valueScore(result: SearchResult): number {
  const priceScore = Math.max(0, 1 - result.nightlyRate / VALUE_PRICE_SCALE);
  return result.accommodation.rating / MAX_RATING + priceScore;
}

function availabilityFirst(first: SearchResult, second: SearchResult): number {
  return (
    Number(second.availability.isAvailable) -
    Number(first.availability.isAvailable)
  );
}

export function sortSearchResults(
  results: SearchResult[],
  sort: SortOption,
): SearchResult[] {
  const comparators: Record<
    SortOption,
    (first: SearchResult, second: SearchResult) => number
  > = {
    recomendados: (first, second) =>
      recommendationScore(second) - recommendationScore(first),
    "menor-preco": (first, second) => first.nightlyRate - second.nightlyRate,
    "melhor-avaliacao": (first, second) =>
      second.accommodation.rating - first.accommodation.rating ||
      second.accommodation.reviewCount - first.accommodation.reviewCount,
    "mais-proximo": (first, second) =>
      first.accommodation.distances.santuarioInMeters -
      second.accommodation.distances.santuarioInMeters,
    "mais-populares": (first, second) =>
      second.accommodation.bookingsLastMonth -
      first.accommodation.bookingsLastMonth,
    "custo-beneficio": (first, second) =>
      valueScore(second) - valueScore(first),
  };

  const comparator = comparators[sort];

  return [...results].sort(
    (first, second) =>
      availabilityFirst(first, second) || comparator(first, second),
  );
}
