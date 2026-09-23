"use client";

import { X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { TRAVELER_PROFILES } from "@/constants/Modules/Home/traveler-profiles";
import { useTravelerProfileStore } from "@/store/Modules/Home/use-traveler-profile-store";

const LAYOUT_SPRING_STIFFNESS = 380;
const LAYOUT_SPRING_DAMPING = 30;

export function ProfileFilterBar() {
  const shouldReduceMotion = useReducedMotion();
  const selectedProfileIds = useTravelerProfileStore(
    (state) => state.selectedProfileIds,
  );
  const toggleProfile = useTravelerProfileStore((state) => state.toggleProfile);
  const clearProfiles = useTravelerProfileStore((state) => state.clearProfiles);

  const hasSelection = selectedProfileIds.length > 0;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {TRAVELER_PROFILES.map((profile) => {
        const isSelected = selectedProfileIds.includes(profile.id);
        const Icon = profile.icon;

        return (
          <button
            key={profile.id}
            type="button"
            onClick={() => toggleProfile(profile.id)}
            aria-pressed={isSelected}
            className={`relative flex cursor-pointer items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-offset-2 ${
              isSelected
                ? "text-white"
                : "bg-blue-50 text-blue-950 hover:bg-blue-100"
            }`}
          >
            {isSelected && (
              <motion.span
                layoutId={`profile-pill-${profile.id}`}
                className="absolute inset-0 rounded-full bg-blue-900"
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        type: "spring",
                        stiffness: LAYOUT_SPRING_STIFFNESS,
                        damping: LAYOUT_SPRING_DAMPING,
                      }
                }
              />
            )}
            <Icon className="relative z-10 h-4 w-4 shrink-0" />
            <span className="relative z-10">{profile.shortLabel}</span>
          </button>
        );
      })}

      {hasSelection && (
        <motion.button
          type="button"
          onClick={clearProfiles}
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-2.5 text-sm font-medium text-blue-950/60 transition-colors hover:text-blue-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900"
        >
          <X className="h-3.5 w-3.5" />
          Limpar
        </motion.button>
      )}
    </div>
  );
}
