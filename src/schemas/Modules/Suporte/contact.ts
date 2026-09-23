import { z } from "zod";
import { CONTACT_SUBJECT_IDS } from "@/constants/Modules/Suporte/contact-subjects";

const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 80;
const MIN_MESSAGE_LENGTH = 20;
const MAX_MESSAGE_LENGTH = 1000;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(MIN_NAME_LENGTH, "Informe seu nome.")
    .max(MAX_NAME_LENGTH, "Use um nome mais curto."),
  email: z
    .string()
    .trim()
    .min(1, "Informe seu e-mail.")
    .email("Digite um e-mail válido."),
  subject: z.enum(CONTACT_SUBJECT_IDS, {
    error: "Escolha um assunto.",
  }),
  message: z
    .string()
    .trim()
    .min(
      MIN_MESSAGE_LENGTH,
      `Conte um pouco mais. Use pelo menos ${MIN_MESSAGE_LENGTH} caracteres.`,
    )
    .max(MAX_MESSAGE_LENGTH, `Use no máximo ${MAX_MESSAGE_LENGTH} caracteres.`),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactFormValues;
export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export function validateContact(
  values: Record<ContactField, string>,
):
  | { data: ContactFormValues; errors: null }
  | { data: null; errors: ContactFieldErrors } {
  const result = contactSchema.safeParse(values);

  if (result.success) return { data: result.data, errors: null };

  const errors: ContactFieldErrors = {};

  for (const issue of result.error.issues) {
    const field = issue.path[0];
    if (typeof field === "string" && !(field in errors)) {
      errors[field as ContactField] = issue.message;
    }
  }

  return { data: null, errors };
}
