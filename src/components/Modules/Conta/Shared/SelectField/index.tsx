"use client";

import { ChevronDown } from "lucide-react";
import { type ComponentProps, forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

type SelectOption = {
  value: string;
  label: string;
};

type SelectFieldProps = Omit<ComponentProps<"select">, "id"> & {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  hint?: string;
  error?: string;
  id?: string;
};

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  function SelectField(
    { label, options, placeholder, hint, error, className, id, ...props },
    ref,
  ) {
    const generatedId = useId();
    const selectId = id ?? generatedId;
    const hintId = `${selectId}-hint`;
    const errorId = `${selectId}-error`;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={selectId} className="text-sm font-medium text-blue-950">
          {label}
        </label>

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : hint ? hintId : undefined}
            className={cn(
              "h-12 w-full cursor-pointer appearance-none rounded-xl bg-white pr-11 pl-4 text-base text-blue-950 ring-1 ring-blue-950/15 transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-900 disabled:bg-blue-50 disabled:text-blue-950/50 aria-invalid:ring-2 aria-invalid:ring-red-500",
              className,
            )}
            {...props}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-blue-950/50"
          />
        </div>

        {error ? (
          <p id={errorId} role="alert" className="text-sm text-red-600">
            {error}
          </p>
        ) : hint ? (
          <p id={hintId} className="text-xs text-blue-950/55">
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);
