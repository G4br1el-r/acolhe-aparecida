"use client";

import { useRef, useState } from "react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { ACCOMMODATIONS } from "@/constants/Modules/Home/accommodations";
import { useMapPinScroll } from "@/hooks/Modules/Home/use-map-pin-scroll";
import { buildPreviewAccommodations } from "@/lib/Modules/Home/build-preview-accommodations";
import { filterAccommodationsByProfiles } from "@/lib/Modules/Home/filter-accommodations";
import { selectMapPins } from "@/lib/Modules/Home/select-map-pins";
import { useTravelerProfileStore } from "@/store/Modules/Home/use-traveler-profile-store";
import { MapAccommodationList } from "./MapAccommodationList";
import { ProfileFilterBar } from "./ProfileFilterBar";
import { SanctuaryMap } from "./SanctuaryMap";

export function MapaSection() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [pinnedSlug, setPinnedSlug] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selectedProfileIds = useTravelerProfileStore(
    (state) => state.selectedProfileIds,
  );

  const visibleAccommodations = filterAccommodationsByProfiles(
    ACCOMMODATIONS,
    selectedProfileIds,
  );

  const activeSlug = hoveredSlug ?? pinnedSlug;
  const hasSelection = selectedProfileIds.length > 0;

  const previewAccommodations = buildPreviewAccommodations(
    visibleAccommodations,
    pinnedSlug,
  );
  const previewSlugs = new Set(
    previewAccommodations.map((accommodation) => accommodation.slug),
  );
  const hiddenAccommodations = visibleAccommodations.filter(
    (accommodation) => !previewSlugs.has(accommodation.slug),
  );
  const mapPins = selectMapPins(visibleAccommodations, pinnedSlug);

  useMapPinScroll({
    sectionRef,
    stageRef,
    listRef,
    dependencies: [previewAccommodations.length, hiddenAccommodations.length],
  });

  return (
    <section ref={sectionRef} className="bg-white px-6 py-16 md:px-10 md:py-24">
      <Reveal trigger="inView" className="mx-auto max-w-7xl">
        <RevealGroup className="max-w-2xl">
          <RevealItem>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
              Onde você vai ficar
            </p>
          </RevealItem>

          <RevealItem className="mt-3">
            <h2 className="text-4xl font-bold leading-[1.05] text-blue-950 md:text-5xl">
              Tudo se mede a partir do Santuário.
            </h2>
          </RevealItem>
        </RevealGroup>

        <RevealItem className="mt-8">
          <ProfileFilterBar />
        </RevealItem>

        <RevealItem className="mt-6">
          <p aria-live="polite" className="text-sm text-blue-950/70">
            <AnimatedNumber
              key={visibleAccommodations.length}
              value={visibleAccommodations.length}
              className="text-2xl font-bold text-blue-950"
            />{" "}
            {visibleAccommodations.length === 1 ? "hospedagem" : "hospedagens"}{" "}
            {hasSelection ? "para o seu perfil" : "a poucos minutos a pé"}
          </p>
        </RevealItem>

        <div
          ref={stageRef}
          className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-8"
        >
          <div className="lg:min-h-0">
            <div className="aspect-square w-full lg:max-h-[calc(100vh-9rem)]">
              <SanctuaryMap
                accommodations={mapPins}
                activeSlug={activeSlug}
                onActivate={setHoveredSlug}
                onSelect={setPinnedSlug}
              />
            </div>
          </div>

          <div className="lg:relative lg:h-full lg:overflow-hidden">
            <div
              ref={listRef}
              className="lg:absolute lg:inset-x-0 lg:top-0 lg:will-change-transform"
            >
              <MapAccommodationList
                accommodations={previewAccommodations}
                activeSlug={activeSlug}
                onActivate={setHoveredSlug}
                viewAllPreview={hiddenAccommodations}
                viewAllHref="/hospedagens"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
