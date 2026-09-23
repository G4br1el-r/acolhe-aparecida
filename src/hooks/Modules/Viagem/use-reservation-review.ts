"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchReviewByReservation } from "@/services/Modules/Hospedagens/reviews";

export const RESERVATION_REVIEW_QUERY_KEY = "avaliacao-da-reserva";

export function useReservationReview(
  reservationId: string,
  isEnabled: boolean,
) {
  return useQuery({
    queryKey: [RESERVATION_REVIEW_QUERY_KEY, reservationId],
    queryFn: () => fetchReviewByReservation(reservationId),
    enabled: isEnabled,
  });
}
