import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { ResultsView } from "@/components/Modules/Hospedagens/Busca/ResultsView";
import {
  parseSearchParams,
  type RawSearchParams,
} from "@/schemas/Modules/Hospedagens/Busca/search-params";

export const metadata: Metadata = {
  title: "Hospedagens em Aparecida | Acolher Aparecida",
  description:
    "Hotéis, pousadas e casas perto do Santuário Nacional, com distância a pé, estacionamento para van e ônibus, acessibilidade verificada e reserva pela plataforma.",
  alternates: { canonical: "/hospedagens" },
};

type HospedagensPageProps = {
  searchParams: Promise<RawSearchParams>;
};

export default async function HospedagensPage({
  searchParams,
}: HospedagensPageProps) {
  const params = parseSearchParams(await searchParams);

  return (
    <>
      <Header isSolid />
      <main className="min-h-screen bg-blue-50/40">
        <ResultsView params={params} />
      </main>
    </>
  );
}
