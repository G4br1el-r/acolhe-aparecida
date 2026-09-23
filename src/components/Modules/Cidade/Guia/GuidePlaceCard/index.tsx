"use client";

import { Accessibility, ChevronDown, Footprints, Users } from "lucide-react";
import Image from "next/image";
import { useId, useState } from "react";
import type { GuidePlace } from "@/@types/Modules/Cidade/city";
import { SavePlaceButton } from "@/components/Modules/Cidade/Guia/SavePlaceButton";
import { GUIDE_CATEGORY_LABELS } from "@/constants/Modules/Cidade/guide-categories";
import {
  formatDistance,
  walkingMinutesFor,
} from "@/lib/Modules/Hospedagens/distance";
import { cn } from "@/lib/utils";

type GuidePlaceCardProps = {
  place: GuidePlace;
  isActive: boolean;
  onActivate: (placeId: string | null) => void;
};

export function GuidePlaceCard({
  place,
  isActive,
  onActivate,
}: GuidePlaceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const detailsId = useId();
  const isSanctuary = place.distanceFromSanctuaryInMeters === 0;
  const distanceLabel = isSanctuary
    ? "Ponto de partida"
    : `${formatDistance(place.distanceFromSanctuaryInMeters)} · ${walkingMinutesFor(place.distanceFromSanctuaryInMeters)} min a pé do Santuário`;

  return (
    <article
      id={`lugar-${place.id}`}
      onMouseEnter={() => onActivate(place.id)}
      onMouseLeave={() => onActivate(null)}
      onFocus={() => onActivate(place.id)}
      onBlur={() => onActivate(null)}
      className={cn(
        "flex scroll-mt-32 flex-col gap-4 rounded-3xl bg-white p-3 ring-1 transition-shadow sm:flex-row sm:p-4",
        isActive
          ? "shadow-lg shadow-blue-950/10 ring-blue-900/40"
          : "ring-blue-950/8",
      )}
    >
      <div className="relative aspect-4/3 shrink-0 overflow-hidden rounded-2xl bg-blue-100 sm:aspect-square sm:w-40">
        <Image
          src={place.image}
          alt={place.name}
          fill
          sizes="(min-width: 640px) 160px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col px-1 pb-1 sm:px-0">
        <p className="text-xs font-medium text-blue-950/55">
          {GUIDE_CATEGORY_LABELS[place.category]}
        </p>
        <h3 className="mt-0.5 text-lg font-semibold leading-tight text-blue-950">
          {place.name}
        </h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-blue-950/70">
          <Footprints className="h-4 w-4 text-blue-900/70" aria-hidden />
          {distanceLabel}
        </p>
        <p className="mt-2 text-sm text-blue-950/65">{place.summary}</p>

        <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-blue-950/60">
          {place.openingHours && (
            <div className="flex gap-1">
              <dt className="font-medium text-blue-950/70">Horário:</dt>
              <dd>{place.openingHours}</dd>
            </div>
          )}
          {place.priceLabel && (
            <div className="flex gap-1">
              <dt className="font-medium text-blue-950/70">Preço:</dt>
              <dd>{place.priceLabel}</dd>
            </div>
          )}
        </dl>

        {(place.isAccessible || place.goodForGroups) && (
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-blue-950/70">
            {place.isAccessible && (
              <li className="flex items-center gap-1">
                <Accessibility
                  className="h-3.5 w-3.5 text-blue-900/70"
                  aria-hidden
                />
                Acessível
              </li>
            )}
            {place.goodForGroups && (
              <li className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5 text-blue-900/70" aria-hidden />
                Bom para grupos
              </li>
            )}
          </ul>
        )}

        {isExpanded && (
          <ul
            id={detailsId}
            className="mt-3 flex flex-col gap-1.5 border-l-2 border-blue-900/20 pl-3 text-sm text-blue-950/75"
          >
            {place.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          {place.details.length > 0 ? (
            <button
              type="button"
              onClick={() => setIsExpanded((open) => !open)}
              aria-expanded={isExpanded}
              aria-controls={detailsId}
              className="flex min-h-11 cursor-pointer items-center gap-1 rounded-full text-sm font-semibold text-blue-900 hover:text-blue-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-offset-2"
            >
              {isExpanded ? "Menos detalhes" : "Mais detalhes"}
              <ChevronDown
                aria-hidden
                className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
              />
            </button>
          ) : (
            <span />
          )}
          <SavePlaceButton placeId={place.id} placeName={place.name} />
        </div>
      </div>
    </article>
  );
}
