import {
  daysUntil,
  formatShortDate,
  formatStayRange,
  pluralize,
} from "./format-date";

describe("formatShortDate", () => {
  it("formata dia e mês abreviado sem ponto", () => {
    expect(formatShortDate("2026-10-12")).toBe("12 de out");
  });
});

describe("formatStayRange", () => {
  it("junta check-in e check-out", () => {
    expect(formatStayRange("2026-10-10", "2026-10-13")).toBe(
      "10 de out a 13 de out",
    );
  });
});

describe("daysUntil", () => {
  it("conta dias até a data", () => {
    expect(daysUntil("2026-10-10", new Date("2026-10-01T10:00:00"))).toBe(9);
  });
});

describe("pluralize", () => {
  it("escolhe singular ou plural", () => {
    expect(pluralize(1, "noite", "noites")).toBe("1 noite");
    expect(pluralize(3, "noite", "noites")).toBe("3 noites");
  });
});
