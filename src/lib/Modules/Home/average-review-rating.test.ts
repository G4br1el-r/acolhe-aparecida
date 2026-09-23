import { describe, expect, it } from "vitest";
import type { GuestReview } from "@/constants/Modules/Home/guest-reviews";
import { averageReviewRating } from "./average-review-rating";

function buildReview(id: string, rating: number): GuestReview {
  return {
    id,
    quote: "",
    authorName: "",
    travelContext: "",
    stayedAt: "",
    rating,
    accommodationName: "",
    highlight: "",
    portrait: "",
    portraitAlt: "",
    relatedProfiles: [],
  };
}

describe("averageReviewRating", () => {
  it("retorna zero quando não há avaliações", () => {
    expect(averageReviewRating([])).toBe(0);
  });

  it("retorna a própria nota quando há uma avaliação", () => {
    expect(averageReviewRating([buildReview("a", 4.8)])).toBe(4.8);
  });

  it("calcula a média das notas", () => {
    expect(
      averageReviewRating([buildReview("a", 4.8), buildReview("b", 5)]),
    ).toBe(4.9);
  });

  it("arredonda a média para uma casa decimal", () => {
    expect(
      averageReviewRating([
        buildReview("a", 4.9),
        buildReview("b", 4.8),
        buildReview("c", 5),
      ]),
    ).toBe(4.9);
  });
});
