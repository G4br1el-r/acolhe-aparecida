import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import {
  accommodationAvailabilityFor,
  countNightsBetween,
} from "@/lib/Modules/Hospedagens/Busca/availability";
import type { SearchDraft } from "@/store/Modules/Hospedagens/Busca/use-search-store";

export type StayDraft = Pick<SearchDraft, "checkIn" | "checkOut" | "rooms">;

export type StayQuote =
  | { status: "sem-datas" }
  | { status: "indisponivel"; nightCount: number }
  | {
      status: "disponivel";
      nightCount: number;
      roomCount: number;
      nightlyRate: number;
      total: number;
      hasHighDemandPricing: boolean;
    };

export function stayDatesFromDraft(
  draft: StayDraft,
): { checkIn: string; checkOut: string } | null {
  if (!draft.checkIn || !draft.checkOut) return null;

  const nightCount = countNightsBetween({
    checkIn: draft.checkIn,
    checkOut: draft.checkOut,
  });

  return nightCount > 0
    ? { checkIn: draft.checkIn, checkOut: draft.checkOut }
    : null;
}

export function stayQuoteFor(
  accommodation: Pick<Accommodation, "slug" | "rooms">,
  draft: StayDraft,
): StayQuote {
  const dates = stayDatesFromDraft(draft);

  if (!dates) return { status: "sem-datas" };

  const roomCount = Math.max(1, draft.rooms);
  const availability = accommodationAvailabilityFor(
    accommodation,
    dates,
    roomCount,
  );
  const room = availability.cheapestAvailableRoom;

  if (!room) {
    return { status: "indisponivel", nightCount: availability.nightCount };
  }

  return {
    status: "disponivel",
    nightCount: availability.nightCount,
    roomCount,
    nightlyRate: room.nightlyRate,
    total: room.nightlyRate * availability.nightCount * roomCount,
    hasHighDemandPricing: room.hasHighDemandPricing,
  };
}
