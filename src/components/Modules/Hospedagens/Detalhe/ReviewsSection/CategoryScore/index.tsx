"use client";

import { motion, useReducedMotion } from "motion/react";

const MAX_SCORE = 5;
const PERCENT_MULTIPLIER = 100;
const BAR_DURATION_IN_SECONDS = 0.7;
const BAR_STAGGER_IN_SECONDS = 0.07;
const VIEWPORT_AMOUNT = 0.6;

type CategoryScoreProps = {
  label: string;
  score: number;
  index: number;
};

export function CategoryScore({ label, score, index }: CategoryScoreProps) {
  const shouldReduceMotion = useReducedMotion();
  const fillPercent = (score / MAX_SCORE) * PERCENT_MULTIPLIER;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm text-blue-950/70">{label}</span>
        <span className="text-sm font-semibold text-blue-950">
          {score.toFixed(1).replace(".", ",")}
        </span>
      </div>

      <div className="mt-2 h-1 overflow-hidden rounded-full bg-blue-950/10">
        <motion.div
          initial={{ width: shouldReduceMotion ? `${fillPercent}%` : 0 }}
          whileInView={{ width: `${fillPercent}%` }}
          viewport={{ once: true, amount: VIEWPORT_AMOUNT }}
          transition={{
            duration: shouldReduceMotion ? 0 : BAR_DURATION_IN_SECONDS,
            delay: shouldReduceMotion ? 0 : index * BAR_STAGGER_IN_SECONDS,
            ease: "easeOut",
          }}
          className="h-full rounded-full bg-blue-900"
        />
      </div>
    </div>
  );
}
