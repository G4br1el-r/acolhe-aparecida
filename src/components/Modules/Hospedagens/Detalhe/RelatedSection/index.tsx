"use client";

import { HotelCard } from "@/components/Modules/Home/HotelCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useRelatedAccommodations } from "@/hooks/Modules/Hospedagens/use-accommodation";
import { DetailSection } from "../DetailSection";

const SKELETON_COUNT = 4;

type RelatedSectionProps = {
  slug: string;
};

export function RelatedSection({ slug }: RelatedSectionProps) {
  const { data: related, isPending } = useRelatedAccommodations(slug);

  if (!isPending && (!related || related.length === 0)) return null;

  return (
    <DetailSection
      title="Outras opções parecidas"
      description="Mesmo perfil de viagem, perto do Santuário."
      hasDivider={false}
    >
      <div className="-mx-4 overflow-x-auto px-4 scrollbar-none sm:mx-0 sm:px-0">
        <ul className="flex snap-x snap-mandatory gap-4 pb-2 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {isPending &&
            Array.from({ length: SKELETON_COUNT }, (_, index) => (
              <li
                // biome-ignore lint/suspicious/noArrayIndexKey: esqueletos sem identidade
                key={index}
                className="w-64 shrink-0 sm:w-auto"
              >
                <Skeleton className="aspect-4/3 w-full rounded-2xl" />
                <Skeleton className="mt-3 h-4 w-2/3" />
                <Skeleton className="mt-2 h-3 w-1/2" />
              </li>
            ))}
          {related?.map((accommodation) => (
            <li
              key={accommodation.slug}
              className="w-64 shrink-0 snap-start sm:w-auto"
            >
              <HotelCard accommodation={accommodation} />
            </li>
          ))}
        </ul>
      </div>
    </DetailSection>
  );
}
