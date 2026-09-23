"use client";

import { Accessibility, Footprints, Star } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ViewAllCard } from "@/components/Modules/Home/ViewAllCard";
import type { Accommodation } from "@/constants/Modules/Home/accommodations";

const ITEM_STAGGER_IN_SECONDS = 0.025;
const ITEM_DURATION_IN_SECONDS = 0.26;
const EXIT_DURATION_IN_SECONDS = 0.16;
const EXIT_SCALE = 0.96;
const ENTER_OFFSET_IN_PX = 10;
const ENTER_SCALE = 0.98;

type MapAccommodationListProps = {
  accommodations: Accommodation[];
  activeSlug: string | null;
  onActivate: (slug: string | null) => void;
  viewAllPreview?: Accommodation[];
  viewAllHref?: string;
};

export function MapAccommodationList({
  accommodations,
  activeSlug,
  onActivate,
  viewAllPreview,
  viewAllHref,
}: MapAccommodationListProps) {
  const shouldReduceMotion = useReducedMotion();

  if (accommodations.length === 0) {
    return (
      <div className="rounded-2xl bg-blue-50 p-6">
        <p className="text-sm font-semibold text-blue-950">
          Nenhuma hospedagem reúne todos esses critérios.
        </p>
        <p className="mt-1 text-sm text-blue-950/70">
          Remova um dos filtros para ver mais opções perto do Santuário.
        </p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4">
      <AnimatePresence mode="popLayout">
        {accommodations.map((accommodation, index) => {
          const isActive = activeSlug === accommodation.slug;

          return (
            <motion.li
              key={accommodation.slug}
              layout={!shouldReduceMotion}
              initial={
                shouldReduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: ENTER_OFFSET_IN_PX,
                      scale: ENTER_SCALE,
                    }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      scale: EXIT_SCALE,
                      transition: { duration: EXIT_DURATION_IN_SECONDS },
                    }
              }
              transition={{
                duration: shouldReduceMotion ? 0 : ITEM_DURATION_IN_SECONDS,
                delay: shouldReduceMotion ? 0 : index * ITEM_STAGGER_IN_SECONDS,
                ease: [0.16, 1, 0.3, 1],
              }}
              onMouseEnter={() => onActivate(accommodation.slug)}
              onMouseLeave={() => onActivate(null)}
            >
              <Link
                href={`/hospedagens/${accommodation.slug}`}
                onFocus={() => onActivate(accommodation.slug)}
                onBlur={() => onActivate(null)}
                className={`group relative flex h-full flex-col overflow-hidden rounded-2xl transition-shadow duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-offset-2 ${
                  isActive ? "shadow-md shadow-blue-950/10" : "hover:shadow-md"
                }`}
              >
                <div className="relative aspect-square w-full overflow-hidden bg-blue-100">
                  <Image
                    src={accommodation.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 22vw, 45vw"
                    className={`object-cover transition-transform duration-700 ease-out ${
                      isActive ? "scale-105" : "group-hover:scale-105"
                    }`}
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-blue-950/85 via-blue-950/20 to-transparent" />

                  <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
                    <span className="flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold text-blue-950 backdrop-blur-sm">
                      <Footprints className="h-3 w-3" />
                      {accommodation.walkingMinutes} min
                    </span>

                    {accommodation.isAccessible && (
                      <span
                        title="Quarto acessível"
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-blue-950 backdrop-blur-sm"
                      >
                        <Accessibility className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-3">
                    <p className="flex items-center gap-1 text-[10px] font-medium text-white/70">
                      <Star className="h-3 w-3 fill-current" />
                      {accommodation.rating.toFixed(1)}
                      <span className="opacity-60">
                        ({accommodation.reviewCount})
                      </span>
                    </p>

                    <p className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-white">
                      {accommodation.name}
                    </p>

                    <p className="mt-1.5 text-sm font-bold text-white">
                      R$ {accommodation.pricePerNight}
                      <span className="text-[11px] font-normal text-white/60">
                        {" "}
                        / noite
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            </motion.li>
          );
        })}
      </AnimatePresence>

      {viewAllPreview && viewAllHref && (
        <li className="aspect-square">
          <ViewAllCard
            previewAccommodations={viewAllPreview}
            href={viewAllHref}
          />
        </li>
      )}
    </ul>
  );
}
