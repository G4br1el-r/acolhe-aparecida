import { formatCurrency } from "@/lib/Modules/Reserva/Checkout/price-summary";
import { parseSearchParams } from "@/schemas/Modules/Hospedagens/Busca/search-params";
import { clearAllFilters, listActiveFilters } from "./active-filters";

describe("listActiveFilters", () => {
  it("não lista nada sem filtros", () => {
    expect(listActiveFilters(parseSearchParams({}))).toEqual([]);
  });

  it("lista cada filtro com o rótulo humano e a remoção", () => {
    const params = parseSearchParams({
      tipo: "hotel,pousada",
      estacionamento: "van",
      nota: "4.5",
      preco_max: "300",
    });
    const filters = listActiveFilters(params);

    expect(filters.map((filter) => filter.label)).toEqual([
      `Até ${formatCurrency(300)}`,
      "Hotel",
      "Pousada",
      "Vaga para van",
      "Nota 4,5+",
    ]);

    const hotelFilter = filters.find((filter) => filter.id === "tipo-hotel");
    expect(hotelFilter?.remove.tipo).toEqual(["pousada"]);
  });
});

describe("clearAllFilters", () => {
  it("zera filtros mas preserva datas e hóspedes", () => {
    const cleared = clearAllFilters();

    expect(cleared.tipo).toEqual([]);
    expect(cleared).not.toHaveProperty("checkin");
    expect(cleared).not.toHaveProperty("adultos");
  });
});
