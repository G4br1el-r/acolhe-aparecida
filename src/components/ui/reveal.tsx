"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { createContext, type ReactNode, useContext } from "react";

const STAGGER_DELAY_IN_SECONDS = 0.08;
const INITIAL_DELAY_IN_SECONDS = 0.05;
const CHILD_DURATION_IN_SECONDS = 0.35;
const IN_VIEW_STAGGER_DELAY_IN_SECONDS = 0.045;
const IN_VIEW_INITIAL_DELAY_IN_SECONDS = 0;
const IN_VIEW_CHILD_DURATION_IN_SECONDS = 0.28;
const CHILD_OFFSET_IN_PX = 16;
const VIEWPORT_MARGIN = "0px 0px 0px 0px";
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

const InViewRevealContext = createContext(false);

function useContainerVariants(isInView: boolean): Variants {
  const shouldReduceMotion = useReducedMotion();

  const initialDelay = isInView
    ? IN_VIEW_INITIAL_DELAY_IN_SECONDS
    : INITIAL_DELAY_IN_SECONDS;
  const staggerDelay = isInView
    ? IN_VIEW_STAGGER_DELAY_IN_SECONDS
    : STAGGER_DELAY_IN_SECONDS;

  return {
    hidden: {},
    visible: {
      transition: {
        delayChildren: shouldReduceMotion ? 0 : initialDelay,
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
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
  const isInView = trigger === "inView";
  const containerVariants = useContainerVariants(isInView);

  if (isInView) {
    return (
      <InViewRevealContext.Provider value={true}>
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
      </InViewRevealContext.Provider>
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

export function RevealGroup({ children, className }: RevealItemProps) {
  const isInView = useContext(InViewRevealContext);
  const groupVariants = useContainerVariants(isInView);

  return (
    <motion.div className={className} variants={groupVariants}>
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: RevealItemProps) {
  const shouldReduceMotion = useReducedMotion();
  const isInView = useContext(InViewRevealContext);

  const duration = isInView
    ? IN_VIEW_CHILD_DURATION_IN_SECONDS
    : CHILD_DURATION_IN_SECONDS;

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : CHILD_OFFSET_IN_PX,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : duration,
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
