import { createReviewSchema } from "./review";

const schema = createReviewSchema(["limpeza", "atendimento"]);

const VALID = {
  overallScore: 5,
  categoryScores: { limpeza: 5, atendimento: 4 },
  travelerType: "familia",
  title: "",
  comment:
    "Quarto limpo, cama confortável e café servido cedo para quem vai à primeira missa.",
  photos: [],
};

describe("createReviewSchema", () => {
  it("aceita uma avaliação completa", () => {
    expect(schema.safeParse(VALID).success).toBe(true);
  });

  it("exige comentário com pelo menos 40 caracteres", () => {
    const result = schema.safeParse({ ...VALID, comment: "Gostei muito." });

    if (result.success) throw new Error("deveria falhar");

    const issue = result.error.issues.find(
      (candidate) => candidate.path[0] === "comment",
    );
    expect(issue?.message).toBe(
      "Conte um pouco mais: pelo menos 40 caracteres.",
    );
  });

  it("ignora espaços ao contar o comentário", () => {
    const padded = `${" ".repeat(30)}Curto demais.${" ".repeat(30)}`;
    expect(schema.safeParse({ ...VALID, comment: padded }).success).toBe(false);
  });

  it("exige nota em cada categoria da hospedagem", () => {
    const result = schema.safeParse({
      ...VALID,
      categoryScores: { limpeza: 5 },
    });

    if (result.success) throw new Error("deveria falhar");

    expect(result.error.issues[0].path).toEqual([
      "categoryScores",
      "atendimento",
    ]);
  });

  it("limita a 3 fotos", () => {
    const photo = { id: "p", url: "https://x", caption: "c" };
    expect(
      schema.safeParse({ ...VALID, photos: [photo, photo, photo, photo] })
        .success,
    ).toBe(false);
  });
});
