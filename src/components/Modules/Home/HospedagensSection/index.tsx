"use client";

import { Reveal, RevealItem } from "@/components/ui/reveal";
import { ACCOMMODATIONS } from "@/constants/Modules/Home/accommodations";
import { EDITORIAL_CRITERIA } from "@/constants/Modules/Home/editorial-criteria";
import { filterAccommodationsByProfiles } from "@/lib/Modules/Home/filter-accommodations";
import { useTravelerProfileStore } from "@/store/Modules/Home/use-traveler-profile-store";
import { CriterionRow } from "./CriterionRow";

export function HospedagensSection() {
  const selectedProfileIds = useTravelerProfileStore(
    (state) => state.selectedProfileIds,
  );

  const availableAccommodations = filterAccommodationsByProfiles(
    ACCOMMODATIONS,
    selectedProfileIds,
  );

  const hasSelection = selectedProfileIds.length > 0;

  return (
    <section className="bg-white px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal trigger="inView" amount={0.1} margin="0px 0px -5% 0px">
          <RevealItem>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
              Hospedagens em Aparecida
            </p>
          </RevealItem>

          <RevealItem className="mt-4">
            <h2 className="max-w-3xl text-4xl font-bold leading-[1.05] text-blue-950 md:text-5xl">
              Organizadas do jeito que você decide.
            </h2>
          </RevealItem>

          <RevealItem className="mt-6 max-w-2xl">
            <p className="text-base text-blue-950/70 md:text-lg">
              {hasSelection
                ? "Estas faixas já consideram o perfil que você escolheu no mapa."
                : "Cada faixa segue um critério claro, para você comparar sem abrir dez abas."}
            </p>
          </RevealItem>

          <div className="mt-12 flex flex-col gap-14">
            {EDITORIAL_CRITERIA.map((criterion) => (
              <RevealItem key={criterion.id}>
                <CriterionRow
                  criterion={criterion}
                  accommodations={availableAccommodations.filter(
                    criterion.matches,
                  )}
                />
              </RevealItem>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
