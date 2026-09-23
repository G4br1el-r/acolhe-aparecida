"use client";

import {
  AdvancedMarker,
  APIProvider,
  Map as GoogleMap,
  useMap,
} from "@vis.gl/react-google-maps";
import { useEffect } from "react";
import type { Accommodation } from "@/constants/Modules/Home/accommodations";
import {
  ACTIVE_MARKER_Z_INDEX,
  APARECIDA_LANDMARKS,
  DEFAULT_MAP_ZOOM,
  DEFAULT_MARKER_Z_INDEX,
  GOOGLE_MAPS_API_KEY,
  GOOGLE_MAPS_MAP_ID,
  SANCTUARY_COORDINATES,
  SANCTUARY_MARKER_Z_INDEX,
} from "@/constants/Modules/Home/map";
import { MapFallback } from "./MapFallback";

type SanctuaryMapProps = {
  accommodations: Accommodation[];
  activeSlug: string | null;
  onActivate: (slug: string | null) => void;
  onSelect: (slug: string | null) => void;
};

export function SanctuaryMap({
  accommodations,
  activeSlug,
  onActivate,
  onSelect,
}: SanctuaryMapProps) {
  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <MapFallback
        accommodations={accommodations}
        activeSlug={activeSlug}
        onActivate={onActivate}
        onSelect={onSelect}
      />
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl ring-1 ring-blue-950/10">
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapId={GOOGLE_MAPS_MAP_ID}
          defaultCenter={SANCTUARY_COORDINATES}
          defaultZoom={DEFAULT_MAP_ZOOM}
          gestureHandling="cooperative"
          disableDefaultUI
          zoomControl
          className="h-full w-full"
        >
          <FitToAccommodations accommodations={accommodations} />

          <AdvancedMarker
            position={SANCTUARY_COORDINATES}
            zIndex={SANCTUARY_MARKER_Z_INDEX}
            title="Santuário Nacional de Aparecida"
          >
            <span className="flex flex-col items-center gap-1">
              <span className="h-3.5 w-3.5 rounded-full bg-blue-950 ring-4 ring-white" />
              <span className="whitespace-nowrap rounded-full bg-blue-950 px-2.5 py-1 text-[11px] font-semibold text-white shadow-md md:text-xs">
                Santuário Nacional
              </span>
            </span>
          </AdvancedMarker>

          {APARECIDA_LANDMARKS.map((landmark) => (
            <AdvancedMarker
              key={landmark.id}
              position={landmark.coordinates}
              zIndex={DEFAULT_MARKER_Z_INDEX}
              title={landmark.name}
            >
              <span className="flex flex-col items-center gap-0.5">
                <span className="h-2 w-2 rounded-full bg-blue-900/60 ring-2 ring-white" />
                <span className="whitespace-nowrap rounded-full bg-white/90 px-1.5 py-px text-[10px] font-medium text-blue-950/70 shadow-sm">
                  {landmark.name}
                </span>
              </span>
            </AdvancedMarker>
          ))}

          {accommodations.map((accommodation) => {
            const isActive = activeSlug === accommodation.slug;

            return (
              <AdvancedMarker
                key={accommodation.slug}
                position={accommodation.coordinates}
                zIndex={
                  isActive ? ACTIVE_MARKER_Z_INDEX : DEFAULT_MARKER_Z_INDEX
                }
                title={`${accommodation.name}, ${accommodation.distanceFromSanctuary}`}
                onMouseEnter={() => onActivate(accommodation.slug)}
                onMouseLeave={() => onActivate(null)}
                onClick={() => onSelect(accommodation.slug)}
              >
                <span
                  className={`block cursor-pointer rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-md ring-1 transition-colors md:text-xs ${
                    isActive
                      ? "bg-blue-950 text-white ring-blue-950"
                      : "bg-white text-blue-950 ring-blue-950/10"
                  }`}
                >
                  R$ {accommodation.pricePerNight}
                </span>
              </AdvancedMarker>
            );
          })}
        </GoogleMap>
      </APIProvider>
    </div>
  );
}

type FitToAccommodationsProps = {
  accommodations: Accommodation[];
};

function FitToAccommodations({ accommodations }: FitToAccommodationsProps) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    if (accommodations.length === 0) {
      map.panTo(SANCTUARY_COORDINATES);
      map.setZoom(DEFAULT_MAP_ZOOM);
      return;
    }

    const bounds = new google.maps.LatLngBounds();
    bounds.extend(SANCTUARY_COORDINATES);
    for (const accommodation of accommodations) {
      bounds.extend(accommodation.coordinates);
    }

    map.fitBounds(bounds, 64);
  }, [map, accommodations]);

  return null;
}
