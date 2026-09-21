"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const LOGO_APPEAR_DURATION_IN_SECONDS = 0.4;
const LOGO_FADE_OUT_DURATION_IN_SECONDS = 0.3;

const SHINE_DURATION_IN_SECONDS = 0.8;
const SHINE_DELAY_IN_SECONDS = 0.2;

const STRIPE_COUNT = 6;
const STRIPE_EXIT_DURATION_IN_SECONDS = 0.5;
const STRIPE_STAGGER_IN_SECONDS = 0.06;

const HOLD_BEFORE_EXIT_IN_MS = 1000;
const REDUCED_MOTION_HOLD_IN_MS = 300;

type SplashScreenProps = {
  onReveal?: () => void;
  onFinish?: () => void;
};

export function SplashScreen({ onReveal, onFinish }: SplashScreenProps) {
  const [isExiting, setIsExiting] = useState(false);
  const shouldReduceMotion = useReducedMotion();

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

    const stripesMs = shouldReduceMotion
      ? 0
      : STRIPE_EXIT_DURATION_IN_SECONDS * 1000 +
        (STRIPE_COUNT - 1) * STRIPE_STAGGER_IN_SECONDS * 1000;
    const doneTimeout = setTimeout(() => onFinish?.(), stripesMs);
    return () => clearTimeout(doneTimeout);
  }, [isExiting, shouldReduceMotion, onFinish]);

  return (
    <div className="pointer-events-none fixed inset-0 z-100 overflow-hidden">
      {Array.from({ length: STRIPE_COUNT }).map((_, index) => {
        const isFromLeft = index % 2 === 0;
        const offscreenX = isFromLeft ? "-100%" : "100%";
        const exitDelay = shouldReduceMotion
          ? 0
          : index * STRIPE_STAGGER_IN_SECONDS;

        return (
          <motion.div
            // biome-ignore lint/suspicious/noArrayIndexKey: stripes are a fixed, static list
            key={index}
            className="absolute inset-x-0 bg-white"
            style={{
              top: `${(index / STRIPE_COUNT) * 100}%`,
              height: `${100 / STRIPE_COUNT}%`,
            }}
            initial={{ x: 0 }}
            animate={{ x: isExiting && !shouldReduceMotion ? offscreenX : 0 }}
            transition={{
              duration: shouldReduceMotion
                ? 0
                : STRIPE_EXIT_DURATION_IN_SECONDS,
              delay: exitDelay,
              ease: "easeInOut",
            }}
          />
        );
      })}

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <motion.div
          className="relative z-10 h-32 w-32 overflow-hidden"
          animate={{
            opacity: isExiting ? 0 : 1,
            scale: isExiting ? 1 : shouldReduceMotion ? 1 : [0.92, 1],
          }}
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.92 }}
          transition={{
            duration: shouldReduceMotion
              ? 0
              : isExiting
                ? LOGO_FADE_OUT_DURATION_IN_SECONDS
                : LOGO_APPEAR_DURATION_IN_SECONDS,
            ease: "easeOut",
          }}
        >
          <Image
            src="/logo.png"
            alt="Acolher Aparecida"
            fill
            className="object-contain"
          />

          {!shouldReduceMotion && (
            <motion.div
              className="absolute -inset-y-full -inset-x-1/2 rotate-45 bg-linear-to-r from-transparent via-white/80 to-transparent"
              initial={{ x: "-100%", y: "-100%" }}
              animate={{ x: "100%", y: "100%" }}
              transition={{
                duration: SHINE_DURATION_IN_SECONDS,
                delay: SHINE_DELAY_IN_SECONDS,
                ease: "easeInOut",
              }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}
