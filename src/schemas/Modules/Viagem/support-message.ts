import { z } from "zod";
import { SUPPORT_SUBJECTS } from "@/constants/Modules/Viagem/support";

const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 800;

export const supportMessageSchema = z.object({
  subject: z.enum(SUPPORT_SUBJECTS, { error: "Escolha um assunto." }),
  message: z
    .string()
    .trim()
    .min(MIN_MESSAGE_LENGTH, "Escreva pelo menos uma frase.")
    .max(MAX_MESSAGE_LENGTH, `Use até ${MAX_MESSAGE_LENGTH} caracteres.`),
});

export type SupportMessageValues = z.infer<typeof supportMessageSchema>;
