"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import type { BookingStep } from "@/constants/Modules/Home/booking-steps";
import { StepDetailList } from "../StepDetailList";

const EXPAND_DURATION_IN_SECONDS = 0.3;
const STATE_DURATION_IN_SECONDS = 0.45;
const INACTIVE_OPACITY = 0.35;
const MOBILE_THUMBNAIL_SIZE_IN_PX = 72;

type StepItemProps = {
  step: BookingStep;
  isActive: boolean;
  onActivate: () => void;
};

export function StepItem({ step, isActive, onActivate }: StepItemProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isExpanded, setIsExpanded] = useState(false);

  const detailsId = `step-details-${step.id}`;

  return (
    <div className="relative pl-8 lg:pl-12">
      <span
        aria-hidden
        className="absolute left-0 top-2 bottom-0 w-px bg-white/12"
      />

      <motion.span
        aria-hidden
        className="absolute left-0 top-2 w-px origin-top bg-white"
        initial={false}
        animate={{ scaleY: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
        transition={{
          duration: shouldReduceMotion ? 0 : STATE_DURATION_IN_SECONDS,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ height: "3.5rem" }}
      />

      <motion.div
        initial={false}
        animate={{ opacity: isActive ? 1 : INACTIVE_OPACITY }}
        transition={{
          duration: shouldReduceMotion ? 0 : STATE_DURATION_IN_SECONDS,
          ease: "easeOut",
        }}
      >
        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <span className="text-xs font-semibold tabular-nums tracking-widest text-white/50">
              {step.order}
            </span>

            <h3 className="mt-2 text-2xl font-bold leading-tight text-white md:text-3xl lg:text-[2rem]">
              {step.title}
            </h3>
          </div>

          <div className="relative h-18 w-18 shrink-0 overflow-hidden rounded-xl lg:hidden">
            <Image
              src={step.imageUrl}
              alt={step.imageAlt}
              width={MOBILE_THUMBNAIL_SIZE_IN_PX}
              height={MOBILE_THUMBNAIL_SIZE_IN_PX}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <p className="mt-3 max-w-md text-base leading-relaxed text-white/70">
          {step.summary}
        </p>

        <div className="hidden lg:block">
          <AnimatePresence initial={false}>
            {isActive && (
              <motion.div
                initial={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { height: 0, opacity: 0 }
                }
                animate={{ height: "auto", opacity: 1 }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { height: 0, opacity: 0 }
                }
                transition={{
                  duration: shouldReduceMotion ? 0 : EXPAND_DURATION_IN_SECONDS,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="overflow-hidden"
              >
                <StepDetailList details={step.details} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="lg:hidden">
          <button
            type="button"
            onClick={() => {
              setIsExpanded((previous) => !previous);
              onActivate();
            }}
            aria-expanded={isExpanded}
            aria-controls={detailsId}
            className="mt-4 flex cursor-pointer items-center gap-1.5 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-950"
          >
            {isExpanded ? "Ocultar detalhes" : "Ver detalhes"}
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                id={detailsId}
                initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { height: 0, opacity: 0 }
                }
                transition={{
                  duration: shouldReduceMotion ? 0 : EXPAND_DURATION_IN_SECONDS,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="overflow-hidden"
              >
                <StepDetailList details={step.details} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
