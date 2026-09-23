import type { ReactNode } from "react";
import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import type { Reservation } from "@/@types/Modules/Reserva/reservation";
import {
  formatShortDate,
  pluralize,
} from "@/lib/Modules/Hospedagens/format-date";
import { formatCurrency } from "@/lib/Modules/Reserva/Checkout/price-summary";
import { buildCountdown } from "@/lib/Modules/Viagem/countdown";

const ASIDE_TOP_OFFSET_CLASS = "lg:top-28";

type TripAsideProps = {
  reservation: Reservation;
  accommodation: Accommodation;
  children: ReactNode;
};

export function TripAside({
  reservation,
  accommodation,
  children,
}: TripAsideProps) {
  const countdown = buildCountdown(reservation);
  const isActive = reservation.status === "confirmada";

  return (
    <aside
      aria-label="Resumo e ações"
      className={`hidden self-start rounded-3xl bg-white p-6 ring-1 ring-blue-950/8 lg:sticky lg:block ${ASIDE_TOP_OFFSET_CLASS}`}
    >
      {isActive && (
        <p className="text-2xl font-bold tracking-tight text-blue-950">
          {countdown.label}
        </p>
      )}
      <p className={`text-sm text-blue-950/70 ${isActive ? "mt-1" : ""}`}>
        {accommodation.name}
      </p>
      <dl className="mt-4 flex flex-col gap-2 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-blue-950/60">Check-in</dt>
          <dd className="font-medium text-blue-950">
            {formatShortDate(reservation.checkIn)} · {accommodation.checkInTime}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-blue-950/60">Check-out</dt>
          <dd className="font-medium text-blue-950">
            {formatShortDate(reservation.checkOut)} ·{" "}
            {accommodation.checkOutTime}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-blue-950/60">Hóspedes</dt>
          <dd className="font-medium text-blue-950">
            {pluralize(reservation.guests.length, "pessoa", "pessoas")}
          </dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-blue-950/10 pt-2">
          <dt className="text-blue-950/60">Total</dt>
          <dd className="font-semibold text-blue-950">
            {formatCurrency(reservation.price.total)}
          </dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-col gap-2">{children}</div>
    </aside>
  );
}
