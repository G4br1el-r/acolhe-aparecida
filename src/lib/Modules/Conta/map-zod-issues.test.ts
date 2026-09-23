import { z } from "zod";
import { mapZodIssues } from "./map-zod-issues";

const schema = z.object({
  email: z.string().email("E-mail inválido."),
  password: z.string().min(6, "Senha curta.").max(8, "Senha longa."),
});

describe("mapZodIssues", () => {
  it("returns an empty map when there are no issues", () => {
    const result = schema.safeParse({
      email: "ana@exemplo.com.br",
      password: "123456",
    });

    expect(result.success).toBe(true);
  });

  it("maps the first message of each field", () => {
    const result = schema.safeParse({ email: "ana", password: "1" });

    if (result.success) throw new Error("expected failure");

    expect(mapZodIssues<"email" | "password">(result.error)).toEqual({
      email: "E-mail inválido.",
      password: "Senha curta.",
    });
  });

  it("ignores issues without a string path", () => {
    const listSchema = z.array(z.string()).min(1, "Lista vazia.");
    const result = listSchema.safeParse([]);

    if (result.success) throw new Error("expected failure");

    expect(mapZodIssues(result.error)).toEqual({});
  });
});
