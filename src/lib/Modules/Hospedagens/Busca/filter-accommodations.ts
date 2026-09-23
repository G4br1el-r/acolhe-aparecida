import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import { EDITORIAL_CRITERIA } from "@/constants/Modules/Home/editorial-criteria";
import type { SearchParams } from "@/schemas/Modules/Hospedagens/Busca/search-params";
import { totalGuests } from "@/schemas/Modules/Hospedagens/Busca/search-params";
import {
  type AccommodationAvailability,
  accommodationAvailabilityFor,
} from "./availability";

export type SearchResult = {
  accommodation: Accommodation;
  availability: AccommodationAvailability;
  nightlyRate: number;
  totalPrice: number | null;
};

function includesAll<Value>(source: Value[], required: Value[]): boolean {
  return required.every((value) => source.includes(value));
}

function matchesGuests(
  accommodation: Accommodation,
  params: SearchParams,
): boolean {
  const guests = totalGuests(params);
  const roomsNeeded = Math.max(1, params.quartos);
  const capacityPerRoom = Math.ceil(guests / roomsNeeded);

  return accommodation.rooms.some(
    (room) =>
      room.maxGuests >= capacityPerRoom && room.totalUnits >= roomsNeeded,
  );
}

function matchesFilters(
  accommodation: Accommodation,
  params: SearchParams,
): boolean {
  if (params.tipo.length > 0 && !params.tipo.includes(accommodation.type)) {
    return false;
  }
  if (
    params.preco_min !== undefined &&
    accommodation.pricePerNight < params.preco_min
  ) {
    return false;
  }
  if (
    params.preco_max !== undefined &&
    accommodation.pricePerNight > params.preco_max
  ) {
    return false;
  }
  if (
    params.distancia !== undefined &&
    accommodation.distances.santuarioInMeters > params.distancia
  ) {
    return false;
  }
  if (!includesAll(accommodation.meals, params.alimentacao)) return false;
  if (!includesAll(accommodation.parking, params.estacionamento)) return false;
  if (!includesAll(accommodation.structure, params.estrutura)) return false;
  if (!includesAll(accommodation.accessibility, params.acesso)) return false;
  if (!includesAll(accommodation.booking, params.reserva)) return false;
  if (params.nota !== undefined && accommodation.rating < params.nota) {
    return false;
  }
  if (params.acessibilidade && !accommodation.isAccessible) return false;
  if (!includesAll(accommodation.suitableFor, params.perfis)) return false;

  if (params.criterio) {
    const criterion = EDITORIAL_CRITERIA.find(
      (item) => item.id === params.criterio,
    );
    if (criterion && !criterion.matches(accommodation)) return false;
  }

  return matchesGuests(accommodation, params);
}

export function searchAccommodations(
  accommodations: Accommodation[],
  params: SearchParams,
): SearchResult[] {
  const dates =
    params.checkin && params.checkout
      ? { checkIn: params.checkin, checkOut: params.checkout }
      : null;
  const roomsNeeded = Math.max(1, params.quartos);

  return accommodations
    .filter((accommodation) => matchesFilters(accommodation, params))
    .map((accommodation) => {
      const availability = accommodationAvailabilityFor(
        accommodation,
        dates,
        roomsNeeded,
      );
      const nightlyRate =
        availability.cheapestAvailableRoom?.nightlyRate ??
        accommodation.pricePerNight;
      const totalPrice =
        dates && availability.nightCount > 0
          ? nightlyRate * availability.nightCount * roomsNeeded
          : null;

      return { accommodation, availability, nightlyRate, totalPrice };
    });
}
