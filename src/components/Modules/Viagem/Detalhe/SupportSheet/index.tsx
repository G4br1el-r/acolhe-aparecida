"use client";

import { ChevronDown } from "lucide-react";
import { type FormEvent, useId, useState } from "react";
import { toast } from "sonner";
import type { Reservation } from "@/@types/Modules/Reserva/reservation";
import { BrandButton } from "@/components/ui/brand-button";
import { Sheet } from "@/components/ui/sheet";
import { TextAreaField } from "@/components/ui/text-field";
import {
  SUPPORT_FAQ,
  SUPPORT_RESPONSE_TIME_LABEL,
  SUPPORT_SUBJECTS,
} from "@/constants/Modules/Viagem/support";
import { mapZodIssues } from "@/lib/Modules/Conta/map-zod-issues";
import {
  type SupportMessageValues,
  supportMessageSchema,
} from "@/schemas/Modules/Viagem/support-message";

const SEND_LATENCY_IN_MS = 700;

type SupportSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reservation: Reservation;
};

export function SupportSheet({
  open,
  onOpenChange,
  reservation,
}: SupportSheetProps) {
  const subjectId = useId();
  const [subject, setSubject] = useState<string>(SUPPORT_SUBJECTS[0]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<
    Partial<Record<keyof SupportMessageValues, string>>
  >({});
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = supportMessageSchema.safeParse({ subject, message });

    if (!result.success) {
      setErrors(mapZodIssues<keyof SupportMessageValues>(result.error));
      return;
    }

    setErrors({});
    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, SEND_LATENCY_IN_MS));
    setIsSending(false);
    setMessage("");
    onOpenChange(false);
    toast.success("Mensagem enviada", {
      description: `${SUPPORT_RESPONSE_TIME_LABEL} por e-mail e aqui na plataforma.`,
    });
  }

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
      title="Suporte da viagem"
      description={`Reserva ${reservation.code}. Você fala com a gente por aqui, sem precisar sair da plataforma.`}
    >
      <div className="flex flex-col gap-2">
        {SUPPORT_FAQ.map((entry) => (
          <details
            key={entry.question}
            className="group rounded-2xl bg-blue-50/60 px-4 py-3"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-blue-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 [&::-webkit-details-marker]:hidden">
              {entry.question}
              <ChevronDown
                className="h-4 w-4 shrink-0 text-blue-950/50 transition-transform group-open:rotate-180"
                aria-hidden
              />
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-blue-950/70">
              {entry.answer}
            </p>
          </details>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-8 flex flex-col gap-4"
      >
        <p className="text-sm font-semibold text-blue-950">
          Não achou a resposta? Escreva para a gente.
        </p>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={subjectId}
            className="text-sm font-medium text-blue-950"
          >
            Assunto
          </label>
          <select
            id={subjectId}
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            className="h-12 w-full cursor-pointer appearance-none rounded-xl bg-white px-4 text-base text-blue-950 ring-1 ring-blue-950/15 focus:outline-none focus:ring-2 focus:ring-blue-900"
          >
            {SUPPORT_SUBJECTS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.subject && (
            <p role="alert" className="text-sm text-red-600">
              {errors.subject}
            </p>
          )}
        </div>

        <TextAreaField
          label="Mensagem"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Conte o que precisa. Quanto mais detalhe, mais rápido resolvemos."
          error={errors.message}
        />

        <BrandButton
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isSending}
          loadingLabel="Enviando"
        >
          Enviar mensagem
        </BrandButton>
      </form>
    </Sheet>
  );
}
