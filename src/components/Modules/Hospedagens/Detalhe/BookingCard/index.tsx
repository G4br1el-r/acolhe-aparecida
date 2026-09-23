"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import { BookingForm } from "../BookingForm";

const CARD_DURATION_IN_SECONDS = 0.55;
const CARD_DELAY_IN_SECONDS = 0.2;
const CARD_OFFSET_IN_PX = 20;

type BookingCardProps = {
  accommodation: Accommodation;
};

export function BookingCard({ accommodation }: BookingCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.aside
      aria-label="Reservar esta hospedagem"
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : CARD_OFFSET_IN_PX }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0 : CARD_DURATION_IN_SECONDS,
        delay: shouldReduceMotion ? 0 : CARD_DELAY_IN_SECONDS,
        ease: "easeOut",
      }}
      className="hidden rounded-3xl bg-white p-6 shadow-xl ring-1 ring-blue-950/10 lg:sticky lg:top-28 lg:block"
    >
      <BookingForm accommodation={accommodation} />
    </motion.aside>
  );
}
