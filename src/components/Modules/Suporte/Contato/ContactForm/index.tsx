"use client";

import { MailCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { SubjectSelect } from "@/components/Modules/Suporte/Contato/SubjectSelect";
import { BrandButton } from "@/components/ui/brand-button";
import { TextAreaField, TextField } from "@/components/ui/text-field";
import {
  CONTACT_MOCK_DELAY_IN_MS,
  SUPPORT_RESPONSE_TIME_LABEL,
} from "@/constants/Modules/Suporte/support-channels";
import { delay } from "@/mocks/latency";
import {
  type ContactField,
  validateContact,
} from "@/schemas/Modules/Suporte/contact";

type ContactFormInputs = Record<ContactField, string>;

const EMPTY_VALUES: ContactFormInputs = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [isSent, setIsSent] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInputs>({ defaultValues: EMPTY_VALUES });

  async function onSubmit(values: ContactFormInputs) {
    const result = validateContact(values);

    if (result.errors) {
      for (const [field, message] of Object.entries(result.errors)) {
        setError(field as ContactField, { type: "validate", message });
      }
      return;
    }

    await delay(CONTACT_MOCK_DELAY_IN_MS);
    setIsSent(true);
    toast.success("Mensagem enviada", {
      description: `${SUPPORT_RESPONSE_TIME_LABEL}, em ${result.data.email}.`,
    });
  }

  function handleReset() {
    reset(EMPTY_VALUES);
    setIsSent(false);
  }

  if (isSent) {
    return (
      <output className="flex flex-col items-start gap-4 rounded-3xl bg-emerald-50 p-6 text-blue-950">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-emerald-700 ring-1 ring-emerald-700/15">
          <MailCheck className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <h3 className="text-lg font-semibold">Recebemos sua mensagem</h3>
          <p className="mt-1 text-sm text-blue-950/70">
            {SUPPORT_RESPONSE_TIME_LABEL} dentro do horário de atendimento. A
            resposta chega no seu e-mail.
          </p>
        </div>
        <BrandButton variant="outline" onClick={handleReset}>
          Enviar outra mensagem
        </BrandButton>
      </output>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Nome"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />
        <TextField
          label="E-mail"
          type="email"
          autoComplete="email"
          inputMode="email"
          error={errors.email?.message}
          {...register("email")}
        />
      </div>
      <SubjectSelect
        label="Assunto"
        error={errors.subject?.message}
        {...register("subject")}
      />
      <TextAreaField
        label="Mensagem"
        hint="Se for sobre uma reserva, inclua o nome da hospedagem e as datas."
        error={errors.message?.message}
        {...register("message")}
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-blue-950/55">
          Usamos seus dados só para responder esta mensagem.
        </p>
        <BrandButton
          type="submit"
          isLoading={isSubmitting}
          loadingLabel="Enviando"
          className="sm:min-w-44"
        >
          Enviar mensagem
        </BrandButton>
      </div>
    </form>
  );
}
