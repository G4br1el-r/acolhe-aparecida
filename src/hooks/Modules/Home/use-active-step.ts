"use client";

import { useEffect, useRef, useState } from "react";

const ACTIVATION_LINE_RATIO = 0.45;
const FIRST_STEP_INDEX = 0;

export function useActiveStep(totalSteps: number) {
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(FIRST_STEP_INDEX);

  useEffect(() => {
    function updateActiveStep() {
      const activationLine = window.innerHeight * ACTIVATION_LINE_RATIO;

      let closestIndex = FIRST_STEP_INDEX;
      let smallestDistance = Number.POSITIVE_INFINITY;

      stepRefs.current.forEach((element, index) => {
        if (!element) {
          return;
        }

        const { top, height } = element.getBoundingClientRect();
        const distance = Math.abs(top + height / 2 - activationLine);

        if (distance < smallestDistance) {
          smallestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    }

    updateActiveStep();
    window.addEventListener("scroll", updateActiveStep, { passive: true });
    window.addEventListener("resize", updateActiveStep);

    return () => {
      window.removeEventListener("scroll", updateActiveStep);
      window.removeEventListener("resize", updateActiveStep);
    };
  }, []);

  function registerStep(index: number) {
    return (element: HTMLDivElement | null) => {
      stepRefs.current[index] = element;
    };
  }

  return { activeIndex, setActiveIndex, registerStep, totalSteps };
}
