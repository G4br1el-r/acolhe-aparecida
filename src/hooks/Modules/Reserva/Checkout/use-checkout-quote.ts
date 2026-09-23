"use client";

import { useQuery } from "@tanstack/react-query";
import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import {
  countNightsBetween,
  roomAvailabilityFor,
} from "@/lib/Modules/Hospedagens/Busca/availability";
import { extrasFromDraft } from "@/lib/Modules/Reserva/Checkout/extras-from-draft";
import {
  buildPriceSummary,
  validateCoupon,
} from "@/lib/Modules/Reserva/Checkout/price-summary";
import { fetchCouponByCode } from "@/services/Modules/Reserva/coupons";
import { useCheckoutStore } from "@/store/Modules/Reserva/Checkout/use-checkout-store";

export const COUPON_QUERY_KEY = "cupom-checkout";

export function useCheckoutQuote(accommodation: Accommodation) {
  const draft = useCheckoutStore((state) => state.draft);
  const couponCode = draft?.couponCode ?? null;

  const couponQuery = useQuery({
    queryKey: [COUPON_QUERY_KEY, couponCode],
    queryFn: () => (couponCode ? fetchCouponByCode(couponCode) : null),
    enabled: Boolean(couponCode),
    retry: false,
  });

  if (!draft || draft.accommodationSlug !== accommodation.slug) {
    return null;
  }

  const room =
    accommodation.rooms.find(
      (candidate) => candidate.id === draft.roomTypeId,
    ) ?? accommodation.rooms[0];
  const dates = { checkIn: draft.checkIn, checkOut: draft.checkOut };
  const nightCount = countNightsBetween(dates);
  const roomAvailability = roomAvailabilityFor(accommodation, room, dates);
  const guestCount = draft.adults + draft.children + draft.seniors;
  const extras = extrasFromDraft(draft.extras, accommodation);
  const coupon = couponQuery.data ?? null;

  const subtotal = roomAvailability.nightlyRate * nightCount * draft.roomCount;
  const couponValidation = coupon
    ? validateCoupon(coupon, subtotal, guestCount)
    : null;
  const appliedCoupon = coupon && couponValidation?.isValid ? coupon : null;

  const summary = buildPriceSummary({
    nightlyRate: roomAvailability.nightlyRate,
    nightCount,
    roomCount: draft.roomCount,
    extras,
    coupon: appliedCoupon,
    guestCount,
    installmentCount: draft.installmentCount,
    paymentMethod: draft.paymentMethod,
    hasHighDemandPricing: roomAvailability.hasHighDemandPricing,
  });

  return {
    draft,
    room,
    nightCount,
    guestCount,
    extras,
    summary,
    roomAvailability,
    coupon,
    couponValidation,
    appliedCoupon,
    isCouponLoading: couponQuery.isFetching,
    couponError: couponQuery.error,
  };
}

export type CheckoutQuote = NonNullable<ReturnType<typeof useCheckoutQuote>>;
