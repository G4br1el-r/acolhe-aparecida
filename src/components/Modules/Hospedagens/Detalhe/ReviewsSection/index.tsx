"use client";

import { ShieldCheck, Star } from "lucide-react";
import { useState } from "react";
import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import type { ReviewTravelerType } from "@/@types/Modules/Hospedagens/review";
import { Chip } from "@/components/ui/chip";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TRAVELER_TYPE_FILTERS,
  VISIBLE_REVIEWS_COUNT,
} from "@/constants/Modules/Hospedagens/Detalhe/review-labels";
import {
  REVIEW_CATEGORY_LABELS,
  REVIEW_CATEGORY_ORDER,
} from "@/constants/Modules/Hospedagens/features";
import { useAccommodationReviews } from "@/hooks/Modules/Hospedagens/use-accommodation";
import { pluralize } from "@/lib/Modules/Hospedagens/format-date";
import { DetailSection } from "../DetailSection";
import { CategoryScore } from "./CategoryScore";
import { ReviewItem } from "./ReviewItem";

const SKELETON_COUNT = 2;

type ReviewsSectionProps = {
  accommodation: Accommodation;
};

export function ReviewsSection({ accommodation }: ReviewsSectionProps) {
  const { data: reviews, isPending } = useAccommodationReviews(
    accommodation.slug,
  );
  const [filter, setFilter] = useState<ReviewTravelerType | null>(null);
  const [showsAll, setShowsAll] = useState(false);

  const categories = REVIEW_CATEGORY_ORDER.filter(
    (category) => accommodation.ratingBreakdown[category] !== undefined,
  );

  const filteredReviews = (reviews ?? []).filter(
    (review) => filter === null || review.travelerType === filter,
  );
  const visibleReviews = showsAll
    ? filteredReviews
    : filteredReviews.slice(0, VISIBLE_REVIEWS_COUNT);

  const availableFilters = TRAVELER_TYPE_FILTERS.filter((option) =>
    (reviews ?? []).some((review) => review.travelerType === option.id),
  );

  return (
    <DetailSection
      title={`${accommodation.rating.toLocaleString("pt-BR", { minimumFractionDigits: 1 })} · ${pluralize(accommodation.reviewCount, "avaliação", "avaliações")}`}
      description="Só quem concluiu uma reserva pela plataforma pode avaliar."
    >
      <div className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
        {categories.map((category, index) => (
          <CategoryScore
            key={category}
            label={REVIEW_CATEGORY_LABELS[category]}
            score={accommodation.ratingBreakdown[category] ?? 0}
            index={index}
          />
        ))}
      </div>

      {availableFilters.length > 1 && (
        <div className="mt-8 flex flex-wrap gap-2">
          <Chip
            label="Todas"
            isSelected={filter === null}
            onToggle={() => setFilter(null)}
          />
          {availableFilters.map((option) => (
            <Chip
              key={option.id}
              label={option.label}
              isSelected={filter === option.id}
              onToggle={() =>
                setFilter(filter === option.id ? null : option.id)
              }
            />
          ))}
        </div>
      )}

      <ul className="mt-6 grid gap-4 sm:grid-cols-2" aria-busy={isPending}>
        {isPending &&
          Array.from({ length: SKELETON_COUNT }, (_, index) => (
            <li
              // biome-ignore lint/suspicious/noArrayIndexKey: esqueletos sem identidade
              key={index}
              className="rounded-2xl bg-blue-50/50 p-5"
            >
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="mt-2 h-3 w-1/2" />
              <Skeleton className="mt-4 h-16 w-full" />
            </li>
          ))}

        {!isPending &&
          visibleReviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
      </ul>

      {!isPending && filteredReviews.length === 0 && (
        <p className="mt-4 rounded-2xl bg-blue-50/60 p-5 text-sm text-blue-950/70">
          Ainda não há avaliações desse perfil de viajante nesta hospedagem.
        </p>
      )}

      {!isPending && filteredReviews.length > VISIBLE_REVIEWS_COUNT && (
        <button
          type="button"
          onClick={() => setShowsAll((current) => !current)}
          className="mt-6 cursor-pointer rounded-full px-5 py-2.5 text-sm font-semibold text-blue-950 ring-1 ring-blue-950/15 transition-colors hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
        >
          {showsAll
            ? "Mostrar menos"
            : `Ver todas as ${filteredReviews.length} avaliações recentes`}
        </button>
      )}

      <p className="mt-6 flex items-center gap-2 text-xs text-blue-950/55">
        <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden />
        <Star className="sr-only" />
        Avaliações de hóspedes com estadia concluída. As mais recentes aparecem
        primeiro.
      </p>
    </DetailSection>
  );
}
