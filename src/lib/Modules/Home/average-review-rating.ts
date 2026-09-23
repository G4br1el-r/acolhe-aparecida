import type { GuestReview } from "@/constants/Modules/Home/guest-reviews";

const RATING_DECIMAL_PLACES = 1;

export function averageReviewRating(reviews: GuestReview[]): number {
  if (reviews.length === 0) return 0;

  const total = reviews.reduce((sum, review) => sum + review.rating, 0);

  return Number((total / reviews.length).toFixed(RATING_DECIMAL_PLACES));
}
