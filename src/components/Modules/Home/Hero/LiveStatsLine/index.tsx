"use client";

import { CalendarDays } from "lucide-react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import {
  NEXT_HIGH_DEMAND_EVENT,
  PLATFORM_STATS,
} from "@/constants/Modules/Home/platform-stats";

export function LiveStatsLine() {
  return (
    <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-3">
      <p className="text-sm text-blue-950/80">
        <strong className="font-semibold text-blue-950">
          <AnimatedNumber value={PLATFORM_STATS.accommodationCount} />
        </strong>{" "}
        hospedagens
        <span aria-hidden="true" className="mx-2 text-blue-950/30">
          ·
        </span>
        <strong className="font-semibold text-blue-950">
          <AnimatedNumber value={PLATFORM_STATS.reviewCount} />
        </strong>{" "}
        avaliações de hóspedes
        <span
          aria-hidden="true"
          className="mx-2 hidden text-blue-950/30 sm:inline"
        >
          ·
        </span>
        <span className="block sm:inline">reserva e pagamento aqui</span>
      </p>

      <span className="flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-blue-950 ring-1 ring-blue-950/10 backdrop-blur-sm">
        <CalendarDays className="h-3.5 w-3.5 text-blue-900" />
        {NEXT_HIGH_DEMAND_EVENT.name} · {NEXT_HIGH_DEMAND_EVENT.date} ·{" "}
        {NEXT_HIGH_DEMAND_EVENT.demandLabel}
      </span>
    </div>
  );
}
