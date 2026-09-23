"use client";

import { Printer } from "lucide-react";
import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import type { Reservation } from "@/@types/Modules/Reserva/reservation";
import { RESERVATION_STATUS_LABELS } from "@/components/Modules/Reserva/ReservationStatusBadge";
import { BrandButton } from "@/components/ui/brand-button";
import { Dialog } from "@/components/ui/dialog";
import { PAYMENT_METHOD_LABELS } from "@/constants/Modules/Viagem/trip";
import {
  formatNumericDate,
  formatStayRange,
  pluralize,
} from "@/lib/Modules/Hospedagens/format-date";
import { formatCurrency } from "@/lib/Modules/Reserva/Checkout/price-summary";

const PRINT_STYLES = `
@media print {
  body * { visibility: hidden; }
  [data-receipt], [data-receipt] * { visibility: visible; }
  [data-receipt] { position: fixed; inset: 0; padding: 2rem; background: white; }
}
`;

type ReceiptDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reservation: Reservation;
  accommodation: Accommodation;
};

export function ReceiptDialog({
  open,
  onOpenChange,
  reservation,
  accommodation,
}: ReceiptDialogProps) {
  const rows = [
    { label: "Código", value: reservation.code },
    { label: "Status", value: RESERVATION_STATUS_LABELS[reservation.status] },
    { label: "Hospedagem", value: accommodation.name },
    {
      label: "Endereço",
      value: `${accommodation.address.street}, ${accommodation.address.neighborhood}, Aparecida, SP`,
    },
    {
      label: "Estadia",
      value: `${formatStayRange(reservation.checkIn, reservation.checkOut)} · ${pluralize(reservation.price.nightCount, "noite", "noites")}`,
    },
    {
      label: "Quartos e hóspedes",
      value: `${pluralize(reservation.roomCount, "quarto", "quartos")} · ${pluralize(reservation.guests.length, "hóspede", "hóspedes")}`,
    },
    { label: "Responsável", value: reservation.responsible.fullName },
    { label: "CPF", value: reservation.responsible.document },
    {
      label: "Pagamento",
      value: `${PAYMENT_METHOD_LABELS[reservation.payment.method]}${reservation.payment.cardLastDigits ? ` final ${reservation.payment.cardLastDigits}` : ""} · ${reservation.payment.installmentCount}x`,
    },
    {
      label: "Pago em",
      value: reservation.payment.paidAt
        ? formatNumericDate(reservation.payment.paidAt.slice(0, 10))
        : "Aguardando",
    },
    {
      label: "Valor pago",
      value: formatCurrency(reservation.payment.amountPaid),
    },
  ];

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Comprovante da reserva"
      description="Vale como confirmação para apresentar no check-in."
      footer={
        <div className="flex justify-end">
          <BrandButton variant="primary" onClick={() => window.print()}>
            <Printer className="h-4 w-4" aria-hidden />
            Imprimir ou salvar em PDF
          </BrandButton>
        </div>
      }
    >
      <style>{PRINT_STYLES}</style>
      <div data-receipt className="rounded-2xl bg-blue-50/60 p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
          Acolher Aparecida
        </p>
        <p className="mt-1 text-lg font-semibold text-blue-950">
          Confirmação de reserva
        </p>
        <dl className="mt-4 flex flex-col divide-y divide-blue-950/8 text-sm">
          {rows.map((row) => (
            <div key={row.label} className="flex justify-between gap-6 py-2">
              <dt className="shrink-0 text-blue-950/60">{row.label}</dt>
              <dd className="text-right font-medium text-blue-950">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-xs text-blue-950/50">
          Emitido em {formatNumericDate(new Date().toISOString().slice(0, 10))}.
          Reserva e pagamento feitos pela plataforma.
        </p>
      </div>
    </Dialog>
  );
}
