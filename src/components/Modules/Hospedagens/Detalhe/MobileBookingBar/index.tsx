"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Accommodation } from "@/constants/Modules/Home/accommodations";
import { formatCurrency } from "@/lib/Modules/Hospedagens/Detalhe/booking-price";

const BAR_DURATION_IN_SECONDS = 0.4;
const BAR_DELAY_IN_SECONDS = 0.5;
const BAR_OFFSET_IN_PX = 24;
const CTA_TAP_SCALE = 0.97;
const BOOKING_CARD_ELEMENT_ID = "card-reserva";

type MobileBookingBarProps = {
  accommodation: Accommodation;
};

export function MobileBookingBar({ accommodation }: MobileBookingBarProps) {
  const shouldReduceMotion = useReducedMotion();

  function handleScrollToBookingCard() {
    document.getElementById(BOOKING_CARD_ELEMENT_ID)?.scrollIntoView({
      behavior: shouldReduceMotion ? "auto" : "smooth",
      block: "center",
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : BAR_OFFSET_IN_PX }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0 : BAR_DURATION_IN_SECONDS,
        delay: shouldReduceMotion ? 0 : BAR_DELAY_IN_SECONDS,
        ease: "easeOut",
      }}
      className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-blue-950/10 bg-white/95 px-5 py-3.5 backdrop-blur-md lg:hidden"
    >
      <div className="min-w-0">
        <p className="truncate text-base font-semibold text-blue-950">
          {formatCurrency(accommodation.pricePerNight)}
          <span className="text-xs font-normal text-blue-950/60"> / noite</span>
        </p>
        <p className="truncate text-xs text-blue-950/60">
          {accommodation.distanceFromSanctuary}
        </p>
      </div>

      <motion.button
        type="button"
        onClick={handleScrollToBookingCard}
        whileTap={{ scale: shouldReduceMotion ? 1 : CTA_TAP_SCALE }}
        className="shrink-0 cursor-pointer rounded-xl bg-blue-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
      >
        Reservar
      </motion.button>
    </motion.div>
  );
}
