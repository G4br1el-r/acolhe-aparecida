import { isAfter, isValid, parseISO } from "date-fns";
import { z } from "zod";
import { emailSchema, fullNameSchema, phoneSchema } from "./auth";

const MIN_CITY_LENGTH = 2;

export const BRAZILIAN_STATES = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
] as const;

export type BrazilianState = (typeof BRAZILIAN_STATES)[number];

const stateSchema = z.union([
  z.literal(""),
  z.enum(BRAZILIAN_STATES, { message: "Escolha um estado." }),
]);

const birthDateSchema = z
  .string()
  .trim()
  .refine(
    (value) => value === "" || isValid(parseISO(value)),
    "Informe uma data válida.",
  )
  .refine(
    (value) => value === "" || !isAfter(parseISO(value), new Date()),
    "A data de nascimento não pode estar no futuro.",
  );

export const profileSchema = z
  .object({
    fullName: fullNameSchema,
    email: emailSchema,
    phone: phoneSchema,
    city: z
      .string()
      .trim()
      .refine(
        (value) => value === "" || value.length >= MIN_CITY_LENGTH,
        "Informe o nome da cidade.",
      ),
    state: stateSchema,
    birthDate: birthDateSchema,
  })
  .refine((values) => !(values.city && !values.state), {
    message: "Escolha o estado da cidade.",
    path: ["state"],
  });

export type ProfileFormValues = z.infer<typeof profileSchema>;
