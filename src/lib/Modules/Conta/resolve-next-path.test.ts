import { DEFAULT_NEXT_PATH, resolveNextPath } from "./resolve-next-path";

describe("resolveNextPath", () => {
  it("falls back to the default when nothing is given", () => {
    expect(resolveNextPath(null)).toBe(DEFAULT_NEXT_PATH);
    expect(resolveNextPath(undefined)).toBe(DEFAULT_NEXT_PATH);
    expect(resolveNextPath("")).toBe(DEFAULT_NEXT_PATH);
  });

  it("accepts internal paths", () => {
    expect(resolveNextPath("/conta/hospedes")).toBe("/conta/hospedes");
    expect(resolveNextPath("/reservar/hotel?checkin=2026-10-10")).toBe(
      "/reservar/hotel?checkin=2026-10-10",
    );
  });

  it("rejects external or protocol relative urls", () => {
    expect(resolveNextPath("https://exemplo.com")).toBe(DEFAULT_NEXT_PATH);
    expect(resolveNextPath("//exemplo.com")).toBe(DEFAULT_NEXT_PATH);
  });
});
