import { ACCOMMODATIONS } from "@/mocks/Modules/Hospedagens/accommodations";
import { buildFeatureGroups, flattenFeatures } from "./feature-list";

const HOTEL = ACCOMMODATIONS.find(
  (accommodation) => accommodation.slug === "hotel-nossa-senhora",
);
const CASA = ACCOMMODATIONS.find(
  (accommodation) => accommodation.slug === "casa-da-romaria",
);

if (!HOTEL || !CASA) throw new Error("fixture ausente");

describe("buildFeatureGroups", () => {
  it("agrupa as comodidades com rótulos", () => {
    const groups = buildFeatureGroups(HOTEL);

    expect(groups.map((group) => group.id)).toContain("acessibilidade");
    expect(
      groups.find((group) => group.id === "alimentacao")?.items[0].label,
    ).toBe("Café da manhã");
  });

  it("omite grupos vazios", () => {
    const groups = buildFeatureGroups(CASA);

    expect(groups.map((group) => group.id)).not.toContain("alimentacao");
  });
});

describe("flattenFeatures", () => {
  it("devolve a lista completa", () => {
    expect(flattenFeatures(HOTEL).length).toBe(
      HOTEL.meals.length +
        HOTEL.parking.length +
        HOTEL.structure.length +
        HOTEL.accessibility.length +
        HOTEL.booking.length,
    );
  });
});
