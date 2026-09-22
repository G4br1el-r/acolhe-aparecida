"use client";

import { Heart } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const BURST_PARTICLE_COUNT = 6;
const BURST_ANGLE_SPREAD_IN_DEG = 140;
const BURST_BASE_ANGLE_IN_DEG = -90;
const BURST_DISTANCE_IN_PX = 22;
const BURST_DURATION_IN_SECONDS = 0.55;

const ICON_SPRING_STIFFNESS = 420;
const ICON_SPRING_DAMPING = 9;
const RING_DURATION_IN_SECONDS = 0.5;

type FavoriteButtonProps = {
  isCompact?: boolean;
  accommodationName: string;
};

export function FavoriteButton({
  isCompact = false,
  accommodationName,
}: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [burstId, setBurstId] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  function handleClick() {
    const next = !isFavorited;
    setIsFavorited(next);

    if (next) {
      setBurstId((id) => id + 1);
      toast.success("Adicionado aos favoritos", {
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

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isFavorited}
      aria-label="Favoritar hospedagem"
      className={`relative flex cursor-pointer items-center justify-center rounded-full bg-white/90 text-blue-950 shadow-sm transition-colors hover:bg-white ${
        isCompact ? "h-6 w-6" : "h-7 w-7"
      }`}
    >
      <motion.div
        key={isFavorited ? "filled" : "empty"}
        initial={
          shouldReduceMotion
            ? false
            : { scale: isFavorited ? 0.5 : 1, rotate: isFavorited ? -25 : 0 }
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
          className={`${isCompact ? "h-3 w-3" : "h-3.5 w-3.5"} ${
            isFavorited ? "fill-blue-900 text-blue-900" : ""
          }`}
        />
      </motion.div>

      {!shouldReduceMotion && (
        <motion.span
          key={`ring-${burstId}`}
          initial={{ scale: 0.4, opacity: isFavorited ? 0.6 : 0 }}
          animate={{ scale: isFavorited ? 1.8 : 0.4, opacity: 0 }}
          transition={{ duration: RING_DURATION_IN_SECONDS, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-blue-900/60"
        />
      )}

      <AnimatePresence>
        {!shouldReduceMotion && isFavorited && (
          <motion.div
            key={burstId}
            className="pointer-events-none absolute inset-0"
          >
            {particles.map((particle) => (
              <motion.span
                key={particle.key}
                className="absolute left-1/2 top-1/2 block h-1 w-1 rounded-full bg-blue-900"
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
