import { buildCountdown } from "./countdown";

const STAY = { checkIn: "2026-10-10", checkOut: "2026-10-13" };

function day(isoDate: string): Date {
  return new Date(`${isoDate}T09:00:00`);
}

describe("buildCountdown", () => {
  it("conta os dias que faltam para o check-in", () => {
    const result = buildCountdown(STAY, day("2026-09-23"));
    expect(result).toEqual({
      label: "Faltam 17 dias",
      tone: "upcoming",
      daysUntilCheckIn: 17,
    });
  });

  it("avisa quando o check-in é amanhã", () => {
    expect(buildCountdown(STAY, day("2026-10-09")).label).toBe("É amanhã");
    expect(buildCountdown(STAY, day("2026-10-09")).tone).toBe("imminent");
  });

  it("celebra o dia do check-in", () => {
    const result = buildCountdown(STAY, day("2026-10-10"));
    expect(result.label).toBe("É hoje, boa viagem");
    expect(result.tone).toBe("today");
  });

  it("reconhece quando a pessoa já está hospedada", () => {
    const result = buildCountdown(STAY, day("2026-10-12"));
    expect(result.label).toBe("Você está em Aparecida");
    expect(result.tone).toBe("during");
  });

  it("marca como concluída a partir do dia do check-out", () => {
    expect(buildCountdown(STAY, day("2026-10-13")).tone).toBe("past");
    expect(buildCountdown(STAY, day("2026-11-01")).tone).toBe("past");
  });
});
