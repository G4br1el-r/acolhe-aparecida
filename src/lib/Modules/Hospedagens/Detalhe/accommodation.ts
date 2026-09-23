import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import { ACCOMMODATIONS } from "@/mocks/Modules/Hospedagens/accommodations";

export function findAccommodationBySlug(
  slug: string,
): Accommodation | undefined {
  return ACCOMMODATIONS.find((accommodation) => accommodation.slug === slug);
}

export function getAllAccommodationSlugs(): string[] {
  return ACCOMMODATIONS.map((accommodation) => accommodation.slug);
}
