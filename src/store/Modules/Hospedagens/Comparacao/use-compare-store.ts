import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const MAX_COMPARE_ITEMS = 4;

type CompareState = {
  slugs: string[];
  isComparing: (slug: string) => boolean;
  toggleCompare: (slug: string) => "added" | "removed" | "full";
  removeFromCompare: (slug: string) => void;
  clearCompare: () => void;
};

export const COMPARE_STORAGE_KEY = "acolher-aparecida:comparacao";

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      slugs: [],
      isComparing: (slug) => get().slugs.includes(slug),
      toggleCompare: (slug) => {
        const { slugs } = get();

        if (slugs.includes(slug)) {
          set({ slugs: slugs.filter((item) => item !== slug) });
          return "removed";
        }

        if (slugs.length >= MAX_COMPARE_ITEMS) return "full";

        set({ slugs: [...slugs, slug] });
        return "added";
      },
      removeFromCompare: (slug) =>
        set((state) => ({
          slugs: state.slugs.filter((item) => item !== slug),
        })),
      clearCompare: () => set({ slugs: [] }),
    }),
    {
      name: COMPARE_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
