"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import type { Reservation } from "@/@types/Modules/Reserva/reservation";
import { DateRangeField } from "@/components/Modules/Hospedagens/Busca/DateRangeField";
import { BrandButton } from "@/components/ui/brand-button";
import { Dialog } from "@/components/ui/dialog";
import { useChangeReservationDates } from "@/hooks/Modules/Reserva/use-reservations";
import { DESKTOP_MEDIA_QUERY, useMediaQuery } from "@/hooks/use-media-query";
import { pluralize } from "@/lib/Modules/Hospedagens/format-date";
import { formatCurrency } from "@/lib/Modules/Reserva/Checkout/price-summary";
import { quoteDateChange } from "@/lib/Modules/Viagem/date-change";

type ChangeDatesDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reservation: Reservation;
  accommodation: Accommodation;
};

function paymentTargetLabel(reservation: Reservation): string {
  return reservation.payment.method === "pix"
    ? "via PIX"
    : `no cartão final ${reservation.payment.cardLastDigits ?? ""}`.trim();
}

export function ChangeDatesDialog({
  open,
  onOpenChange,
  reservation,
  accommodation,
}: ChangeDatesDialogProps) {
  const isDesktop = useMediaQuery(DESKTOP_MEDIA_QUERY);
  const [checkIn, setCheckIn] = useState<string | null>(reservation.checkIn);
  const [checkOut, setCheckOut] = useState<string | null>(reservation.checkOut);
  const changeDates = useChangeReservationDates();

  const hasSameDates =
    checkIn === reservation.checkIn && checkOut === reservation.checkOut;
  const quote =
    checkIn && checkOut && !hasSameDates
      ? quoteDateChange({ accommodation, reservation, checkIn, checkOut })
      : null;
  const canConfirm = Boolean(quote?.isAvailable) && !hasSameDates;

  function handleConfirm() {
    if (!quote || !checkIn || !checkOut) return;

    changeDates.mutate(
      {
        reservationId: reservation.id,
        checkIn,
        checkOut,
        price: quote.summary,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          toast.success("Datas alteradas", {
            description:
              quote.difference > 0
                ? `${formatCurrency(quote.difference)} cobrados ${paymentTargetLabel(reservation)}.`
                : quote.difference < 0
                  ? `${formatCurrency(Math.abs(quote.difference))} devolvidos ${paymentTargetLabel(reservation)}.`
                  : "Sem diferença de valor.",
          });
        },
        onError: () => {
          toast.error("Não conseguimos alterar agora. Tente de novo.");
        },
      },
    );
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Alterar datas"
      description={`Mesmo quarto, mesma forma de pagamento. A diferença é cobrada ou devolvida ${paymentTargetLabel(reservation)}.`}
      footer={
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <BrandButton
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={changeDates.isPending}
          >
            Voltar
          </BrandButton>
          <BrandButton
            variant="primary"
            onClick={handleConfirm}
            disabled={!canConfirm}
            isLoading={changeDates.isPending}
            loadingLabel="Alterando"
          >
            Confirmar novas datas
          </BrandButton>
        </div>
      }
    >
      <div className="rounded-xl ring-1 ring-blue-950/15">
        <DateRangeField
          checkIn={checkIn}
          checkOut={checkOut}
          onChange={(range) => {
            setCheckIn(range.checkIn);
            setCheckOut(range.checkOut);
          }}
          variant="card"
          isDesktop={isDesktop}
        />
      </div>

      <div className="mt-4 min-h-24" aria-live="polite">
        {hasSameDates && (
          <p className="text-sm text-blue-950/60">
            Escolha datas diferentes das atuais para ver o novo valor.
          </p>
        )}

        {!hasSameDates && checkIn && !checkOut && (
          <p className="text-sm text-blue-950/60">
            Agora escolha a data de check-out.
          </p>
        )}

        {quote && !quote.isAvailable && (
          <p className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">
            Sem vaga para{" "}
            {pluralize(reservation.roomCount, "quarto", "quartos")} desse tipo
            nessas datas. Tente outro período.
          </p>
        )}

        {quote?.isAvailable && (
          <dl className="flex flex-col gap-2 rounded-2xl bg-blue-50/60 p-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-blue-950/70">
                {formatCurrency(quote.summary.nightlyRate)} ×{" "}
                {pluralize(quote.nightCount, "noite", "noites")}
                {quote.summary.roomCount > 1 &&
                  ` × ${pluralize(quote.summary.roomCount, "quarto", "quartos")}`}
              </dt>
              <dd className="tabular-nums text-blue-950">
                {formatCurrency(quote.summary.subtotal)}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-blue-950/70">Novo total</dt>
              <dd className="font-semibold tabular-nums text-blue-950">
                {formatCurrency(quote.summary.total)}
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-blue-950/10 pt-2">
              <dt className="font-semibold text-blue-950">
                {quote.difference > 0
                  ? "A pagar agora"
                  : quote.difference < 0
                    ? "Estorno para você"
                    : "Diferença"}
              </dt>
              <dd
                className={`font-semibold tabular-nums ${quote.difference < 0 ? "text-emerald-700" : "text-blue-950"}`}
              >
                {formatCurrency(Math.abs(quote.difference))}
              </dd>
            </div>
            {quote.summary.hasHighDemandPricing && (
              <p className="text-xs text-blue-950/55">
                Inclui datas de alta procura.
              </p>
            )}
          </dl>
        )}
      </div>
    </Dialog>
  );
}
