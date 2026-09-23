import type { CityEvent } from "@/@types/Modules/Cidade/city";
import { groupEventsByMonth } from "./group-events-by-month";

function event(id: string, startDate: string): CityEvent {
  return {
    id,
    name: id,
    kind: "feriado",
    startDate,
    endDate: startDate,
    demand: "normal",
    summary: "",
    tips: [],
    image: "",
  };
}

describe("groupEventsByMonth", () => {
  it("groups events that start in the same month, keeping order", () => {
    const groups = groupEventsByMonth([
      event("a", "2026-10-09"),
      event("b", "2026-10-31"),
      event("c", "2026-12-23"),
    ]);

    expect(groups.map((group) => group.key)).toEqual(["2026-10", "2026-12"]);
    expect(groups[0]?.events.map((item) => item.id)).toEqual(["a", "b"]);
    expect(groups[0]?.label).toBe("Outubro de 2026");
  });

  it("returns an empty list when there are no events", () => {
    expect(groupEventsByMonth([])).toEqual([]);
  });
});
