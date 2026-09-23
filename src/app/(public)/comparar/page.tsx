import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { CompareTable } from "@/components/Modules/Hospedagens/Comparacao/CompareTable";

export const metadata: Metadata = {
  title: "Comparar hospedagens | Acolher Aparecida",
  description:
    "Compare até quatro hospedagens de Aparecida-SP lado a lado: preço total, distância do Santuário, estacionamento, alimentação, acessibilidade e cancelamento.",
  alternates: { canonical: "/comparar" },
};

export default function CompararPage() {
  return (
    <>
      <Header isSolid />
      <main className="min-h-screen bg-white pt-24 pb-24 md:pt-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <CompareTable />
        </div>
      </main>
    </>
  );
}
