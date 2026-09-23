"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { useId } from "react";
import { cn } from "@/lib/utils";

type SwitchProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
  className?: string;
};

export function Switch({
  checked,
  onCheckedChange,
  label,
  description,
  disabled,
  className,
}: SwitchProps) {
  const labelId = useId();
  const descriptionId = useId();

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 py-2",
        disabled && "opacity-50",
        className,
      )}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() => onCheckedChange(!checked)}
        tabIndex={-1}
        className="flex min-w-0 cursor-pointer flex-col text-left disabled:cursor-not-allowed"
      >
        <span id={labelId} className="text-sm font-medium text-blue-950">
          {label}
        </span>
        {description && (
          <span id={descriptionId} className="mt-0.5 text-xs text-blue-950/55">
            {description}
          </span>
        )}
      </button>

      <SwitchPrimitive.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        aria-labelledby={labelId}
        aria-describedby={description ? descriptionId : undefined}
        className="relative h-7 w-12 shrink-0 cursor-pointer rounded-full bg-blue-950/20 p-1 transition-colors data-checked:bg-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 disabled:cursor-not-allowed"
      >
        <SwitchPrimitive.Thumb className="block h-5 w-5 rounded-full bg-white shadow-sm transition-transform data-checked:translate-x-5" />
      </SwitchPrimitive.Root>
    </div>
  );
}
