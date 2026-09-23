import {
  cardSchema,
  fieldErrorsFrom,
  responsibleSchema,
  stayDetailsSchema,
} from "./checkout";

describe("responsibleSchema", () => {
  it("aceita dados válidos", () => {
    expect(
      responsibleSchema.safeParse({
        fullName: "Maria da Silva",
        email: "maria@exemplo.com",
        phone: "(12) 99999-8888",
        document: "123.456.789-09",
      }).success,
    ).toBe(true);
  });

  it("mapeia erros por campo", () => {
    const result = responsibleSchema.safeParse({
      fullName: "Ana",
      email: "x",
      phone: "1",
      document: "2",
    });

    if (result.success) throw new Error("deveria falhar");

    const errors = fieldErrorsFrom(result.error);
    expect(Object.keys(errors).sort()).toEqual([
      "document",
      "email",
      "fullName",
      "phone",
    ]);
  });
});

describe("stayDetailsSchema", () => {
  it("exige aceitar a política", () => {
    const result = stayDetailsSchema.safeParse({
      arrivalTime: "Até 14h",
      specialRequests: "",
      acceptedPolicy: false,
    });

    expect(result.success).toBe(false);
  });
});

describe("cardSchema", () => {
  it("aceita cartão de teste", () => {
    expect(
      cardSchema.safeParse({
        number: "4242 4242 4242 4242",
        holderName: "MARIA DA SILVA",
        expiry: "12/29",
        cvv: "123",
      }).success,
    ).toBe(true);
  });

  it("recusa número inválido", () => {
    expect(
      cardSchema.safeParse({
        number: "1111 1111 1111 1111",
        holderName: "MARIA DA SILVA",
        expiry: "12/29",
        cvv: "123",
      }).success,
    ).toBe(false);
  });
});
