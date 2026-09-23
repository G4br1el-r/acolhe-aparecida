import { Bus } from "lucide-react";
import Image from "next/image";
import type { CityEvent } from "@/@types/Modules/Cidade/city";
import { DemandBadge } from "@/components/Modules/Cidade/Eventos/DemandBadge";
import { BrandLink } from "@/components/ui/brand-button";
import {
  buildEventBusParkingHref,
  buildEventSearchHref,
  suggestsBusParking,
} from "@/lib/Modules/Cidade/event-links";
import {
  daysUntil,
  formatStayRange,
  pluralize,
} from "@/lib/Modules/Hospedagens/format-date";

type FeaturedEventProps = {
  event: CityEvent;
};

export function FeaturedEvent({ event }: FeaturedEventProps) {
  const remainingDays = daysUntil(event.startDate);
  const countdownLabel =
    remainingDays > 0
      ? `Começa em ${pluralize(remainingDays, "dia", "dias")}`
      : "Acontecendo agora";

  return (
    <section
      aria-labelledby="proximo-grande-evento"
      className="relative overflow-hidden rounded-3xl bg-blue-950 text-white shadow-lg shadow-blue-950/15"
    >
      <div className="relative aspect-4/5 sm:aspect-16/9 lg:aspect-21/9">
        <Image
          src={event.image}
          alt={`Santuário Nacional durante ${event.name}`}
          fill
          priority
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-blue-950 via-blue-950/45 to-blue-950/5"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 sm:p-8 lg:max-w-3xl lg:p-10">
        <p className="text-xs font-semibold uppercase tracking-wide text-white/70">
          Próximo grande evento · {countdownLabel}
        </p>
        <h2
          id="proximo-grande-evento"
          className="text-3xl font-bold leading-tight tracking-tight md:text-4xl"
        >
          {event.name}
        </h2>
        <div className="flex flex-wrap items-center gap-3 text-sm text-white/85">
          <time dateTime={event.startDate}>
            {formatStayRange(event.startDate, event.endDate)}
          </time>
          <DemandBadge
            level={event.demand}
            className="bg-white/15 text-white"
          />
        </div>
        <p className="max-w-xl text-sm text-white/80 md:text-base">
          {event.summary}
        </p>
        <div className="flex flex-col gap-2 pt-1 sm:flex-row">
          <BrandLink href={buildEventSearchHref(event)} variant="accent">
            Ver hospedagens para essas datas
          </BrandLink>
          {suggestsBusParking(event) && (
            <BrandLink
              href={buildEventBusParkingHref(event)}
              className="bg-white/15 text-white ring-1 ring-white/30 hover:bg-white/25"
            >
              <Bus className="h-4 w-4" aria-hidden />
              Com vaga para ônibus
            </BrandLink>
          )}
        </div>
      </div>
    </section>
  );
}
