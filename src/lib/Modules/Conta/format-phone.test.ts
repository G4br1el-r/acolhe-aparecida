import { formatPhone } from "./format-phone";

describe("formatPhone", () => {
  it("returns empty string for empty input", () => {
    expect(formatPhone("")).toBe("");
  });

  it("opens the area code parenthesis while typing", () => {
    expect(formatPhone("1")).toBe("(1");
    expect(formatPhone("12")).toBe("(12");
  });

  it("closes the area code and keeps typing the prefix", () => {
    expect(formatPhone("1299")).toBe("(12) 99");
  });

  it("formats a landline with four digit prefix", () => {
    expect(formatPhone("1236221234")).toBe("(12) 3622-1234");
  });

  it("formats a mobile number with five digit prefix", () => {
    expect(formatPhone("12999995555")).toBe("(12) 99999-5555");
  });

  it("strips non digits and truncates extra digits", () => {
    expect(formatPhone("(12) 99999-5555000")).toBe("(12) 99999-5555");
  });
});
