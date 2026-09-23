import { validateContact } from "./contact";

const VALID = {
  name: "Maria Aparecida",
  email: "maria@exemplo.com",
  subject: "reserva",
  message:
    "Quero saber se consigo mudar a data da minha reserva para novembro.",
};

describe("validateContact", () => {
  it("accepts a complete message and trims fields", () => {
    const result = validateContact({ ...VALID, name: "  Maria  " });

    expect(result.errors).toBeNull();
    expect(result.data?.name).toBe("Maria");
  });

  it("returns one message per invalid field", () => {
    const result = validateContact({
      name: "",
      email: "maria",
      subject: "",
      message: "curta",
    });

    expect(result.data).toBeNull();
    expect(result.errors).toEqual({
      name: "Informe seu nome.",
      email: "Digite um e-mail válido.",
      subject: "Escolha um assunto.",
      message: "Conte um pouco mais. Use pelo menos 20 caracteres.",
    });
  });

  it("rejects an unknown subject", () => {
    const result = validateContact({ ...VALID, subject: "qualquer" });

    expect(result.errors?.subject).toBe("Escolha um assunto.");
  });
});
