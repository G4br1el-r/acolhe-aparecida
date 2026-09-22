import Image from "next/image";
import { Header } from "@/components/Header";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { SearchBar } from "./SearchBar";
import { TrustBar } from "./TrustBar";
import { WaveDivider } from "./WaveDivider";
import { WaveRevealTitle } from "./WaveRevealTitle";

type HeroProps = {
  isReady?: boolean;
};

export function Hero({ isReady = true }: HeroProps) {
  return (
    <>
      <section className="relative flex min-h-dvh flex-col overflow-hidden bg-blue-950">
        <Image
          src="/background.png"
          alt="Santuário Nacional de Aparecida ao entardecer"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 z-5 bg-white/50" />

        <Header isReady={isReady} />

        <Reveal
          className="relative z-20 flex flex-1 flex-col"
          shouldAnimate={isReady}
        >
          <div className="flex flex-1 flex-col items-center justify-start px-6 pb-10 pt-24 text-center min-[390px]:justify-center min-[390px]:pb-8 min-[390px]:pt-0">
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
          </div>
        </Reveal>

        <WaveDivider />
      </section>

      <TrustBar />
    </>
  );
}
