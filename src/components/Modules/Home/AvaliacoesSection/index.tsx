"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { GUEST_REVIEWS } from "@/constants/Modules/Home/guest-reviews";
import { PLATFORM_STATS } from "@/constants/Modules/Home/platform-stats";
import { averageReviewRating } from "@/lib/Modules/Home/average-review-rating";
import { selectReviewsByProfiles } from "@/lib/Modules/Home/select-reviews";
import { useTravelerProfileStore } from "@/store/Modules/Home/use-traveler-profile-store";
import { ReviewCard } from "./ReviewCard";

const FADE_DURATION_IN_SECONDS = 0.35;

export function AvaliacoesSection() {
  const shouldReduceMotion = useReducedMotion();
  const selectedProfileIds = useTravelerProfileStore(
    (state) => state.selectedProfileIds,
  );

  const visibleReviews = selectReviewsByProfiles(
    GUEST_REVIEWS,
    selectedProfileIds,
  );

  const reviewsKey = visibleReviews.map((review) => review.id).join("-");
  const averageRating = averageReviewRating(visibleReviews);

  return (
    <section className="bg-blue-50/50 px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal trigger="inView" amount={0.1}>
          <RevealItem>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
              Quem já ficou
            </p>
          </RevealItem>

          <RevealGroup className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <RevealItem>
              <h2 className="max-w-2xl text-4xl font-bold leading-[1.05] tracking-tight text-blue-950 md:text-5xl">
                Avaliações de quem viajou como você.
              </h2>
            </RevealItem>

            <RevealItem className="shrink-0">
              <p className="flex items-baseline gap-2 text-blue-950">
                <span className="text-4xl font-bold leading-none tracking-tight">
                  {averageRating.toLocaleString("pt-BR", {
                    minimumFractionDigits: 1,
                  })}
                </span>
                <span className="text-sm text-blue-950/60">
                  em {PLATFORM_STATS.reviewCount.toLocaleString("pt-BR")}{" "}
                  avaliações
                </span>
              </p>
            </RevealItem>
          </RevealGroup>

          <RevealItem className="mt-5 max-w-2xl">
            <p className="text-base text-blue-950/70 md:text-lg">
              Só quem reservou aqui dentro e concluiu a estadia pode avaliar.
            </p>
          </RevealItem>

          <AnimatePresence mode="wait">
            <motion.div
              key={reviewsKey}
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: shouldReduceMotion ? 0 : FADE_DURATION_IN_SECONDS,
              }}
              className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {visibleReviews.map((review) => (
                <RevealItem key={review.id} className="h-full">
                  <ReviewCard review={review} />
                </RevealItem>
              ))}
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
