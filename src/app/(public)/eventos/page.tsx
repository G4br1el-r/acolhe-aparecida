import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { EventsTimeline } from "@/components/Modules/Cidade/Eventos/EventsTimeline";
import { DEMAND_EXPLANATION } from "@/constants/Modules/Cidade/demand-levels";

export const metadata: Metadata = {
  title: "Datas e eventos | Acolher Aparecida",
  description:
    "Calendário das romarias, festas e feriados de Aparecida-SP, com nível de procura por hospedagem e busca direta para as datas de cada evento.",
  alternates: { canonical: "/eventos" },
};

export default function EventosPage() {
  return (
    <>
      <Header isSolid />
      <main className="min-h-screen bg-white pt-24 pb-24 md:pt-28">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <section aria-labelledby="titulo-eventos" className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
              Datas e eventos
            </p>
            <h1
              id="titulo-eventos"
              className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-blue-950 md:text-4xl"
            >
              Quando Aparecida enche, e como se planejar
            </h1>
            <p className="mt-4 max-w-2xl text-base text-blue-950/70 md:text-lg">
              {DEMAND_EXPLANATION}
            </p>
          </section>

          <EventsTimeline />
        </div>
      </main>
    </>
  );
}
