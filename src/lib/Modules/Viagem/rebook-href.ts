import type {
  GuestAgeGroup,
  Reservation,
} from "@/@types/Modules/Reserva/reservation";
import { searchParamsToQueryString } from "@/schemas/Modules/Hospedagens/Busca/search-params";

export type GuestCounts = Record<GuestAgeGroup, number>;

export function countGuestsByAgeGroup(
  guests: Pick<Reservation, "guests">["guests"],
): GuestCounts {
  return guests.reduce<GuestCounts>(
    (counts, guest) => {
      counts[guest.ageGroup] += 1;
      return counts;
    },
    { adulto: 0, crianca: 0, idoso: 0 },
  );
}

export function buildRebookHref(
  reservation: Pick<Reservation, "accommodationSlug" | "guests" | "roomCount">,
): string {
  const counts = countGuestsByAgeGroup(reservation.guests);
  const query = searchParamsToQueryString({
    adultos: counts.adulto,
    criancas: counts.crianca,
    idosos: counts.idoso,
    quartos: reservation.roomCount,
  });

  return query
    ? `/hospedagens/${reservation.accommodationSlug}?${query}`
    : `/hospedagens/${reservation.accommodationSlug}`;
}
