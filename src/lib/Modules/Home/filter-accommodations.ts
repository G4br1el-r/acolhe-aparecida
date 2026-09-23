import type { Accommodation } from "@/constants/Modules/Home/accommodations";
import type { TravelerProfileId } from "@/constants/Modules/Home/traveler-profiles";

export function filterAccommodationsByProfiles(
  accommodations: Accommodation[],
  selectedProfileIds: TravelerProfileId[],
): Accommodation[] {
  if (selectedProfileIds.length === 0) return accommodations;

  return accommodations.filter((accommodation) =>
    selectedProfileIds.every((profileId) =>
      accommodation.suitableFor.includes(profileId),
    ),
  );
}
