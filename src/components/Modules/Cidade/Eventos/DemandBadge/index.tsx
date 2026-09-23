import type { DemandLevel } from "@/@types/Modules/Cidade/city";
import { DEMAND_LEVELS } from "@/constants/Modules/Cidade/demand-levels";
import { cn } from "@/lib/utils";

type DemandBadgeProps = {
  level: DemandLevel;
  className?: string;
};

export function DemandBadge({ level, className }: DemandBadgeProps) {
  const info = DEMAND_LEVELS[level];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        info.toneClassName,
        className,
      )}
    >
      <span
        aria-hidden
        className={cn("h-1.5 w-1.5 rounded-full", info.dotClassName)}
      />
      {info.label}
    </span>
  );
}
