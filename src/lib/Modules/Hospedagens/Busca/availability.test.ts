import { ACCOMMODATIONS } from "@/mocks/Modules/Hospedagens/accommodations";
import {
  accommodationAvailabilityFor,
  countNightsBetween,
  demandLevelFor,
  listNights,
  nightlyRateFor,
  roomAvailabilityFor,
} from "./availability";

const HOTEL = ACCOMMODATIONS.find(
  (accommodation) => accommodation.slug === "hotel-nossa-senhora",
);

if (!HOTEL) throw new Error("fixture ausente");

describe("countNightsBetween", () => {
  it("conta noites entre duas datas", () => {
    expect(
      countNightsBetween({ checkIn: "2026-11-20", checkOut: "2026-11-23" }),
    ).toBe(3);
  });

  it("nunca retorna negativo", () => {
    expect(
      countNightsBetween({ checkIn: "2026-11-23", checkOut: "2026-11-20" }),
    ).toBe(0);
  });
});

describe("listNights", () => {
  it("lista cada noite da estadia", () => {
    expect(
      listNights({ checkIn: "2026-11-20", checkOut: "2026-11-22" }),
    ).toEqual(["2026-11-20", "2026-11-21"]);
  });
});

describe("demandLevelFor", () => {
  it("reconhece a Festa da Padroeira como muito alta", () => {
    expect(demandLevelFor("2026-10-12")).toBe("muito-alta");
  });

  it("retorna normal fora dos períodos", () => {
    expect(demandLevelFor("2026-11-24")).toBe("normal");
  });
});

describe("nightlyRateFor", () => {
  it("aplica acréscimo em datas de alta procura", () => {
    expect(nightlyRateFor(300, "2026-10-12")).toBeGreaterThan(300);
  });

  it("mantém o preço base em dia útil comum", () => {
    expect(nightlyRateFor(300, "2026-11-24")).toBe(300);
  });
});

describe("roomAvailabilityFor", () => {
  it("é determinístico", () => {
    const dates = { checkIn: "2026-11-20", checkOut: "2026-11-22" };
    const first = roomAvailabilityFor(HOTEL, HOTEL.rooms[0], dates);
    const second = roomAvailabilityFor(HOTEL, HOTEL.rooms[0], dates);

    expect(first.unitsLeft).toBe(second.unitsLeft);
  });

  it("reduz unidades em datas de alta procura", () => {
    const normal = roomAvailabilityFor(HOTEL, HOTEL.rooms[0], {
      checkIn: "2026-11-20",
      checkOut: "2026-11-22",
    });
    const peak = roomAvailabilityFor(HOTEL, HOTEL.rooms[0], {
      checkIn: "2026-10-11",
      checkOut: "2026-10-13",
    });

    expect(peak.unitsLeft).toBeLessThan(normal.unitsLeft);
  });
});

describe("accommodationAvailabilityFor", () => {
  it("sem datas considera tudo disponível", () => {
    const availability = accommodationAvailabilityFor(HOTEL, null);

    expect(availability.isAvailable).toBe(true);
    expect(availability.nightCount).toBe(0);
  });

  it("deixa algumas hospedagens sem vaga no pico da Padroeira", () => {
    const dates = { checkIn: "2026-10-11", checkOut: "2026-10-13" };
    const unavailableCount = ACCOMMODATIONS.filter(
      (accommodation) =>
        !accommodationAvailabilityFor(accommodation, dates).isAvailable,
    ).length;

    expect(unavailableCount).toBeGreaterThan(0);
    expect(unavailableCount).toBeLessThan(ACCOMMODATIONS.length);
  });
});
