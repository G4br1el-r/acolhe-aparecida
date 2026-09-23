"use client";

import { Reveal, RevealItem } from "@/components/ui/reveal";
import { BOOKING_STEPS } from "@/constants/Modules/Home/booking-steps";
import { PLATFORM_STATS } from "@/constants/Modules/Home/platform-stats";
import { useActiveStep } from "@/hooks/Modules/Home/use-active-step";
import { StepItem } from "./StepItem";
import { StepStage } from "./StepStage";

export function ComoFuncionaSection() {
  const { activeIndex, setActiveIndex, registerStep } = useActiveStep(
    BOOKING_STEPS.length,
  );

  const activeStep = BOOKING_STEPS[activeIndex] ?? BOOKING_STEPS[0];

  return (
    <section className="relative bg-blue-950">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-160 overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.22),transparent_65%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <Reveal trigger="inView" amount={0.1} margin="0px 0px -5% 0px">
          <RevealItem>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
              Como a reserva funciona aqui
            </p>
          </RevealItem>

          <RevealItem className="mt-5">
            <h2 className="max-w-3xl text-4xl font-bold leading-[1.05] text-white md:text-5xl lg:text-6xl">
              Você paga pela plataforma.{" "}
              <span className="text-white/45">
                Nunca na conta de um desconhecido.
              </span>
            </h2>
          </RevealItem>

          <RevealItem className="mt-6 max-w-2xl">
            <p className="text-base text-white/65 md:text-lg">
              São cinco etapas, do momento em que você escolhe as datas até
              depois que a viagem termina. Todas acontecem aqui dentro.
            </p>
          </RevealItem>

          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-20">
            <div className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
              <StepStage
                step={activeStep}
                activeIndex={activeIndex}
                totalSteps={BOOKING_STEPS.length}
              />
            </div>

            <div className="flex flex-col gap-14 lg:gap-40 lg:pb-[35vh]">
              {BOOKING_STEPS.map((step, index) => (
                <div key={step.id} ref={registerStep(index)}>
                  <RevealItem>
                    <StepItem
                      step={step}
                      isActive={index === activeIndex}
                      onActivate={() => setActiveIndex(index)}
                    />
                  </RevealItem>
                </div>
              ))}
            </div>
          </div>

          <RevealItem className="mt-20">
            <p className="max-w-2xl border-t border-white/12 pt-8 text-base text-white/60 md:text-lg">
              Nossa equipe visitou e fotografou as{" "}
              <strong className="font-semibold text-white">
                {PLATFORM_STATS.verifiedPartnerCount} hospedagens
              </strong>{" "}
              que estão na plataforma.
            </p>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
