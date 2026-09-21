"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const DATE_LABEL_FORMAT = "dd 'de' MMMM";

type DateFieldProps = {
  label: string;
  placeholder: string;
  date: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
  disabledBefore?: Date;
};

export function DateField({
  label,
  placeholder,
  date,
  onSelectDate,
  disabledBefore,
}: DateFieldProps) {
  return (
    <Popover>
      <PopoverTrigger className="flex w-full cursor-pointer flex-col gap-0.5 rounded-full px-4 py-2 text-left outline-none transition-colors hover:bg-black/3 focus-visible:ring-2 focus-visible:ring-blue-600">
        <span className="truncate text-xs font-semibold uppercase tracking-wide text-blue-900/60">
          {label}
        </span>
        <span
          className={`truncate text-sm ${
            date ? "text-blue-950" : "text-blue-950/50"
          }`}
        >
          {date
            ? format(date, DATE_LABEL_FORMAT, { locale: ptBR })
            : placeholder}
        </span>
      </PopoverTrigger>

      <PopoverContent
        className="w-auto p-0"
        side="bottom"
        align="start"
        collisionAvoidance={{ side: "none", fallbackAxisSide: "none" }}
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelectDate}
          locale={ptBR}
          disabled={disabledBefore ? { before: disabledBefore } : undefined}
        />
      </PopoverContent>
    </Popover>
  );
}
