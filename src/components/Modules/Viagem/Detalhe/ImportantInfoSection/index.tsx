import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import type { Reservation } from "@/@types/Modules/Reserva/reservation";
import { BrandButton } from "@/components/ui/brand-button";
import { REFUND_DEADLINE_LABEL } from "@/constants/Modules/Viagem/trip";
import { formatShortDate } from "@/lib/Modules/Hospedagens/format-date";
import { formatCurrency } from "@/lib/Modules/Reserva/Checkout/price-summary";
import { freeCancellationDeadline } from "@/lib/Modules/Viagem/cancellation-deadline";
import { TripSection } from "../TripSection";

const MAX_HOUSE_RULES = 3;

type ImportantInfoSectionProps = {
  reservation: Reservation;
  accommodation: Accommodation;
  onOpenCancel: () => void;
};

export function ImportantInfoSection({
  reservation,
  accommodation,
  onOpenCancel,
}: ImportantInfoSectionProps) {
  const policy = accommodation.cancellationPolicy;
  const deadline = freeCancellationDeadline(
    reservation.checkIn,
    policy.freeUntilDaysBefore,
  );
  const isActive = reservation.status === "confirmada";
  const isCancelled =
    reservation.status === "cancelada" || reservation.status === "reembolsada";

  return (
    <TripSection id="informacoes" title="Informações importantes">
      <ul className="flex flex-col divide-y divide-blue-950/8">
        <li className="py-3">
          <p className="text-sm font-semibold text-blue-950">
            Documento com foto no check-in
          </p>
          <p className="mt-0.5 text-sm text-blue-950/65">
            Todos os hóspedes apresentam RG ou CNH. Para crianças, certidão de
            nascimento também vale.
          </p>
        </li>
        {accommodation.houseRules.slice(0, MAX_HOUSE_RULES).map((rule) => (
          <li key={rule} className="py-3">
            <p className="text-sm text-blue-950/75">{rule}</p>
          </li>
        ))}
        <li className="py-3">
          <p className="text-sm font-semibold text-blue-950">
            Política de cancelamento
          </p>
          {isCancelled ? (
            <p className="mt-0.5 text-sm text-blue-950/65">
              Reserva cancelada
              {reservation.cancelledAt &&
                ` em ${formatShortDate(reservation.cancelledAt.slice(0, 10))}`}
              .{" "}
              {reservation.refundAmount
                ? `Reembolso de ${formatCurrency(reservation.refundAmount)} no mesmo meio de pagamento ${REFUND_DEADLINE_LABEL}.`
                : "Sem reembolso pela política escolhida."}
            </p>
          ) : (
            <p className="mt-0.5 text-sm text-blue-950/65">
              Cancelamento gratuito até{" "}
              <strong className="font-semibold text-blue-950">
                {formatShortDate(deadline)}
              </strong>
              . Depois disso, devolvemos {policy.partialRefundPercent}% até o
              dia anterior ao check-in.
            </p>
          )}
          {isActive && (
            <BrandButton
              variant="ghost"
              size="sm"
              onClick={onOpenCancel}
              className="mt-2 -ml-3 text-red-700 hover:bg-red-50"
            >
              Cancelar reserva
            </BrandButton>
          )}
        </li>
      </ul>
    </TripSection>
  );
}
