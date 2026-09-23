"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import { Sheet } from "@/components/ui/sheet";
import { useBookingQuote } from "@/hooks/Modules/Hospedagens/Detalhe/use-booking-quote";
import {
  formatStayRange,
  pluralize,
} from "@/lib/Modules/Hospedagens/format-date";
import { formatCurrency } from "@/lib/Modules/Reserva/Checkout/price-summary";
import { BookingForm } from "../BookingForm";

const BAR_DURATION_IN_SECONDS = 0.4;
const BAR_DELAY_IN_SECONDS = 0.5;
const BAR_OFFSET_IN_PX = 24;
const CTA_TAP_SCALE = 0.97;

type MobileBookingBarProps = {
  accommodation: Accommodation;
};

export function MobileBookingBar({ accommodation }: MobileBookingBarProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const { draft, summary, selectedRoom, hasDates, availability } =
    useBookingQuote(accommodation);

  const isUnavailable = hasDates && !availability.isAvailable;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : BAR_OFFSET_IN_PX }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: shouldReduceMotion ? 0 : BAR_DURATION_IN_SECONDS,
          delay: shouldReduceMotion ? 0 : BAR_DELAY_IN_SECONDS,
          ease: "easeOut",
        }}
        className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-blue-950/10 bg-white/95 px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden"
      >
        <div className="min-w-0">
          {summary ? (
            <>
              <p className="truncate text-base font-semibold text-blue-950">
                {formatCurrency(summary.total)}
                <span className="text-xs font-normal text-blue-950/60">
                  {" "}
                  total
                </span>
              </p>
              <p className="truncate text-xs text-blue-950/60">
                {draft.checkIn && draft.checkOut
                  ? formatStayRange(draft.checkIn, draft.checkOut)
                  : ""}{" "}
                · {pluralize(summary.nightCount, "noite", "noites")}
              </p>
            </>
          ) : (
            <>
              <p className="truncate text-base font-semibold text-blue-950">
                {formatCurrency(
                  selectedRoom?.nightlyRate ?? accommodation.pricePerNight,
                )}
                <span className="text-xs font-normal text-blue-950/60">
                  {" "}
                  / noite
                </span>
              </p>
              <p className="truncate text-xs text-blue-950/60">
                {isUnavailable
                  ? "Sem vaga nessas datas"
                  : accommodation.distanceFromSanctuary}
              </p>
            </>
          )}
        </div>

        <motion.button
          type="button"
          onClick={() => setIsOpen(true)}
          whileTap={{ scale: shouldReduceMotion ? 1 : CTA_TAP_SCALE }}
          className="shrink-0 cursor-pointer rounded-full bg-cta px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-cta-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
        >
          {hasDates ? "Reservar" : "Ver datas"}
        </motion.button>
      </motion.div>

      <Sheet
        open={isOpen}
        onOpenChange={setIsOpen}
        side="bottom"
        title={accommodation.name}
        description={accommodation.distanceFromSanctuary}
      >
        <BookingForm
          accommodation={accommodation}
          onNavigate={() => setIsOpen(false)}
        />
      </Sheet>
    </>
  );
}
