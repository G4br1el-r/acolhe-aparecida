"use client";

import { motion, useReducedMotion } from "motion/react";

const LAYER_DURATION_IN_SECONDS = 1.1;
const LAYER_STAGGER_IN_SECONDS = 0.12;
const LAYER_OFFSET_IN_PX = 48;

const WAVE_LAYERS = [
  {
    id: "wave-back",
    path: "M0,54 C110,18 230,6 360,18 C500,31 580,74 720,80 C870,86 960,40 1090,22 C1220,4 1330,14 1440,44 L1440,160 L0,160 Z",
    className: "fill-white/55",
  },
  {
    id: "wave-mid",
    path: "M0,78 C130,44 250,32 380,46 C520,61 610,100 760,104 C910,108 1000,66 1130,48 C1250,32 1350,40 1440,66 L1440,160 L0,160 Z",
    className: "fill-white/80",
  },
  {
    id: "wave-front",
    path: "M0,106 C130,78 250,68 380,80 C520,93 620,124 780,128 C940,132 1030,98 1150,82 C1270,66 1360,74 1440,98 L1440,160 L0,160 Z",
    className: "fill-white",
  },
];

type WaveDividerProps = {
  shouldAnimate?: boolean;
};

export function WaveDivider({ shouldAnimate = true }: WaveDividerProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
      <motion.div
        className="absolute inset-x-0 bottom-0 h-6 bg-white md:h-10"
        initial={shouldReduceMotion ? { y: 0 } : { y: "100%" }}
        animate={
          shouldAnimate ? { y: 0 } : { y: shouldReduceMotion ? 0 : "100%" }
        }
        transition={{
          duration: shouldReduceMotion ? 0 : LAYER_DURATION_IN_SECONDS,
          ease: [0.16, 1, 0.3, 1],
        }}
      />

      <svg
        className="relative block h-22 w-full md:h-34"
        viewBox="0 0 1440 160"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <title>Transição em onda</title>

        {WAVE_LAYERS.map((layer, index) => (
          <motion.path
            key={layer.id}
            d={layer.path}
            className={layer.className}
            initial={
              shouldReduceMotion
                ? { y: 0, opacity: 1 }
                : { y: LAYER_OFFSET_IN_PX, opacity: 0 }
            }
            animate={
              shouldAnimate
                ? { y: 0, opacity: 1 }
                : {
                    y: shouldReduceMotion ? 0 : LAYER_OFFSET_IN_PX,
                    opacity: shouldReduceMotion ? 1 : 0,
                  }
            }
            transition={{
              duration: shouldReduceMotion ? 0 : LAYER_DURATION_IN_SECONDS,
              delay: shouldReduceMotion ? 0 : index * LAYER_STAGGER_IN_SECONDS,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}
      </svg>
    </div>
  );
}
