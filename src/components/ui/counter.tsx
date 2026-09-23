"use client";

import { Minus, Plus } from "lucide-react";

type CounterProps = {
  label: string;
  description?: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
};

export function Counter({
  label,
  description,
  value,
  min,
  max,
  onChange,
}: CounterProps) {
  const canDecrease = value > min;
  const canIncrease = value < max;

  const buttonClassName =
    "flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full ring-1 ring-blue-950/20 text-blue-950 transition-colors hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent";

  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="text-sm font-medium text-blue-950">{label}</p>
        {description && (
          <p className="text-xs text-blue-950/55">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(value - 1)}
          disabled={!canDecrease}
          aria-label={`Diminuir ${label.toLowerCase()}`}
          className={buttonClassName}
        >
          <Minus className="h-4 w-4" />
        </button>

        <span
          aria-live="polite"
          className="w-5 text-center text-sm font-semibold tabular-nums text-blue-950"
        >
          {value}
        </span>

        <button
          type="button"
          onClick={() => onChange(value + 1)}
          disabled={!canIncrease}
          aria-label={`Aumentar ${label.toLowerCase()}`}
          className={buttonClassName}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
