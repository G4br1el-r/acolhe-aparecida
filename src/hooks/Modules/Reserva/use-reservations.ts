"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NOTIFICATIONS_QUERY_KEY } from "@/hooks/Modules/Conta/use-notifications";
import { REVIEWS_QUERY_KEY } from "@/hooks/Modules/Hospedagens/use-accommodation";
import {
  type CreateReviewInput,
  createReview,
} from "@/services/Modules/Hospedagens/reviews";
import { fetchCouponByCode } from "@/services/Modules/Reserva/coupons";
import {
  attachReviewToReservation,
  type ChangeDatesInput,
  type CreateReservationInput,
  cancelReservation,
  changeReservationDates,
  createReservation,
  fetchReservation,
  fetchReservations,
} from "@/services/Modules/Reserva/reservations";
import { useSessionStore } from "@/store/Modules/Conta/use-session-store";

export const RESERVATIONS_QUERY_KEY = "reservas";
export const RESERVATION_QUERY_KEY = "reserva";
export const COUPON_QUERY_KEY = "cupom";

export function useReservations() {
  const userId = useSessionStore((state) => state.userId);

  return useQuery({
    queryKey: [RESERVATIONS_QUERY_KEY, userId],
    queryFn: () => (userId ? fetchReservations(userId) : Promise.resolve([])),
    enabled: Boolean(userId),
  });
}

export function useReservation(reservationId: string) {
  return useQuery({
    queryKey: [RESERVATION_QUERY_KEY, reservationId],
    queryFn: () => fetchReservation(reservationId),
  });
}

function useInvalidateReservations() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: [RESERVATIONS_QUERY_KEY] });
    queryClient.invalidateQueries({ queryKey: [RESERVATION_QUERY_KEY] });
    queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_QUERY_KEY] });
  };
}

export function useCreateReservation() {
  const invalidate = useInvalidateReservations();

  return useMutation({
    mutationFn: (input: CreateReservationInput) => createReservation(input),
    onSuccess: invalidate,
  });
}

export function useCancelReservation() {
  const invalidate = useInvalidateReservations();

  return useMutation({
    mutationFn: (reservationId: string) => cancelReservation(reservationId),
    onSuccess: invalidate,
  });
}

export function useChangeReservationDates() {
  const invalidate = useInvalidateReservations();

  return useMutation({
    mutationFn: (input: ChangeDatesInput) => changeReservationDates(input),
    onSuccess: invalidate,
  });
}

export function useCouponLookup() {
  return useMutation({
    mutationFn: (code: string) => fetchCouponByCode(code),
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();
  const invalidate = useInvalidateReservations();

  return useMutation({
    mutationFn: async (input: CreateReviewInput) => {
      const review = await createReview(input);
      await attachReviewToReservation(input.reservationId, review.id);
      return review;
    },
    onSuccess: (review) => {
      invalidate();
      queryClient.invalidateQueries({
        queryKey: [REVIEWS_QUERY_KEY, review.accommodationSlug],
      });
    },
  });
}
