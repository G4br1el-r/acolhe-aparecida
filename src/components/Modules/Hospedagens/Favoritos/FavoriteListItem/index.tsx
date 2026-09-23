"use client";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import { HotelCard } from "@/components/Modules/Home/HotelCard";
import { CompareToggle } from "@/components/Modules/Hospedagens/Comparacao/CompareToggle";
import type { StayQuote } from "@/lib/Modules/Hospedagens/Comparacao/stay-quote";
import { pluralize } from "@/lib/Modules/Hospedagens/format-date";
import { formatCurrency } from "@/lib/Modules/Reserva/Checkout/price-summary";
import { useFavoritesStore } from "@/store/Modules/Hospedagens/Favoritos/use-favorites-store";

type FavoriteListItemProps = {
  accommodation: Accommodation;
  quote: StayQuote;
};

export function FavoriteListItem({
  accommodation,
  quote,
}: FavoriteListItemProps) {
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  function handleRemove() {
    removeFavorite(accommodation.slug);
    toast("Removido dos favoritos", { description: accommodation.name });
  }

  return (
    <li className="flex flex-col gap-3">
      <HotelCard accommodation={accommodation} />

      {quote.status === "disponivel" && (
        <p className="px-1 text-sm text-blue-950">
          <span className="font-semibold">{formatCurrency(quote.total)}</span>{" "}
          <span className="text-blue-950/60">
            por {pluralize(quote.nightCount, "noite", "noites")}
            {quote.roomCount > 1 &&
              `, ${pluralize(quote.roomCount, "quarto", "quartos")}`}
          </span>
          {quote.hasHighDemandPricing && (
            <span className="ml-2 text-xs font-medium text-cta">
              Preço de alta procura
            </span>
          )}
        </p>
      )}
      {quote.status === "indisponivel" && (
        <p className="px-1 text-sm font-medium text-blue-950/60">
          Sem vaga nas datas escolhidas
        </p>
      )}

      <div className="flex items-center justify-between px-1">
        <CompareToggle
          slug={accommodation.slug}
          accommodationName={accommodation.name}
        />
        <button
          type="button"
          onClick={handleRemove}
          className="flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full px-3 text-xs font-medium text-blue-950/60 transition-colors hover:bg-red-50 hover:text-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-offset-2"
        >
          <Trash2 className="h-3.5 w-3.5" aria-hidden />
          Remover
        </button>
      </div>
    </li>
  );
}
