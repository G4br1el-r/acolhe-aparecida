"use client";

import { X } from "lucide-react";
import {
  clearAllFilters,
  listActiveFilters,
} from "@/lib/Modules/Hospedagens/Busca/active-filters";
import type { SearchParams } from "@/schemas/Modules/Hospedagens/Busca/search-params";

type ActiveFiltersProps = {
  values: SearchParams;
  onChange: (changes: Partial<SearchParams>) => void;
};

export function ActiveFilters({ values, onChange }: ActiveFiltersProps) {
  const filters = listActiveFilters(values);

  if (filters.length === 0) return null;

  return (
    <ul
      aria-label="Filtros aplicados"
      className="flex flex-wrap items-center gap-2"
    >
      {filters.map((filter) => (
        <li key={filter.id}>
          <button
            type="button"
            onClick={() => onChange(filter.remove)}
            aria-label={`Remover filtro ${filter.label}`}
            className="flex cursor-pointer items-center gap-1.5 rounded-full bg-blue-950 py-1.5 pr-2 pl-3 text-xs font-medium text-white transition-colors hover:bg-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
          >
            {filter.label}
            <X className="h-3 w-3" aria-hidden />
          </button>
        </li>
      ))}
      <li>
        <button
          type="button"
          onClick={() => onChange(clearAllFilters())}
          className="cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium text-blue-900 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
        >
          Limpar tudo
        </button>
      </li>
    </ul>
  );
}
