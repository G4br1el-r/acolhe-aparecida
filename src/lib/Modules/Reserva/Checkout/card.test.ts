import {
  formatCardNumber,
  formatExpiry,
  isValidCvv,
  isValidExpiry,
  isValidLuhn,
} from "./card";

describe("formatCardNumber", () => {
  it("agrupa de quatro em quatro e limita a 16 dígitos", () => {
    expect(formatCardNumber("4242424242424242999")).toBe("4242 4242 4242 4242");
  });
});

describe("formatExpiry", () => {
  it("insere a barra após o mês", () => {
    expect(formatExpiry("1229")).toBe("12/29");
    expect(formatExpiry("1")).toBe("1");
  });
});

describe("isValidLuhn", () => {
  it("aceita cartões de teste válidos", () => {
    expect(isValidLuhn("4242 4242 4242 4242")).toBe(true);
    expect(isValidLuhn("4000 0000 0000 0002")).toBe(true);
  });

  it("recusa números inválidos", () => {
    expect(isValidLuhn("4242 4242 4242 4241")).toBe(false);
    expect(isValidLuhn("1234")).toBe(false);
  });
});

describe("isValidExpiry", () => {
  const today = new Date("2026-09-23T12:00:00");

  it("aceita mês futuro", () => {
    expect(isValidExpiry("12/29", today)).toBe(true);
  });

  it("aceita o mês atual", () => {
    expect(isValidExpiry("09/26", today)).toBe(true);
  });

  it("recusa mês passado e mês inexistente", () => {
    expect(isValidExpiry("08/26", today)).toBe(false);
    expect(isValidExpiry("13/27", today)).toBe(false);
  });
});

describe("isValidCvv", () => {
  it("aceita 3 ou 4 dígitos", () => {
    expect(isValidCvv("123")).toBe(true);
    expect(isValidCvv("1234")).toBe(true);
    expect(isValidCvv("12")).toBe(false);
  });
});
