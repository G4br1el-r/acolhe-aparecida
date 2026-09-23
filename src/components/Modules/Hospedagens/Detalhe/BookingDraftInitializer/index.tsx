"use client";

import { useEffect } from "react";
import type { SearchParams } from "@/schemas/Modules/Hospedagens/Busca/search-params";
import { useBookingDraftStore } from "@/store/Modules/Hospedagens/Detalhe/use-booking-draft-store";

type BookingDraftInitializerProps = {
  slug: string;
  params: SearchParams;
  defaultRoomTypeId: string;
};

export function BookingDraftInitializer({
  slug,
  params,
  defaultRoomTypeId,
}: BookingDraftInitializerProps) {
  const initialize = useBookingDraftStore((state) => state.initialize);

  useEffect(() => {
    initialize(slug, {
      checkIn: params.checkin ?? null,
      checkOut: params.checkout ?? null,
      adults: params.adultos,
      children: params.criancas,
      childAges: params.idades,
      seniors: params.idosos,
      rooms: params.quartos,
      roomTypeId: defaultRoomTypeId,
    });
  }, [slug, params, defaultRoomTypeId, initialize]);

  return null;
}
