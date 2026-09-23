"use client";

import { toast } from "sonner";
import type { Reservation } from "@/@types/Modules/Reserva/reservation";
import { BrandButton } from "@/components/ui/brand-button";
import { Dialog } from "@/components/ui/dialog";
import { REFUND_DEADLINE_LABEL } from "@/constants/Modules/Viagem/trip";
import { useCancelReservation } from "@/hooks/Modules/Reserva/use-reservations";
import { formatShortDate } from "@/lib/Modules/Hospedagens/format-date";
import { formatCurrency } from "@/lib/Modules/Reserva/Checkout/price-summary";
import { freeCancellationDeadline } from "@/lib/Modules/Viagem/cancellation-deadline";
import { previewCancellation } from "@/services/Modules/Reserva/reservations";

type CancelDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reservation: Reservation;
};

export function CancelDialog({
  open,
  onOpenChange,
  reservation,
}: CancelDialogProps) {
  const preview = previewCancellation(reservation);
  const deadline = freeCancellationDeadline(
    reservation.checkIn,
    preview.freeUntilDaysBefore,
  );
  const cancel = useCancelReservation();

  function handleConfirm() {
    cancel.mutate(reservation.id, {
      onSuccess: (cancelled) => {
        onOpenChange(false);
        toast.success("Reserva cancelada", {
          description: cancelled.refundAmount
            ? `${formatCurrency(cancelled.refundAmount)} voltam para você ${REFUND_DEADLINE_LABEL}.`
            : "Esta reserva não tinha direito a reembolso.",
        });
      },
      onError: () => {
        toast.error("Não conseguimos cancelar agora. Tente de novo.");
      },
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Cancelar reserva?"
      description={`Reserva ${reservation.code}. Essa ação não pode ser desfeita.`}
      size="sm"
      footer={
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <BrandButton
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={cancel.isPending}
          >
            Manter reserva
          </BrandButton>
          <BrandButton
            variant="danger"
            onClick={handleConfirm}
            isLoading={cancel.isPending}
            loadingLabel="Cancelando"
          >
            Confirmar cancelamento
          </BrandButton>
        </div>
      }
    >
      <div className="rounded-2xl bg-blue-50/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
          {preview.isFree ? "Cancelamento gratuito" : "Fora do prazo gratuito"}
        </p>
        <p className="mt-1 text-2xl font-bold tracking-tight text-blue-950">
          {formatCurrency(preview.refundAmount)}
        </p>
        <p className="mt-1 text-sm text-blue-950/70">
          {preview.refundAmount > 0
            ? `${preview.refundPercent}% do valor pago, devolvido no mesmo meio de pagamento ${REFUND_DEADLINE_LABEL}.`
            : "Sem reembolso: o check-in é hoje ou já passou."}
        </p>
      </div>

      <p className="mt-4 text-sm text-blue-950/65">
        {preview.isFree
          ? `O prazo gratuito vai até ${formatShortDate(deadline)}.`
          : `O prazo gratuito terminou em ${formatShortDate(deadline)}.`}
      </p>
    </Dialog>
  );
}
