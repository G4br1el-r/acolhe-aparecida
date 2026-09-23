import { ACCOMMODATIONS } from "@/mocks/Modules/Hospedagens/accommodations";
import { availableExtrasFor, extrasFromDraft } from "./extras-from-draft";

const HOTEL_WITH_VAN = ACCOMMODATIONS.find(
  (accommodation) => accommodation.slug === "hotel-fonte-da-esperanca",
);
const SUITE = ACCOMMODATIONS.find(
  (accommodation) => accommodation.slug === "suite-aconchego",
);

if (!HOTEL_WITH_VAN || !SUITE) throw new Error("fixture ausente");

describe("availableExtrasFor", () => {
  it("oferece vaga de van só onde há vaga", () => {
    expect(
      availableExtrasFor(HOTEL_WITH_VAN).map((option) => option.id),
    ).toContain("vaga-van");
    expect(availableExtrasFor(SUITE).map((option) => option.id)).not.toContain(
      "vaga-van",
    );
  });
});

describe("extrasFromDraft", () => {
  it("converte a seleção em extras da reserva ignorando indisponíveis", () => {
    const extras = extrasFromDraft(
      { "vaga-van": 1, "check-in-antecipado": 1, "vaga-onibus": 1 },
      HOTEL_WITH_VAN,
    );

    expect(extras.map((extra) => extra.id)).toEqual([
      "vaga-van",
      "check-in-antecipado",
    ]);
  });

  it("ignora quantidade zero", () => {
    expect(extrasFromDraft({ "vaga-van": 0 }, HOTEL_WITH_VAN)).toEqual([]);
  });
});
