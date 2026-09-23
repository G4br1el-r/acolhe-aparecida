import { freeCancellationDeadline } from "./cancellation-deadline";

describe("freeCancellationDeadline", () => {
  it("volta a quantidade de dias da política a partir do check-in", () => {
    expect(freeCancellationDeadline("2026-10-10", 7)).toBe("2026-10-03");
    expect(freeCancellationDeadline("2026-03-02", 3)).toBe("2026-02-27");
  });
});
