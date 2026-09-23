"use client";

import { Heart } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { toast } from "sonner";
import { useIsClient } from "@/hooks/use-is-client";
import { useFavoritesStore } from "@/store/Modules/Hospedagens/Favoritos/use-favorites-store";

const ICON_SPRING_STIFFNESS = 420;
const ICON_SPRING_DAMPING = 9;

type SaveButtonProps = {
  slug: string;
  accommodationName: string;
};

export function SaveButton({ slug, accommodationName }: SaveButtonProps) {
  const isClient = useIsClient();
  const isSaved = useFavoritesStore((state) =>
    state.favorites.some((favorite) => favorite.slug === slug),
  );
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const shouldReduceMotion = useReducedMotion();

  const isActive = isClient && isSaved;

  function handleClick() {
    const added = toggleFavorite(slug);

    if (added) {
      toast.success("Salvo nos favoritos", { description: accommodationName });
    } else {
      toast("Removido dos favoritos", { description: accommodationName });
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isActive}
      className="flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-blue-950 underline-offset-4 transition-colors hover:bg-blue-950/5 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
    >
      <motion.span
        key={isActive ? "filled" : "empty"}
        initial={shouldReduceMotion ? false : { scale: 0.6, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                type: "spring",
                stiffness: ICON_SPRING_STIFFNESS,
                damping: ICON_SPRING_DAMPING,
              }
        }
        className="flex"
      >
        <Heart
          className={`h-4 w-4 ${isActive ? "fill-blue-900 text-blue-900" : ""}`}
        />
      </motion.span>
      {isActive ? "Salvo" : "Salvar"}
    </button>
  );
}
