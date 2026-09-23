import type { Accommodation } from "@/constants/Modules/Home/accommodations";

export const MAX_MAP_PINS = 11;

export function selectMapPins(
  accommodations: Accommodation[],
  pinnedSlug: string | null,
): Accommodation[] {
  const closestFirst = [...accommodations].sort(
    (first, second) => first.walkingMinutes - second.walkingMinutes,
  );
  const pins = closestFirst.slice(0, MAX_MAP_PINS);

  if (!pinnedSlug) return pins;

  const isAlreadyVisible = pins.some(
    (accommodation) => accommodation.slug === pinnedSlug,
  );
  if (isAlreadyVisible) return pins;

  const pinned = closestFirst.find(
    (accommodation) => accommodation.slug === pinnedSlug,
  );
  if (!pinned) return pins;

  return [pinned, ...pins.slice(0, MAX_MAP_PINS - 1)];
}
