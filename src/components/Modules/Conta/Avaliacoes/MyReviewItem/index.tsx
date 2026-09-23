import { ArrowUpRight, Star } from "lucide-react";
import Link from "next/link";
import type { Review } from "@/@types/Modules/Hospedagens/review";
import { findAccommodationBySlug } from "@/lib/Modules/Hospedagens/Detalhe/accommodation";
import {
  formatMonthYear,
  formatShortDate,
} from "@/lib/Modules/Hospedagens/format-date";

const SCORE_DECIMALS = 1;

type MyReviewItemProps = {
  review: Review;
};

export function MyReviewItem({ review }: MyReviewItemProps) {
  const accommodation = findAccommodationBySlug(review.accommodationSlug);
  const accommodationName = accommodation?.name ?? "Hospedagem";
  const href = `/hospedagens/${review.accommodationSlug}`;

  return (
    <li className="rounded-3xl bg-white p-5 ring-1 ring-blue-950/8 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <Link
            href={href}
            className="group inline-flex items-center gap-1 font-semibold text-blue-950 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
          >
            {accommodationName}
            <ArrowUpRight
              className="h-4 w-4 text-blue-950/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </Link>
          <p className="mt-0.5 text-xs text-blue-950/55">
            Estadia em {formatMonthYear(review.stayedAt).toLowerCase()} ·
            Avaliada em {formatShortDate(review.createdAt)}
          </p>
        </div>

        <p className="flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
          <Star className="h-3.5 w-3.5 fill-current" aria-hidden />
          <span className="sr-only">Nota </span>
          {review.overallScore.toFixed(SCORE_DECIMALS)}
        </p>
      </div>

      {review.title && (
        <p className="mt-4 font-medium text-blue-950">{review.title}</p>
      )}
      <p className="mt-2 text-sm leading-relaxed text-blue-950/75">
        {review.comment}
      </p>

      {review.partnerReply && (
        <div className="mt-4 rounded-2xl bg-blue-50/70 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
            Resposta da hospedagem
          </p>
          <p className="mt-1 text-sm text-blue-950/75">
            {review.partnerReply.text}
          </p>
        </div>
      )}
    </li>
  );
}
