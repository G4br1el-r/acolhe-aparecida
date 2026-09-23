import {
  buildEventBusParkingHref,
  buildEventSearchHref,
  suggestsBusParking,
} from "./event-links";

const EVENT = { startDate: "2026-10-09", endDate: "2026-10-13" };

describe("buildEventSearchHref", () => {
  it("points to the search with the event dates", () => {
    expect(buildEventSearchHref(EVENT)).toBe(
      "/hospedagens?checkin=2026-10-09&checkout=2026-10-13",
    );
  });
});

describe("buildEventBusParkingHref", () => {
  it("adds the bus parking filter", () => {
    expect(buildEventBusParkingHref(EVENT)).toBe(
      "/hospedagens?checkin=2026-10-09&checkout=2026-10-13&estacionamento=onibus",
    );
  });
});

describe("suggestsBusParking", () => {
  it("suggests bus parking for pilgrimages", () => {
    expect(suggestsBusParking({ kind: "romaria" })).toBe(true);
  });

  it("does not suggest for regular holidays", () => {
    expect(suggestsBusParking({ kind: "feriado" })).toBe(false);
  });
});
