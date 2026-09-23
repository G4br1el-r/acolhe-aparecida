import type { Metadata } from "next";
import { ReviewGate } from "@/components/Modules/Viagem/Avaliar/ReviewGate";

export const metadata: Metadata = {
  title: "Avaliar estadia | Acolher Aparecida",
  description:
    "Conte como foi sua hospedagem em Aparecida e ajude outras famílias e romarias a escolher com confiança.",
};

type AvaliarPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AvaliarPage({ params }: AvaliarPageProps) {
  const { id } = await params;

  return (
    <section className="mx-auto w-full max-w-3xl px-4 pt-28 pb-24 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-blue-950 md:text-4xl">
          Como foi sua estadia?
        </h1>
        <p className="mt-2 text-blue-950/70">
          Sua avaliação entra na página da hospedagem como estadia verificada.
        </p>
      </header>

      <ReviewGate reservationId={id} />
    </section>
  );
}
