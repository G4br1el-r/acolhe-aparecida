import { SEEDED_RESERVATIONS } from "@/mocks/Modules/Reserva/reservations";
import { buildRebookHref, countGuestsByAgeGroup } from "./rebook-href";

const CARLOS = SEEDED_RESERVATIONS[0];

describe("countGuestsByAgeGroup", () => {
  it("conta adultos, crianças e idosos", () => {
    expect(countGuestsByAgeGroup(CARLOS.guests)).toEqual({
      adulto: 2,
      crianca: 2,
      idoso: 0,
    });
  });
});

describe("buildRebookHref", () => {
  it("monta o link da hospedagem com a configuração da reserva e sem datas", () => {
    const href = buildRebookHref(CARLOS);

    expect(href).toBe("/hospedagens/hotel-nossa-senhora?criancas=2");
  });

  it("inclui quartos e idosos quando diferem do padrão", () => {
    const href = buildRebookHref({
      accommodationSlug: "pousada",
      roomCount: 6,
      guests: [
        { id: "1", fullName: "A", ageGroup: "adulto" },
        { id: "2", fullName: "B", ageGroup: "idoso" },
      ],
    });

    expect(href).toBe("/hospedagens/pousada?adultos=1&idosos=1&quartos=6");
  });
});
