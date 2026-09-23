"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const STAGGER_DELAY_IN_SECONDS = 0.08;
const INITIAL_DELAY_IN_SECONDS = 0.05;
const CHILD_DURATION_IN_SECONDS = 0.35;
const CHILD_OFFSET_IN_PX = 16;
const VIEWPORT_MARGIN = "-12% 0px -12% 0px";
const VIEWPORT_AMOUNT: number | "some" | "all" = "some";

type RevealProps = {
  children: ReactNode;
  className?: string;
  trigger?: "load" | "inView";
  once?: boolean;
  amount?: number | "some" | "all";
  margin?: string;
  shouldAnimate?: boolean;
};

type RevealItemProps = {
  children: ReactNode;
  className?: string;
};

function useContainerVariants(): Variants {
  const shouldReduceMotion = useReducedMotion();

  return {
    hidden: {},
    visible: {
      transition: {
        delayChildren: shouldReduceMotion ? 0 : INITIAL_DELAY_IN_SECONDS,
        staggerChildren: shouldReduceMotion ? 0 : STAGGER_DELAY_IN_SECONDS,
      },
    },
  };
}

export function Reveal({
  children,
  className,
  trigger = "load",
  once = true,
  amount = VIEWPORT_AMOUNT,
  margin = VIEWPORT_MARGIN,
  shouldAnimate = true,
}: RevealProps) {
  const containerVariants = useContainerVariants();

  if (trigger === "inView") {
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once,
          margin,
          amount,
        }}
        variants={containerVariants}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: RevealItemProps) {
  const shouldReduceMotion = useReducedMotion();

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : CHILD_OFFSET_IN_PX,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : CHILD_DURATION_IN_SECONDS,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
