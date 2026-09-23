import {
  parseSearchParams,
  searchParamsToQueryString,
  totalGuests,
} from "./search-params";

describe("parseSearchParams", () => {
  it("aplica padrões quando nada é informado", () => {
    const params = parseSearchParams({});

    expect(params.adultos).toBe(2);
    expect(params.criancas).toBe(0);
    expect(params.quartos).toBe(1);
    expect(params.ordenar).toBe("recomendados");
    expect(params.perfis).toEqual([]);
  });

  it("lê datas, hóspedes e listas separadas por vírgula", () => {
    const params = parseSearchParams({
      checkin: "2026-10-10",
      checkout: "2026-10-12",
      adultos: "4",
      criancas: "2",
      idades: "3,7",
      tipo: "hotel,pousada",
      perfis: "idosos,invalido",
      nota: "4.5",
    });

    expect(params.checkin).toBe("2026-10-10");
    expect(params.adultos).toBe(4);
    expect(params.idades).toEqual([3, 7]);
    expect(params.tipo).toEqual(["hotel", "pousada"]);
    expect(params.perfis).toEqual(["idosos"]);
    expect(params.nota).toBe(4.5);
  });

  it("ignora valores inválidos sem quebrar", () => {
    const params = parseSearchParams({
      checkin: "ontem",
      adultos: "muitos",
      ordenar: "aleatorio",
      nota: "3",
    });

    expect(params.checkin).toBeUndefined();
    expect(params.adultos).toBe(2);
    expect(params.ordenar).toBe("recomendados");
    expect(params.nota).toBeUndefined();
  });
});

describe("searchParamsToQueryString", () => {
  it("omite valores padrão e serializa listas", () => {
    const query = searchParamsToQueryString({
      checkin: "2026-10-10",
      adultos: 2,
      quartos: 1,
      tipo: ["hotel"],
      acessibilidade: true,
    });

    expect(query).toBe("checkin=2026-10-10&acessibilidade=1&tipo=hotel");
  });

  it("faz ida e volta com o parser", () => {
    const original = parseSearchParams({
      checkin: "2026-10-10",
      checkout: "2026-10-12",
      adultos: "3",
      idosos: "1",
      estacionamento: "van",
      ordenar: "menor-preco",
    });
    const reparsed = parseSearchParams(
      Object.fromEntries(
        new URLSearchParams(searchParamsToQueryString(original)),
      ),
    );

    expect(reparsed).toEqual(original);
  });
});

describe("totalGuests", () => {
  it("soma adultos, crianças e idosos", () => {
    expect(totalGuests({ adultos: 2, criancas: 1, idosos: 1 })).toBe(4);
  });
});
