import { buildReviewAuthorName } from "./author-name";

describe("buildReviewAuthorName", () => {
  it("usa o primeiro nome e a inicial do sobrenome", () => {
    expect(buildReviewAuthorName("Carlos Eduardo Lima")).toBe("Carlos L.");
    expect(buildReviewAuthorName("Lúcia Helena Ferreira")).toBe("Lúcia F.");
  });

  it("ignora tratamentos como Pe.", () => {
    expect(buildReviewAuthorName("Pe. Marcos Antônio Silva")).toBe("Marcos S.");
  });

  it("lida com nome único ou vazio", () => {
    expect(buildReviewAuthorName("Maria")).toBe("Maria");
    expect(buildReviewAuthorName("   ")).toBe("Hóspede");
  });
});
