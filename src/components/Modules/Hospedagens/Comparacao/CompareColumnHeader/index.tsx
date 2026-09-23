"use client";

import { Star, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import { BrandLink } from "@/components/ui/brand-button";
import type { StayQuote } from "@/lib/Modules/Hospedagens/Comparacao/stay-quote";
import { pluralize } from "@/lib/Modules/Hospedagens/format-date";
import { formatCurrency } from "@/lib/Modules/Reserva/Checkout/price-summary";
import { cn } from "@/lib/utils";

type CompareColumnHeaderProps = {
  accommodation: Accommodation;
  quote: StayQuote;
  detailHref: string;
  isBestPrice: boolean;
  isBestRating: boolean;
  onRemove: () => void;
};

export function CompareColumnHeader({
  accommodation,
  quote,
  detailHref,
  isBestPrice,
  isBestRating,
  onRemove,
}: CompareColumnHeaderProps) {
  const nightlyRate =
    quote.status === "disponivel"
      ? quote.nightlyRate
      : accommodation.pricePerNight;

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-blue-100">
        <Image
          src={accommodation.image}
          alt={`Quarto em ${accommodation.name}`}
          fill
          sizes="240px"
          className="object-cover"
        />
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remover ${accommodation.name} da comparação`}
          className="absolute top-2 right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/95 text-blue-950 shadow-sm hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <div className="min-w-0">
        <Link
          href={detailHref}
          className="line-clamp-2 text-base font-semibold leading-tight text-blue-950 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:rounded"
        >
          {accommodation.name}
        </Link>
        <p
          className={cn(
            "mt-1.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
            isBestRating
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700",
          )}
        >
          <Star className="h-3.5 w-3.5 fill-current" aria-hidden />
          {accommodation.rating.toLocaleString("pt-BR", {
            minimumFractionDigits: 1,
          })}
          <span className="font-normal opacity-70">
            ({accommodation.reviewCount})
          </span>
        </p>
      </div>

      <div className="mt-auto">
        {quote.status === "indisponivel" ? (
          <p className="text-sm font-semibold text-blue-950/60">
            Sem vaga nessas datas
          </p>
        ) : (
          <>
            <p
              className={cn(
                "text-lg font-bold",
                isBestPrice ? "text-emerald-700" : "text-blue-950",
              )}
            >
              {formatCurrency(nightlyRate)}
              <span className="text-xs font-normal text-blue-950/60">
                {" "}
                / noite
              </span>
            </p>
            {quote.status === "disponivel" && (
              <p className="text-xs text-blue-950/60">
                {formatCurrency(quote.total)} por{" "}
                {pluralize(quote.nightCount, "noite", "noites")}
                {quote.roomCount > 1 &&
                  `, ${pluralize(quote.roomCount, "quarto", "quartos")}`}
              </p>
            )}
            {isBestPrice && (
              <p className="text-[11px] font-semibold text-emerald-700">
                Menor preço
              </p>
            )}
          </>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <BrandLink href={detailHref} variant="outline" size="sm">
          Ver hospedagem
        </BrandLink>
        {quote.status !== "indisponivel" && (
          <BrandLink href={detailHref} variant="accent" size="sm">
            Reservar
          </BrandLink>
        )}
      </div>
    </div>
  );
}
