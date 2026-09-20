"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { DateField } from "./DateField";
import { GuestsField } from "./GuestsField";

export function SearchBar() {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>();

  return (
    <div className="flex w-full flex-col gap-2 rounded-3xl bg-white/95 p-2 shadow-xl backdrop-blur-sm md:flex-row md:items-center md:gap-0 md:rounded-full">
      <DateField
        label="Check-in"
        placeholder="Adicionar data"
        date={checkInDate}
        onSelectDate={setCheckInDate}
      />

      <div className="hidden h-7 w-px bg-blue-950/10 md:block" />

      <DateField
        label="Check-out"
        placeholder="Adicionar data"
        date={checkOutDate}
        onSelectDate={setCheckOutDate}
        disabledBefore={checkInDate}
      />

      <div className="hidden h-7 w-px bg-blue-950/10 md:block" />

      <GuestsField />

      <button
        type="button"
        className="animate-cta-pulse flex cursor-pointer items-center justify-center gap-2 rounded-full bg-blue-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-950 hover:shadow-lg active:scale-95"
      >
        Buscar hospedagem
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
