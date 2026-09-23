import { buildCalendarFile } from "./calendar-file";

describe("buildCalendarFile", () => {
  it("gera um evento de dia inteiro com as datas da estadia", () => {
    const file = buildCalendarFile({
      uid: "res-1",
      title: "Viagem a Aparecida: Hotel Nossa Senhora",
      checkIn: "2026-10-10",
      checkOut: "2026-10-13",
      location: "Rua X, 10, Centro, Aparecida, SP",
      description: "Código AC-7K2M9Q; check-in às 14h",
    });

    expect(file).toContain("DTSTART;VALUE=DATE:20261010");
    expect(file).toContain("DTEND;VALUE=DATE:20261013");
    expect(file).toContain("SUMMARY:Viagem a Aparecida: Hotel Nossa Senhora");
    expect(file).toContain("LOCATION:Rua X\\, 10\\, Centro\\, Aparecida\\, SP");
    expect(file).toContain("DESCRIPTION:Código AC-7K2M9Q; check-in às 14h");
    expect(file.startsWith("BEGIN:VCALENDAR")).toBe(true);
    expect(file.endsWith("END:VCALENDAR")).toBe(true);
  });
});
