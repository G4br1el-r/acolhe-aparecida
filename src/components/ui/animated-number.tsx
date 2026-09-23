"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const COUNT_DURATION_IN_SECONDS = 1.1;
const VIEWPORT_AMOUNT = 0.4;

type AnimatedNumberProps = {
  value: number;
  className?: string;
};

export function AnimatedNumber({ value, className }: AnimatedNumberProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(elementRef, {
    once: true,
    amount: VIEWPORT_AMOUNT,
  });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(value);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!isInView || shouldReduceMotion || hasAnimatedRef.current) {
      setDisplayValue(value);
      return;
    }

    hasAnimatedRef.current = true;
    setDisplayValue(0);

    const controls = animate(0, value, {
      duration: COUNT_DURATION_IN_SECONDS,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, value, shouldReduceMotion]);

  return (
    <span ref={elementRef} className={className}>
      {displayValue.toLocaleString("pt-BR")}
    </span>
  );
}
