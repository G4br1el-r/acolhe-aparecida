import type { RoomType } from "@/@types/Modules/Hospedagens/accommodation";
import { stayDatesFromDraft, stayQuoteFor } from "./stay-quote";

function room(totalUnits: number, pricePerNight: number): RoomType {
  return {
    id: "padrao",
    name: "Padrão",
    beds: [],
    maxGuests: 2,
    sizeInSquareMeters: 18,
    pricePerNight,
    totalUnits,
    isAccessible: false,
    features: [],
    photoIds: [],
  };
}

const NORMAL_DATES = {
  checkIn: "2026-09-28",
  checkOut: "2026-09-30",
  rooms: 1,
};

describe("stayDatesFromDraft", () => {
  it("returns null without both dates", () => {
    expect(
      stayDatesFromDraft({ checkIn: "2026-10-01", checkOut: null, rooms: 1 }),
    ).toBeNull();
  });

  it("returns null when the stay has no nights", () => {
    expect(
      stayDatesFromDraft({
        checkIn: "2026-10-01",
        checkOut: "2026-10-01",
        rooms: 1,
      }),
    ).toBeNull();
  });

  it("returns the dates for a valid stay", () => {
    expect(stayDatesFromDraft(NORMAL_DATES)).toEqual({
      checkIn: "2026-09-28",
      checkOut: "2026-09-30",
    });
  });
});

describe("stayQuoteFor", () => {
  it("reports missing dates", () => {
    expect(
      stayQuoteFor(
        { slug: "a", rooms: [room(10, 200)] },
        { checkIn: null, checkOut: null, rooms: 1 },
      ),
    ).toEqual({ status: "sem-datas" });
  });

  it("multiplies nightly rate by nights and rooms when available", () => {
    const quote = stayQuoteFor(
      { slug: "a", rooms: [room(40, 200)] },
      { ...NORMAL_DATES, rooms: 2 },
    );

    expect(quote.status).toBe("disponivel");
    if (quote.status === "disponivel") {
      expect(quote.nightCount).toBe(2);
      expect(quote.roomCount).toBe(2);
      expect(quote.total).toBe(quote.nightlyRate * 2 * 2);
    }
  });

  it("reports unavailability when no room has units left", () => {
    const quote = stayQuoteFor(
      { slug: "a", rooms: [room(0, 200)] },
      NORMAL_DATES,
    );

    expect(quote).toEqual({ status: "indisponivel", nightCount: 2 });
  });
});
