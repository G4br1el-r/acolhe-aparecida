"use client";

import { Footprints, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CompareToggle } from "@/components/Modules/Hospedagens/Comparacao/CompareToggle";
import { FavoriteButton } from "@/components/Modules/Hospedagens/Favoritos/FavoriteButton";
import {
  ACCOMMODATION_TYPE_LABELS,
  BADGE_LABELS,
  MEAL_LABELS,
  PARKING_LABELS,
} from "@/constants/Modules/Hospedagens/features";
import type { SearchResult } from "@/lib/Modules/Hospedagens/Busca/filter-accommodations";
import { pluralize } from "@/lib/Modules/Hospedagens/format-date";
import { formatCurrency } from "@/lib/Modules/Reserva/Checkout/price-summary";
import { cn } from "@/lib/utils";

const MAX_VISIBLE_BADGES = 2;
const MAX_HIGHLIGHTS = 3;

type ResultCardProps = {
  result: SearchResult;
  href: string;
  roomsNeeded: number;
  isActive?: boolean;
  onActivate?: (slug: string | null) => void;
  layout?: "row" | "column";
};

function buildHighlights(result: SearchResult): string[] {
  const { accommodation } = result;
  const highlights: string[] = [];

  if (accommodation.meals.includes("cafe")) {
    highlights.push(MEAL_LABELS.cafe.label);
  }
  if (accommodation.parking.includes("onibus")) {
    highlights.push(PARKING_LABELS.onibus.label);
  } else if (accommodation.parking.includes("van")) {
    highlights.push(PARKING_LABELS.van.label);
  } else if (accommodation.parking.includes("gratuito")) {
    highlights.push(PARKING_LABELS.gratuito.label);
  }
  if (accommodation.isAccessible) highlights.push("Quarto acessível");
  if (accommodation.structure.includes("elevador")) highlights.push("Elevador");
  if (accommodation.structure.includes("piscina")) highlights.push("Piscina");
  if (accommodation.booking.includes("cancelamento-gratuito")) {
    highlights.push("Cancelamento gratuito");
  }

  return highlights.slice(0, MAX_HIGHLIGHTS);
}

export function ResultCard({
  result,
  href,
  roomsNeeded,
  isActive = false,
  onActivate,
  layout = "row",
}: ResultCardProps) {
  const { accommodation, availability, nightlyRate, totalPrice } = result;
  const isUnavailable = !availability.isAvailable;
  const visibleBadges = accommodation.badges
    .filter((badge) => badge !== "parceiro-verificado")
    .slice(0, MAX_VISIBLE_BADGES);
  const highlights = buildHighlights(result);
  const isRow = layout === "row";

  return (
    <article
      onMouseEnter={() => onActivate?.(accommodation.slug)}
      onMouseLeave={() => onActivate?.(null)}
      className={cn(
        "group relative flex overflow-hidden rounded-3xl bg-white ring-1 transition-shadow duration-300",
        isRow ? "flex-col sm:flex-row" : "flex-col",
        isActive
          ? "shadow-lg shadow-blue-950/10 ring-blue-900/40"
          : "ring-blue-950/8 hover:shadow-lg hover:shadow-blue-950/8",
        isUnavailable && "opacity-80",
      )}
    >
      <Link
        href={href}
        aria-label={`Ver ${accommodation.name}`}
        onFocus={() => onActivate?.(accommodation.slug)}
        onBlur={() => onActivate?.(null)}
        className="absolute inset-0 z-10 rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-offset-2"
      />

      <div
        className={cn(
          "relative shrink-0 overflow-hidden bg-blue-100",
          isRow
            ? "aspect-4/3 sm:aspect-auto sm:w-56 md:w-64 xl:w-52 2xl:w-64"
            : "aspect-4/3",
        )}
      >
        <Image
          src={accommodation.image}
          alt={`Quarto em ${accommodation.name}`}
          fill
          sizes={
            isRow
              ? "(min-width: 640px) 288px, 100vw"
              : "(min-width: 1024px) 30vw, 100vw"
          }
          className={cn(
            "object-cover transition-transform duration-700 ease-out group-hover:scale-105",
            isUnavailable && "grayscale-[35%]",
          )}
        />

        {visibleBadges.length > 0 && (
          <ul className="absolute top-3 left-3 flex flex-col gap-1.5">
            {visibleBadges.map((badge) => {
              const { label, icon: Icon } = BADGE_LABELS[badge];
              return (
                <li
                  key={badge}
                  className="flex w-fit items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-blue-950 shadow-sm backdrop-blur-sm"
                >
                  <Icon className="h-3 w-3 text-blue-900" aria-hidden />
                  {label}
                </li>
              );
            })}
          </ul>
        )}

        <div className="absolute top-3 right-3 z-20">
          <FavoriteButton
            slug={accommodation.slug}
            accommodationName={accommodation.name}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-medium text-blue-950/55">
              {ACCOMMODATION_TYPE_LABELS[accommodation.type]} ·{" "}
              {accommodation.address.neighborhood}
            </p>
            <h3 className="mt-1 text-lg font-semibold leading-tight text-blue-950">
              {accommodation.name}
            </h3>
          </div>

          <span className="flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700">
            <Star
              className="h-3.5 w-3.5 fill-amber-500 text-amber-500"
              aria-hidden
            />
            {accommodation.rating.toLocaleString("pt-BR", {
              minimumFractionDigits: 1,
            })}
            <span className="font-normal text-amber-700/70">
              ({accommodation.reviewCount})
            </span>
          </span>
        </div>

        <p className="mt-2 flex items-center gap-1.5 text-sm text-blue-950/70">
          <Footprints className="h-4 w-4 text-blue-900/70" aria-hidden />
          {accommodation.distanceFromSanctuary} ·{" "}
          {pluralize(accommodation.walkingMinutes, "min a pé", "min a pé")}
        </p>

        <p className="mt-2 line-clamp-2 text-sm text-blue-950/65">
          {accommodation.tagline}
        </p>

        {highlights.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-blue-950/60">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex items-center gap-1">
                <span
                  aria-hidden
                  className="h-1 w-1 rounded-full bg-blue-900/50"
                />
                {highlight}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex flex-wrap-reverse items-end justify-between gap-x-4 gap-y-3 pt-4">
          <div className="relative z-20 flex items-center gap-2">
            <CompareToggle
              slug={accommodation.slug}
              accommodationName={accommodation.name}
            />
            {!isUnavailable && availability.hasLowAvailability && (
              <span className="text-xs font-medium text-cta">
                {pluralize(
                  availability.totalUnitsLeft,
                  "quarto restante",
                  "quartos restantes",
                )}
              </span>
            )}
          </div>

          <div className="ml-auto text-right whitespace-nowrap">
            {isUnavailable ? (
              <p className="text-sm font-semibold text-blue-950/60">
                Sem vaga nessas datas
              </p>
            ) : (
              <>
                <p className="text-lg font-bold text-blue-950">
                  {formatCurrency(nightlyRate)}
                  <span className="text-xs font-normal text-blue-950/60">
                    {" "}
                    / noite
                  </span>
                </p>
                {totalPrice !== null && (
                  <p className="text-xs text-blue-950/60">
                    {formatCurrency(totalPrice)} por{" "}
                    {pluralize(availability.nightCount, "noite", "noites")}
                    {roomsNeeded > 1 &&
                      `, ${pluralize(roomsNeeded, "quarto", "quartos")}`}
                  </p>
                )}
                {availability.cheapestAvailableRoom?.hasHighDemandPricing && (
                  <p className="text-[11px] font-medium text-cta">
                    Preço de alta procura
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
