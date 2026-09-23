import type { ReviewCategoryId } from "@/@types/Modules/Hospedagens/accommodation";
import type {
  Review,
  ReviewPhoto,
  ReviewTravelerType,
} from "@/@types/Modules/Hospedagens/review";
import { delay, FAST_LATENCY_IN_MS } from "@/mocks/latency";
import { SEEDED_REVIEWS } from "@/mocks/Modules/Hospedagens/reviews";
import { createMockId, readCollection, writeCollection } from "@/mocks/storage";

function readReviews(): Review[] {
  return readCollection<Review>("reviews", () => SEEDED_REVIEWS);
}

function sortNewestFirst(reviews: Review[]): Review[] {
  return [...reviews].sort((first, second) =>
    second.createdAt.localeCompare(first.createdAt),
  );
}

export async function fetchReviewsForAccommodation(
  slug: string,
): Promise<Review[]> {
  await delay(FAST_LATENCY_IN_MS);

  return sortNewestFirst(
    readReviews().filter((review) => review.accommodationSlug === slug),
  );
}

export async function fetchReviewsByUser(userId: string): Promise<Review[]> {
  await delay(FAST_LATENCY_IN_MS);

  return sortNewestFirst(
    readReviews().filter((review) => review.userId === userId),
  );
}

export async function fetchReviewByReservation(
  reservationId: string,
): Promise<Review | null> {
  await delay(FAST_LATENCY_IN_MS);

  return (
    readReviews().find((review) => review.reservationId === reservationId) ??
    null
  );
}

export type CreateReviewInput = {
  accommodationSlug: string;
  reservationId: string;
  userId: string;
  authorName: string;
  travelerType: ReviewTravelerType;
  stayedAt: string;
  overallScore: number;
  categoryScores: Partial<Record<ReviewCategoryId, number>>;
  title?: string;
  comment: string;
  photos: ReviewPhoto[];
};

export async function createReview(input: CreateReviewInput): Promise<Review> {
  await delay();

  const review: Review = {
    id: createMockId("rev"),
    accommodationSlug: input.accommodationSlug,
    reservationId: input.reservationId,
    userId: input.userId,
    authorName: input.authorName,
    travelerType: input.travelerType,
    stayedAt: input.stayedAt,
    createdAt: new Date().toISOString(),
    overallScore: input.overallScore,
    categoryScores: input.categoryScores,
    title: input.title,
    comment: input.comment,
    photos: input.photos,
    isVerifiedStay: true,
  };

  writeCollection("reviews", [review, ...readReviews()]);

  return review;
}
