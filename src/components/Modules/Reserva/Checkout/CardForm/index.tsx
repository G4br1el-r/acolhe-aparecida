"use client";

import { CreditCard, Lock } from "lucide-react";
import { useState } from "react";
import { BrandButton } from "@/components/ui/brand-button";
import { TextField } from "@/components/ui/text-field";
import {
  formatCardNumber,
  formatExpiry,
  onlyDigits,
} from "@/lib/Modules/Reserva/Checkout/card";
import {
  availableInstallments,
  formatCurrency,
} from "@/lib/Modules/Reserva/Checkout/price-summary";
import {
  type CardFormValues,
  cardSchema,
  fieldErrorsFrom,
} from "@/schemas/Modules/Reserva/Checkout/checkout";
import {
  detectCardBrand,
  TEST_CARDS,
} from "@/services/Modules/Reserva/payments";

const CVV_MAX_LENGTH = 4;

type CardFormProps = {
  total: number;
  installmentCount: number;
  onInstallmentChange: (count: number) => void;
  onSubmit: (values: CardFormValues) => void;
  isSubmitting: boolean;
  submitLabel: string;
};

export function CardForm({
  total,
  installmentCount,
  onInstallmentChange,
  onSubmit,
  isSubmitting,
  submitLabel,
}: CardFormProps) {
  const [values, setValues] = useState<CardFormValues>({
    number: "",
    holderName: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof CardFormValues, string>>
  >({});

  const installments = availableInstallments(total);
  const brand = detectCardBrand(values.number);

  function setField(field: keyof CardFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleSubmit() {
    const result = cardSchema.safeParse(values);
    if (!result.success) {
      setErrors(fieldErrorsFrom(result.error));
      return;
    }
    onSubmit(result.data);
  }

  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      <div className="relative">
        <TextField
          label="Número do cartão"
          value={values.number}
          onChange={(event) =>
            setField("number", formatCardNumber(event.target.value))
          }
          inputMode="numeric"
          autoComplete="cc-number"
          placeholder="0000 0000 0000 0000"
          error={errors.number}
          required
        />
        {onlyDigits(values.number).length > 0 && (
          <span className="pointer-events-none absolute top-9 right-4 flex items-center gap-1 text-xs font-medium text-blue-950/60">
            <CreditCard className="h-4 w-4" aria-hidden />
            {brand}
          </span>
        )}
      </div>

      <TextField
        label="Nome impresso no cartão"
        value={values.holderName}
        onChange={(event) =>
          setField("holderName", event.target.value.toUpperCase())
        }
        autoComplete="cc-name"
        error={errors.holderName}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <TextField
          label="Validade"
          value={values.expiry}
          onChange={(event) =>
            setField("expiry", formatExpiry(event.target.value))
          }
          inputMode="numeric"
          autoComplete="cc-exp"
          placeholder="MM/AA"
          error={errors.expiry}
          required
        />
        <TextField
          label="CVV"
          value={values.cvv}
          onChange={(event) =>
            setField(
              "cvv",
              onlyDigits(event.target.value).slice(0, CVV_MAX_LENGTH),
            )
          }
          inputMode="numeric"
          autoComplete="cc-csc"
          placeholder="123"
          error={errors.cvv}
          required
        />
      </div>

      <label className="flex flex-col gap-1.5 text-sm font-medium text-blue-950">
        Parcelas
        <select
          value={installmentCount}
          onChange={(event) => onInstallmentChange(Number(event.target.value))}
          className="h-12 w-full cursor-pointer rounded-xl bg-white px-4 text-base font-normal text-blue-950 ring-1 ring-blue-950/15 focus:outline-none focus:ring-2 focus:ring-blue-900"
        >
          {installments.map((count) => (
            <option key={count} value={count}>
              {count}x de {formatCurrency(total / count)} sem juros
            </option>
          ))}
        </select>
      </label>

      <BrandButton
        type="submit"
        size="lg"
        variant="accent"
        fullWidth
        isLoading={isSubmitting}
        loadingLabel="Processando pagamento"
      >
        {submitLabel}
      </BrandButton>

      <p className="flex items-start gap-2 text-xs text-blue-950/55">
        <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
        Demonstração sem cobrança real. Cartões de teste: {TEST_CARDS.approved}{" "}
        (aprovado), {TEST_CARDS.declined} (recusado), {TEST_CARDS.error} (falha
        da operadora).
      </p>
    </form>
  );
}
