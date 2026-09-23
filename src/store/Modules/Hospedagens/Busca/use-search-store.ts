import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type SearchDraft = {
  checkIn: string | null;
  checkOut: string | null;
  adults: number;
  children: number;
  childAges: number[];
  seniors: number;
  rooms: number;
  needsAccessibility: boolean;
};

export type RecentSearch = SearchDraft & {
  id: string;
  searchedAt: string;
  query: string;
};

const MAX_RECENT_SEARCHES = 4;
const DEFAULT_ADULTS = 2;
const DEFAULT_ROOMS = 1;

export const EMPTY_SEARCH_DRAFT: SearchDraft = {
  checkIn: null,
  checkOut: null,
  adults: DEFAULT_ADULTS,
  children: 0,
  childAges: [],
  seniors: 0,
  rooms: DEFAULT_ROOMS,
  needsAccessibility: false,
};

type SearchState = {
  draft: SearchDraft;
  recentSearches: RecentSearch[];
  updateDraft: (changes: Partial<SearchDraft>) => void;
  resetDraft: () => void;
  rememberSearch: (query: string) => void;
  clearRecentSearches: () => void;
};

export const SEARCH_STORAGE_KEY = "acolher-aparecida:busca";

export const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      draft: EMPTY_SEARCH_DRAFT,
      recentSearches: [],
      updateDraft: (changes) =>
        set((state) => ({ draft: { ...state.draft, ...changes } })),
      resetDraft: () => set({ draft: EMPTY_SEARCH_DRAFT }),
      rememberSearch: (query) => {
        const { draft, recentSearches } = get();
        const entry: RecentSearch = {
          ...draft,
          id: `${Date.now()}`,
          searchedAt: new Date().toISOString(),
          query,
        };

        set({
          recentSearches: [
            entry,
            ...recentSearches.filter((recent) => recent.query !== query),
          ].slice(0, MAX_RECENT_SEARCHES),
        });
      },
      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: SEARCH_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
