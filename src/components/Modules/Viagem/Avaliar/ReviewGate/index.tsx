"use client";

import { CircleAlert, MessageSquareHeart } from "lucide-react";
import { TripDetailSkeleton } from "@/components/Modules/Viagem/Detalhe/TripDetailSkeleton";
import { TripNotFound } from "@/components/Modules/Viagem/Detalhe/TripNotFound";
import { BrandButton, BrandLink } from "@/components/ui/brand-button";
import { EmptyState } from "@/components/ui/empty-state";
import { useCurrentUser } from "@/hooks/Modules/Conta/use-session";
import { useReservation } from "@/hooks/Modules/Reserva/use-reservations";
import { findAccommodationBySlug } from "@/mocks/Modules/Hospedagens/accommodations";
import { ReviewForm } from "../ReviewForm";

type ReviewGateProps = {
  reservationId: string;
};

export function ReviewGate({ reservationId }: ReviewGateProps) {
  const { user, isResolving } = useCurrentUser();
  const {
    data: reservation,
    isPending,
    isError,
    refetch,
  } = useReservation(reservationId);

  if (isPending || isResolving) return <TripDetailSkeleton />;

  if (isError) {
    return (
      <EmptyState
        tone="error"
        icon={CircleAlert}
        title="Não conseguimos abrir sua reserva"
        description="Tente de novo em instantes."
        action={
          <BrandButton variant="primary" onClick={() => refetch()}>
            Tentar novamente
          </BrandButton>
        }
      />
    );
  }

  if (!reservation || !user || reservation.userId !== user.id) {
    return <TripNotFound />;
  }

  const accommodation = findAccommodationBySlug(reservation.accommodationSlug);
  const detailHref = `/minha-viagem/${reservation.id}`;

  if (!accommodation) return <TripNotFound />;

  if (reservation.reviewId) {
    return (
      <EmptyState
        icon={MessageSquareHeart}
        title="Você já avaliou esta estadia"
        description="Obrigado. Sua avaliação está publicada na página da hospedagem."
        action={
          <BrandLink href={detailHref} variant="primary">
            Ver minha avaliação
          </BrandLink>
        }
      />
    );
  }

  if (reservation.status !== "concluida") {
    return (
      <EmptyState
        icon={MessageSquareHeart}
        title="A avaliação abre depois do check-out"
        description="Só quem concluiu a estadia pode avaliar. Assim as notas continuam confiáveis para todo mundo."
        action={
          <BrandLink href={detailHref} variant="primary">
            Voltar para a reserva
          </BrandLink>
        }
      />
    );
  }

  return (
    <ReviewForm
      reservation={reservation}
      accommodation={accommodation}
      user={user}
    />
  );
}
