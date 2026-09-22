import { ShieldCheck, Star } from "lucide-react";
import type { Accommodation } from "@/constants/Modules/Home/accommodations";
import {
  GUEST_REVIEWS,
  REVIEW_CATEGORIES,
} from "@/constants/Modules/Hospedagens/Detalhe/details";
import { DetailSection } from "../DetailSection";
import { CategoryScore } from "./CategoryScore";

const STAR_COUNT = 5;

type ReviewsSectionProps = {
  accommodation: Accommodation;
};

export function ReviewsSection({ accommodation }: ReviewsSectionProps) {
  return (
    <DetailSection
      title={`${accommodation.rating.toFixed(1).replace(".", ",")} · ${accommodation.reviewCount} avaliações`}
      description="Só quem concluiu uma reserva pela plataforma pode avaliar."
    >
      <div className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
        {REVIEW_CATEGORIES.map((category, index) => (
          <CategoryScore
            key={category.label}
            label={category.label}
            score={category.score}
            index={index}
          />
        ))}
      </div>

      <ul className="mt-9 grid gap-4 sm:grid-cols-2">
        {GUEST_REVIEWS.map((review) => (
          <li
            key={review.id}
            className="rounded-2xl bg-blue-50/50 p-5 ring-1 ring-blue-950/5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-blue-950">
                  {review.authorName}
                </p>
                <p className="text-xs text-blue-950/55">
                  {review.travelerType} · {review.monthLabel}
                </p>
              </div>

              <span
                role="img"
                className="flex shrink-0 gap-0.5"
                aria-label={`Nota ${review.score} de ${STAR_COUNT}`}
              >
                {Array.from({ length: STAR_COUNT }, (_, index) => (
                  <Star
                    key={`${review.id}-estrela-${index + 1}`}
                    aria-hidden
                    className={`h-3.5 w-3.5 ${
                      index < review.score
                        ? "fill-amber-500 text-amber-500"
                        : "text-blue-950/20"
                    }`}
                  />
                ))}
              </span>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-blue-950/70">
              {review.comment}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-6 flex items-center gap-2 text-xs text-blue-950/55">
        <ShieldCheck className="h-4 w-4 text-emerald-600" />
        Avaliações de hóspedes com estadia concluída
      </p>
    </DetailSection>
  );
}
