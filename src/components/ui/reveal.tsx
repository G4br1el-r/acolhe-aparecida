"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const STAGGER_DELAY_IN_SECONDS = 0.25;
const INITIAL_DELAY_IN_SECONDS = 0.1;
const CHILD_DURATION_IN_SECONDS = 0.6;
const CHILD_OFFSET_IN_PX = 24;
const VIEWPORT_MARGIN = "-15% 0px";
const VIEWPORT_AMOUNT = 0.3;

type RevealProps = {
  children: ReactNode;
  className?: string;
  trigger?: "load" | "inView";
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

export function Reveal({ children, className, trigger = "load" }: RevealProps) {
  const containerVariants = useContainerVariants();

  if (trigger === "inView") {
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: false,
          margin: VIEWPORT_MARGIN,
          amount: VIEWPORT_AMOUNT,
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
      animate="visible"
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}

const REVEAL_ITEM_WILL_CHANGE = "transform, opacity";

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
    <motion.div
      className={className}
      variants={itemVariants}
      style={{ willChange: REVEAL_ITEM_WILL_CHANGE }}
    >
      {children}
    </motion.div>
  );
}
