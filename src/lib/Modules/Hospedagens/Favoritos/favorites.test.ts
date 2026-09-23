import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import { buildSharedFavoritesPath, parseSharedSlugs } from "./shared-favorites";
import { type FavoriteItem, sortFavorites } from "./sort-favorites";

function item(
  slug: string,
  pricePerNight: number,
  rating: number,
  savedAt: string,
): FavoriteItem {
  return {
    accommodation: { slug, pricePerNight, rating } as Accommodation,
    savedAt,
  };
}

const ITEMS = [
  item("a", 300, 4.2, "2026-09-01T10:00:00.000Z"),
  item("b", 150, 4.9, "2026-09-03T10:00:00.000Z"),
  item("c", 220, 4.5, "2026-09-02T10:00:00.000Z"),
];

describe("sortFavorites", () => {
  it("puts the most recently saved first", () => {
    expect(
      sortFavorites(ITEMS, "mais-recentes").map((i) => i.accommodation.slug),
    ).toEqual(["b", "c", "a"]);
  });

  it("sorts by lowest price", () => {
    expect(
      sortFavorites(ITEMS, "menor-preco").map((i) => i.accommodation.slug),
    ).toEqual(["b", "c", "a"]);
  });

  it("sorts by best rating", () => {
    expect(
      sortFavorites(ITEMS, "melhor-nota").map((i) => i.accommodation.slug),
    ).toEqual(["b", "c", "a"]);
  });

  it("does not mutate the input", () => {
    const copy = [...ITEMS];
    sortFavorites(ITEMS, "menor-preco");
    expect(ITEMS).toEqual(copy);
  });
});

describe("parseSharedSlugs", () => {
  it("splits, trims and removes duplicates", () => {
    expect(parseSharedSlugs("hotel-a, hotel-b,hotel-a")).toEqual([
      "hotel-a",
      "hotel-b",
    ]);
  });

  it("ignores values that are not slugs", () => {
    expect(parseSharedSlugs("hotel-a,<script>,Hotel B")).toEqual(["hotel-a"]);
  });

  it("returns an empty list when nothing is provided", () => {
    expect(parseSharedSlugs(undefined)).toEqual([]);
    expect(parseSharedSlugs("")).toEqual([]);
  });

  it("uses the first value when the param repeats", () => {
    expect(parseSharedSlugs(["a,b", "c"])).toEqual(["a", "b"]);
  });
});

describe("buildSharedFavoritesPath", () => {
  it("builds the shareable path", () => {
    expect(buildSharedFavoritesPath(["a", "b"])).toBe("/favoritos?itens=a,b");
  });

  it("falls back to the plain page when empty", () => {
    expect(buildSharedFavoritesPath([])).toBe("/favoritos");
  });
});
