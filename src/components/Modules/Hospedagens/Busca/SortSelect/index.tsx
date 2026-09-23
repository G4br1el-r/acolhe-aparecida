"use client";

import { ArrowUpDown } from "lucide-react";
import { useId } from "react";
import { SORT_LABELS } from "@/constants/Modules/Hospedagens/Busca/filter-options";
import {
  SORT_OPTIONS,
  type SortOption,
} from "@/schemas/Modules/Hospedagens/Busca/search-params";

type SortSelectProps = {
  value: SortOption;
  onChange: (value: SortOption) => void;
};

export function SortSelect({ value, onChange }: SortSelectProps) {
  const selectId = useId();

  return (
    <div className="relative flex min-w-0 flex-1 items-center sm:flex-none">
      <label htmlFor={selectId} className="sr-only">
        Ordenar por
      </label>
      <ArrowUpDown
        aria-hidden
        className="pointer-events-none absolute left-3 h-4 w-4 text-blue-900/70"
      />
      <select
        id={selectId}
        value={value}
        onChange={(event) => onChange(event.target.value as SortOption)}
        className="h-11 w-full cursor-pointer appearance-none truncate rounded-full bg-white pr-9 pl-9 text-sm font-medium text-blue-950 ring-1 ring-blue-950/15 transition-colors hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-900"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {SORT_LABELS[option]}
          </option>
        ))}
      </select>
      <span
        aria-hidden
        className="pointer-events-none absolute right-3.5 text-xs text-blue-950/50"
      >
        ▾
      </span>
    </div>
  );
}
