"use client";

import { CalendarX, WifiOff } from "lucide-react";
import { EventCard } from "@/components/Modules/Cidade/Eventos/EventCard";
import { FeaturedEvent } from "@/components/Modules/Cidade/Eventos/FeaturedEvent";
import { BrandButton, BrandLink } from "@/components/ui/brand-button";
import { EmptyState } from "@/components/ui/empty-state";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Skeleton } from "@/components/ui/skeleton";
import { useUpcomingEvents } from "@/hooks/Modules/Cidade/use-city";
import { groupEventsByMonth } from "@/lib/Modules/Cidade/group-events-by-month";

const SKELETON_COUNT = 3;

export function EventsTimeline() {
  const { data: events, isPending, isError, refetch } = useUpcomingEvents();

  if (isPending) {
    return (
      <div aria-busy className="flex flex-col gap-10">
        <Skeleton className="aspect-4/5 w-full rounded-3xl sm:aspect-16/9 lg:aspect-21/9" />
        {Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: esqueletos sem identidade
            key={index}
            className="grid gap-4 md:grid-cols-[9rem_1fr]"
          >
            <Skeleton className="h-5 w-28" />
            <div className="flex flex-col gap-3">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-11 w-64 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <EmptyState
        tone="error"
        icon={WifiOff}
        title="Não conseguimos carregar o calendário"
        description="Pode ter sido uma falha momentânea. Tente de novo em instantes."
        action={
          <BrandButton onClick={() => refetch()}>Tentar novamente</BrandButton>
        }
      />
    );
  }

  if (!events || events.length === 0) {
    return (
      <EmptyState
        icon={CalendarX}
        title="Sem eventos marcados nos próximos meses"
        description="Enquanto isso, as hospedagens seguem com procura normal e boa oferta de quartos."
        action={<BrandLink href="/hospedagens">Ver hospedagens</BrandLink>}
      />
    );
  }

  const featured =
    events.find((event) => event.demand === "muito-alta") ?? events[0];
  const groups = groupEventsByMonth(events);

  return (
    <div className="flex flex-col gap-14">
      {featured && <FeaturedEvent event={featured} />}

      <Reveal trigger="inView" amount={0.05}>
        <ol className="flex flex-col gap-12">
          {groups.map((group) => (
            <li
              key={group.key}
              className="grid gap-4 md:grid-cols-[9rem_1fr] md:gap-10"
            >
              <RevealItem>
                <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-900/70 md:sticky md:top-28">
                  {group.label}
                </h2>
              </RevealItem>
              <RevealItem>
                <div className="divide-y divide-blue-950/10">
                  {group.events.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </RevealItem>
            </li>
          ))}
        </ol>
      </Reveal>
    </div>
  );
}
