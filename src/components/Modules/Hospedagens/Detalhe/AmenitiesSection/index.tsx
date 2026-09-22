"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import {
  DETAIL_AMENITIES,
  VISIBLE_AMENITIES_COUNT,
} from "@/constants/Modules/Hospedagens/Detalhe/details";
import { DetailSection } from "../DetailSection";

const EXPAND_DURATION_IN_SECONDS = 0.35;
const ITEM_STAGGER_IN_SECONDS = 0.04;
const ITEM_OFFSET_IN_PX = 8;

export function AmenitiesSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const visibleAmenities = DETAIL_AMENITIES.slice(0, VISIBLE_AMENITIES_COUNT);
  const hiddenAmenities = DETAIL_AMENITIES.slice(VISIBLE_AMENITIES_COUNT);

  return (
    <DetailSection title="O que esta hospedagem oferece">
      <ul className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
        {visibleAmenities.map((amenity) => (
          <li
            key={amenity.label}
            className="flex items-center gap-3 text-sm text-blue-950/80"
          >
            <amenity.icon className="h-5 w-5 shrink-0 text-blue-900/70" />
            {amenity.label}
          </li>
        ))}
      </ul>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : EXPAND_DURATION_IN_SECONDS,
              ease: "easeOut",
            }}
            className="grid grid-cols-1 gap-x-8 overflow-hidden sm:grid-cols-2"
          >
            {hiddenAmenities.map((amenity, index) => (
              <motion.li
                key={amenity.label}
                initial={{
                  opacity: 0,
                  y: shouldReduceMotion ? 0 : ITEM_OFFSET_IN_PX,
                }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: shouldReduceMotion
                    ? 0
                    : index * ITEM_STAGGER_IN_SECONDS,
                }}
                className="flex items-center gap-3 pt-4 text-sm text-blue-950/80"
              >
                <amenity.icon className="h-5 w-5 shrink-0 text-blue-900/70" />
                {amenity.label}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {hiddenAmenities.length > 0 && (
        <button
          type="button"
          onClick={() => setIsExpanded((current) => !current)}
          aria-expanded={isExpanded}
          className="mt-6 cursor-pointer rounded-xl border border-blue-950/15 px-5 py-2.5 text-sm font-semibold text-blue-950 transition-colors hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
        >
          {isExpanded
            ? "Mostrar menos"
            : `Mostrar todas as ${DETAIL_AMENITIES.length} comodidades`}
        </button>
      )}
    </DetailSection>
  );
}
