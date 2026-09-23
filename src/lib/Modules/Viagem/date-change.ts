import type { Coupon } from "@/@types/Modules/Conta/user";
import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import type {
  PriceSummary,
  Reservation,
} from "@/@types/Modules/Reserva/reservation";
import {
  countNightsBetween,
  roomAvailabilityFor,
} from "@/lib/Modules/Hospedagens/Busca/availability";
import { buildPriceSummary } from "@/lib/Modules/Reserva/Checkout/price-summary";

const FAR_FUTURE_EXPIRY = "2999-12-31";

export type DateChangeQuote = {
  summary: PriceSummary;
  nightCount: number;
  unitsLeft: number;
  isAvailable: boolean;
  difference: number;
};

type DateChangeInput = {
  accommodation: Accommodation;
  reservation: Reservation;
  checkIn: string;
  checkOut: string;
};

function couponFromReservation(reservation: Reservation): Coupon | null {
  if (!reservation.coupon) return null;

  return {
    code: reservation.coupon.code,
    description: reservation.coupon.description,
    type: "fixed",
    value: reservation.coupon.discount,
    expiresAt: FAR_FUTURE_EXPIRY,
    isUsed: false,
  };
}

export function quoteDateChange(
  input: DateChangeInput,
): DateChangeQuote | null {
  const room = input.accommodation.rooms.find(
    (candidate) => candidate.id === input.reservation.roomTypeId,
  );
  const dates = { checkIn: input.checkIn, checkOut: input.checkOut };
  const nightCount = countNightsBetween(dates);

  if (!room || nightCount === 0) return null;

  const availability = roomAvailabilityFor(input.accommodation, room, dates);
  const summary = buildPriceSummary({
    nightlyRate: availability.nightlyRate,
    nightCount,
    roomCount: input.reservation.roomCount,
    extras: input.reservation.extras,
    coupon: couponFromReservation(input.reservation),
    guestCount: input.reservation.guests.length,
    installmentCount: input.reservation.payment.installmentCount,
    paymentMethod: input.reservation.payment.method,
    hasHighDemandPricing: availability.hasHighDemandPricing,
  });

  return {
    summary,
    nightCount,
    unitsLeft: availability.unitsLeft,
    isAvailable: availability.unitsLeft >= input.reservation.roomCount,
    difference: summary.total - input.reservation.price.total,
  };
}
