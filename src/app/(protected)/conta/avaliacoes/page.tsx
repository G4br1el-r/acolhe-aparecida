import type { Metadata } from "next";
import { MyReviewsList } from "@/components/Modules/Conta/Avaliacoes/MyReviewsList";

export const metadata: Metadata = {
  title: "Minhas avaliações | Acolher Aparecida",
  description:
    "As avaliações que você deixou sobre as hospedagens por onde passou em Aparecida.",
};

export default function AvaliacoesPage() {
  return <MyReviewsList />;
}
