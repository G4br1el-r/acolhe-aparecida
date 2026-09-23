import type {
  CityEvent,
  GuidePlace,
  GuidePlaceCategory,
} from "@/@types/Modules/Cidade/city";
import { delay, FAST_LATENCY_IN_MS } from "@/mocks/latency";
import { CITY_EVENTS } from "@/mocks/Modules/Cidade/events";
import { GUIDE_PLACES } from "@/mocks/Modules/Cidade/guide";

export async function fetchUpcomingEvents(
  today: string = new Date().toISOString().slice(0, 10),
): Promise<CityEvent[]> {
  await delay(FAST_LATENCY_IN_MS);

  return CITY_EVENTS.filter((event) => event.endDate >= today).sort(
    (first, second) => first.startDate.localeCompare(second.startDate),
  );
}

export async function fetchEvent(eventId: string): Promise<CityEvent | null> {
  await delay(FAST_LATENCY_IN_MS);

  return CITY_EVENTS.find((event) => event.id === eventId) ?? null;
}

export async function fetchGuidePlaces(
  category?: GuidePlaceCategory,
): Promise<GuidePlace[]> {
  await delay(FAST_LATENCY_IN_MS);

  const places = category
    ? GUIDE_PLACES.filter((place) => place.category === category)
    : GUIDE_PLACES;

  return [...places].sort(
    (first, second) =>
      first.distanceFromSanctuaryInMeters -
      second.distanceFromSanctuaryInMeters,
  );
}

export async function fetchGuidePlacesByIds(
  ids: string[],
): Promise<GuidePlace[]> {
  await delay(FAST_LATENCY_IN_MS);

  return ids
    .map((id) => GUIDE_PLACES.find((place) => place.id === id))
    .filter((place): place is GuidePlace => Boolean(place));
}
