"use client";

import { useEffect, useState } from "react";
import type { User } from "@/@types/Modules/Conta/user";
import { BrandButton } from "@/components/ui/brand-button";
import { TextField } from "@/components/ui/text-field";
import type { CheckoutQuote } from "@/hooks/Modules/Reserva/Checkout/use-checkout-quote";
import {
  fieldErrorsFrom,
  type ResponsibleFormValues,
  responsibleSchema,
} from "@/schemas/Modules/Reserva/Checkout/checkout";
import { useCheckoutStore } from "@/store/Modules/Reserva/Checkout/use-checkout-store";
import { InlineAuth } from "../InlineAuth";

type StepResponsibleProps = {
  quote: CheckoutQuote;
  user: User | null;
  isResolvingUser: boolean;
  onContinue: () => void;
  onBack: () => void;
};

export function StepResponsible({
  quote,
  user,
  isResolvingUser,
  onContinue,
  onBack,
}: StepResponsibleProps) {
  const updateDraft = useCheckoutStore((state) => state.updateDraft);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ResponsibleFormValues, string>>
  >({});

  const responsible = quote.draft.responsible;
  const isResponsibleEmpty =
    responsible.fullName === "" && responsible.email === "";

  useEffect(() => {
    if (!user || !isResponsibleEmpty) return;

    updateDraft({
      responsible: {
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        document: user.document,
      },
      paymentMethod:
        user.preferences.preferredPayment ?? quote.draft.paymentMethod,
    });
  }, [user, isResponsibleEmpty, updateDraft, quote.draft.paymentMethod]);

  function setField(field: keyof ResponsibleFormValues, value: string) {
    updateDraft({ responsible: { ...responsible, [field]: value } });
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleContinue() {
    const result = responsibleSchema.safeParse(responsible);

    if (!result.success) {
      setErrors(fieldErrorsFrom(result.error));
      return;
    }

    updateDraft({ responsible: result.data });
    onContinue();
  }

  if (!user) {
    return (
      <div className="flex flex-col gap-6">
        <InlineAuth isResolving={isResolvingUser} />
        <div>
          <BrandButton variant="ghost" onClick={onBack}>
            Voltar
          </BrandButton>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-3xl bg-white p-5 ring-1 ring-blue-950/10">
        <h2 className="text-lg font-semibold text-blue-950">
          Responsável pela reserva
        </h2>
        <p className="mt-1 text-sm text-blue-950/70">
          Quem recebe o comprovante e responde pela estadia. Já preenchemos com
          os dados da sua conta.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <TextField
            label="Nome completo"
            value={responsible.fullName}
            onChange={(event) => setField("fullName", event.target.value)}
            autoComplete="name"
            error={errors.fullName}
            required
          />
          <TextField
            label="CPF"
            value={responsible.document}
            onChange={(event) => setField("document", event.target.value)}
            inputMode="numeric"
            placeholder="000.000.000-00"
            error={errors.document}
            required
          />
          <TextField
            label="E-mail"
            type="email"
            value={responsible.email}
            onChange={(event) => setField("email", event.target.value)}
            autoComplete="email"
            hint="O comprovante vai para este e-mail."
            error={errors.email}
            required
          />
          <TextField
            label="Celular"
            type="tel"
            value={responsible.phone}
            onChange={(event) => setField("phone", event.target.value)}
            autoComplete="tel"
            inputMode="tel"
            placeholder="(12) 99999-9999"
            hint="Usado só pela hospedagem, no dia da chegada."
            error={errors.phone}
            required
          />
        </div>
      </section>

      <div className="flex items-center justify-between gap-3">
        <BrandButton variant="ghost" onClick={onBack}>
          Voltar
        </BrandButton>
        <BrandButton size="lg" onClick={handleContinue}>
          Continuar
        </BrandButton>
      </div>
    </div>
  );
}
