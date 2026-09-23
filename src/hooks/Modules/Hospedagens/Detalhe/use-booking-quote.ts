"use client";

import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import {
  accommodationAvailabilityFor,
  countNightsBetween,
  type RoomAvailability,
} from "@/lib/Modules/Hospedagens/Busca/availability";
import { buildPriceSummary } from "@/lib/Modules/Reserva/Checkout/price-summary";
import { useBookingDraftStore } from "@/store/Modules/Hospedagens/Detalhe/use-booking-draft-store";

const DEFAULT_INSTALLMENTS = 1;

export function useBookingQuote(accommodation: Accommodation) {
  const draft = useBookingDraftStore((state) => state.draft);
  const update = useBookingDraftStore((state) => state.update);

  const dates =
    draft.checkIn && draft.checkOut
      ? { checkIn: draft.checkIn, checkOut: draft.checkOut }
      : null;
  const nightCount = dates ? countNightsBetween(dates) : 0;
  const guestCount = draft.adults + draft.children + draft.seniors;
  const availability = accommodationAvailabilityFor(
    accommodation,
    dates,
    draft.rooms,
  );

  const guestsPerRoom = Math.ceil(guestCount / Math.max(1, draft.rooms));
  const fittingRooms = availability.rooms.filter(
    (room) => room.room.maxGuests >= guestsPerRoom,
  );
  const selectableRooms: RoomAvailability[] = fittingRooms.filter(
    (room) => room.unitsLeft >= draft.rooms,
  );

  const selectedRoom =
    selectableRooms.find((room) => room.room.id === draft.roomTypeId) ??
    selectableRooms[0] ??
    null;

  const summary =
    selectedRoom && nightCount > 0
      ? buildPriceSummary({
          nightlyRate: selectedRoom.nightlyRate,
          nightCount,
          roomCount: draft.rooms,
          extras: [],
          guestCount,
          installmentCount: DEFAULT_INSTALLMENTS,
          paymentMethod: "cartao",
          hasHighDemandPricing: selectedRoom.hasHighDemandPricing,
        })
      : null;

  return {
    draft,
    update,
    dates,
    nightCount,
    guestCount,
    guestsPerRoom,
    availability,
    fittingRooms,
    selectableRooms,
    selectedRoom,
    summary,
    hasDates: dates !== null && nightCount > 0,
  };
}
