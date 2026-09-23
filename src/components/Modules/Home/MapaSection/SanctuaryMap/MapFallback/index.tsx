"use client";

import { Footprints } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import type { Accommodation } from "@/constants/Modules/Home/accommodations";

const ART_LEFT_IN_PERCENT = 45.0;
const ART_RIGHT_IN_PERCENT = 99.9;
const ART_TOP_IN_PERCENT = 6.0;
const ART_BOTTOM_IN_PERCENT = 99.0;

const ART_WIDTH_IN_PERCENT = ART_RIGHT_IN_PERCENT - ART_LEFT_IN_PERCENT;
const ART_HEIGHT_IN_PERCENT = ART_BOTTOM_IN_PERCENT - ART_TOP_IN_PERCENT;

const SCALE_X = 100 / ART_WIDTH_IN_PERCENT;
const SCALE_Y = 100 / ART_HEIGHT_IN_PERCENT;

const SANCTUARY_IN_ART = { x: 48, y: 51 };

const PIN_STAGGER_IN_SECONDS = 0.05;
const PIN_SPRING_STIFFNESS = 340;
const PIN_SPRING_DAMPING = 24;

type MapFallbackProps = {
  accommodations: Accommodation[];
  activeSlug: string | null;
  onActivate: (slug: string | null) => void;
  onSelect: (slug: string | null) => void;
};

export function MapFallback({
  accommodations,
  activeSlug,
  onActivate,
  onSelect,
}: MapFallbackProps) {
  const shouldReduceMotion = useReducedMotion();

  const sortedByDistance = [...accommodations].sort(
    (first, second) => first.walkingMinutes - second.walkingMinutes,
  );

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl bg-linear-to-b from-blue-50/60 to-white ring-1 ring-blue-950/10">
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
            alt="Mapa ilustrado de Aparecida com o Santuário Nacional ao centro"
            fill
            sizes="(min-width: 1024px) 180vw, 220vw"
            className="object-fill"
          />
        </div>
      </div>

      <MapMarker
        position={SANCTUARY_IN_ART}
        label="Santuário Nacional"
        isSanctuary
      />

      {sortedByDistance.map((accommodation, index) => {
        const isActive = activeSlug === accommodation.slug;

        return (
          <motion.button
            key={accommodation.slug}
            type="button"
            onMouseEnter={() => onActivate(accommodation.slug)}
            onMouseLeave={() => onActivate(null)}
            onFocus={() => onActivate(accommodation.slug)}
            onBlur={() => onActivate(null)}
            onClick={() => onSelect(accommodation.slug)}
            aria-label={`${accommodation.name}, ${accommodation.distanceFromSanctuary}, R$ ${accommodation.pricePerNight} por noite`}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-offset-2"
            style={{
              left: `${accommodation.mapPosition.x}%`,
              top: `${accommodation.mapPosition.y}%`,
              zIndex: isActive ? 40 : 20,
            }}
            initial={
              shouldReduceMotion
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.4, y: -10 }
            }
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              type: "spring",
              stiffness: PIN_SPRING_STIFFNESS,
              damping: PIN_SPRING_DAMPING,
              delay: shouldReduceMotion ? 0 : index * PIN_STAGGER_IN_SECONDS,
            }}
          >
            <motion.span
              animate={{ scale: isActive && !shouldReduceMotion ? 1.08 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 26 }}
              className={`flex items-center gap-1.5 rounded-full py-1.5 pl-2.5 pr-3 text-xs font-semibold shadow-lg ring-1 transition-colors ${
                isActive
                  ? "bg-blue-950 text-white ring-blue-950"
                  : "bg-white/95 text-blue-950 ring-blue-950/10 backdrop-blur-sm"
              }`}
            >
              {isActive && (
                <span className="flex items-center gap-1 text-[11px] font-medium text-white/80">
                  <Footprints className="h-3 w-3" />
                  {accommodation.walkingMinutes}min
                </span>
              )}
              R$ {accommodation.pricePerNight}
            </motion.span>
          </motion.button>
        );
      })}
    </div>
  );
}

type MapMarkerProps = {
  position: { x: number; y: number };
  label: string;
  isSanctuary?: boolean;
};

function MapMarker({ position, label, isSanctuary = false }: MapMarkerProps) {
  return (
    <div
      className="pointer-events-none absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
      style={{ left: `${position.x}%`, top: `${position.y}%`, zIndex: 30 }}
    >
      <span
        className={
          isSanctuary
            ? "h-4 w-4 rounded-full bg-blue-950 ring-4 ring-white"
            : "h-2 w-2 rounded-full bg-blue-900/60 ring-2 ring-white"
        }
      />
      <span
        className={
          isSanctuary
            ? "whitespace-nowrap rounded-full bg-blue-950 px-3 py-1 text-xs font-semibold text-white shadow-lg"
            : "whitespace-nowrap rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium text-blue-950/70 shadow-sm"
        }
      >
        {label}
      </span>
    </div>
  );
}
