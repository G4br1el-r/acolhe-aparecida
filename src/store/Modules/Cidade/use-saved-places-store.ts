import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SavedPlacesState = {
  placeIds: string[];
  isSaved: (placeId: string) => boolean;
  toggleSaved: (placeId: string) => boolean;
  clearSaved: () => void;
};

export const SAVED_PLACES_STORAGE_KEY = "acolher-aparecida:lugares-salvos";

export const useSavedPlacesStore = create<SavedPlacesState>()(
  persist(
    (set, get) => ({
      placeIds: [],
      isSaved: (placeId) => get().placeIds.includes(placeId),
      toggleSaved: (placeId) => {
        const exists = get().placeIds.includes(placeId);

        set((state) => ({
          placeIds: exists
            ? state.placeIds.filter((id) => id !== placeId)
            : [...state.placeIds, placeId],
        }));

        return !exists;
      },
      clearSaved: () => set({ placeIds: [] }),
    }),
    {
      name: SAVED_PLACES_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
