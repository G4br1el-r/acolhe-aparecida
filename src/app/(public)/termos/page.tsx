import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { LegalDocument } from "@/components/Modules/Suporte/Legal/LegalDocument";
import { TERMS_OF_USE } from "@/constants/Modules/Suporte/terms";

export const metadata: Metadata = {
  title: "Termos de uso | Acolher Aparecida",
  description:
    "Regras de uso da plataforma Acolher Aparecida: reservas, pagamentos, cancelamento e responsabilidades de viajantes e hospedagens parceiras.",
  alternates: { canonical: "/termos" },
};

export default function TermosPage() {
  return (
    <>
      <Header isSolid />
      <main className="min-h-screen bg-white pt-24 pb-24 md:pt-28">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <LegalDocument content={TERMS_OF_USE} />
        </div>
      </main>
    </>
  );
}
