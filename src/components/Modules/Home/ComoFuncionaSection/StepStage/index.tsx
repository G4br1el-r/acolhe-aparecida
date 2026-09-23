"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import type { BookingStep } from "@/constants/Modules/Home/booking-steps";

const CROSSFADE_DURATION_IN_SECONDS = 0.6;
const IMAGE_SCALE_FROM = 1.06;
const CAPTION_OFFSET_IN_PX = 12;
const CAPTION_DELAY_IN_SECONDS = 0.12;

type StepStageProps = {
  step: BookingStep;
  activeIndex: number;
  totalSteps: number;
};

export function StepStage({ step, activeIndex, totalSteps }: StepStageProps) {
  const shouldReduceMotion = useReducedMotion();

  const progressRatio = (activeIndex + 1) / totalSteps;

  return (
    <div className="relative aspect-4/5 w-full overflow-hidden rounded-[2rem] bg-blue-900 lg:aspect-auto lg:h-[calc(100vh-12rem)] lg:max-h-144">
      <AnimatePresence initial={false}>
        <motion.div
          key={step.id}
          className="absolute inset-0"
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, scale: IMAGE_SCALE_FROM }
          }
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : CROSSFADE_DURATION_IN_SECONDS,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <Image
            src={step.imageUrl}
            alt={step.imageAlt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-linear-to-t from-blue-950 via-blue-950/45 to-blue-950/5" />

      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={step.id}
            className="max-w-sm text-sm leading-relaxed text-white/85 md:text-base"
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: CAPTION_OFFSET_IN_PX }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: shouldReduceMotion
                ? 0
                : CROSSFADE_DURATION_IN_SECONDS / 2,
              delay: shouldReduceMotion ? 0 : CAPTION_DELAY_IN_SECONDS,
              ease: "easeOut",
            }}
          >
            {step.imageCaption}
          </motion.p>
        </AnimatePresence>

        <div className="mt-6 flex items-center gap-4">
          <span className="text-xs font-semibold tabular-nums text-white/60">
            {step.order} / {String(totalSteps).padStart(2, "0")}
          </span>

          <div className="h-px flex-1 bg-white/20">
            <motion.div
              className="h-px origin-left bg-white"
              initial={false}
              animate={{ scaleX: progressRatio }}
              transition={{
                duration: shouldReduceMotion
                  ? 0
                  : CROSSFADE_DURATION_IN_SECONDS,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
