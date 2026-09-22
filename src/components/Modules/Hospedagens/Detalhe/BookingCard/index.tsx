"use client";

import { addDays } from "date-fns";
import { CalendarClock, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { DateField } from "@/components/Modules/Home/Hero/SearchBar/DateField";
import type { Accommodation } from "@/constants/Modules/Home/accommodations";
import {
  FREE_CANCELLATION_DAYS,
  INSTALLMENT_COUNT,
} from "@/constants/Modules/Hospedagens/Detalhe/details";
import {
  buildPriceBreakdown,
  countNights,
  formatCurrency,
} from "@/lib/Modules/Hospedagens/Detalhe/booking-price";
import { GuestStepper } from "./GuestStepper";

const CARD_DURATION_IN_SECONDS = 0.55;
const CARD_DELAY_IN_SECONDS = 0.2;
const CARD_OFFSET_IN_PX = 20;
const CTA_TAP_SCALE = 0.98;
const DEFAULT_CHECK_IN_OFFSET_IN_DAYS = 30;
const DEFAULT_STAY_IN_NIGHTS = 2;
const INITIAL_GUEST_COUNT = 2;
const MIN_CHECKOUT_OFFSET_IN_DAYS = 1;

type BookingCardProps = {
  accommodation: Accommodation;
};

export function BookingCard({ accommodation }: BookingCardProps) {
  const shouldReduceMotion = useReducedMotion();

  const [checkIn, setCheckIn] = useState<Date | undefined>(() =>
    addDays(new Date(), DEFAULT_CHECK_IN_OFFSET_IN_DAYS),
  );
  const [checkOut, setCheckOut] = useState<Date | undefined>(() =>
    addDays(
      new Date(),
      DEFAULT_CHECK_IN_OFFSET_IN_DAYS + DEFAULT_STAY_IN_NIGHTS,
    ),
  );
  const [guestCount, setGuestCount] = useState(
    Math.min(INITIAL_GUEST_COUNT, accommodation.maxGuests),
  );

  const nightCount = countNights(checkIn, checkOut);
  const hasValidStay = nightCount > 0;

  const price = buildPriceBreakdown(
    accommodation.pricePerNight,
    nightCount,
    INSTALLMENT_COUNT,
  );

  function handleSelectCheckIn(date: Date | undefined) {
    setCheckIn(date);

    if (date && checkOut && checkOut <= date) {
      setCheckOut(addDays(date, MIN_CHECKOUT_OFFSET_IN_DAYS));
    }
  }

  function handleReserve() {
    if (!hasValidStay) {
      toast.error("Escolha as datas da estadia");
      return;
    }

    toast.success("Reserva iniciada", {
      description: `${nightCount} ${nightCount === 1 ? "noite" : "noites"} para ${guestCount} ${guestCount === 1 ? "pessoa" : "pessoas"}`,
    });
  }

  const priceRows = [
    {
      label: `${formatCurrency(price.nightlyRate)} x ${price.nightCount} ${price.nightCount === 1 ? "noite" : "noites"}`,
      value: formatCurrency(price.subtotal),
    },
    { label: "Taxa de serviço", value: formatCurrency(price.serviceFee) },
  ];

  return (
    <motion.aside
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : CARD_OFFSET_IN_PX }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0 : CARD_DURATION_IN_SECONDS,
        delay: shouldReduceMotion ? 0 : CARD_DELAY_IN_SECONDS,
        ease: "easeOut",
      }}
      className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-blue-950/10 lg:sticky lg:top-28"
    >
      <p className="text-2xl font-semibold text-blue-950">
        {formatCurrency(accommodation.pricePerNight)}
        <span className="text-base font-normal text-blue-950/60"> / noite</span>
      </p>

      <div className="mt-5 divide-y divide-blue-950/10 rounded-xl ring-1 ring-blue-950/15">
        <div className="grid grid-cols-2 divide-x divide-blue-950/10">
          <DateField
            label="Check-in"
            placeholder="Escolher"
            date={checkIn}
            onSelectDate={handleSelectCheckIn}
            disabledBefore={new Date()}
          />
          <DateField
            label="Check-out"
            placeholder="Escolher"
            date={checkOut}
            onSelectDate={setCheckOut}
            disabledBefore={
              checkIn
                ? addDays(checkIn, MIN_CHECKOUT_OFFSET_IN_DAYS)
                : new Date()
            }
          />
        </div>

        <GuestStepper
          guestCount={guestCount}
          maxGuests={accommodation.maxGuests}
          onChange={setGuestCount}
        />
      </div>

      <motion.button
        type="button"
        onClick={handleReserve}
        whileTap={{ scale: shouldReduceMotion ? 1 : CTA_TAP_SCALE }}
        className="mt-5 w-full cursor-pointer rounded-xl bg-blue-950 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
      >
        Reservar
      </motion.button>

      {hasValidStay ? (
        <dl className="mt-6 space-y-3 border-t border-blue-950/10 pt-5 text-sm">
          {priceRows.map((row) => (
            <div key={row.label} className="flex justify-between gap-4">
              <dt className="text-blue-950/70">{row.label}</dt>
              <dd className="shrink-0 text-blue-950">{row.value}</dd>
            </div>
          ))}

          <div className="flex justify-between gap-4 border-t border-blue-950/10 pt-3 text-base font-semibold text-blue-950">
            <dt>Total da estadia</dt>
            <dd>{formatCurrency(price.total)}</dd>
          </div>

          <div className="flex justify-between gap-4 text-xs text-blue-950/60">
            <dt>Em até {price.installmentCount}x</dt>
            <dd>{formatCurrency(price.installmentValue)} sem juros</dd>
          </div>

          <div className="flex justify-between gap-4 rounded-xl bg-blue-50 px-3 py-2.5 text-xs">
            <dt className="font-medium text-blue-950">Você paga agora</dt>
            <dd className="font-semibold text-blue-950">
              {formatCurrency(price.dueNow)}
            </dd>
          </div>
        </dl>
      ) : (
        <p className="mt-6 border-t border-blue-950/10 pt-5 text-sm text-blue-950/60">
          Escolha as datas para ver o valor total da estadia.
        </p>
      )}

      <p className="mt-5 flex items-start gap-2 text-xs text-blue-950/60">
        <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-blue-900/70" />
        Cancelamento gratuito até {FREE_CANCELLATION_DAYS} dias antes do
        check-in
      </p>

      <p className="mt-2.5 flex items-start gap-2 text-xs text-blue-950/60">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
        Reserva e pagamento dentro da plataforma
      </p>
    </motion.aside>
  );
}
