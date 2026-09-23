"use client";

import Image from "next/image";
import type { GuidePlace } from "@/@types/Modules/Cidade/city";
import {
  projectMapPosition,
  SANCTUARY_MAP_POSITION,
} from "@/lib/Modules/Cidade/project-map-position";
import { cn } from "@/lib/utils";

const ART_LEFT_IN_PERCENT = 45.0;
const ART_RIGHT_IN_PERCENT = 99.9;
const ART_TOP_IN_PERCENT = 6.0;
const ART_BOTTOM_IN_PERCENT = 99.0;

const ART_WIDTH_IN_PERCENT = ART_RIGHT_IN_PERCENT - ART_LEFT_IN_PERCENT;
const ART_HEIGHT_IN_PERCENT = ART_BOTTOM_IN_PERCENT - ART_TOP_IN_PERCENT;

const SCALE_X = 100 / ART_WIDTH_IN_PERCENT;
const SCALE_Y = 100 / ART_HEIGHT_IN_PERCENT;

const ACTIVE_Z_INDEX = 40;
const SANCTUARY_Z_INDEX = 30;
const DEFAULT_Z_INDEX = 20;

type GuideMapProps = {
  places: GuidePlace[];
  activeId: string | null;
  onActivate: (placeId: string | null) => void;
  onSelect: (placeId: string) => void;
};

export function GuideMap({
  places,
  activeId,
  onActivate,
  onSelect,
}: GuideMapProps) {
  const markers = places.filter(
    (place) => place.distanceFromSanctuaryInMeters > 0,
  );

  return (
    <figure
      aria-label="Mapa ilustrado com os lugares do guia"
      className="relative aspect-4/3 w-full overflow-hidden rounded-3xl bg-linear-to-b from-blue-50/60 to-white ring-1 ring-blue-950/10"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute"
          style={{
            width: `${SCALE_X * 100}%`,
            height: `${SCALE_Y * 100}%`,
            left: `-${ART_LEFT_IN_PERCENT * SCALE_X}%`,
            top: `-${ART_TOP_IN_PERCENT * SCALE_Y}%`,
          }}
        >
          <Image
            src="/maps.png"
            alt=""
            fill
            sizes="(min-width: 1024px) 60vw, 220vw"
            className="object-fill"
          />
        </div>
      </div>

      <div
        className="pointer-events-none absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
        style={{
          left: `${SANCTUARY_MAP_POSITION.x}%`,
          top: `${SANCTUARY_MAP_POSITION.y}%`,
          zIndex: SANCTUARY_Z_INDEX,
        }}
      >
        <span className="h-4 w-4 rounded-full bg-blue-950 ring-4 ring-white" />
        <span className="whitespace-nowrap rounded-full bg-blue-950 px-3 py-1 text-xs font-semibold text-white shadow-lg">
          Santuário Nacional
        </span>
      </div>

      {markers.map((place) => {
        const position = projectMapPosition(place.coordinates);
        const isActive = activeId === place.id;

        return (
          <button
            key={place.id}
            type="button"
            onMouseEnter={() => onActivate(place.id)}
            onMouseLeave={() => onActivate(null)}
            onFocus={() => onActivate(place.id)}
            onBlur={() => onActivate(null)}
            onClick={() => onSelect(place.id)}
            aria-label={`${place.name}, ir para a descrição`}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center gap-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-offset-2"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              zIndex: isActive ? ACTIVE_Z_INDEX : DEFAULT_Z_INDEX,
            }}
          >
            <span
              className={cn(
                "h-2.5 w-2.5 rounded-full ring-2 ring-white transition-colors",
                isActive ? "bg-cta" : "bg-blue-900",
              )}
            />
            <span
              className={cn(
                "max-w-32 truncate rounded-full px-2 py-0.5 text-[11px] font-semibold shadow-sm ring-1 transition-colors",
                isActive
                  ? "bg-blue-950 text-white ring-blue-950"
                  : "bg-white/95 text-blue-950 ring-blue-950/10",
              )}
            >
              {place.name}
            </span>
          </button>
        );
      })}
    </figure>
  );
}
