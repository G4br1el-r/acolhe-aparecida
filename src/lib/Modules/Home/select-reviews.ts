import type { GuestReview } from "@/constants/Modules/Home/guest-reviews";
import type { TravelerProfileId } from "@/constants/Modules/Home/traveler-profiles";

export function selectReviewsByProfiles(
  reviews: GuestReview[],
  selectedProfileIds: TravelerProfileId[],
): GuestReview[] {
  if (selectedProfileIds.length === 0) return reviews;

  const matching = reviews.filter((review) =>
    selectedProfileIds.some((profileId) =>
      review.relatedProfiles.includes(profileId),
    ),
  );

  return matching.length > 0 ? matching : reviews;
}
