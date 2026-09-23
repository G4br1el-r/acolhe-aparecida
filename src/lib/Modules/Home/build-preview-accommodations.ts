import type { Accommodation } from "@/constants/Modules/Home/accommodations";

export const MAX_PREVIEW_ACCOMMODATIONS = 15;

export function buildPreviewAccommodations(
  accommodations: Accommodation[],
  pinnedSlug: string | null,
): Accommodation[] {
  const preview = accommodations.slice(0, MAX_PREVIEW_ACCOMMODATIONS);

  if (!pinnedSlug) return preview;

  const isAlreadyVisible = preview.some(
    (accommodation) => accommodation.slug === pinnedSlug,
  );
  if (isAlreadyVisible) return preview;

  const pinned = accommodations.find(
    (accommodation) => accommodation.slug === pinnedSlug,
  );
  if (!pinned) return preview;

  return [pinned, ...preview.slice(0, MAX_PREVIEW_ACCOMMODATIONS - 1)];
}
