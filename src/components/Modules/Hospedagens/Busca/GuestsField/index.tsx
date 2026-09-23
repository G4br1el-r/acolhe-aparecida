"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Counter } from "@/components/ui/counter";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { describeGuests } from "@/lib/Modules/Hospedagens/Busca/search-draft";
import { cn } from "@/lib/utils";
import type { SearchDraft } from "@/store/Modules/Hospedagens/Busca/use-search-store";

const MIN_ADULTS = 1;
const MAX_ADULTS = 40;
const MAX_CHILDREN = 12;
const MAX_SENIORS = 30;
const MIN_ROOMS = 1;
const MAX_ROOMS = 20;
const MAX_CHILD_AGE = 17;
const DEFAULT_CHILD_AGE = 6;
const GUESTS_PER_ROOM_HINT = 2;
const AGE_OPTIONS = Array.from(
  { length: MAX_CHILD_AGE + 1 },
  (_, value) => value,
);

type GuestsFieldProps = {
  draft: SearchDraft;
  onChange: (changes: Partial<SearchDraft>) => void;
  variant?: "hero" | "compact" | "card";
};

export function GuestsField({
  draft,
  onChange,
  variant = "hero",
}: GuestsFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isCard = variant === "card";

  function handleChildrenChange(children: number) {
    const childAges = Array.from(
      { length: children },
      (_, index) => draft.childAges[index] ?? DEFAULT_CHILD_AGE,
    );
    onChange({ children, childAges });
  }

  function handleChildAgeChange(index: number, age: number) {
    const childAges = [...draft.childAges];
    childAges[index] = age;
    onChange({ childAges });
  }

  const childSlots = Array.from({ length: draft.children }, (_, index) => ({
    id: `crianca-${index + 1}`,
    position: index + 1,
    age: draft.childAges[index] ?? DEFAULT_CHILD_AGE,
  }));
  const totalGuests = draft.adults + draft.children + draft.seniors;
  const suggestedRooms = Math.ceil(totalGuests / GUESTS_PER_ROOM_HINT);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        className={cn(
          "flex w-full cursor-pointer items-center justify-between gap-2 px-4 py-1.5 text-left outline-none transition-colors hover:bg-black/3 focus-visible:ring-2 focus-visible:ring-blue-600",
          isCard ? "rounded-b-xl" : "rounded-full",
        )}
      >
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
            Hóspedes
          </span>
          <span className="truncate text-sm text-blue-950">
            {describeGuests(draft)}
            {draft.needsAccessibility && (
              <span className="text-blue-950/60"> · acessível</span>
            )}
          </span>
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-blue-900/60 transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </PopoverTrigger>

      <PopoverContent
        className="w-[min(22rem,calc(100vw-1.5rem))] rounded-2xl p-4"
        side="bottom"
        align="end"
        collisionAvoidance={{ side: "flip", fallbackAxisSide: "none" }}
      >
        <div className="divide-y divide-blue-950/10">
          <Counter
            label="Adultos"
            description="A partir de 18 anos"
            value={draft.adults}
            min={MIN_ADULTS}
            max={MAX_ADULTS}
            onChange={(adults) => onChange({ adults })}
          />
          <Counter
            label="Crianças"
            description="Até 17 anos"
            value={draft.children}
            min={0}
            max={MAX_CHILDREN}
            onChange={handleChildrenChange}
          />

          {childSlots.length > 0 && (
            <div className="flex flex-wrap gap-2 py-3">
              {childSlots.map((slot) => (
                <label
                  key={slot.id}
                  className="flex flex-col gap-1 text-xs text-blue-950/60"
                >
                  Idade da criança {slot.position}
                  <select
                    value={slot.age}
                    onChange={(event) =>
                      handleChildAgeChange(
                        slot.position - 1,
                        Number(event.target.value),
                      )
                    }
                    className="h-9 cursor-pointer rounded-lg bg-white px-2 text-sm text-blue-950 ring-1 ring-blue-950/15 focus:outline-none focus:ring-2 focus:ring-blue-900"
                  >
                    {AGE_OPTIONS.map((value) => (
                      <option key={value} value={value}>
                        {value === 0 ? "Menos de 1 ano" : `${value} anos`}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
          )}

          <Counter
            label="Idosos"
            description="Ajuda a priorizar térreo e elevador"
            value={draft.seniors}
            min={0}
            max={MAX_SENIORS}
            onChange={(seniors) => onChange({ seniors })}
          />
          <Counter
            label="Quartos"
            description={
              suggestedRooms > draft.rooms
                ? `Sugestão: ${suggestedRooms} para ${totalGuests} pessoas`
                : undefined
            }
            value={draft.rooms}
            min={MIN_ROOMS}
            max={MAX_ROOMS}
            onChange={(rooms) => onChange({ rooms })}
          />
          <Switch
            label="Preciso de acessibilidade"
            description="Só hospedagens com quarto acessível verificado"
            checked={draft.needsAccessibility}
            onCheckedChange={(needsAccessibility) =>
              onChange({ needsAccessibility })
            }
            className="pt-3"
          />
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="mt-3 w-full cursor-pointer rounded-full bg-blue-950 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
        >
          Pronto
        </button>
      </PopoverContent>
    </Popover>
  );
}
