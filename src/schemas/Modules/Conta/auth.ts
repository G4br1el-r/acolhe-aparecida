import { z } from "zod";
import { MOCK_PASSWORD_MIN_LENGTH } from "@/mocks/Modules/Conta/users";

const MIN_NAME_LENGTH = 5;
const PHONE_PATTERN = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
const DOCUMENT_PATTERN = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;

export const emailSchema = z
  .string()
  .trim()
  .min(1, "Informe seu e-mail.")
  .email("Digite um e-mail válido.");

export const passwordSchema = z
  .string()
  .min(
    MOCK_PASSWORD_MIN_LENGTH,
    `A senha precisa ter pelo menos ${MOCK_PASSWORD_MIN_LENGTH} caracteres.`,
  );

export const fullNameSchema = z
  .string()
  .trim()
  .min(MIN_NAME_LENGTH, "Informe seu nome completo.")
  .refine((value) => value.split(" ").length >= 2, "Informe nome e sobrenome.");

export const phoneSchema = z
  .string()
  .trim()
  .regex(PHONE_PATTERN, "Use o formato (12) 99999-9999.");

export const documentSchema = z
  .string()
  .trim()
  .regex(DOCUMENT_PATTERN, "Use o formato 000.000.000-00.");

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  fullName: fullNameSchema,
  email: emailSchema,
  phone: phoneSchema,
  document: documentSchema,
  password: passwordSchema,
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
