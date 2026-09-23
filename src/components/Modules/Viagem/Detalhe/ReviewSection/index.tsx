"use client";

import { Star } from "lucide-react";
import type { Reservation } from "@/@types/Modules/Reserva/reservation";
import { ReviewItem } from "@/components/Modules/Hospedagens/Detalhe/ReviewsSection/ReviewItem";
import { BrandLink } from "@/components/ui/brand-button";
import { Skeleton } from "@/components/ui/skeleton";
import { useReservationReview } from "@/hooks/Modules/Viagem/use-reservation-review";
import { TripSection } from "../TripSection";

type ReviewSectionProps = {
  reservation: Reservation;
};

export function ReviewSection({ reservation }: ReviewSectionProps) {
  const hasReview = Boolean(reservation.reviewId);
  const { data: review, isPending } = useReservationReview(
    reservation.id,
    hasReview,
  );

  if (!hasReview) {
    return (
      <section
        aria-labelledby="avaliar-titulo"
        className="flex flex-col gap-4 rounded-3xl bg-white p-5 ring-1 ring-blue-950/8 sm:flex-row sm:items-center sm:justify-between sm:p-7"
      >
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-500">
            <Star className="h-5 w-5 fill-current" aria-hidden />
          </span>
          <div>
            <h2
              id="avaliar-titulo"
              className="text-xl font-semibold tracking-tight text-blue-950"
            >
              Como foi sua estadia?
            </h2>
            <p className="mt-1 text-sm text-blue-950/65">
              Sua avaliação ajuda outras famílias e romarias a escolher com
              confiança. Leva menos de dois minutos.
            </p>
          </div>
        </div>
        <BrandLink
          href={`/minha-viagem/${reservation.id}/avaliar`}
          variant="accent"
          className="shrink-0"
        >
          Avaliar estadia
        </BrandLink>
      </section>
    );
  }

  return (
    <TripSection
      id="avaliacao"
      title="Sua avaliação"
      description="Publicada na página da hospedagem como estadia verificada."
    >
      {isPending ? (
        <Skeleton className="h-32" />
      ) : review ? (
        <ul>
          <ReviewItem review={review} />
        </ul>
      ) : (
        <p className="text-sm text-blue-950/65">
          Não encontramos o texto da sua avaliação, mas ela está registrada.
        </p>
      )}
    </TripSection>
  );
}
