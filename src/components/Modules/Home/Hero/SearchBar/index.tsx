"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { DateField } from "./DateField";
import { GuestsField } from "./GuestsField";

export function SearchBar() {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>();

  return (
    <div className="relative z-20 flex w-full flex-col gap-0.5 rounded-3xl bg-white p-1.5 shadow-xl md:flex-row md:items-center md:gap-0 md:rounded-full">
      <div className="md:w-0 md:flex-[1.8]">
        <DateField
          label="Check-in"
          placeholder="Adicionar data"
          date={checkInDate}
          onSelectDate={setCheckInDate}
        />
      </div>

      <div className="hidden h-7 w-px bg-blue-950/10 md:block" />

      <div className="md:w-0 md:flex-[1.8]">
        <DateField
          label="Check-out"
          placeholder="Adicionar data"
          date={checkOutDate}
          onSelectDate={setCheckOutDate}
          disabledBefore={checkInDate}
        />
      </div>

      <div className="hidden h-7 w-px bg-blue-950/10 md:block" />

      <div className="md:flex-[2.5]">
        <GuestsField />
      </div>

      <button
        type="button"
        className="animate-cta-pulse flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#FF5F00] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#E65500] hover:shadow-lg active:scale-95"
      >
        Buscar hospedagem
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
