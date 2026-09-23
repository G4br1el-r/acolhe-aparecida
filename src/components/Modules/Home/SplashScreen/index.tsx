"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const LOGO_APPEAR_DURATION_IN_SECONDS = 0.45;
const EXIT_DURATION_IN_SECONDS = 0.5;

const HOLD_BEFORE_EXIT_IN_MS = 620;
const REDUCED_MOTION_HOLD_IN_MS = 240;

const LOGO_LIFT_IN_PX = 8;

type SplashScreenProps = {
  onReveal?: () => void;
  onFinish?: () => void;
};

export function SplashScreen({ onReveal, onFinish }: SplashScreenProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const holdDuration = shouldReduceMotion
      ? REDUCED_MOTION_HOLD_IN_MS
      : HOLD_BEFORE_EXIT_IN_MS;

    const exitTimeout = setTimeout(() => {
      setIsExiting(true);
      onReveal?.();
    }, holdDuration);

    return () => clearTimeout(exitTimeout);
  }, [shouldReduceMotion, onReveal]);

  useEffect(() => {
    if (!isExiting) return;

    const doneTimeout = setTimeout(
      () => onFinish?.(),
      shouldReduceMotion ? 0 : EXIT_DURATION_IN_SECONDS * 1000,
    );

    return () => clearTimeout(doneTimeout);
  }, [isExiting, shouldReduceMotion, onFinish]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-100 flex items-center justify-center bg-white"
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{
        duration: shouldReduceMotion ? 0.15 : EXIT_DURATION_IN_SECONDS,
        ease: "easeInOut",
      }}
    >
      <motion.div
        className="relative h-28 w-28"
        initial={{
          opacity: 0,
          scale: shouldReduceMotion ? 1 : 0.96,
          y: shouldReduceMotion ? 0 : LOGO_LIFT_IN_PX,
        }}
        animate={
          isExiting
            ? { opacity: 0, scale: shouldReduceMotion ? 1 : 1.02, y: 0 }
            : { opacity: 1, scale: 1, y: 0 }
        }
        transition={{
          duration: shouldReduceMotion ? 0 : LOGO_APPEAR_DURATION_IN_SECONDS,
          ease: "easeOut",
        }}
      >
        <Image
          src="/logo.png"
          alt="Acolher Aparecida"
          fill
          priority
          sizes="112px"
          className="object-contain"
        />
      </motion.div>
    </motion.div>
  );
}
