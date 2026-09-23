"use client";

import { useQuery } from "@tanstack/react-query";
import type { GuidePlaceCategory } from "@/@types/Modules/Cidade/city";
import {
  fetchGuidePlaces,
  fetchGuidePlacesByIds,
  fetchUpcomingEvents,
} from "@/services/Modules/Cidade/city";

export const EVENTS_QUERY_KEY = "eventos";
export const GUIDE_QUERY_KEY = "guia";
export const SAVED_PLACES_QUERY_KEY = "lugares-salvos";

export function useUpcomingEvents() {
  return useQuery({
    queryKey: [EVENTS_QUERY_KEY],
    queryFn: () => fetchUpcomingEvents(),
  });
}

export function useGuidePlaces(category?: GuidePlaceCategory) {
  return useQuery({
    queryKey: [GUIDE_QUERY_KEY, category ?? "todos"],
    queryFn: () => fetchGuidePlaces(category),
  });
}

export function useSavedPlaces(placeIds: string[]) {
  return useQuery({
    queryKey: [SAVED_PLACES_QUERY_KEY, placeIds],
    queryFn: () => fetchGuidePlacesByIds(placeIds),
  });
}
