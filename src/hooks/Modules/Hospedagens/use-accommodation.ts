"use client";

import { useQuery } from "@tanstack/react-query";
import type { StayDates } from "@/lib/Modules/Hospedagens/Busca/availability";
import {
  fetchAccommodation,
  fetchAccommodationsBySlugs,
  fetchAvailability,
  fetchRelatedAccommodations,
} from "@/services/Modules/Hospedagens/accommodations";
import { fetchReviewsForAccommodation } from "@/services/Modules/Hospedagens/reviews";

export const ACCOMMODATION_QUERY_KEY = "hospedagem";
export const ACCOMMODATIONS_BY_SLUGS_QUERY_KEY = "hospedagens-por-slug";
export const AVAILABILITY_QUERY_KEY = "disponibilidade";
export const RELATED_QUERY_KEY = "hospedagens-relacionadas";
export const REVIEWS_QUERY_KEY = "avaliacoes-hospedagem";

export function useAccommodation(slug: string) {
  return useQuery({
    queryKey: [ACCOMMODATION_QUERY_KEY, slug],
    queryFn: () => fetchAccommodation(slug),
  });
}

export function useAccommodationsBySlugs(slugs: string[]) {
  return useQuery({
    queryKey: [ACCOMMODATIONS_BY_SLUGS_QUERY_KEY, slugs],
    queryFn: () => fetchAccommodationsBySlugs(slugs),
    enabled: slugs.length > 0,
  });
}

export function useAvailability(
  slug: string,
  dates: StayDates | null,
  roomsNeeded: number,
) {
  return useQuery({
    queryKey: [AVAILABILITY_QUERY_KEY, slug, dates, roomsNeeded],
    queryFn: () => fetchAvailability(slug, dates, roomsNeeded),
  });
}

export function useRelatedAccommodations(slug: string) {
  return useQuery({
    queryKey: [RELATED_QUERY_KEY, slug],
    queryFn: () => fetchRelatedAccommodations(slug),
  });
}

export function useAccommodationReviews(slug: string) {
  return useQuery({
    queryKey: [REVIEWS_QUERY_KEY, slug],
    queryFn: () => fetchReviewsForAccommodation(slug),
  });
}
