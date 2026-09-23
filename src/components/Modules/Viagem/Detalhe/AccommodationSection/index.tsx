import { ArrowUpRight, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import { ACCOMMODATION_TYPE_LABELS } from "@/constants/Modules/Hospedagens/features";
import { DETAIL_PHOTO_WIDTH } from "@/constants/Modules/Viagem/trip";
import { buildReceptionPhone } from "@/lib/Modules/Viagem/reception-phone";
import { buildPhotoUrl } from "@/mocks/Modules/Hospedagens/photos";
import { TripSection } from "../TripSection";

type AccommodationSectionProps = {
  accommodation: Accommodation;
};

export function AccommodationSection({
  accommodation,
}: AccommodationSectionProps) {
  const receptionPhone = buildReceptionPhone(accommodation.slug);

  return (
    <TripSection
      id="hospedagem"
      title="Onde você vai ficar"
      action={
        <Link
          href={`/hospedagens/${accommodation.slug}`}
          className="inline-flex h-9 items-center gap-1 rounded-full px-3 text-sm font-semibold text-blue-900 transition-colors hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900"
        >
          Ver página
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
      }
    >
      <div className="grid gap-5 sm:grid-cols-[14rem_minmax(0,1fr)]">
        <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-blue-100">
          <Image
            src={buildPhotoUrl(
              accommodation.image.split("?")[0],
              DETAIL_PHOTO_WIDTH,
            )}
            alt={`Fachada de ${accommodation.name}`}
            fill
            sizes="(min-width: 640px) 14rem, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
              {ACCOMMODATION_TYPE_LABELS[accommodation.type]}
            </p>
            <p className="mt-1 text-lg font-semibold text-blue-950">
              {accommodation.name}
            </p>
            <p className="mt-1 text-sm text-blue-950/70">
              {accommodation.address.street},{" "}
              {accommodation.address.neighborhood}. Aparecida, SP.
            </p>
          </div>

          <p className="text-sm text-blue-950/70">
            {accommodation.distanceFromSanctuary} Nacional
          </p>

          <p className="flex items-center gap-2 text-sm text-blue-950/70">
            <Phone className="h-4 w-4 text-blue-900/70" aria-hidden />
            Recepção: {receptionPhone}
            <span className="text-xs text-blue-950/45">
              (só para avisos no dia)
            </span>
          </p>
        </div>
      </div>
    </TripSection>
  );
}
