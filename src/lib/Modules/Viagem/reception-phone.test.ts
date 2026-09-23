import { buildReceptionPhone } from "./reception-phone";

describe("buildReceptionPhone", () => {
  it("gera um telefone fixo de Aparecida estável por hospedagem", () => {
    const phone = buildReceptionPhone("hotel-nossa-senhora");

    expect(phone).toMatch(/^\(12\) 3105-\d{4}$/);
    expect(buildReceptionPhone("hotel-nossa-senhora")).toBe(phone);
    expect(buildReceptionPhone("hotel-sao-miguel")).not.toBe(phone);
  });
});
