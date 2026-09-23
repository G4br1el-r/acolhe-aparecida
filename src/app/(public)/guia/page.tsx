import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { GuideExplorer } from "@/components/Modules/Cidade/Guia/GuideExplorer";
import { HowToGetThere } from "@/components/Modules/Cidade/Guia/HowToGetThere";

export const metadata: Metadata = {
  title: "Guia de Aparecida | Acolher Aparecida",
  description:
    "Santuários, atrações, restaurantes, estacionamentos, transporte e serviços de Aparecida-SP, com distância objetiva do Santuário Nacional e horários.",
  alternates: { canonical: "/guia" },
};

export default function GuiaPage() {
  return (
    <>
      <Header isSolid />
      <main className="min-h-screen bg-white pt-24 pb-24 md:pt-28">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
          <section aria-labelledby="titulo-guia">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
              Guia de Aparecida
            </p>
            <h1
              id="titulo-guia"
              className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-blue-950 md:text-4xl"
            >
              O que fica perto do Santuário, e a quantos passos
            </h1>
            <p className="mt-4 max-w-2xl text-base text-blue-950/70 md:text-lg">
              Lugares visitados pela nossa equipe, com distância medida a pé.
              Salve o que interessa e encontre tudo depois em Minha Viagem.
            </p>
          </section>

          <HowToGetThere />

          <section aria-label="Lugares do guia">
            <GuideExplorer />
          </section>
        </div>
      </main>
    </>
  );
}
