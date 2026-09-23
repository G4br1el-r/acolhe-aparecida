import { hashString, hashToUnitInterval } from "./hash";

describe("hashString", () => {
  it("returns the same value for the same input", () => {
    expect(hashString("hotel-nossa-senhora")).toBe(
      hashString("hotel-nossa-senhora"),
    );
  });

  it("returns different values for different inputs", () => {
    expect(hashString("a")).not.toBe(hashString("b"));
  });
});

describe("hashToUnitInterval", () => {
  it("returns a value between 0 and 1", () => {
    for (const value of ["x", "pousada", "2026-10-12", ""]) {
      const result = hashToUnitInterval(value);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(1);
    }
  });
});
