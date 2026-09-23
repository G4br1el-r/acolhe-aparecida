import { BadgeCheck } from "lucide-react";
import Image from "next/image";
import type { GuestReview } from "@/constants/Modules/Home/guest-reviews";
import { RatingStars } from "../RatingStars";

type ReviewCardProps = {
  review: GuestReview;
};

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <figure className="group flex h-full flex-col justify-between gap-8 rounded-3xl bg-white p-7 shadow-[0_1px_2px_rgba(12,26,75,0.04),0_8px_24px_-12px_rgba(12,26,75,0.12)] ring-1 ring-blue-950/6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_2px_4px_rgba(12,26,75,0.05),0_20px_40px_-16px_rgba(12,26,75,0.2)] md:p-8">
      <div>
        <RatingStars rating={review.rating} tone="dark" />

        <blockquote className="mt-5 text-pretty text-lg leading-snug text-blue-950 md:text-xl">
          {review.quote}
        </blockquote>
      </div>

      <figcaption>
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-1 ring-blue-950/8">
            <Image
              src={review.portrait}
              alt={review.portraitAlt}
              fill
              sizes="48px"
              className="object-cover object-center"
            />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-blue-950">
              {review.authorName}
            </p>
            <p className="mt-0.5 text-sm text-blue-950/60">
              {review.travelContext}
            </p>
          </div>
        </div>

        <div className="mt-5 border-t border-blue-950/8 pt-4">
          <p className="flex items-center gap-2 text-xs text-blue-950/50">
            <BadgeCheck
              className="h-4 w-4 shrink-0 text-blue-900/60"
              aria-hidden
            />
            Estadia concluída em {review.accommodationName} · {review.stayedAt}
          </p>

          <p className="mt-2 text-xs font-medium text-blue-900">
            {review.highlight}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
