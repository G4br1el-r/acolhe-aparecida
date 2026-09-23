"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { Check } from "lucide-react";
import { type ReactNode, useId } from "react";
import { cn } from "@/lib/utils";

type CheckboxProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: ReactNode;
  description?: string;
  disabled?: boolean;
  className?: string;
};

export function Checkbox({
  checked,
  onCheckedChange,
  label,
  description,
  disabled,
  className,
}: CheckboxProps) {
  const labelId = useId();
  const descriptionId = useId();

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl py-1.5 text-sm text-blue-950",
        disabled && "opacity-50",
        className,
      )}
    >
      <CheckboxPrimitive.Root
        checked={checked}
        onCheckedChange={(next) => onCheckedChange(Boolean(next))}
        disabled={disabled}
        aria-labelledby={labelId}
        aria-describedby={description ? descriptionId : undefined}
        className="mt-0.5 flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-md ring-1 ring-blue-950/25 transition-colors data-checked:bg-blue-900 data-checked:ring-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 disabled:cursor-not-allowed"
      >
        <CheckboxPrimitive.Indicator className="flex text-white data-unchecked:hidden">
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      <button
        type="button"
        disabled={disabled}
        onClick={() => onCheckedChange(!checked)}
        tabIndex={-1}
        className="flex min-w-0 cursor-pointer flex-col text-left disabled:cursor-not-allowed"
      >
        <span id={labelId} className="leading-snug">
          {label}
        </span>
        {description && (
          <span id={descriptionId} className="mt-0.5 text-xs text-blue-950/55">
            {description}
          </span>
        )}
      </button>
    </div>
  );
}
