import { describe, expect, it } from "vitest";
import { ACCOMMODATIONS } from "@/constants/Modules/Home/accommodations";
import {
  findAccommodationBySlug,
  getAllAccommodationSlugs,
} from "./accommodation";

describe("findAccommodationBySlug", () => {
  it("encontra uma hospedagem da listagem principal", () => {
    const accommodation = findAccommodationBySlug("hotel-rainha-do-brasil");

    expect(accommodation?.name).toBe("Hotel Rainha do Brasil");
  });

  it("encontra a hospedagem em destaque no mapa", () => {
    const accommodation = findAccommodationBySlug("conforto-para-toda-familia");

    expect(accommodation?.name).toBe("Conforto para toda a família");
  });

  it("retorna undefined para slug inexistente", () => {
    expect(findAccommodationBySlug("pousada-que-nao-existe")).toBeUndefined();
  });
});

describe("getAllAccommodationSlugs", () => {
  it("inclui todas as hospedagens da listagem mais a do mapa", () => {
    expect(getAllAccommodationSlugs()).toHaveLength(ACCOMMODATIONS.length + 1);
  });

  it("não possui slugs duplicados", () => {
    const slugs = getAllAccommodationSlugs();

    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
