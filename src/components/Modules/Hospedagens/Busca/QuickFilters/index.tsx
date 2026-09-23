"use client";

import { Chip } from "@/components/ui/chip";
import { TRAVELER_PROFILES } from "@/constants/Modules/Home/traveler-profiles";
import type { SearchParams } from "@/schemas/Modules/Hospedagens/Busca/search-params";

type QuickFiltersProps = {
  values: SearchParams;
  onChange: (changes: Partial<SearchParams>) => void;
};

export function QuickFilters({ values, onChange }: QuickFiltersProps) {
  return (
    <fieldset className="-mx-4 flex min-w-0 gap-2 overflow-x-auto px-4 pb-1 scrollbar-none md:mx-0 md:flex-wrap md:px-0">
      <legend className="sr-only">Filtros rápidos por perfil de viagem</legend>
      {TRAVELER_PROFILES.map((profile) => {
        const isSelected = values.perfis.includes(profile.id);

        return (
          <Chip
            key={profile.id}
            label={profile.shortLabel}
            icon={profile.icon}
            isSelected={isSelected}
            onToggle={() =>
              onChange({
                perfis: isSelected
                  ? values.perfis.filter((id) => id !== profile.id)
                  : [...values.perfis, profile.id],
              })
            }
          />
        );
      })}
    </fieldset>
  );
}
