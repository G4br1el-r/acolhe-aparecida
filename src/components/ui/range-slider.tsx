"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";

type RangeSliderProps = {
  value: [number, number];
  min: number;
  max: number;
  step: number;
  onValueChange: (value: [number, number]) => void;
  ariaLabels: [string, string];
  formatValue: (value: number) => string;
};

export function RangeSlider({
  value,
  min,
  max,
  step,
  onValueChange,
  ariaLabels,
  formatValue,
}: RangeSliderProps) {
  return (
    <SliderPrimitive.Root
      value={value}
      min={min}
      max={max}
      step={step}
      onValueChange={(next) => {
        if (Array.isArray(next) && next.length === 2) {
          onValueChange([next[0], next[1]]);
        }
      }}
      className="flex flex-col gap-3"
    >
      <div className="flex items-center justify-between text-sm font-semibold text-blue-950">
        <SliderPrimitive.Value>
          {(_, values) => (
            <>
              <span>{formatValue(values[0] ?? min)}</span>
              <span className="sr-only"> até </span>
            </>
          )}
        </SliderPrimitive.Value>
        <SliderPrimitive.Value>
          {(_, values) => <span>{formatValue(values[1] ?? max)}</span>}
        </SliderPrimitive.Value>
      </div>

      <SliderPrimitive.Control className="flex w-full touch-none items-center py-2 select-none">
        <SliderPrimitive.Track className="relative h-1.5 w-full rounded-full bg-blue-950/10">
          <SliderPrimitive.Indicator className="absolute h-full rounded-full bg-blue-900" />
          <SliderPrimitive.Thumb
            aria-label={ariaLabels[0]}
            className="h-6 w-6 rounded-full bg-white shadow-md ring-2 ring-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
          />
          <SliderPrimitive.Thumb
            aria-label={ariaLabels[1]}
            className="h-6 w-6 rounded-full bg-white shadow-md ring-2 ring-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
          />
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}
