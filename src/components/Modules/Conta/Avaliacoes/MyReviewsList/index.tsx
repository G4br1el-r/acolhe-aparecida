"use client";

import { MessageSquareText } from "lucide-react";
import { MyReviewItem } from "@/components/Modules/Conta/Avaliacoes/MyReviewItem";
import { ContaPageHeading } from "@/components/Modules/Conta/Shared/ContaPageHeading";
import { BrandButton, BrandLink } from "@/components/ui/brand-button";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { useMyReviews } from "@/hooks/Modules/Conta/use-my-reviews";

export function MyReviewsList() {
  const { data: reviews, isPending, isError, refetch } = useMyReviews();

  return (
    <section aria-labelledby="avaliacoes-title">
      <ContaPageHeading
        title="Minhas avaliações"
        description="O que você contou sobre as hospedagens por onde passou. Isso ajuda outras famílias e grupos a escolher com mais segurança."
      />

      {isPending ? (
        <div aria-busy className="mt-8 flex flex-col gap-3">
          <Skeleton className="h-40 rounded-3xl" />
          <Skeleton className="h-40 rounded-3xl" />
        </div>
      ) : isError ? (
        <EmptyState
          icon={MessageSquareText}
          tone="error"
          title="Não conseguimos carregar suas avaliações"
          description="Tente de novo em instantes."
          action={
            <BrandButton variant="outline" onClick={() => refetch()}>
              Tentar novamente
            </BrandButton>
          }
          className="mt-8"
        />
      ) : !reviews || reviews.length === 0 ? (
        <EmptyState
          icon={MessageSquareText}
          title="Você ainda não avaliou nenhuma estadia"
          description="Depois do check-out, a opção de avaliar aparece na sua reserva em Minha Viagem."
          action={
            <BrandLink href="/minha-viagem" variant="secondary">
              Ir para Minha Viagem
            </BrandLink>
          }
          className="mt-8"
        />
      ) : (
        <ul className="mt-8 flex flex-col gap-4">
          {reviews.map((review) => (
            <MyReviewItem key={review.id} review={review} />
          ))}
        </ul>
      )}
    </section>
  );
}
