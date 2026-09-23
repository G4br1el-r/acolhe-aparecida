"use client";

import { Bus, ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import type { CityEvent } from "@/@types/Modules/Cidade/city";
import { DemandBadge } from "@/components/Modules/Cidade/Eventos/DemandBadge";
import { BrandLink } from "@/components/ui/brand-button";
import { DEMAND_LEVELS } from "@/constants/Modules/Cidade/demand-levels";
import { EVENT_KIND_LABELS } from "@/constants/Modules/Cidade/event-kinds";
import {
  buildEventBusParkingHref,
  buildEventSearchHref,
  suggestsBusParking,
} from "@/lib/Modules/Cidade/event-links";
import {
  formatStayRange,
  pluralize,
} from "@/lib/Modules/Hospedagens/format-date";

const TIPS_DURATION_IN_SECONDS = 0.25;

type EventCardProps = {
  event: CityEvent;
};

export function EventCard({ event }: EventCardProps) {
  const [isTipsOpen, setIsTipsOpen] = useState(false);
  const tipsId = useId();
  const shouldReduceMotion = useReducedMotion();
  const hasTips = event.tips.length > 0;

  return (
    <article className="py-8 first:pt-0 last:pb-0">
      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-blue-950/55">
        <span>{EVENT_KIND_LABELS[event.kind]}</span>
        <span aria-hidden>·</span>
        <time dateTime={event.startDate}>
          {formatStayRange(event.startDate, event.endDate)}
        </time>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
        <h3 className="text-xl font-semibold text-blue-950">{event.name}</h3>
        <DemandBadge level={event.demand} />
      </div>

      <p className="mt-3 max-w-2xl text-sm text-blue-950/70 md:text-base">
        {event.summary}
      </p>
      <p className="mt-1 text-sm text-blue-950/55">
        {DEMAND_LEVELS[event.demand].description}
      </p>

      {hasTips && (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setIsTipsOpen((open) => !open)}
            aria-expanded={isTipsOpen}
            aria-controls={tipsId}
            className="flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full text-sm font-semibold text-blue-900 transition-colors hover:text-blue-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-offset-2"
          >
            {pluralize(
              event.tips.length,
              "dica para essa data",
              "dicas para essa data",
            )}
            <ChevronDown
              aria-hidden
              className={`h-4 w-4 transition-transform ${isTipsOpen ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence initial={false}>
            {isTipsOpen && (
              <motion.div
                id={tipsId}
                key="tips"
                initial={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : { height: 0, opacity: 0 }
                }
                animate={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : { height: "auto", opacity: 1 }
                }
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { height: 0, opacity: 0 }
                }
                transition={{
                  duration: shouldReduceMotion ? 0 : TIPS_DURATION_IN_SECONDS,
                  ease: "easeOut",
                }}
                className="overflow-hidden"
              >
                <ul className="mt-3 flex flex-col gap-2 border-l-2 border-blue-900/20 pl-4 text-sm text-blue-950/75">
                  {event.tips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <BrandLink href={buildEventSearchHref(event)} variant="primary">
          Ver hospedagens para essas datas
        </BrandLink>
        {suggestsBusParking(event) && (
          <BrandLink href={buildEventBusParkingHref(event)} variant="outline">
            <Bus className="h-4 w-4" aria-hidden />
            Ver hospedagens com vaga para ônibus
          </BrandLink>
        )}
      </div>
    </article>
  );
}
