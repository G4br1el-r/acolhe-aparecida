import type { Metadata } from "next";
import { TripDetail } from "@/components/Modules/Viagem/Detalhe/TripDetail";

export const metadata: Metadata = {
  title: "Detalhes da viagem | Acolher Aparecida",
  description:
    "Tudo sobre sua reserva em Aparecida: datas, hospedagem, hóspedes, pagamento, mapa e suporte.",
};

type MinhaViagemDetalhePageProps = {
  params: Promise<{ id: string }>;
};

export default async function MinhaViagemDetalhePage({
  params,
}: MinhaViagemDetalhePageProps) {
  const { id } = await params;

  return (
    <section className="mx-auto w-full max-w-5xl px-4 pt-28 pb-32 sm:px-6 lg:px-8 lg:pb-24">
      <TripDetail reservationId={id} />
    </section>
  );
}
