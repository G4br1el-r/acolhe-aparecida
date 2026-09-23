import { MessageSquareReply, Star } from "lucide-react";
import Image from "next/image";
import type { Review } from "@/@types/Modules/Hospedagens/review";
import { TRAVELER_TYPE_LABELS } from "@/constants/Modules/Hospedagens/Detalhe/review-labels";
import { MAX_RATING } from "@/constants/Modules/Hospedagens/features";
import { formatMonthYear } from "@/lib/Modules/Hospedagens/format-date";

const STAR_POSITIONS = Array.from(
  { length: MAX_RATING },
  (_, index) => index + 1,
);

type ReviewItemProps = {
  review: Review;
};

export function ReviewItem({ review }: ReviewItemProps) {
  return (
    <li className="flex flex-col rounded-2xl bg-blue-50/50 p-5 ring-1 ring-blue-950/5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-blue-950">
            {review.authorName}
          </p>
          <p className="text-xs text-blue-950/55">
            {TRAVELER_TYPE_LABELS[review.travelerType]} ·{" "}
            {formatMonthYear(review.stayedAt)}
          </p>
        </div>

        <span
          role="img"
          className="flex shrink-0 gap-0.5"
          aria-label={`Nota ${review.overallScore} de ${MAX_RATING}`}
        >
          {STAR_POSITIONS.map((position) => (
            <Star
              key={position}
              aria-hidden
              className={`h-3.5 w-3.5 ${
                position <= review.overallScore
                  ? "fill-amber-500 text-amber-500"
                  : "text-blue-950/20"
              }`}
            />
          ))}
        </span>
      </div>

      {review.title && (
        <p className="mt-3 text-sm font-semibold text-blue-950">
          {review.title}
        </p>
      )}

      <p className="mt-2 text-sm leading-relaxed text-blue-950/75">
        {review.comment}
      </p>

      {review.photos.length > 0 && (
        <ul className="mt-3 flex gap-2">
          {review.photos.map((photo) => (
            <li
              key={photo.id}
              className="relative h-16 w-20 overflow-hidden rounded-lg bg-blue-100"
            >
              <Image
                src={photo.url}
                alt={photo.caption}
                fill
                sizes="80px"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      )}

      {review.partnerReply && (
        <div className="mt-4 rounded-xl bg-white p-3.5 text-xs ring-1 ring-blue-950/8">
          <p className="flex items-center gap-1.5 font-semibold text-blue-950">
            <MessageSquareReply
              className="h-3.5 w-3.5 text-blue-900/70"
              aria-hidden
            />
            Resposta da hospedagem
          </p>
          <p className="mt-1.5 leading-relaxed text-blue-950/70">
            {review.partnerReply.text}
          </p>
        </div>
      )}
    </li>
  );
}
