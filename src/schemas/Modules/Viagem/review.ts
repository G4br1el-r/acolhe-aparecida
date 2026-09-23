import { z } from "zod";
import type { ReviewCategoryId } from "@/@types/Modules/Hospedagens/accommodation";
import {
  MAX_COMMENT_LENGTH,
  MAX_REVIEW_PHOTOS,
  MAX_SCORE,
  MAX_TITLE_LENGTH,
  MIN_COMMENT_LENGTH,
  MIN_SCORE,
  TRAVELER_TYPE_OPTIONS,
} from "@/constants/Modules/Viagem/review-form";

const scoreSchema = z
  .number({ error: "Escolha uma nota." })
  .int()
  .min(MIN_SCORE, "Escolha uma nota.")
  .max(MAX_SCORE, "Escolha uma nota.");

const photoSchema = z.object({
  id: z.string(),
  url: z.string(),
  caption: z.string(),
});

export const reviewCommentSchema = z
  .string()
  .trim()
  .min(
    MIN_COMMENT_LENGTH,
    `Conte um pouco mais: pelo menos ${MIN_COMMENT_LENGTH} caracteres.`,
  )
  .max(MAX_COMMENT_LENGTH, `Use até ${MAX_COMMENT_LENGTH} caracteres.`);

export function createReviewSchema(categoryIds: ReviewCategoryId[]) {
  const categoryShape = Object.fromEntries(
    categoryIds.map((categoryId) => [categoryId, scoreSchema]),
  ) as Record<ReviewCategoryId, typeof scoreSchema>;

  return z.object({
    overallScore: scoreSchema,
    categoryScores: z.object(categoryShape),
    travelerType: z.enum(TRAVELER_TYPE_OPTIONS, {
      error: "Conte como foi a viagem.",
    }),
    title: z
      .string()
      .trim()
      .max(MAX_TITLE_LENGTH, `Use até ${MAX_TITLE_LENGTH} caracteres.`),
    comment: reviewCommentSchema,
    photos: z
      .array(photoSchema)
      .max(MAX_REVIEW_PHOTOS, `Escolha até ${MAX_REVIEW_PHOTOS} fotos.`),
  });
}

export type ReviewSchema = ReturnType<typeof createReviewSchema>;
export type ReviewFormValues = z.infer<ReviewSchema>;
