import { Star } from "lucide-react";
import { REVIEW_RATING_SCALE } from "@/constants/Modules/Home/guest-reviews";

const FULL_STAR_THRESHOLD = 0.5;

type RatingStarsProps = {
  rating: number;
  tone: "light" | "dark";
};

const TONE_CLASSES = {
  light: {
    filled: "fill-white text-white",
    empty: "text-white/25",
    label: "text-white/65",
  },
  dark: {
    filled: "fill-blue-900 text-blue-900",
    empty: "text-blue-950/20",
    label: "text-blue-950/55",
  },
} as const;

export function RatingStars({ rating, tone }: RatingStarsProps) {
  const classes = TONE_CLASSES[tone];
  const positions = Array.from(
    { length: REVIEW_RATING_SCALE },
    (_, index) => index + 1,
  );

  return (
    <div className="flex items-center gap-2">
      <div
        className="flex items-center gap-0.5"
        role="img"
        aria-label={`Nota ${rating.toLocaleString("pt-BR")} de ${REVIEW_RATING_SCALE}`}
      >
        {positions.map((position) => (
          <Star
            key={position}
            aria-hidden
            className={`h-3.5 w-3.5 ${
              rating >= position - FULL_STAR_THRESHOLD
                ? classes.filled
                : classes.empty
            }`}
          />
        ))}
      </div>

      <span className={`text-sm font-semibold ${classes.label}`}>
        {rating.toLocaleString("pt-BR", { minimumFractionDigits: 1 })}
      </span>
    </div>
  );
}
