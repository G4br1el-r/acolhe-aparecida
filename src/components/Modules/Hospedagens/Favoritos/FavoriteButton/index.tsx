"use client";

import { Heart } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useIsClient } from "@/hooks/use-is-client";
import { cn } from "@/lib/utils";
import { useFavoritesStore } from "@/store/Modules/Hospedagens/Favoritos/use-favorites-store";

const BURST_PARTICLE_COUNT = 6;
const BURST_ANGLE_SPREAD_IN_DEG = 140;
const BURST_BASE_ANGLE_IN_DEG = -90;
const BURST_DISTANCE_IN_PX = 22;
const BURST_DURATION_IN_SECONDS = 0.55;

const ICON_SPRING_STIFFNESS = 420;
const ICON_SPRING_DAMPING = 9;
const RING_DURATION_IN_SECONDS = 0.5;

type FavoriteButtonProps = {
  slug: string;
  accommodationName: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SIZE_CLASSES = {
  sm: { button: "h-6 w-6", icon: "h-3 w-3" },
  md: { button: "h-8 w-8", icon: "h-4 w-4" },
  lg: { button: "h-10 w-10", icon: "h-5 w-5" },
} as const;

export function FavoriteButton({
  slug,
  accommodationName,
  size = "md",
  className,
}: FavoriteButtonProps) {
  const isClient = useIsClient();
  const isFavorited = useFavoritesStore((state) =>
    state.favorites.some((favorite) => favorite.slug === slug),
  );
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const [burstId, setBurstId] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const isActive = isClient && isFavorited;

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    const added = toggleFavorite(slug);

    if (added) {
      setBurstId((id) => id + 1);
      toast.success("Salvo nos favoritos", {
        description: accommodationName,
      });
    } else {
      toast("Removido dos favoritos", {
        description: accommodationName,
      });
    }
  }

  const particles = Array.from({ length: BURST_PARTICLE_COUNT }, (_, i) => {
    const angleInDeg =
      BURST_BASE_ANGLE_IN_DEG -
      BURST_ANGLE_SPREAD_IN_DEG / 2 +
      (BURST_ANGLE_SPREAD_IN_DEG / (BURST_PARTICLE_COUNT - 1)) * i;
    const angleInRad = (angleInDeg * Math.PI) / 180;
    return {
      key: i,
      x: Math.cos(angleInRad) * BURST_DISTANCE_IN_PX,
      y: Math.sin(angleInRad) * BURST_DISTANCE_IN_PX,
    };
  });

  const classes = SIZE_CLASSES[size];

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isActive}
      aria-label={
        isActive
          ? `Remover ${accommodationName} dos favoritos`
          : `Salvar ${accommodationName} nos favoritos`
      }
      className={cn(
        "relative flex cursor-pointer items-center justify-center rounded-full bg-white/90 text-blue-950 shadow-sm transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900",
        classes.button,
        className,
      )}
    >
      <motion.div
        key={isActive ? "filled" : "empty"}
        initial={
          shouldReduceMotion
            ? false
            : { scale: isActive ? 0.5 : 1, rotate: isActive ? -25 : 0 }
        }
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
      >
        <Heart
          className={cn(
            classes.icon,
            isActive && "fill-blue-900 text-blue-900",
          )}
        />
      </motion.div>

      {!shouldReduceMotion && burstId > 0 && (
        <motion.span
          key={`ring-${burstId}`}
          initial={{ scale: 0.4, opacity: 0.6 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{ duration: RING_DURATION_IN_SECONDS, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-blue-900/60"
        />
      )}

      <AnimatePresence>
        {!shouldReduceMotion && isActive && burstId > 0 && (
          <motion.div
            key={burstId}
            className="pointer-events-none absolute inset-0"
          >
            {particles.map((particle) => (
              <motion.span
                key={particle.key}
                className="absolute top-1/2 left-1/2 block h-1 w-1 rounded-full bg-blue-900"
                initial={{ x: "-50%", y: "-50%", opacity: 1, scale: 1 }}
                animate={{
                  x: `calc(-50% + ${particle.x}px)`,
                  y: `calc(-50% + ${particle.y}px)`,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{
                  duration: BURST_DURATION_IN_SECONDS,
                  ease: "easeOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
