"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ChipProps = {
  label: string;
  isSelected: boolean;
  onToggle: () => void;
  icon?: LucideIcon;
  className?: string;
};

export function Chip({
  label,
  isSelected,
  onToggle,
  icon: Icon,
  className,
}: ChipProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isSelected}
      className={cn(
        "flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-offset-2",
        isSelected
          ? "bg-blue-900 text-white"
          : "bg-blue-50 text-blue-950 hover:bg-blue-100",
        className,
      )}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden />}
      {label}
    </button>
  );
}
