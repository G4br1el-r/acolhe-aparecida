"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Reservation } from "@/@types/Modules/Reserva/reservation";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DEMAND_LABELS,
  GUIDE_CATEGORY_LABELS,
} from "@/constants/Modules/Viagem/city-labels";
import {
  useSavedPlaces,
  useUpcomingEvents,
} from "@/hooks/Modules/Cidade/use-city";
import { useIsClient } from "@/hooks/use-is-client";
import { formatDistance } from "@/lib/Modules/Hospedagens/distance";
import { formatStayRange } from "@/lib/Modules/Hospedagens/format-date";
import { findEventsDuringStay } from "@/lib/Modules/Viagem/events-during-stay";
import { useSavedPlacesStore } from "@/store/Modules/Cidade/use-saved-places-store";
import { TripSection } from "../TripSection";

const MAX_SAVED_PLACES = 4;
const PLACE_IMAGE_SIZES = "4rem";

type YourTripSectionProps = {
  reservation: Reservation;
};

export function YourTripSection({ reservation }: YourTripSectionProps) {
  const isClient = useIsClient();
  const placeIds = useSavedPlacesStore((state) => state.placeIds);
  const { data: places, isPending: isLoadingPlaces } = useSavedPlaces(
    isClient ? placeIds : [],
  );
  const { data: events, isPending: isLoadingEvents } = useUpcomingEvents();

  const nextEvent = events
    ? (findEventsDuringStay(events, reservation)[0] ?? null)
    : null;
  const visiblePlaces = (places ?? []).slice(0, MAX_SAVED_PLACES);

  return (
    <TripSection
      id="sua-viagem"
      title="Sua viagem"
      description="Lugares que você salvou no guia e o que acontece na cidade nas suas datas."
      action={
        <Link
          href="/guia"
          className="inline-flex h-9 items-center gap-1 rounded-full px-3 text-sm font-semibold text-blue-900 transition-colors hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900"
        >
          Abrir guia
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
            Lugares salvos
          </p>
          {isLoadingPlaces && placeIds.length > 0 ? (
            <div className="mt-3 flex flex-col gap-2">
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
            </div>
          ) : visiblePlaces.length === 0 ? (
            <p className="mt-3 text-sm text-blue-950/65">
              Você ainda não salvou nenhum lugar.{" "}
              <Link
                href="/guia"
                className="font-semibold text-blue-900 underline-offset-4 hover:underline"
              >
                Explorar o guia de Aparecida
              </Link>
            </p>
          ) : (
            <ul className="mt-3 flex flex-col divide-y divide-blue-950/8">
              {visiblePlaces.map((place) => (
                <li key={place.id} className="flex items-center gap-3 py-2.5">
                  <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-blue-100">
                    <Image
                      src={place.image}
                      alt=""
                      fill
                      sizes={PLACE_IMAGE_SIZES}
                      className="object-cover"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-blue-950">
                      {place.name}
                    </span>
                    <span className="block text-xs text-blue-950/60">
                      {GUIDE_CATEGORY_LABELS[place.category]} ·{" "}
                      {formatDistance(place.distanceFromSanctuaryInMeters)} do
                      Santuário
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
            Na cidade nas suas datas
          </p>
          {isLoadingEvents ? (
            <Skeleton className="mt-3 h-28" />
          ) : nextEvent ? (
            <div className="mt-3 rounded-2xl bg-blue-50/60 p-4">
              <p className="text-sm font-semibold text-blue-950">
                {nextEvent.name}
              </p>
              <p className="mt-0.5 text-xs text-blue-950/60">
                {formatStayRange(nextEvent.startDate, nextEvent.endDate)} ·{" "}
                {DEMAND_LABELS[nextEvent.demand]}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-blue-950/75">
                {nextEvent.tips[0] ?? nextEvent.summary}
              </p>
              <Link
                href="/eventos"
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue-900 underline-offset-4 hover:underline"
              >
                Ver programação
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          ) : (
            <p className="mt-3 text-sm text-blue-950/65">
              Nenhuma grande festa ou feriado nas suas datas.{" "}
              <Link
                href="/eventos"
                className="font-semibold text-blue-900 underline-offset-4 hover:underline"
              >
                Ver calendário da cidade
              </Link>
            </p>
          )}
        </div>
      </div>
    </TripSection>
  );
}
