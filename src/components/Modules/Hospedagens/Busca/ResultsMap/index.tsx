"use client";

import { SanctuaryMap } from "@/components/Modules/Home/MapaSection/SanctuaryMap";
import type { SearchResult } from "@/lib/Modules/Hospedagens/Busca/filter-accommodations";

const MAX_MAP_PINS = 24;

type ResultsMapProps = {
  results: SearchResult[];
  activeSlug: string | null;
  onActivate: (slug: string | null) => void;
  onSelect: (slug: string | null) => void;
  className?: string;
};

export function ResultsMap({
  results,
  activeSlug,
  onActivate,
  onSelect,
  className,
}: ResultsMapProps) {
  const accommodations = results
    .filter((result) => result.availability.isAvailable)
    .slice(0, MAX_MAP_PINS)
    .map((result) => ({
      ...result.accommodation,
      pricePerNight: result.nightlyRate,
    }));

  return (
    <div className={className}>
      <SanctuaryMap
        accommodations={accommodations}
        activeSlug={activeSlug}
        onActivate={onActivate}
        onSelect={onSelect}
      />
    </div>
  );
}
