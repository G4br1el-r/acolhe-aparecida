import { create } from "zustand";
import type { TravelerProfileId } from "@/constants/Modules/Home/traveler-profiles";

type TravelerProfileState = {
  selectedProfileIds: TravelerProfileId[];
  toggleProfile: (profileId: TravelerProfileId) => void;
  clearProfiles: () => void;
};

export const useTravelerProfileStore = create<TravelerProfileState>((set) => ({
  selectedProfileIds: [],
  toggleProfile: (profileId) =>
    set((state) => ({
      selectedProfileIds: state.selectedProfileIds.includes(profileId)
        ? state.selectedProfileIds.filter((id) => id !== profileId)
        : [...state.selectedProfileIds, profileId],
    })),
  clearProfiles: () => set({ selectedProfileIds: [] }),
}));
