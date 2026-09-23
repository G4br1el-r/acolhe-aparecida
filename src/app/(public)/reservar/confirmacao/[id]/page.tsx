import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { ConfirmationView } from "@/components/Modules/Reserva/Confirmacao/ConfirmationView";

export const metadata: Metadata = {
  title: "Reserva confirmada | Acolher Aparecida",
  robots: { index: false },
};

type ConfirmacaoPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ConfirmacaoPage({
  params,
}: ConfirmacaoPageProps) {
  const { id } = await params;

  return (
    <>
      <Header isSolid />
      <main className="min-h-screen bg-blue-50/40">
        <ConfirmationView reservationId={id} />
      </main>
    </>
  );
}
