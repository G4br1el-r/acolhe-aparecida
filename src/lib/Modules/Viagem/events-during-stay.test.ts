import { CITY_EVENTS } from "@/mocks/Modules/Cidade/events";
import { findEventsDuringStay } from "./events-during-stay";

describe("findEventsDuringStay", () => {
  it("encontra eventos que cruzam as datas da estadia", () => {
    const events = findEventsDuringStay(CITY_EVENTS, {
      checkIn: "2026-10-10",
      checkOut: "2026-10-13",
    });

    expect(events.map((event) => event.id)).toContain(
      "festa-da-padroeira-2026",
    );
  });

  it("retorna vazio quando nada acontece no período", () => {
    expect(
      findEventsDuringStay(CITY_EVENTS, {
        checkIn: "2026-09-01",
        checkOut: "2026-09-03",
      }),
    ).toEqual([]);
  });
});
