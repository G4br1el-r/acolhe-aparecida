"use client";

import { AlertCircle, CreditCard, QrCode } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import type {
  PaymentMethod,
  PaymentRecord,
} from "@/@types/Modules/Reserva/reservation";
import { BrandButton } from "@/components/ui/brand-button";
import type { CheckoutQuote } from "@/hooks/Modules/Reserva/Checkout/use-checkout-quote";
import { useCreateReservation } from "@/hooks/Modules/Reserva/use-reservations";
import {
  formatCurrency,
  PIX_DISCOUNT_RATE,
} from "@/lib/Modules/Reserva/Checkout/price-summary";
import { cn } from "@/lib/utils";
import type { CardFormValues } from "@/schemas/Modules/Reserva/Checkout/checkout";
import {
  chargeCard,
  confirmPixPayment,
  createPixCharge,
  type PixCharge,
} from "@/services/Modules/Reserva/payments";
import { useCheckoutStore } from "@/store/Modules/Reserva/Checkout/use-checkout-store";
import { CardForm } from "../CardForm";
import { PixPanel } from "../PixPanel";

const PERCENT_MULTIPLIER = 100;

type PaymentPhase =
  | { kind: "idle" }
  | { kind: "pix-pending"; charge: PixCharge }
  | { kind: "processing" }
  | { kind: "declined"; reason: string }
  | { kind: "expired" }
  | { kind: "error"; message: string };

type StepPaymentProps = {
  accommodation: Accommodation;
  quote: CheckoutQuote;
  userId: string;
  onBack: () => void;
};

export function StepPayment({
  accommodation,
  quote,
  userId,
  onBack,
}: StepPaymentProps) {
  const router = useRouter();
  const updateDraft = useCheckoutStore((state) => state.updateDraft);
  const clearCheckout = useCheckoutStore((state) => state.clearCheckout);
  const createReservation = useCreateReservation();
  const [phase, setPhase] = useState<PaymentPhase>({ kind: "idle" });
  const [isCreatingPix, setIsCreatingPix] = useState(false);

  const { draft, summary, extras, appliedCoupon, couponValidation } = quote;
  const pixDiscountPercent = PIX_DISCOUNT_RATE * PERCENT_MULTIPLIER;
  const isBusy = phase.kind === "processing" || createReservation.isPending;

  function selectMethod(paymentMethod: PaymentMethod) {
    updateDraft({ paymentMethod, installmentCount: 1 });
    setPhase({ kind: "idle" });
  }

  async function finalize(payment: PaymentRecord) {
    try {
      const reservation = await createReservation.mutateAsync({
        userId,
        accommodationSlug: accommodation.slug,
        roomTypeId: quote.room.id,
        roomCount: draft.roomCount,
        checkIn: draft.checkIn,
        checkOut: draft.checkOut,
        guests: draft.guests,
        responsible: draft.responsible,
        extras,
        specialRequests:
          [
            draft.arrivalTime && `Chegada prevista: ${draft.arrivalTime}.`,
            draft.specialRequests,
          ]
            .filter(Boolean)
            .join(" ")
            .trim() || undefined,
        coupon:
          appliedCoupon && couponValidation?.isValid
            ? {
                code: appliedCoupon.code,
                description: appliedCoupon.description,
                discount: couponValidation.discount,
              }
            : undefined,
        price: summary,
        payment,
      });

      clearCheckout();
      toast.success("Reserva confirmada", {
        description: `Código ${reservation.code}`,
      });
      router.replace(`/reservar/confirmacao/${reservation.id}`);
    } catch (error) {
      setPhase({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "Não conseguimos registrar a reserva. O pagamento não foi concluído.",
      });
    }
  }

  async function handleCard(values: CardFormValues) {
    setPhase({ kind: "processing" });

    try {
      const result = await chargeCard(
        { ...values, installmentCount: draft.installmentCount },
        summary.total,
      );

      if (result.status === "recusado") {
        setPhase({ kind: "declined", reason: result.reason });
        return;
      }
      if (result.status === "expirado") {
        setPhase({ kind: "expired" });
        return;
      }

      await finalize(result.payment);
    } catch (error) {
      setPhase({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "Falha ao processar o cartão.",
      });
    }
  }

  async function handleCreatePix() {
    setIsCreatingPix(true);
    try {
      const charge = await createPixCharge(summary.total);
      setPhase({ kind: "pix-pending", charge });
    } finally {
      setIsCreatingPix(false);
    }
  }

  async function handleConfirmPix(charge: PixCharge) {
    setPhase({ kind: "processing" });
    const result = await confirmPixPayment(charge);

    if (result.status === "expirado") {
      setPhase({ kind: "expired" });
      return;
    }
    if (result.status === "recusado") {
      setPhase({ kind: "declined", reason: result.reason });
      return;
    }

    await finalize(result.payment);
  }

  const methodOptions: {
    id: PaymentMethod;
    label: string;
    description: string;
    icon: typeof QrCode;
  }[] = [
    {
      id: "pix",
      label: "PIX",
      description: `${pixDiscountPercent}% de desconto, confirmação na hora`,
      icon: QrCode,
    },
    {
      id: "cartao",
      label: "Cartão de crédito",
      description: "Parcele sem juros",
      icon: CreditCard,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-3xl bg-white p-5 ring-1 ring-blue-950/10">
        <h2 className="text-lg font-semibold text-blue-950">
          Como você prefere pagar?
        </h2>
        <p className="mt-1 text-sm text-blue-950/70">
          Você só é cobrado ao confirmar. Nada é pago fora da plataforma.
        </p>

        <fieldset className="mt-5 grid gap-3 sm:grid-cols-2">
          <legend className="sr-only">Forma de pagamento</legend>
          {methodOptions.map((option) => {
            const isSelected = draft.paymentMethod === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => selectMethod(option.id)}
                aria-pressed={isSelected}
                disabled={isBusy}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-2xl p-4 text-left ring-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900",
                  isSelected
                    ? "bg-blue-950 text-white ring-blue-950"
                    : "bg-white text-blue-950 ring-blue-950/15 hover:bg-blue-50",
                )}
              >
                <option.icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
                <span>
                  <span className="block text-sm font-semibold">
                    {option.label}
                  </span>
                  <span
                    className={cn(
                      "mt-0.5 block text-xs",
                      isSelected ? "text-white/75" : "text-blue-950/60",
                    )}
                  >
                    {option.description}
                  </span>
                </span>
              </button>
            );
          })}
        </fieldset>

        <div className="mt-6 border-t border-blue-950/10 pt-6">
          {(phase.kind === "declined" ||
            phase.kind === "error" ||
            phase.kind === "expired") && (
            <div
              role="alert"
              className="mb-5 flex items-start gap-3 rounded-2xl bg-red-50 p-4 text-sm text-red-800"
            >
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
              <div>
                <p className="font-semibold">
                  {phase.kind === "declined"
                    ? "Pagamento não autorizado"
                    : phase.kind === "expired"
                      ? "O código PIX expirou"
                      : "Não foi possível concluir"}
                </p>
                <p className="mt-1">
                  {phase.kind === "declined"
                    ? phase.reason
                    : phase.kind === "expired"
                      ? "Nenhum valor foi cobrado. Gere um novo código para continuar."
                      : phase.message}
                </p>
              </div>
            </div>
          )}

          {draft.paymentMethod === "cartao" && (
            <CardForm
              total={summary.total}
              installmentCount={draft.installmentCount}
              onInstallmentChange={(installmentCount) =>
                updateDraft({ installmentCount })
              }
              onSubmit={handleCard}
              isSubmitting={isBusy}
              submitLabel={`Pagar ${formatCurrency(summary.total)}`}
            />
          )}

          {draft.paymentMethod === "pix" && phase.kind !== "pix-pending" && (
            <div>
              <p className="text-sm text-blue-950/70">
                Total com desconto do PIX:{" "}
                <strong className="font-semibold text-blue-950">
                  {formatCurrency(summary.total)}
                </strong>
              </p>
              <BrandButton
                className="mt-4"
                size="lg"
                variant="accent"
                fullWidth
                onClick={handleCreatePix}
                isLoading={isCreatingPix || isBusy}
                loadingLabel={
                  isBusy ? "Confirmando pagamento" : "Gerando código"
                }
              >
                Gerar código PIX
              </BrandButton>
            </div>
          )}

          {draft.paymentMethod === "pix" && phase.kind === "pix-pending" && (
            <PixPanel
              charge={phase.charge}
              isConfirming={isBusy}
              onConfirm={() => handleConfirmPix(phase.charge)}
              onExpire={() => setPhase({ kind: "expired" })}
            />
          )}
        </div>
      </section>

      <div className="flex items-center justify-between gap-3">
        <BrandButton variant="ghost" onClick={onBack} disabled={isBusy}>
          Voltar
        </BrandButton>
      </div>
    </div>
  );
}
