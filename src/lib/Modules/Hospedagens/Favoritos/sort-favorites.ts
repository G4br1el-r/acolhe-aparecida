import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";

export const FAVORITES_SORT_OPTIONS = [
  "mais-recentes",
  "menor-preco",
  "melhor-nota",
] as const;

export type FavoritesSort = (typeof FAVORITES_SORT_OPTIONS)[number];

export const FAVORITES_SORT_LABELS: Record<FavoritesSort, string> = {
  "mais-recentes": "Mais recentes",
  "menor-preco": "Menor preço",
  "melhor-nota": "Melhor nota",
};

export type FavoriteItem = {
  accommodation: Accommodation;
  savedAt: string;
};

export function sortFavorites(
  items: FavoriteItem[],
  sort: FavoritesSort,
): FavoriteItem[] {
  const sorted = [...items];

  if (sort === "menor-preco") {
    return sorted.sort(
      (first, second) =>
        first.accommodation.pricePerNight - second.accommodation.pricePerNight,
    );
  }

  if (sort === "melhor-nota") {
    return sorted.sort(
      (first, second) =>
        second.accommodation.rating - first.accommodation.rating,
    );
  }

  return sorted.sort((first, second) =>
    second.savedAt.localeCompare(first.savedAt),
  );
}
