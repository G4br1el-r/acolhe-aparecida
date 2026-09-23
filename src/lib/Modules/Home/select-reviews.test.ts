import { describe, expect, it } from "vitest";
import type { GuestReview } from "@/constants/Modules/Home/guest-reviews";
import { selectReviewsByProfiles } from "./select-reviews";

function buildReview(
  overrides: Pick<GuestReview, "id" | "authorName" | "relatedProfiles">,
): GuestReview {
  return {
    quote: "",
    travelContext: "",
    stayedAt: "",
    rating: 5,
    accommodationName: "",
    highlight: "",
    portrait: "",
    portraitAlt: "",
    ...overrides,
  };
}

const REVIEW_IDOSOS = buildReview({
  id: "idosos",
  authorName: "A",
  relatedProfiles: ["idosos"],
});

const REVIEW_GRUPO = buildReview({
  id: "grupo",
  authorName: "B",
  relatedProfiles: ["grupo-romarias", "estacionamento-van"],
});

const ALL = [REVIEW_IDOSOS, REVIEW_GRUPO];

describe("selectReviewsByProfiles", () => {
  it("retorna todas as avaliações sem perfil selecionado", () => {
    expect(selectReviewsByProfiles(ALL, [])).toEqual(ALL);
  });

  it("retorna apenas as avaliações do perfil escolhido", () => {
    expect(selectReviewsByProfiles(ALL, ["idosos"])).toEqual([REVIEW_IDOSOS]);
  });

  it("basta um perfil coincidir para a avaliação aparecer", () => {
    expect(selectReviewsByProfiles(ALL, ["estacionamento-van"])).toEqual([
      REVIEW_GRUPO,
    ]);
  });

  it("volta para todas as avaliações quando nenhuma corresponde ao perfil", () => {
    expect(selectReviewsByProfiles(ALL, ["cafe-manha"])).toEqual(ALL);
  });
});
