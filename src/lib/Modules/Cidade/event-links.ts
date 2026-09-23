import type { CityEvent, CityEventKind } from "@/@types/Modules/Cidade/city";
import { searchParamsToQueryString } from "@/schemas/Modules/Hospedagens/Busca/search-params";

export const BUS_PARKING_EVENT_KINDS: CityEventKind[] = ["romaria"];

type EventDates = Pick<CityEvent, "startDate" | "endDate">;

export function buildEventSearchHref(event: EventDates): string {
  const query = searchParamsToQueryString({
    checkin: event.startDate,
    checkout: event.endDate,
  });

  return `/hospedagens?${query}`;
}

export function buildEventBusParkingHref(event: EventDates): string {
  const query = searchParamsToQueryString({
    checkin: event.startDate,
    checkout: event.endDate,
    estacionamento: ["onibus"],
  });

  return `/hospedagens?${query}`;
}

export function suggestsBusParking(event: Pick<CityEvent, "kind">): boolean {
  return BUS_PARKING_EVENT_KINDS.includes(event.kind);
}
