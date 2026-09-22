"use client";

import { MapPin, Star } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import type { Accommodation } from "@/constants/Modules/Home/accommodations";
import { SaveButton } from "../SaveButton";
import { ShareButton } from "../ShareButton";

const HEADING_DURATION_IN_SECONDS = 0.5;
const HEADING_OFFSET_IN_PX = 14;
const HEADING_STAGGER_IN_SECONDS = 0.07;

type DetalheHeadingProps = {
  accommodation: Accommodation;
};

export function DetalheHeading({ accommodation }: DetalheHeadingProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : HEADING_STAGGER_IN_SECONDS,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : HEADING_OFFSET_IN_PX },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : HEADING_DURATION_IN_SECONDS,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
    >
      <div className="min-w-0">
        <motion.h1
          variants={itemVariants}
          className="text-2xl font-semibold tracking-tight text-blue-950 sm:text-3xl md:text-4xl"
        >
          {accommodation.name}
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-blue-950/70"
        >
          <span className="flex items-center gap-1.5 font-medium text-amber-700">
            <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
            {accommodation.rating.toFixed(1).replace(".", ",")}
            <span className="font-normal text-amber-700/70">
              ({accommodation.reviewCount} avaliações)
            </span>
          </span>

          <span aria-hidden className="text-blue-950/25">
            ·
          </span>

          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-blue-900/70" />
            {accommodation.distanceFromSanctuary}
          </span>

          <span aria-hidden className="text-blue-950/25">
            ·
          </span>

          <span>Aparecida, SP</span>
        </motion.div>
      </div>

      <motion.div
        variants={itemVariants}
        className="-ml-3 flex shrink-0 items-center gap-1 sm:ml-0"
      >
        <ShareButton title={accommodation.name} />
        <SaveButton accommodationName={accommodation.name} />
      </motion.div>
    </motion.div>
  );
}
