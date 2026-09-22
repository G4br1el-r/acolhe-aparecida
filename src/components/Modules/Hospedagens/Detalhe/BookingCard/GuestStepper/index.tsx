"use client";

import { Minus, Plus } from "lucide-react";

const MIN_GUEST_COUNT = 1;

type GuestStepperProps = {
  guestCount: number;
  maxGuests: number;
  onChange: (guestCount: number) => void;
};

export function GuestStepper({
  guestCount,
  maxGuests,
  onChange,
}: GuestStepperProps) {
  const canDecrease = guestCount > MIN_GUEST_COUNT;
  const canIncrease = guestCount < maxGuests;

  const buttonClassName =
    "flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-blue-950/20 text-blue-950 transition-colors hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent";

  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
          Hóspedes
        </p>
        <p className="mt-0.5 text-sm text-blue-950">
          {guestCount} {guestCount === 1 ? "pessoa" : "pessoas"}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(guestCount - 1)}
          disabled={!canDecrease}
          aria-label="Remover um hóspede"
          className={buttonClassName}
        >
          <Minus className="h-4 w-4" />
        </button>

        <span
          aria-live="polite"
          className="w-4 text-center text-sm font-semibold text-blue-950"
        >
          {guestCount}
        </span>

        <button
          type="button"
          onClick={() => onChange(guestCount + 1)}
          disabled={!canIncrease}
          aria-label="Adicionar um hóspede"
          className={buttonClassName}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
