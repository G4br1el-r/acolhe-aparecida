"use client";

import {
  Accessibility,
  Car,
  Coffee,
  PersonStanding,
  Users,
  UsersRound,
} from "lucide-react";
import { useState } from "react";

type TravelerProfile = {
  id: string;
  label: string;
  icon: typeof Users;
};

const TRAVELER_PROFILES: TravelerProfile[] = [
  { id: "familia-criancas", label: "Família com crianças", icon: Users },
  { id: "idosos", label: "Com idosos", icon: PersonStanding },
  { id: "grupo-romarias", label: "Grupo e romarias", icon: UsersRound },
  { id: "acessibilidade", label: "Acessibilidade", icon: Accessibility },
  { id: "estacionamento-van", label: "Estacionamento para van", icon: Car },
  { id: "cafe-manha", label: "Café da manhã incluso", icon: Coffee },
];

const DEFAULT_SELECTED_PROFILE_IDS: string[] = [TRAVELER_PROFILES[0].id];

export function ProfileSelector() {
  const [selectedProfileIds, setSelectedProfileIds] = useState(
    new Set(DEFAULT_SELECTED_PROFILE_IDS),
  );

  function toggleProfile(profileId: string) {
    setSelectedProfileIds((previousSelectedIds) => {
      const nextSelectedIds = new Set(previousSelectedIds);

      if (nextSelectedIds.has(profileId)) {
        nextSelectedIds.delete(profileId);
      } else {
        nextSelectedIds.add(profileId);
      }

      return nextSelectedIds;
    });
  }

  return (
    <div className="flex flex-col gap-3 min-[390px]:grid min-[390px]:grid-cols-2 sm:grid-cols-3">
      {TRAVELER_PROFILES.map((profile) => {
        const isSelected = selectedProfileIds.has(profile.id);
        const Icon = profile.icon;

        return (
          <button
            key={profile.id}
            type="button"
            onClick={() => toggleProfile(profile.id)}
            aria-pressed={isSelected}
            className={
              isSelected
                ? "flex cursor-pointer items-center gap-3 rounded-2xl bg-blue-900 px-4 py-4 text-left text-white shadow-md transition-all hover:bg-blue-950 active:scale-95"
                : "flex cursor-pointer items-center gap-3 rounded-2xl bg-blue-50 px-4 py-4 text-left text-blue-950 transition-all hover:bg-blue-100 active:scale-95"
            }
          >
            <Icon className="h-5 w-5 shrink-0" />
            <span className="text-sm font-medium leading-tight">
              {profile.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
