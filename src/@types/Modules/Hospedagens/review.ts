import type { ReviewCategoryId } from "./accommodation";

export type ReviewTravelerType =
  | "familia"
  | "casal"
  | "idosos"
  | "romaria"
  | "excursao"
  | "sozinho"
  | "amigos";

export type ReviewPhoto = {
  id: string;
  url: string;
  caption: string;
};

export type PartnerReply = {
  text: string;
  repliedAt: string;
};

export type Review = {
  id: string;
  accommodationSlug: string;
  reservationId?: string;
  userId?: string;
  authorName: string;
  travelerType: ReviewTravelerType;
  stayedAt: string;
  createdAt: string;
  overallScore: number;
  categoryScores: Partial<Record<ReviewCategoryId, number>>;
  title?: string;
  comment: string;
  photos: ReviewPhoto[];
  partnerReply?: PartnerReply;
  isVerifiedStay: boolean;
};
