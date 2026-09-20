import Image from "next/image";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { Header } from "./Header";
import { SearchBar } from "./SearchBar";
import { TrustBar } from "./TrustBar";
import { WaveDivider } from "./WaveDivider";

export function Hero() {
  return (
    <>
      <section className="relative flex h-dvh flex-col overflow-hidden bg-blue-950">
        <Image
          src="/background.png"
          alt="Santuário Nacional de Aparecida ao entardecer"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-t from-white via-white/70 to-transparent" />

        <Reveal className="relative z-10 flex flex-1 flex-col">
          <RevealItem>
            <Header />
          </RevealItem>

          <div className="flex flex-1 flex-col items-center justify-center px-6 pb-8 text-center">
            <RevealItem>
              <h1 className="max-w-4xl text-5xl font-bold leading-[1.05] text-blue-950 md:text-7xl">
                Sua viagem ao Santuário, em boas mãos
              </h1>
            </RevealItem>

            <RevealItem className="mt-4 max-w-lg">
              <p className="text-base text-blue-950/70 md:text-lg">
                Hospedagens para sua fé, com reserva segura e sem complicação.
              </p>
            </RevealItem>

            <RevealItem className="mt-8 w-full max-w-3xl md:mt-10">
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
