"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { SearchParams } from "@/schemas/Modules/Hospedagens/Busca/search-params";
import { fetchSearchResults } from "@/services/Modules/Hospedagens/accommodations";

export const SEARCH_QUERY_KEY = "hospedagens-busca";

export function useSearchResults(params: SearchParams) {
  return useQuery({
    queryKey: [SEARCH_QUERY_KEY, params],
    queryFn: () => fetchSearchResults(params),
    placeholderData: keepPreviousData,
  });
}
