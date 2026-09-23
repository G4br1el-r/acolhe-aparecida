"use client";

import { addDays, format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Tag } from "lucide-react";
import { useState } from "react";
import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import { BrandButton } from "@/components/ui/brand-button";
import { Checkbox } from "@/components/ui/checkbox";
import { TextAreaField, TextField } from "@/components/ui/text-field";
import { ARRIVAL_TIME_OPTIONS } from "@/constants/Modules/Reserva/Checkout/extras";
import type { CheckoutQuote } from "@/hooks/Modules/Reserva/Checkout/use-checkout-quote";
import { formatCurrency } from "@/lib/Modules/Reserva/Checkout/price-summary";
import {
  fieldErrorsFrom,
  stayDetailsSchema,
} from "@/schemas/Modules/Reserva/Checkout/checkout";
import { useCheckoutStore } from "@/store/Modules/Reserva/Checkout/use-checkout-store";

const DEADLINE_DATE_FORMAT = "d 'de' MMMM";

type StepDetailsProps = {
  accommodation: Accommodation;
  quote: CheckoutQuote;
  onContinue: () => void;
  onBack: () => void;
};

export function StepDetails({
  accommodation,
  quote,
  onContinue,
  onBack,
}: StepDetailsProps) {
  const updateDraft = useCheckoutStore((state) => state.updateDraft);
  const {
    draft,
    appliedCoupon,
    couponValidation,
    isCouponLoading,
    couponError,
  } = quote;
  const [couponInput, setCouponInput] = useState(draft.couponCode ?? "");
  const [errors, setErrors] = useState<
    Partial<
      Record<"arrivalTime" | "specialRequests" | "acceptedPolicy", string>
    >
  >({});

  const freeCancellationDeadline = format(
    addDays(
      parseISO(draft.checkIn),
      -accommodation.cancellationPolicy.freeUntilDaysBefore,
    ),
    DEADLINE_DATE_FORMAT,
    { locale: ptBR },
  );

  const couponMessage = couponError
    ? couponError.message
    : couponValidation && !couponValidation.isValid
      ? couponValidation.reason
      : appliedCoupon
        ? `${appliedCoupon.description}. Desconto de ${formatCurrency(couponValidation?.isValid ? couponValidation.discount : 0)}.`
        : null;

  function applyCoupon() {
    const code = couponInput.trim().toUpperCase();
    updateDraft({ couponCode: code || null });
  }

  function handleContinue() {
    const result = stayDetailsSchema.safeParse({
      arrivalTime: draft.arrivalTime,
      specialRequests: draft.specialRequests,
      acceptedPolicy: draft.acceptedPolicy,
    });

    if (!result.success) {
      setErrors(fieldErrorsFrom(result.error));
      return;
    }

    setErrors({});
    onContinue();
  }

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-3xl bg-white p-5 ring-1 ring-blue-950/10">
        <h2 className="text-lg font-semibold text-blue-950">
          Detalhes da chegada
        </h2>
        <p className="mt-1 text-sm text-blue-950/70">
          Check-in a partir das {accommodation.checkInTime}. Se chegar antes, a
          recepção guarda as malas.
        </p>

        <fieldset className="mt-5">
          <legend className="text-sm font-medium text-blue-950">
            Horário previsto de chegada
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {ARRIVAL_TIME_OPTIONS.map((option) => {
              const isSelected = draft.arrivalTime === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    updateDraft({ arrivalTime: option });
                    setErrors((current) => ({
                      ...current,
                      arrivalTime: undefined,
                    }));
                  }}
                  aria-pressed={isSelected}
                  className={`cursor-pointer rounded-full px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 ${
                    isSelected
                      ? "bg-blue-900 text-white"
                      : "bg-blue-50 text-blue-950 hover:bg-blue-100"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
          {errors.arrivalTime && (
            <p role="alert" className="mt-2 text-sm text-red-600">
              {errors.arrivalTime}
            </p>
          )}
        </fieldset>

        <div className="mt-5">
          <TextAreaField
            label="Pedidos especiais (opcional)"
            value={draft.specialRequests}
            onChange={(event) =>
              updateDraft({ specialRequests: event.target.value })
            }
            placeholder="Quarto no térreo, cama extra para criança, chegada com cadeirante, grupo com horário de missa..."
            hint="A hospedagem faz o possível para atender. Não é garantido."
            error={errors.specialRequests}
          />
        </div>
      </section>

      <section className="rounded-3xl bg-white p-5 ring-1 ring-blue-950/10">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-blue-950">
          <Tag className="h-5 w-5 text-blue-900/70" aria-hidden />
          Cupom de desconto
        </h2>
        <form
          className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end"
          onSubmit={(event) => {
            event.preventDefault();
            applyCoupon();
          }}
        >
          <div className="flex-1">
            <TextField
              label="Código"
              value={couponInput}
              onChange={(event) =>
                setCouponInput(event.target.value.toUpperCase())
              }
              placeholder="Ex.: BEMVINDO10"
              autoComplete="off"
              className="uppercase"
            />
          </div>
          <BrandButton
            type="submit"
            variant="secondary"
            isLoading={isCouponLoading}
            loadingLabel="Verificando"
            disabled={couponInput.trim() === ""}
          >
            Aplicar
          </BrandButton>
        </form>
        {couponMessage && (
          <output
            className={`mt-3 block text-sm ${appliedCoupon ? "text-emerald-700" : "text-red-600"}`}
          >
            {couponMessage}
            {appliedCoupon && (
              <button
                type="button"
                onClick={() => {
                  setCouponInput("");
                  updateDraft({ couponCode: null });
                }}
                className="ml-2 cursor-pointer font-medium underline underline-offset-4"
              >
                Remover
              </button>
            )}
          </output>
        )}
        {!couponMessage && (
          <p className="mt-3 text-xs text-blue-950/55">
            Seus cupons ficam em Minha conta. Demonstração: BEMVINDO10,
            ROMARIA150 (grupos a partir de 10) e VOLTEI5.
          </p>
        )}
      </section>

      <section className="rounded-3xl bg-blue-50/60 p-5 ring-1 ring-blue-950/8">
        <h2 className="text-lg font-semibold text-blue-950">
          Política de cancelamento
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-blue-950/80">
          <li>
            Cancelamento gratuito até {freeCancellationDeadline}, com devolução
            integral no mesmo meio de pagamento.
          </li>
          <li>
            Depois dessa data e até a véspera do check-in, devolução de{" "}
            {accommodation.cancellationPolicy.partialRefundPercent}% do valor
            pago.
          </li>
          <li>Sem comparecimento no dia do check-in, não há devolução.</li>
        </ul>
        <div className="mt-4">
          <Checkbox
            label="Li e concordo com a política de cancelamento e as regras da hospedagem."
            checked={draft.acceptedPolicy}
            onCheckedChange={(acceptedPolicy) => {
              updateDraft({ acceptedPolicy });
              setErrors((current) => ({
                ...current,
                acceptedPolicy: undefined,
              }));
            }}
          />
          {errors.acceptedPolicy && (
            <p role="alert" className="mt-1 text-sm text-red-600">
              {errors.acceptedPolicy}
            </p>
          )}
        </div>
      </section>

      <div className="flex items-center justify-between gap-3">
        <BrandButton variant="ghost" onClick={onBack}>
          Voltar
        </BrandButton>
        <BrandButton size="lg" onClick={handleContinue}>
          Ir para o pagamento
        </BrandButton>
      </div>
    </div>
  );
}
