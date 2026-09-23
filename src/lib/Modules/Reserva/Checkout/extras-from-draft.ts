import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import type {
  ReservationExtra,
  ReservationExtraId,
} from "@/@types/Modules/Reserva/reservation";
import {
  EXTRA_OPTIONS,
  type ExtraOption,
} from "@/constants/Modules/Reserva/Checkout/extras";

export function availableExtrasFor(
  accommodation: Accommodation,
): ExtraOption[] {
  return EXTRA_OPTIONS.filter((option) => option.isAvailableFor(accommodation));
}

export function extrasFromDraft(
  selection: Partial<Record<ReservationExtraId, number>>,
  accommodation: Accommodation,
): ReservationExtra[] {
  return availableExtrasFor(accommodation)
    .filter((option) => (selection[option.id] ?? 0) > 0)
    .map((option) => ({
      id: option.id,
      label: option.label,
      pricePerNight: option.pricePerNight,
      pricePerStay: option.pricePerStay,
      quantity: selection[option.id] ?? 0,
    }));
}
