import { z } from "zod";
import { documentSchema, fullNameSchema } from "./auth";

const MIN_RELATIONSHIP_LENGTH = 2;
const MIN_AGE = 0;
const MAX_AGE = 120;

export const GUEST_AGE_GROUPS = ["adulto", "crianca", "idoso"] as const;

export const GUEST_AGE_GROUP_LABELS: Record<
  (typeof GUEST_AGE_GROUPS)[number],
  string
> = {
  adulto: "Adulto",
  crianca: "Criança",
  idoso: "Idoso",
};

const optionalAgeSchema = z
  .string()
  .trim()
  .refine((value) => {
    if (value === "") return true;
    const parsed = Number(value);
    return Number.isInteger(parsed) && parsed >= MIN_AGE && parsed <= MAX_AGE;
  }, "Informe uma idade válida.");

export const frequentGuestSchema = z.object({
  fullName: fullNameSchema,
  relationship: z
    .string()
    .trim()
    .min(MIN_RELATIONSHIP_LENGTH, "Diga quem é essa pessoa para você."),
  ageGroup: z.enum(GUEST_AGE_GROUPS, { message: "Escolha a faixa etária." }),
  age: optionalAgeSchema,
  document: z.union([z.literal(""), documentSchema]),
  needsAccessibility: z.boolean(),
});

export type FrequentGuestFormValues = z.infer<typeof frequentGuestSchema>;
