"use client";

import { ViewAllCard } from "@/components/Modules/Home/ViewAllCard";
import type { Accommodation } from "@/constants/Modules/Home/accommodations";
import type { EditorialCriterion } from "@/constants/Modules/Home/editorial-criteria";
import { HotelCard } from "../../HotelCard";

const VIEW_ALL_PREVIEW_COUNT = 3;

type CriterionRowProps = {
  criterion: EditorialCriterion;
  accommodations: Accommodation[];
};

export function CriterionRow({ criterion, accommodations }: CriterionRowProps) {
  if (accommodations.length === 0) return null;

  return (
    <div>
      <div>
        <h3 className="text-xl font-bold text-blue-950 md:text-2xl">
          {criterion.title}
        </h3>
        <p className="mt-1 text-sm text-blue-950/60">{criterion.description}</p>
      </div>

      <div className="-mx-6 mt-5 overflow-x-auto overscroll-x-contain scrollbar-none px-6 md:-mx-10 md:px-10">
        <div className="flex snap-x snap-mandatory gap-5 py-4">
          {accommodations.map((accommodation) => (
            <div
              key={accommodation.slug}
              className="relative w-64 shrink-0 snap-start sm:w-72"
            >
              <HotelCard accommodation={accommodation} />
            </div>
          ))}

          <div className="w-64 shrink-0 snap-start sm:w-72">
            <ViewAllCard
              previewAccommodations={accommodations.slice(
                0,
                VIEW_ALL_PREVIEW_COUNT,
              )}
              href={`/hospedagens?criterio=${criterion.id}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
