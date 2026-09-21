"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

const ENTRANCE_DURATION_IN_SECONDS = 0.4;

export function MapHighlight() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-15% 0px", amount: 0.3 }}
      transition={{
        duration: shouldReduceMotion ? 0 : ENTRANCE_DURATION_IN_SECONDS,
        ease: "easeOut",
      }}
    >
      <Image
        src="/maps.png"
        alt="Mapa de hospedagens próximas ao Santuário Nacional de Aparecida"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-white to-transparent md:h-48" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-white to-transparent md:h-48" />
    </motion.div>
  );
}
