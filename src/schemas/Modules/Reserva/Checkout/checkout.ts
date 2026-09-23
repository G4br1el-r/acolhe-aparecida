import { z } from "zod";
import {
  isValidCvv,
  isValidExpiry,
  isValidLuhn,
} from "@/lib/Modules/Reserva/Checkout/card";
import {
  documentSchema,
  emailSchema,
  fullNameSchema,
  phoneSchema,
} from "@/schemas/Modules/Conta/auth";

const MIN_GUEST_NAME_LENGTH = 3;
const MAX_REQUESTS_LENGTH = 500;
const MIN_HOLDER_NAME_LENGTH = 5;

export const guestNameSchema = z
  .string()
  .trim()
  .min(MIN_GUEST_NAME_LENGTH, "Informe o nome do hóspede.");

export const responsibleSchema = z.object({
  fullName: fullNameSchema,
  email: emailSchema,
  phone: phoneSchema,
  document: documentSchema,
});

export type ResponsibleFormValues = z.infer<typeof responsibleSchema>;

export const stayDetailsSchema = z.object({
  arrivalTime: z
    .string()
    .min(1, "Conte para a hospedagem quando pretende chegar."),
  specialRequests: z
    .string()
    .trim()
    .max(MAX_REQUESTS_LENGTH, `Use até ${MAX_REQUESTS_LENGTH} caracteres.`),
  acceptedPolicy: z.literal(true, {
    error: "Confirme que leu a política de cancelamento para continuar.",
  }),
});

export const cardSchema = z.object({
  number: z.string().refine(isValidLuhn, "Confira o número do cartão."),
  holderName: z
    .string()
    .trim()
    .min(MIN_HOLDER_NAME_LENGTH, "Nome como está impresso no cartão."),
  expiry: z
    .string()
    .refine((value) => isValidExpiry(value), "Validade inválida."),
  cvv: z.string().refine(isValidCvv, "Código de segurança inválido."),
});

export type CardFormValues = z.infer<typeof cardSchema>;

export function fieldErrorsFrom<Shape extends Record<string, unknown>>(
  error: z.ZodError<Shape>,
): Partial<Record<keyof Shape, string>> {
  const errors: Partial<Record<keyof Shape, string>> = {};

  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !(key in errors)) {
      errors[key as keyof Shape] = issue.message;
    }
  }

  return errors;
}
