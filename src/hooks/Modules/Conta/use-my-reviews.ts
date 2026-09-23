"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchReviewsByUser } from "@/services/Modules/Hospedagens/reviews";
import { useSessionStore } from "@/store/Modules/Conta/use-session-store";

export const MY_REVIEWS_QUERY_KEY = "minhas-avaliacoes";

export function useMyReviews() {
  const userId = useSessionStore((state) => state.userId);

  return useQuery({
    queryKey: [MY_REVIEWS_QUERY_KEY, userId],
    queryFn: () => (userId ? fetchReviewsByUser(userId) : Promise.resolve([])),
    enabled: Boolean(userId),
  });
}
