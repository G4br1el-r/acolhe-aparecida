"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

const LETTER_OFFSET_IN_PX = 24;
const STAGGER_DELAY_IN_SECONDS = 0.02;
const INITIAL_DELAY_IN_SECONDS = 0.1;
const SPRING_STIFFNESS = 300;
const SPRING_DAMPING = 12;

type WaveRevealTitleProps = {
  text: string;
  className?: string;
  shouldAnimate?: boolean;
};

export function WaveRevealTitle({
  text,
  className,
  shouldAnimate = true,
}: WaveRevealTitleProps) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: shouldReduceMotion ? 0 : INITIAL_DELAY_IN_SECONDS,
        staggerChildren: shouldReduceMotion ? 0 : STAGGER_DELAY_IN_SECONDS,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : LETTER_OFFSET_IN_PX,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            type: "spring",
            stiffness: SPRING_STIFFNESS,
            damping: SPRING_DAMPING,
          },
    },
  };

  return (
    <motion.span
      className={className}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {words.map((word, wordIndex) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: words are a fixed, static list from a constant string
          key={wordIndex}
          className="inline-block whitespace-nowrap"
        >
          {word.split("").map((letter, letterIndex) => (
            <motion.span
              // biome-ignore lint/suspicious/noArrayIndexKey: letters are a fixed, static list from a constant string
              key={letterIndex}
              variants={letterVariants}
              className="inline-block"
              style={{ willChange: "transform, opacity" }}
            >
              {letter}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 ? " " : ""}
        </span>
      ))}
    </motion.span>
  );
}
