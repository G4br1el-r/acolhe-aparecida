import { formatDocument } from "./format-document";

describe("formatDocument", () => {
  it("keeps short inputs without separators", () => {
    expect(formatDocument("312")).toBe("312");
  });

  it("adds the first dot after three digits", () => {
    expect(formatDocument("3124")).toBe("312.4");
  });

  it("adds the second dot after six digits", () => {
    expect(formatDocument("3124567")).toBe("312.456.7");
  });

  it("adds the dash after nine digits", () => {
    expect(formatDocument("3124567890")).toBe("312.456.789-0");
  });

  it("formats a complete document", () => {
    expect(formatDocument("31245678901")).toBe("312.456.789-01");
  });

  it("strips non digits and ignores extra characters", () => {
    expect(formatDocument("312.456.789-01999")).toBe("312.456.789-01");
    expect(formatDocument("abc")).toBe("");
  });
});
