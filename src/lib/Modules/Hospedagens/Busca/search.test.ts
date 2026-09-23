import { ACCOMMODATIONS } from "@/mocks/Modules/Hospedagens/accommodations";
import { parseSearchParams } from "@/schemas/Modules/Hospedagens/Busca/search-params";
import { searchAccommodations } from "./filter-accommodations";
import { sortSearchResults } from "./sort-accommodations";

describe("searchAccommodations", () => {
  it("retorna todas as hospedagens com capacidade para 2 adultos por padrão", () => {
    const results = searchAccommodations(ACCOMMODATIONS, parseSearchParams({}));

    expect(results.length).toBe(ACCOMMODATIONS.length);
  });

  it("filtra por tipo de hospedagem", () => {
    const results = searchAccommodations(
      ACCOMMODATIONS,
      parseSearchParams({ tipo: "casa" }),
    );

    expect(results.length).toBeGreaterThan(0);
    for (const result of results) {
      expect(result.accommodation.type).toBe("casa");
    }
  });

  it("filtra por estacionamento de ônibus", () => {
    const results = searchAccommodations(
      ACCOMMODATIONS,
      parseSearchParams({ estacionamento: "onibus" }),
    );

    expect(results.length).toBeGreaterThan(0);
    for (const result of results) {
      expect(result.accommodation.parking).toContain("onibus");
    }
  });

  it("filtra por capacidade quando o grupo é grande", () => {
    const all = searchAccommodations(ACCOMMODATIONS, parseSearchParams({}));
    const group = searchAccommodations(
      ACCOMMODATIONS,
      parseSearchParams({ adultos: "20", quartos: "1" }),
    );

    expect(group.length).toBeLessThan(all.length);
    for (const result of group) {
      expect(result.accommodation.maxGuests).toBeGreaterThanOrEqual(20);
    }
  });

  it("filtra por preço máximo e nota mínima", () => {
    const results = searchAccommodations(
      ACCOMMODATIONS,
      parseSearchParams({ preco_max: "250", nota: "4.5" }),
    );

    for (const result of results) {
      expect(result.accommodation.pricePerNight).toBeLessThanOrEqual(250);
      expect(result.accommodation.rating).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("calcula o total da estadia quando há datas", () => {
    const results = searchAccommodations(
      ACCOMMODATIONS,
      parseSearchParams({ checkin: "2026-11-20", checkout: "2026-11-22" }),
    );

    const available = results.find((result) => result.availability.isAvailable);
    expect(available?.totalPrice).toBe((available?.nightlyRate ?? 0) * 2);
  });
});

describe("sortSearchResults", () => {
  const results = searchAccommodations(ACCOMMODATIONS, parseSearchParams({}));

  it("ordena por menor preço", () => {
    const sorted = sortSearchResults(results, "menor-preco");

    for (let index = 1; index < sorted.length; index += 1) {
      expect(sorted[index].nightlyRate).toBeGreaterThanOrEqual(
        sorted[index - 1].nightlyRate,
      );
    }
  });

  it("ordena por proximidade do Santuário", () => {
    const sorted = sortSearchResults(results, "mais-proximo");

    expect(sorted[0].accommodation.slug).toBe(
      [...ACCOMMODATIONS].sort(
        (first, second) =>
          first.distances.santuarioInMeters -
          second.distances.santuarioInMeters,
      )[0].slug,
    );
  });

  it("coloca hospedagens sem disponibilidade no fim", () => {
    const peak = searchAccommodations(
      ACCOMMODATIONS,
      parseSearchParams({ checkin: "2026-10-11", checkout: "2026-10-13" }),
    );
    const sorted = sortSearchResults(peak, "recomendados");
    const firstUnavailable = sorted.findIndex(
      (result) => !result.availability.isAvailable,
    );

    if (firstUnavailable >= 0) {
      for (const result of sorted.slice(firstUnavailable)) {
        expect(result.availability.isAvailable).toBe(false);
      }
    }
  });
});
