"use client";

import { ArrowRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { ACCOMMODATIONS } from "@/constants/Modules/Home/accommodations";
import { PLATFORM_STATS } from "@/constants/Modules/Home/platform-stats";
import { TRAVELER_PROFILES } from "@/constants/Modules/Home/traveler-profiles";
import { filterAccommodationsByProfiles } from "@/lib/Modules/Home/filter-accommodations";
import { useTravelerProfileStore } from "@/store/Modules/Home/use-traveler-profile-store";

const IMAGE_PARALLAX_IN_PERCENT = 10;

export function FechamentoSection() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const selectedProfileIds = useTravelerProfileStore(
    (state) => state.selectedProfileIds,
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${IMAGE_PARALLAX_IN_PERCENT}%`, `${IMAGE_PARALLAX_IN_PERCENT}%`],
  );

  const matchingCount = filterAccommodationsByProfiles(
    ACCOMMODATIONS,
    selectedProfileIds,
  ).length;

  const selectedLabels = TRAVELER_PROFILES.filter((profile) =>
    selectedProfileIds.includes(profile.id),
  ).map((profile) => profile.shortLabel);

  const hasSelection = selectedLabels.length > 0;

  const searchHref = hasSelection
    ? `/hospedagens?perfis=${selectedProfileIds.join(",")}`
    : "/hospedagens";

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white px-6 py-20 md:px-10 md:py-28"
    >
      <motion.div
        className="absolute inset-[-10%]"
        style={shouldReduceMotion ? undefined : { y: imageY }}
      >
        <Image
          src="/santuario-cta.png"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover object-right opacity-12"
        />
      </motion.div>

      <div className="absolute inset-0 bg-linear-to-r from-white via-white/85 to-white/40" />

      <Reveal trigger="inView" className="relative z-10 mx-auto max-w-7xl">
        <RevealItem>
          <h2 className="max-w-2xl text-4xl font-bold leading-[1.05] text-blue-950 md:text-5xl">
            {hasSelection
              ? "Suas escolhas já estão guardadas."
              : "Pronto para escolher onde ficar?"}
          </h2>
        </RevealItem>

        <RevealItem className="mt-5 max-w-xl">
          <p className="text-lg text-blue-950/70">
            {hasSelection
              ? `Encontramos ${matchingCount} ${
                  matchingCount === 1 ? "hospedagem" : "hospedagens"
                } para ${selectedLabels.join(", ").toLowerCase()}.`
              : `São ${PLATFORM_STATS.verifiedPartnerCount} hospedagens verificadas, todas a poucos minutos do Santuário.`}
          </p>
        </RevealItem>

        <RevealItem className="mt-8">
          <Link
            href={searchHref}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-cta px-7 py-4 text-base font-semibold text-white shadow-md transition-all hover:bg-cta-hover hover:shadow-lg active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-offset-2"
          >
            {hasSelection ? "Ver essas hospedagens" : "Ver hospedagens"}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </RevealItem>
      </Reveal>
    </section>
  );
}
