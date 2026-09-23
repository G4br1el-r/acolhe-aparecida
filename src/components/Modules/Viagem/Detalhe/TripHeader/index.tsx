import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import type { Reservation } from "@/@types/Modules/Reserva/reservation";
import { ReservationStatusBadge } from "@/components/Modules/Reserva/ReservationStatusBadge";
import {
  formatStayRange,
  pluralize,
} from "@/lib/Modules/Hospedagens/format-date";
import { buildCountdown } from "@/lib/Modules/Viagem/countdown";

type TripHeaderProps = {
  reservation: Reservation;
  accommodation: Accommodation;
};

export function TripHeader({ reservation, accommodation }: TripHeaderProps) {
  const isActive = reservation.status === "confirmada";
  const countdown = buildCountdown(reservation);

  return (
    <header>
      <Link
        href="/minha-viagem"
        className="inline-flex h-9 items-center gap-1 rounded-full pr-3 pl-1.5 text-sm font-medium text-blue-900 transition-colors hover:bg-blue-950/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden />
        Minhas viagens
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <ReservationStatusBadge status={reservation.status} />
        <span className="text-sm text-blue-950/60">
          Código{" "}
          <span className="font-mono font-semibold text-blue-950">
            {reservation.code}
          </span>
        </span>
      </div>

      <h1 className="mt-3 text-3xl font-bold tracking-tight text-blue-950 md:text-4xl">
        {isActive ? countdown.label : accommodation.name}
      </h1>
      <p className="mt-2 text-blue-950/70">
        {isActive && `${accommodation.name} · `}
        {formatStayRange(reservation.checkIn, reservation.checkOut)}
        {" · "}
        {pluralize(reservation.price.nightCount, "noite", "noites")}
        {" · "}
        {pluralize(reservation.guests.length, "hóspede", "hóspedes")}
      </p>
    </header>
  );
}
