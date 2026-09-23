import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import {
  type AccommodationAvailability,
  accommodationAvailabilityFor,
  type StayDates,
} from "@/lib/Modules/Hospedagens/Busca/availability";
import {
  type SearchResult,
  searchAccommodations,
} from "@/lib/Modules/Hospedagens/Busca/filter-accommodations";
import { sortSearchResults } from "@/lib/Modules/Hospedagens/Busca/sort-accommodations";
import { delay, FAST_LATENCY_IN_MS, SLOW_LATENCY_IN_MS } from "@/mocks/latency";
import { ACCOMMODATIONS } from "@/mocks/Modules/Hospedagens/accommodations";
import { MockServiceError, parseScenario } from "@/mocks/scenario";
import type { SearchParams } from "@/schemas/Modules/Hospedagens/Busca/search-params";

const RELATED_LIMIT = 4;

export type SearchResponse = {
  results: SearchResult[];
  totalCount: number;
  unavailableCount: number;
};

export async function fetchSearchResults(
  params: SearchParams,
): Promise<SearchResponse> {
  const scenario = parseScenario(params.cenario);

  await delay(scenario === "lento" ? SLOW_LATENCY_IN_MS : undefined);

  if (scenario === "erro") {
    throw new MockServiceError(
      "Não conseguimos carregar as hospedagens agora.",
    );
  }

  if (scenario === "vazio") {
    return { results: [], totalCount: 0, unavailableCount: 0 };
  }

  const results = sortSearchResults(
    searchAccommodations(ACCOMMODATIONS, params),
    params.ordenar,
  );

  return {
    results,
    totalCount: results.length,
    unavailableCount: results.filter(
      (result) => !result.availability.isAvailable,
    ).length,
  };
}

export async function fetchAccommodation(
  slug: string,
): Promise<Accommodation | null> {
  await delay(FAST_LATENCY_IN_MS);

  return (
    ACCOMMODATIONS.find((accommodation) => accommodation.slug === slug) ?? null
  );
}

export async function fetchAccommodationsBySlugs(
  slugs: string[],
): Promise<Accommodation[]> {
  await delay(FAST_LATENCY_IN_MS);

  return slugs
    .map((slug) =>
      ACCOMMODATIONS.find((accommodation) => accommodation.slug === slug),
    )
    .filter((accommodation): accommodation is Accommodation =>
      Boolean(accommodation),
    );
}

export async function fetchAvailability(
  slug: string,
  dates: StayDates | null,
  roomsNeeded: number,
): Promise<AccommodationAvailability | null> {
  await delay(FAST_LATENCY_IN_MS);

  const accommodation = ACCOMMODATIONS.find((item) => item.slug === slug);
  if (!accommodation) return null;

  return accommodationAvailabilityFor(accommodation, dates, roomsNeeded);
}

export async function fetchRelatedAccommodations(
  slug: string,
): Promise<Accommodation[]> {
  await delay(FAST_LATENCY_IN_MS);

  const current = ACCOMMODATIONS.find((item) => item.slug === slug);
  if (!current) return [];

  return ACCOMMODATIONS.filter((item) => item.slug !== slug)
    .map((item) => ({
      item,
      score:
        (item.type === current.type ? 2 : 0) +
        item.suitableFor.filter((profile) =>
          current.suitableFor.includes(profile),
        ).length -
        Math.abs(item.pricePerNight - current.pricePerNight) /
          current.pricePerNight,
    }))
    .sort((first, second) => second.score - first.score)
    .slice(0, RELATED_LIMIT)
    .map((entry) => entry.item);
}
