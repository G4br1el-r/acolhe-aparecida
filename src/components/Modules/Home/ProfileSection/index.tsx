import { ArrowRight } from "lucide-react";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import { MAP_HIGHLIGHT_ACCOMMODATION } from "@/constants/Modules/Home/accommodations";
import { HotelCard } from "../HotelCard";
import { MapHighlight } from "./MapHighlight";
import { ProfileSelector } from "./ProfileSelector";
import { TrustPoints } from "./TrustPoints";

export function ProfileSection() {
  return (
    <section className="relative overflow-hidden bg-white px-6 pb-16 pt-4 md:px-10 md:pb-24 md:pt-6">
      <MapHighlight />

      <Reveal trigger="inView" className="relative z-10 mx-auto max-w-7xl">
        <RevealItem className="absolute right-4 top-20 z-20 hidden lg:block xl:right-8 xl:top-24">
          <HotelCard accommodation={MAP_HIGHLIGHT_ACCOMMODATION} variant="sm" />
        </RevealItem>

        <div className="max-w-lg">
          <RevealItem>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
              Para cada peregrino, uma experiência
            </p>
          </RevealItem>

          <RevealItem className="mt-4">
            <h2 className="text-4xl font-bold leading-[1.05] text-blue-950 md:text-5xl">
              Sua viagem não é igual à de todo mundo.
            </h2>
          </RevealItem>

          <RevealItem className="mt-6">
            <p className="text-base text-blue-950/70 md:text-lg">
              Encontre hospedagens que fazem sentido para o seu momento, com o
              que realmente importa, aqui em Aparecida.
            </p>
          </RevealItem>

          <RevealItem className="mt-10">
            <ProfileSelector />
          </RevealItem>

          <RevealItem className="mt-10">
            <TrustPoints />
          </RevealItem>

          <RevealItem className="mt-10 flex flex-wrap items-center gap-6">
            <button
              type="button"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-blue-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-950 hover:shadow-lg active:scale-95"
            >
              Ver hospedagens para o meu perfil
              <ArrowRight className="h-4 w-4" />
            </button>
          </RevealItem>
        </div>
      </Reveal>
    </section>
  );
}
