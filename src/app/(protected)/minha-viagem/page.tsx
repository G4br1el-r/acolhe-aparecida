import type { Metadata } from "next";
import { TripHub } from "@/components/Modules/Viagem/Hub/TripHub";

export const metadata: Metadata = {
  title: "Minha Viagem | Acolher Aparecida",
  description:
    "Suas reservas em Aparecida em um só lugar: próximas viagens, histórico e tudo o que você precisa para chegar tranquilo.",
};

export default function MinhaViagemPage() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 pt-28 pb-24 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-blue-950 md:text-4xl">
          Minha Viagem
        </h1>
        <p className="mt-2 text-blue-950/70">
          Suas reservas em Aparecida, do dia da compra até a volta para casa.
        </p>
      </header>

      <TripHub />
    </section>
  );
}
