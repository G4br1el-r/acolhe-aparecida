"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCoupons } from "@/services/Modules/Reserva/coupons";

export const COUPONS_QUERY_KEY = "cupons";

export function useCoupons() {
  return useQuery({
    queryKey: [COUPONS_QUERY_KEY],
    queryFn: () => fetchCoupons(),
  });
}
