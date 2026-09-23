import type { Reservation } from "@/@types/Modules/Reserva/reservation";

export type ReservationGroupId = "proximas" | "anteriores" | "canceladas";

export type ReservationGroups = Record<ReservationGroupId, Reservation[]> & {
  nextTrip: Reservation | null;
};

function byCheckInAscending(first: Reservation, second: Reservation): number {
  return first.checkIn.localeCompare(second.checkIn);
}

function byCheckInDescending(first: Reservation, second: Reservation): number {
  return second.checkIn.localeCompare(first.checkIn);
}

export function groupReservations(
  reservations: Reservation[],
): ReservationGroups {
  const proximas = reservations
    .filter(
      (reservation) =>
        reservation.status === "confirmada" ||
        reservation.status === "aguardando-pagamento",
    )
    .sort(byCheckInAscending);
  const anteriores = reservations
    .filter((reservation) => reservation.status === "concluida")
    .sort(byCheckInDescending);
  const canceladas = reservations
    .filter(
      (reservation) =>
        reservation.status === "cancelada" ||
        reservation.status === "reembolsada",
    )
    .sort(byCheckInDescending);

  const nextTrip =
    proximas.find((reservation) => reservation.status === "confirmada") ?? null;

  return { proximas, anteriores, canceladas, nextTrip };
}
