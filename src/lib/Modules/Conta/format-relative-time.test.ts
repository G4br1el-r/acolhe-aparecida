import { formatRelativeTime } from "./format-relative-time";

describe("formatRelativeTime", () => {
  const now = new Date("2026-09-23T12:00:00.000Z");

  it("describes recent moments in portuguese", () => {
    expect(formatRelativeTime("2026-09-23T11:30:00.000Z", now)).toBe(
      "há 30 minutos",
    );
  });

  it("describes days in the past", () => {
    expect(formatRelativeTime("2026-09-21T08:00:00.000Z", now)).toBe(
      "há 2 dias",
    );
  });

  it("describes future dates with the right suffix", () => {
    expect(formatRelativeTime("2026-09-24T12:00:00.000Z", now)).toBe(
      "em 1 dia",
    );
  });
});
