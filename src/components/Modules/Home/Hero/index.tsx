"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/Modules/Hospedagens/Busca/SearchBar";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { HeroBackdrop } from "./HeroBackdrop";
import { LiveStatsLine } from "./LiveStatsLine";
import { WaveDivider } from "./WaveDivider";
import { WaveRevealTitle } from "./WaveRevealTitle";

const WAVE_ENTRANCE_DELAY_IN_MS = 450;

type HeroProps = {
  isReady?: boolean;
};

export function Hero({ isReady = true }: HeroProps) {
  const [isWaveReady, setIsWaveReady] = useState(false);

  useEffect(() => {
    if (!isReady) {
      setIsWaveReady(false);
      return;
    }

    const entranceTimeout = setTimeout(
      () => setIsWaveReady(true),
      WAVE_ENTRANCE_DELAY_IN_MS,
    );

    return () => clearTimeout(entranceTimeout);
  }, [isReady]);

  return (
    <section className="relative flex min-h-dvh flex-col overflow-hidden bg-blue-950">
      <HeroBackdrop />

      <Header isReady={isReady} />

      <Reveal
        className="relative z-20 grid flex-1 grid-rows-[var(--hero-header-space)_1fr_var(--hero-wave-space)] [--hero-header-space:5rem] [--hero-wave-space:2.5rem] md:[--hero-header-space:6rem] md:[--hero-wave-space:4rem]"
        shouldAnimate={isReady}
      >
        <div className="row-start-2 flex flex-col items-center justify-center px-6 text-center">
          <RevealItem>
            <h1 className="max-w-6xl text-[clamp(1.625rem,0.85rem+3.875vw,5.5rem)] font-bold leading-[1.05] text-blue-950">
              <WaveRevealTitle
                text="Sua viagem ao Santuário, em boas mãos."
                shouldAnimate={isReady}
              />
            </h1>
          </RevealItem>

          <RevealItem className="mt-2 max-w-lg md:mt-4">
            <p className="text-sm text-blue-950/70 md:text-lg">
              Hospedagens para sua fé, com reserva segura e sem complicação.
            </p>
          </RevealItem>

          <RevealItem className="mt-4 w-full max-w-3xl md:mt-10">
            <SearchBar />
          </RevealItem>

          <RevealItem className="mt-5 w-full max-w-3xl md:mt-7">
            <LiveStatsLine />
          </RevealItem>
        </div>
      </Reveal>

      <WaveDivider shouldAnimate={isWaveReady} />
    </section>
  );
}
