import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import type { Reservation } from "@/@types/Modules/Reserva/reservation";
import { ReservationStatusBadge } from "@/components/Modules/Reserva/ReservationStatusBadge";
import { LIST_PHOTO_WIDTH } from "@/constants/Modules/Viagem/trip";
import {
  formatStayRange,
  pluralize,
} from "@/lib/Modules/Hospedagens/format-date";
import { formatCurrency } from "@/lib/Modules/Reserva/Checkout/price-summary";
import { buildPhotoUrl } from "@/mocks/Modules/Hospedagens/photos";

type ReservationListItemProps = {
  reservation: Reservation;
  accommodation: Accommodation | undefined;
};

export function ReservationListItem({
  reservation,
  accommodation,
}: ReservationListItemProps) {
  const isCancelled =
    reservation.status === "cancelada" || reservation.status === "reembolsada";
  const amountLabel = isCancelled
    ? reservation.refundAmount
      ? `Reembolso ${formatCurrency(reservation.refundAmount)}`
      : "Sem reembolso"
    : formatCurrency(reservation.payment.amountPaid);

  return (
    <li className="group relative flex gap-4 rounded-2xl bg-white p-3 ring-1 ring-blue-950/8 transition-shadow focus-within:ring-2 focus-within:ring-blue-900 hover:shadow-md sm:p-4">
      <Link
        href={`/minha-viagem/${reservation.id}`}
        aria-label={`Ver reserva ${reservation.code} em ${accommodation?.name ?? "hospedagem"}`}
        className="absolute inset-0 z-10 rounded-2xl focus:outline-none"
      />

      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-blue-100 sm:h-28 sm:w-36">
        {accommodation && (
          <Image
            src={buildPhotoUrl(
              accommodation.image.split("?")[0],
              LIST_PHOTO_WIDTH,
            )}
            alt=""
            fill
            sizes="(min-width: 640px) 9rem, 6rem"
            className="object-cover"
          />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 py-0.5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-blue-950">
              {accommodation?.name ?? "Hospedagem"}
            </p>
            <p className="mt-0.5 text-sm text-blue-950/65">
              {formatStayRange(reservation.checkIn, reservation.checkOut)}
              {" · "}
              {pluralize(reservation.guests.length, "hóspede", "hóspedes")}
              {reservation.roomCount > 1 &&
                ` · ${pluralize(reservation.roomCount, "quarto", "quartos")}`}
            </p>
          </div>
          <ReservationStatusBadge
            status={reservation.status}
            size="sm"
            className="hidden sm:inline-flex"
          />
        </div>

        <div className="flex items-end justify-between gap-3">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <ReservationStatusBadge
              status={reservation.status}
              size="sm"
              className="sm:hidden"
            />
            <span className="font-mono text-xs text-blue-950/50">
              {reservation.code}
            </span>
          </div>
          <span className="flex items-center gap-1 text-sm font-semibold text-blue-950">
            {amountLabel}
            <ChevronRight
              className="h-4 w-4 text-blue-950/40 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </span>
        </div>
      </div>
    </li>
  );
}
