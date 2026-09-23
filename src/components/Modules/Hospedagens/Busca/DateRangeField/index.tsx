"use client";

import { format, parseISO, startOfToday } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  demandLevelFor,
  toIsoDate,
} from "@/lib/Modules/Hospedagens/Busca/availability";
import { pluralize } from "@/lib/Modules/Hospedagens/format-date";
import { cn } from "@/lib/utils";

const DATE_LABEL_FORMAT = "dd MMM";
const DESKTOP_MONTH_COUNT = 2;
const MOBILE_MONTH_COUNT = 1;
const MILLISECONDS_IN_A_DAY = 86_400_000;

type DateRangeFieldProps = {
  checkIn: string | null;
  checkOut: string | null;
  onChange: (range: {
    checkIn: string | null;
    checkOut: string | null;
  }) => void;
  variant?: "hero" | "compact" | "card";
  isDesktop?: boolean;
};

function formatLabel(isoDate: string | null, placeholder: string): string {
  if (!isoDate) return placeholder;

  return format(parseISO(isoDate), DATE_LABEL_FORMAT, { locale: ptBR }).replace(
    ".",
    "",
  );
}

export function DateRangeField({
  checkIn,
  checkOut,
  onChange,
  variant = "hero",
  isDesktop = true,
}: DateRangeFieldProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selected: DateRange | undefined = checkIn
    ? { from: parseISO(checkIn), to: checkOut ? parseISO(checkOut) : undefined }
    : undefined;

  const nightCount =
    checkIn && checkOut
      ? Math.round(
          (parseISO(checkOut).getTime() - parseISO(checkIn).getTime()) /
            MILLISECONDS_IN_A_DAY,
        )
      : 0;

  function handleSelect(range: DateRange | undefined) {
    if (!range?.from) {
      onChange({ checkIn: null, checkOut: null });
      return;
    }

    const nextCheckIn = toIsoDate(range.from);
    const nextCheckOut =
      range.to && range.to.getTime() !== range.from.getTime()
        ? toIsoDate(range.to)
        : null;

    onChange({ checkIn: nextCheckIn, checkOut: nextCheckOut });

    if (nextCheckOut) setIsOpen(false);
  }

  const isCard = variant === "card";

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        className={cn(
          "flex w-full cursor-pointer items-center gap-0 text-left outline-none transition-colors hover:bg-black/3 focus-visible:ring-2 focus-visible:ring-blue-600",
          isCard ? "rounded-t-xl" : "rounded-full",
        )}
        aria-label={
          checkIn && checkOut
            ? `Datas: ${formatLabel(checkIn, "")} a ${formatLabel(checkOut, "")}, ${pluralize(nightCount, "noite", "noites")}`
            : "Escolher datas de check-in e check-out"
        }
      >
        <span className="flex w-1/2 flex-col gap-0.5 px-4 py-1.5">
          <span className="truncate text-xs font-semibold uppercase tracking-wide text-blue-900/60">
            Check-in
          </span>
          <span
            className={cn(
              "truncate text-sm",
              checkIn ? "text-blue-950" : "text-blue-950/50",
            )}
          >
            {formatLabel(checkIn, "Escolher")}
          </span>
        </span>
        <span aria-hidden className="h-7 w-px bg-blue-950/10" />
        <span className="flex w-1/2 flex-col gap-0.5 px-4 py-1.5">
          <span className="truncate text-xs font-semibold uppercase tracking-wide text-blue-900/60">
            Check-out
          </span>
          <span
            className={cn(
              "truncate text-sm",
              checkOut ? "text-blue-950" : "text-blue-950/50",
            )}
          >
            {formatLabel(checkOut, checkIn ? "Até quando?" : "Escolher")}
          </span>
        </span>
      </PopoverTrigger>

      <PopoverContent
        className="w-auto max-w-[calc(100vw-1.5rem)] rounded-2xl p-2"
        side="bottom"
        align="start"
        collisionAvoidance={{ side: "flip", fallbackAxisSide: "none" }}
      >
        <Calendar
          mode="range"
          selected={selected}
          onSelect={handleSelect}
          defaultMonth={selected?.from ?? startOfToday()}
          numberOfMonths={isDesktop ? DESKTOP_MONTH_COUNT : MOBILE_MONTH_COUNT}
          locale={ptBR}
          disabled={{ before: startOfToday() }}
          modifiers={{
            highDemand: (date) => demandLevelFor(toIsoDate(date)) !== "normal",
          }}
          modifiersClassNames={{
            highDemand:
              "[&>button]:font-semibold [&>button]:underline [&>button]:decoration-cta [&>button]:decoration-2 [&>button]:underline-offset-4",
          }}
          classNames={{
            range_start:
              "relative isolate z-0 rounded-l-(--cell-radius) bg-blue-50 after:absolute after:inset-y-0 after:right-0 after:w-4 after:bg-blue-50",
            range_end:
              "relative isolate z-0 rounded-r-(--cell-radius) bg-blue-50 after:absolute after:inset-y-0 after:left-0 after:w-4 after:bg-blue-50",
            range_middle: "rounded-none bg-blue-50",
          }}
        />

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-blue-950/10 px-2 pt-3 pb-1 text-xs text-blue-950/60">
          <span className="flex items-center gap-1.5">
            <span
              aria-hidden
              className="inline-block h-0.5 w-4 rounded-full bg-cta"
            />
            Datas de alta procura
          </span>
          {nightCount > 0 && (
            <span className="font-semibold text-blue-950">
              {pluralize(nightCount, "noite", "noites")}
            </span>
          )}
          {checkIn && (
            <button
              type="button"
              onClick={() => onChange({ checkIn: null, checkOut: null })}
              className="cursor-pointer font-medium text-blue-900 underline-offset-4 hover:underline"
            >
              Limpar datas
            </button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
