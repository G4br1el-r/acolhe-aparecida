import {
  ACCOMMODATIONS,
  type Accommodation,
  MAP_HIGHLIGHT_ACCOMMODATION,
} from "@/constants/Modules/Home/accommodations";

const ALL_ACCOMMODATIONS: readonly Accommodation[] = [
  ...ACCOMMODATIONS,
  MAP_HIGHLIGHT_ACCOMMODATION,
];

export function findAccommodationBySlug(
  slug: string,
): Accommodation | undefined {
  return ALL_ACCOMMODATIONS.find(
    (accommodation) => accommodation.slug === slug,
  );
}

export function getAllAccommodationSlugs(): string[] {
  return ALL_ACCOMMODATIONS.map((accommodation) => accommodation.slug);
}
