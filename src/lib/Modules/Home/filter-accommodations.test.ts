import { describe, expect, it } from "vitest";
import type { Accommodation } from "@/constants/Modules/Home/accommodations";
import { filterAccommodationsByProfiles } from "./filter-accommodations";

function buildAccommodation(
  overrides: Partial<Accommodation> &
    Pick<Accommodation, "slug" | "suitableFor">,
): Accommodation {
  return {
    name: "Hospedagem",
    image: "",
    distanceFromSanctuary: "400 m do Santuário",
    walkingMinutes: 5,
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
    ...overrides,
  };
}

const ACESSIVEL_COM_IDOSOS = buildAccommodation({
  slug: "acessivel-idosos",
  suitableFor: ["idosos", "acessibilidade"],
});

const SO_FAMILIA = buildAccommodation({
  slug: "so-familia",
  suitableFor: ["familia-criancas"],
});

const GRUPO_COM_VAN = buildAccommodation({
  slug: "grupo-van",
  suitableFor: ["grupo-romarias", "estacionamento-van"],
});

const ALL = [ACESSIVEL_COM_IDOSOS, SO_FAMILIA, GRUPO_COM_VAN];

describe("filterAccommodationsByProfiles", () => {
  it("retorna todas as hospedagens quando nenhum perfil está selecionado", () => {
    expect(filterAccommodationsByProfiles(ALL, [])).toEqual(ALL);
  });

  it("filtra pelo perfil selecionado", () => {
    expect(filterAccommodationsByProfiles(ALL, ["idosos"])).toEqual([
      ACESSIVEL_COM_IDOSOS,
    ]);
  });

  it("exige todos os perfis quando há mais de um selecionado", () => {
    expect(
      filterAccommodationsByProfiles(ALL, ["idosos", "acessibilidade"]),
    ).toEqual([ACESSIVEL_COM_IDOSOS]);
  });

  it("retorna vazio quando a combinação de perfis não existe", () => {
    expect(
      filterAccommodationsByProfiles(ALL, ["idosos", "estacionamento-van"]),
    ).toEqual([]);
  });

  it("não modifica o array original", () => {
    const original = [...ALL];
    filterAccommodationsByProfiles(ALL, ["idosos"]);
    expect(ALL).toEqual(original);
  });
});
