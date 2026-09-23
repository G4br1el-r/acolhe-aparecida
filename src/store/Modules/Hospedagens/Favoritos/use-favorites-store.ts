import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type FavoriteEntry = {
  slug: string;
  savedAt: string;
};

type FavoritesState = {
  favorites: FavoriteEntry[];
  isFavorite: (slug: string) => boolean;
  toggleFavorite: (slug: string) => boolean;
  removeFavorite: (slug: string) => void;
  clearFavorites: () => void;
};

export const FAVORITES_STORAGE_KEY = "acolher-aparecida:favoritos";

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      isFavorite: (slug) =>
        get().favorites.some((favorite) => favorite.slug === slug),
      toggleFavorite: (slug) => {
        const exists = get().isFavorite(slug);

        set((state) => ({
          favorites: exists
            ? state.favorites.filter((favorite) => favorite.slug !== slug)
            : [{ slug, savedAt: new Date().toISOString() }, ...state.favorites],
        }));

        return !exists;
      },
      removeFavorite: (slug) =>
        set((state) => ({
          favorites: state.favorites.filter(
            (favorite) => favorite.slug !== slug,
          ),
        })),
      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: FAVORITES_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
