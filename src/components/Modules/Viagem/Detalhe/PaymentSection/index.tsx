import { Receipt } from "lucide-react";
import type { Reservation } from "@/@types/Modules/Reserva/reservation";
import { BrandButton } from "@/components/ui/brand-button";
import { PAYMENT_METHOD_LABELS } from "@/constants/Modules/Viagem/trip";
import { pluralize } from "@/lib/Modules/Hospedagens/format-date";
import { formatCurrency } from "@/lib/Modules/Reserva/Checkout/price-summary";
import { TripSection } from "../TripSection";

const SINGLE_INSTALLMENT = 1;

type PaymentSectionProps = {
  reservation: Reservation;
  onOpenReceipt: () => void;
};

function paymentDescription(reservation: Reservation): string {
  const { payment } = reservation;

  if (payment.method === "pix") return "PIX à vista";

  const card = `${payment.cardBrand ?? "Cartão"} final ${payment.cardLastDigits ?? "0000"}`;

  if (payment.installmentCount === SINGLE_INSTALLMENT) {
    return `${card}, à vista`;
  }

  return `${card}, ${payment.installmentCount}x de ${formatCurrency(reservation.price.installmentValue)} sem juros`;
}

export function PaymentSection({
  reservation,
  onOpenReceipt,
}: PaymentSectionProps) {
  const { price, payment } = reservation;
  const isRefunded = reservation.status === "reembolsada";
  const lines = [
    {
      label: `${formatCurrency(price.nightlyRate)} × ${pluralize(price.nightCount, "noite", "noites")}${price.roomCount > 1 ? ` × ${pluralize(price.roomCount, "quarto", "quartos")}` : ""}`,
      value: price.subtotal,
    },
    ...(price.extrasTotal > 0
      ? [{ label: "Extras", value: price.extrasTotal }]
      : []),
    { label: "Taxa de serviço", value: price.serviceFee },
    ...(price.discount > 0
      ? [
          {
            label: reservation.coupon
              ? `Desconto (${reservation.coupon.code})`
              : "Desconto",
            value: -price.discount,
          },
        ]
      : []),
  ];

  return (
    <TripSection
      id="pagamento"
      title="Pagamento"
      description={`${PAYMENT_METHOD_LABELS[payment.method]} · ${paymentDescription(reservation)}`}
      action={
        <BrandButton variant="ghost" size="sm" onClick={onOpenReceipt}>
          <Receipt className="h-4 w-4" aria-hidden />
          Ver comprovante
        </BrandButton>
      }
    >
      <dl className="flex flex-col gap-2 text-sm">
        {lines.map((line) => (
          <div
            key={line.label}
            className="flex items-baseline justify-between gap-4"
          >
            <dt className="text-blue-950/70">{line.label}</dt>
            <dd
              className={`tabular-nums ${line.value < 0 ? "text-emerald-700" : "text-blue-950"}`}
            >
              {line.value < 0 ? "- " : ""}
              {formatCurrency(Math.abs(line.value))}
            </dd>
          </div>
        ))}
        <div className="mt-2 flex items-baseline justify-between gap-4 border-t border-blue-950/10 pt-3">
          <dt className="text-base font-semibold text-blue-950">Total</dt>
          <dd className="text-base font-semibold tabular-nums text-blue-950">
            {formatCurrency(price.total)}
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-blue-950/70">
            {isRefunded ? "Pago e reembolsado" : "Pago"}
          </dt>
          <dd className="tabular-nums text-blue-950/70">
            {formatCurrency(payment.amountPaid)}
          </dd>
        </div>
      </dl>

      {(reservation.extras.length > 0 || reservation.specialRequests) && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {reservation.extras.length > 0 && (
            <div className="rounded-2xl bg-blue-50/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
                Extras combinados
              </p>
              <ul className="mt-2 flex flex-col gap-1 text-sm text-blue-950">
                {reservation.extras.map((extra) => (
                  <li key={extra.id}>
                    {extra.label}
                    {extra.quantity > 1 && ` × ${extra.quantity}`}
                    {(extra.pricePerNight ?? extra.pricePerStay ?? 0) === 0 &&
                      " · sem custo"}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {reservation.specialRequests && (
            <div className="rounded-2xl bg-blue-50/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
                Pedido enviado à hospedagem
              </p>
              <p className="mt-2 text-sm leading-relaxed text-blue-950">
                {reservation.specialRequests}
              </p>
            </div>
          )}
        </div>
      )}
    </TripSection>
  );
}
