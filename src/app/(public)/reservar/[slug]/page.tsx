import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { CheckoutView } from "@/components/Modules/Reserva/Checkout/CheckoutView";
import { findAccommodationBySlug } from "@/lib/Modules/Hospedagens/Detalhe/accommodation";

type ReservarPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ReservarPageProps): Promise<Metadata> {
  const { slug } = await params;
  const accommodation = findAccommodationBySlug(slug);

  return {
    title: accommodation
      ? `Reservar ${accommodation.name} | Acolher Aparecida`
      : "Reserva | Acolher Aparecida",
    robots: { index: false },
  };
}

export default async function ReservarPage({ params }: ReservarPageProps) {
  const { slug } = await params;
  const accommodation = findAccommodationBySlug(slug);

  if (!accommodation) {
    notFound();
  }

  return (
    <>
      <Header isSolid />
      <main className="min-h-screen bg-blue-50/40">
        <CheckoutView accommodation={accommodation} />
      </main>
    </>
  );
}
