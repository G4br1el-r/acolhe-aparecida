"use client";

import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import { SanctuaryMap } from "@/components/Modules/Home/MapaSection/SanctuaryMap";

type LocationMapProps = {
  accommodation: Accommodation;
};

function ignoreSelection() {}

export function LocationMap({ accommodation }: LocationMapProps) {
  return (
    <SanctuaryMap
      accommodations={[accommodation]}
      activeSlug={accommodation.slug}
      onActivate={ignoreSelection}
      onSelect={ignoreSelection}
    />
  );
}
