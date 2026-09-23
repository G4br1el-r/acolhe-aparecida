import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import type { Reservation } from "@/@types/Modules/Reserva/reservation";
import {
  formatLongDate,
  pluralize,
} from "@/lib/Modules/Hospedagens/format-date";
import { buildCountdown } from "@/lib/Modules/Viagem/countdown";
import { AddToCalendarButton } from "../AddToCalendarButton";
import { TripSection } from "../TripSection";

type DatesSectionProps = {
  reservation: Reservation;
  accommodation: Accommodation;
};

export function DatesSection({
  reservation,
  accommodation,
}: DatesSectionProps) {
  const countdown = buildCountdown(reservation);
  const isActive = reservation.status === "confirmada";

  return (
    <TripSection
      id="datas"
      title="Datas da estadia"
      description={
        isActive
          ? `${countdown.label}. ${pluralize(reservation.price.nightCount, "noite", "noites")} em Aparecida.`
          : pluralize(reservation.price.nightCount, "noite", "noites")
      }
      action={
        isActive ? (
          <AddToCalendarButton
            reservation={reservation}
            accommodation={accommodation}
          />
        ) : undefined
      }
    >
      <dl className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-blue-50/60 p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
            Check-in
          </dt>
          <dd className="mt-1 text-base font-semibold text-blue-950 first-letter:uppercase">
            <time dateTime={reservation.checkIn}>
              {formatLongDate(reservation.checkIn)}
            </time>
          </dd>
          <dd className="mt-0.5 text-sm text-blue-950/65">
            a partir das {accommodation.checkInTime}
          </dd>
        </div>
        <div className="rounded-2xl bg-blue-50/60 p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
            Check-out
          </dt>
          <dd className="mt-1 text-base font-semibold text-blue-950 first-letter:uppercase">
            <time dateTime={reservation.checkOut}>
              {formatLongDate(reservation.checkOut)}
            </time>
          </dd>
          <dd className="mt-0.5 text-sm text-blue-950/65">
            até as {accommodation.checkOutTime}
          </dd>
        </div>
      </dl>
    </TripSection>
  );
}
