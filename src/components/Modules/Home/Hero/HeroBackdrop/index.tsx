"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useRef } from "react";

const PARALLAX_OVERSCAN_IN_PERCENT = 18;
const PARALLAX_SHIFT_IN_PERCENT = 14;
const SCALE_AT_END = 1.06;

export function HeroBackdrop() {
  const backdropRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: backdropRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `${PARALLAX_SHIFT_IN_PERCENT}%`],
  );
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, SCALE_AT_END]);

  return (
    <div ref={backdropRef} className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-x-0"
        style={{
          top: `-${PARALLAX_OVERSCAN_IN_PERCENT}%`,
          bottom: `-${PARALLAX_OVERSCAN_IN_PERCENT}%`,
          ...(shouldReduceMotion ? {} : { y: imageY, scale: imageScale }),
        }}
      >
        <Image
          src="/background.png"
          alt="Santuário Nacional de Aparecida ao entardecer"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      <div className="absolute inset-0 bg-linear-to-b from-white/20 via-white/45 to-white/85" />
      <div className="absolute inset-0 bg-linear-to-t from-white/70 via-transparent to-transparent" />
    </div>
  );
}
