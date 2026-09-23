"use client";

import { ChevronDown } from "lucide-react";
import { useId } from "react";
import {
  FAVORITES_SORT_LABELS,
  FAVORITES_SORT_OPTIONS,
  type FavoritesSort,
} from "@/lib/Modules/Hospedagens/Favoritos/sort-favorites";

type FavoritesSortSelectProps = {
  value: FavoritesSort;
  onChange: (value: FavoritesSort) => void;
};

function isFavoritesSort(value: string): value is FavoritesSort {
  return FAVORITES_SORT_OPTIONS.some((option) => option === value);
}

export function FavoritesSortSelect({
  value,
  onChange,
}: FavoritesSortSelectProps) {
  const selectId = useId();

  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor={selectId}
        className="text-sm font-medium text-blue-950/70"
      >
        Ordenar por
      </label>
      <div className="relative">
        <select
          id={selectId}
          value={value}
          onChange={(event) => {
            if (isFavoritesSort(event.target.value)) {
              onChange(event.target.value);
            }
          }}
          className="h-11 cursor-pointer appearance-none rounded-full bg-white pr-10 pl-4 text-sm font-semibold text-blue-950 ring-1 ring-blue-950/15 focus:outline-none focus:ring-2 focus:ring-blue-900"
        >
          {FAVORITES_SORT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {FAVORITES_SORT_LABELS[option]}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-blue-950/50"
        />
      </div>
    </div>
  );
}
