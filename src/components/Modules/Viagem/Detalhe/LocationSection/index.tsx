"use client";

import { Car, Footprints } from "lucide-react";
import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import { SanctuaryMap } from "@/components/Modules/Home/MapaSection/SanctuaryMap";
import {
  drivingMinutesFor,
  formatDistance,
  walkingMinutesFor,
} from "@/lib/Modules/Hospedagens/distance";
import { TripSection } from "../TripSection";

const WALKABLE_DISTANCE_IN_METERS = 1500;

type LocationSectionProps = {
  accommodation: Accommodation;
};

export function LocationSection({ accommodation }: LocationSectionProps) {
  const places = [
    {
      name: "Santuário Nacional",
      meters: accommodation.distances.santuarioInMeters,
    },
    {
      name: "Passarela da Fé",
      meters: accommodation.distances.passarelaDaFeInMeters,
    },
    {
      name: "Basílica Velha",
      meters: accommodation.distances.basilicaVelhaInMeters,
    },
    {
      name: "Rodoviária",
      meters: accommodation.distances.rodoviariaInMeters,
    },
  ];

  return (
    <TripSection
      id="mapa"
      title="Como chegar"
      description={`${accommodation.address.street}, ${accommodation.address.neighborhood}. Aparecida, SP.`}
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="aspect-4/3 w-full overflow-hidden rounded-2xl">
          <SanctuaryMap
            accommodations={[accommodation]}
            activeSlug={accommodation.slug}
            onActivate={() => {}}
            onSelect={() => {}}
          />
        </div>

        <ul className="flex flex-col divide-y divide-blue-950/8 self-start rounded-2xl bg-blue-50/60 px-4">
          {places.map((place) => {
            const isWalkable = place.meters <= WALKABLE_DISTANCE_IN_METERS;

            return (
              <li
                key={place.name}
                className="flex items-center justify-between gap-4 py-3"
              >
                <span className="text-sm font-medium text-blue-950">
                  {place.name}
                </span>
                <span className="flex shrink-0 items-center gap-1.5 text-xs text-blue-950/65">
                  {formatDistance(place.meters)} ·{" "}
                  {isWalkable ? (
                    <>
                      <Footprints className="h-3.5 w-3.5" aria-hidden />
                      {walkingMinutesFor(place.meters)} min
                    </>
                  ) : (
                    <>
                      <Car className="h-3.5 w-3.5" aria-hidden />
                      {drivingMinutesFor(place.meters)} min
                    </>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </TripSection>
  );
}
