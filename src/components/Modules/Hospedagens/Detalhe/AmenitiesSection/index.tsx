"use client";

import { useState } from "react";
import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import { Dialog } from "@/components/ui/dialog";
import { VISIBLE_AMENITIES_COUNT } from "@/constants/Modules/Hospedagens/Detalhe/review-labels";
import {
  buildFeatureGroups,
  flattenFeatures,
} from "@/lib/Modules/Hospedagens/Detalhe/feature-list";
import { DetailSection } from "../DetailSection";

type AmenitiesSectionProps = {
  accommodation: Accommodation;
};

export function AmenitiesSection({ accommodation }: AmenitiesSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const allFeatures = flattenFeatures(accommodation);
  const visibleFeatures = allFeatures.slice(0, VISIBLE_AMENITIES_COUNT);
  const groups = buildFeatureGroups(accommodation);

  return (
    <DetailSection title="O que esta hospedagem oferece">
      <ul className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
        {visibleFeatures.map((feature) => (
          <li
            key={feature.label}
            className="flex items-center gap-3 text-sm text-blue-950/80"
          >
            <feature.icon
              className="h-5 w-5 shrink-0 text-blue-900/70"
              aria-hidden
            />
            {feature.label}
          </li>
        ))}
      </ul>

      {allFeatures.length > VISIBLE_AMENITIES_COUNT && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="mt-6 cursor-pointer rounded-full px-5 py-2.5 text-sm font-semibold text-blue-950 ring-1 ring-blue-950/15 transition-colors hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
        >
          Ver todas as {allFeatures.length} comodidades
        </button>
      )}

      <Dialog
        open={isOpen}
        onOpenChange={setIsOpen}
        title="Comodidades e serviços"
        description={accommodation.name}
      >
        <div className="flex flex-col gap-6">
          {groups.map((group) => (
            <section key={group.id}>
              <h3 className="text-sm font-semibold text-blue-950">
                {group.title}
              </h3>
              <ul className="mt-3 flex flex-col gap-3">
                {group.items.map((feature) => (
                  <li
                    key={feature.label}
                    className="flex items-center gap-3 text-sm text-blue-950/80"
                  >
                    <feature.icon
                      className="h-5 w-5 shrink-0 text-blue-900/70"
                      aria-hidden
                    />
                    {feature.label}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Dialog>
    </DetailSection>
  );
}
