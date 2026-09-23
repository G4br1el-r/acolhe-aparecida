import { Car, Footprints, MapPin } from "lucide-react";
import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import {
  drivingMinutesFor,
  formatDistance,
  walkingMinutesFor,
} from "@/lib/Modules/Hospedagens/distance";
import { DetailSection } from "../DetailSection";
import { LocationMap } from "../LocationMap";

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
      name: "Rodoviária de Aparecida",
      meters: accommodation.distances.rodoviariaInMeters,
    },
  ];

  return (
    <DetailSection
      title="Onde você vai ficar"
      description={`${accommodation.address.street}, ${accommodation.address.neighborhood}. Aparecida, SP.`}
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="aspect-4/3 w-full overflow-hidden rounded-3xl">
          <LocationMap accommodation={accommodation} />
        </div>

        <ul className="flex flex-col divide-y divide-blue-950/10 rounded-3xl bg-blue-50/60 px-5">
          {places.map((place) => {
            const isWalkable = place.meters <= WALKABLE_DISTANCE_IN_METERS;
            return (
              <li
                key={place.name}
                className="flex items-center justify-between gap-4 py-4"
              >
                <span className="flex items-center gap-3 text-sm font-medium text-blue-950">
                  <MapPin
                    className="h-4 w-4 shrink-0 text-blue-900/70"
                    aria-hidden
                  />
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
    </DetailSection>
  );
}
