import { parseSearchParams } from "@/schemas/Modules/Hospedagens/Busca/search-params";
import { EMPTY_SEARCH_DRAFT } from "@/store/Modules/Hospedagens/Busca/use-search-store";
import {
  describeGuests,
  describeGuestsShort,
  draftToSearchParams,
  searchParamsToDraft,
} from "./search-draft";

describe("draftToSearchParams", () => {
  it("converte o rascunho em parâmetros de busca", () => {
    const params = draftToSearchParams({
      ...EMPTY_SEARCH_DRAFT,
      checkIn: "2026-10-10",
      checkOut: "2026-10-12",
      children: 1,
      childAges: [4, 9],
    });

    expect(params.checkin).toBe("2026-10-10");
    expect(params.idades).toEqual([4]);
  });
});

describe("searchParamsToDraft", () => {
  it("faz o caminho inverso", () => {
    const draft = searchParamsToDraft(
      parseSearchParams({ adultos: "3", idosos: "1", acessibilidade: "1" }),
    );

    expect(draft.adults).toBe(3);
    expect(draft.seniors).toBe(1);
    expect(draft.needsAccessibility).toBe(true);
    expect(draft.checkIn).toBeNull();
  });
});

describe("describeGuests", () => {
  it("descreve hóspedes e quartos", () => {
    expect(
      describeGuests({ adults: 2, children: 1, seniors: 0, rooms: 1 }),
    ).toBe("2 adultos, 1 criança · 1 quarto");
  });

  it("resume o total", () => {
    expect(
      describeGuestsShort({ adults: 2, children: 1, seniors: 1, rooms: 2 }),
    ).toBe("4 hóspedes · 2 quartos");
  });
});
