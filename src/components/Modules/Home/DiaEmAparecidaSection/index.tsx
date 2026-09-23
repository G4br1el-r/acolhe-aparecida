"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { DAY_MOMENTS } from "@/constants/Modules/Home/day-moments";
import { MomentPanel } from "./MomentPanel";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const DESKTOP_BREAKPOINT_QUERY = "(min-width: 1024px)";
const SCRUB_SMOOTHING_IN_SECONDS = 0.6;

export function DiaEmAparecidaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mediaMatcher = gsap.matchMedia();

      mediaMatcher.add(
        {
          isDesktop: DESKTOP_BREAKPOINT_QUERY,
          prefersReducedMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, prefersReducedMotion } = context.conditions as {
            isDesktop: boolean;
            prefersReducedMotion: boolean;
          };

          if (!isDesktop || prefersReducedMotion) return;

          const track = trackRef.current;
          const viewport = viewportRef.current;
          const pin = pinRef.current;
          if (!track || !viewport || !pin) return;

          const getScrollDistance = () =>
            Math.max(track.scrollWidth - viewport.clientWidth, 0);

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: pin,
              start: "top top",
              end: () => `+=${getScrollDistance()}`,
              pin: true,
              scrub: SCRUB_SMOOTHING_IN_SECONDS,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });

          timeline.to(track, {
            x: () => -getScrollDistance(),
            ease: "none",
          });

          if (progressRef.current) {
            timeline.fromTo(
              progressRef.current,
              { scaleX: 0 },
              { scaleX: 1, ease: "none" },
              0,
            );
          }
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="bg-white pb-16 md:pb-24">
      <Reveal
        trigger="inView"
        className="mx-auto max-w-7xl px-6 pt-16 md:px-10 md:pt-24"
      >
        <RevealItem>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
            Um dia em Aparecida
          </p>
        </RevealItem>

        <RevealItem className="mt-4">
          <h2 className="max-w-3xl text-4xl font-bold leading-[1.05] text-blue-950 md:text-5xl">
            Você não vem até aqui só para dormir.
          </h2>
        </RevealItem>

        <RevealItem className="mt-6">
          <p className="max-w-2xl text-base text-blue-950/70 md:text-lg">
            Do amanhecer na basílica ao fim de tarde no Morro dos Coqueiros,
            esta é a cidade que espera por você.
          </p>
        </RevealItem>
      </Reveal>

      <Reveal trigger="inView" className="mt-10 lg:hidden">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scrollbar-none px-6 py-4">
          {DAY_MOMENTS.map((moment, index) => (
            <RevealItem
              key={moment.id}
              className="h-[27rem] w-[86vw] shrink-0 snap-center sm:w-[60vw]"
            >
              <MomentPanel moment={moment} isPriority={index === 0} />
            </RevealItem>
          ))}
        </div>
      </Reveal>

      <div
        ref={pinRef}
        className="hidden h-dvh flex-col justify-center gap-8 overflow-hidden lg:flex"
      >
        <div ref={viewportRef} className="w-full overflow-hidden">
          <div ref={trackRef} className="flex w-max gap-6 px-[8vw]">
            {DAY_MOMENTS.map((moment, index) => (
              <div key={moment.id} className="h-[64vh] w-[58vw] shrink-0">
                <MomentPanel moment={moment} isPriority={index === 0} />
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-10">
          <span className="text-xs font-medium text-blue-950/50">
            {DAY_MOMENTS[0].time}
          </span>

          <div className="h-px flex-1 bg-blue-950/10">
            <div
              ref={progressRef}
              className="h-px origin-left scale-x-0 bg-blue-900"
            />
          </div>

          <span className="text-xs font-medium text-blue-950/50">
            {DAY_MOMENTS[DAY_MOMENTS.length - 1].time}
          </span>
        </div>
      </div>
    </section>
  );
}
