import { describe, expect, it } from "vitest";
import type { Accommodation } from "@/constants/Modules/Home/accommodations";
import { MAX_MAP_PINS, selectMapPins } from "./select-map-pins";

function buildAccommodation(
  slug: string,
  walkingMinutes: number,
): Accommodation {
  return {
    slug,
    name: `Hospedagem ${slug}`,
    image: "",
    distanceFromSanctuary: `${walkingMinutes * 80} m do Santuário`,
    walkingMinutes,
    coordinates: { lat: -22.8672, lng: -45.2256 },
    mapPosition: { x: 50, y: 50 },
    pricePerNight: 200,
    rating: 4.5,
    reviewCount: 10,
    amenities: [],
    maxGuests: 2,
    roomCount: 1,
    bedCount: 1,
    isAccessible: false,
    suitableFor: [],
  };
}

const ALL = Array.from({ length: 21 }, (_, index) =>
  buildAccommodation(`hospedagem-${index}`, 21 - index),
);

describe("selectMapPins", () => {
  it("limita os pins ao máximo configurado", () => {
    expect(selectMapPins(ALL, null)).toHaveLength(MAX_MAP_PINS);
  });

  it("prioriza as hospedagens mais próximas a pé", () => {
    const pins = selectMapPins(ALL, null);

    expect(pins[0].walkingMinutes).toBe(1);
    expect(pins.at(-1)?.walkingMinutes).toBe(MAX_MAP_PINS);
  });

  it("traz a hospedagem fixada quando ela ficaria de fora", () => {
    const farthest = ALL[0];
    const pins = selectMapPins(ALL, farthest.slug);

    expect(pins).toHaveLength(MAX_MAP_PINS);
    expect(pins[0].slug).toBe(farthest.slug);
  });

  it("mantém a seleção quando a fixada já está entre os pins", () => {
    const closest = ALL.at(-1);
    const pins = selectMapPins(ALL, closest?.slug ?? null);

    expect(pins[0].slug).toBe(closest?.slug);
  });

  it("devolve a lista inteira quando ela é menor que o máximo", () => {
    expect(selectMapPins(ALL.slice(0, 4), null)).toHaveLength(4);
  });
});
