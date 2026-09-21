"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { Reveal, RevealItem } from "@/components/ui/reveal";

const IMAGE_ENTRANCE_DURATION_IN_SECONDS = 1;

export function CtaSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-100 items-center overflow-hidden bg-white px-6 py-16 md:px-10 md:py-24">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-15% 0px", amount: 0.3 }}
        transition={{
          duration: shouldReduceMotion ? 0 : IMAGE_ENTRANCE_DURATION_IN_SECONDS,
          ease: "easeOut",
        }}
      >
        <Image
          src="/santuario-cta.png"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover object-right opacity-10"
        />
      </motion.div>

      <Reveal
        trigger="inView"
        className="relative z-10 mx-auto w-full max-w-7xl"
      >
        <RevealItem>
          <h2 className="text-4xl font-bold leading-[1.05] text-blue-950 sm:whitespace-nowrap md:text-5xl">
            Aparecida espera por você
          </h2>
        </RevealItem>

        <RevealItem className="mt-4">
          <p className="text-lg text-blue-950/70 sm:whitespace-nowrap md:text-xl">
            Encontre sua hospedagem e planeje sua viagem com tranquilidade.
          </p>
        </RevealItem>

        <RevealItem className="mt-8">
          <button
            type="button"
            className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-blue-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-950 hover:shadow-lg active:scale-95"
          >
            Encontrar hospedagem
            <ArrowRight className="h-4 w-4" />
          </button>
        </RevealItem>
      </Reveal>
    </section>
  );
}
