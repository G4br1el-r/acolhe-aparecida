"use client";

import { Star } from "lucide-react";
import { useId, useState } from "react";
import {
  MAX_SCORE,
  MIN_SCORE,
  SCORE_LABELS,
} from "@/constants/Modules/Viagem/review-form";
import { cn } from "@/lib/utils";

const SCORES = Array.from(
  { length: MAX_SCORE - MIN_SCORE + 1 },
  (_, index) => MIN_SCORE + index,
);
const NO_SCORE = 0;

type StarRatingProps = {
  name: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  error?: string;
  size?: "md" | "lg";
  className?: string;
};

export function StarRating({
  name,
  label,
  value,
  onChange,
  error,
  size = "md",
  className,
}: StarRatingProps) {
  const groupId = useId();
  const errorId = `${groupId}-erro`;
  const [hovered, setHovered] = useState(NO_SCORE);
  const highlighted = hovered || value;
  const isLarge = size === "lg";

  return (
    <fieldset
      aria-describedby={error ? errorId : undefined}
      aria-invalid={error ? true : undefined}
      className={cn("min-w-0", className)}
    >
      <div
        className={cn(
          "flex flex-wrap items-center justify-between gap-x-4 gap-y-1",
          isLarge && "flex-col items-start",
        )}
      >
        <legend
          className={cn(
            "float-left text-sm text-blue-950",
            isLarge ? "text-base font-semibold" : "font-medium",
          )}
        >
          {label}
        </legend>

        <div className="flex items-center gap-2">
          <div
            role="radiogroup"
            aria-label={label}
            className="-ml-1 flex"
            onMouseLeave={() => setHovered(NO_SCORE)}
          >
            {SCORES.map((score) => {
              const isFilled = score <= highlighted;

              return (
                <label
                  key={score}
                  onMouseEnter={() => setHovered(score)}
                  className={cn(
                    "relative flex cursor-pointer items-center justify-center rounded-full transition-colors focus-within:ring-2 focus-within:ring-blue-900 focus-within:ring-offset-2",
                    isLarge ? "h-12 w-12" : "h-11 w-11",
                  )}
                >
                  <input
                    type="radio"
                    name={name}
                    value={score}
                    checked={value === score}
                    onChange={() => onChange(score)}
                    aria-label={`${score} de ${MAX_SCORE}: ${SCORE_LABELS[score]}`}
                    className="peer sr-only"
                  />
                  <Star
                    aria-hidden
                    className={cn(
                      "transition-transform peer-focus-visible:scale-110",
                      isLarge ? "h-8 w-8" : "h-6 w-6",
                      isFilled
                        ? "fill-amber-500 text-amber-500"
                        : "text-blue-950/20",
                    )}
                  />
                </label>
              );
            })}
          </div>
          <span
            aria-live="polite"
            className={cn(
              "min-w-16 text-sm text-blue-950/60",
              isLarge && "text-base font-medium text-blue-950",
            )}
          >
            {highlighted ? SCORE_LABELS[highlighted] : ""}
          </span>
        </div>
      </div>

      {error && (
        <p id={errorId} role="alert" className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </fieldset>
  );
}
