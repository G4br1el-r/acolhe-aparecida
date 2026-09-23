"use client";

import { Heart, Scale, WifiOff } from "lucide-react";
import { useState } from "react";
import { FavoriteListItem } from "@/components/Modules/Hospedagens/Favoritos/FavoriteListItem";
import { FavoritesGridSkeleton } from "@/components/Modules/Hospedagens/Favoritos/FavoritesGridSkeleton";
import { FavoritesSortSelect } from "@/components/Modules/Hospedagens/Favoritos/FavoritesSortSelect";
import { ShareFavoritesButton } from "@/components/Modules/Hospedagens/Favoritos/ShareFavoritesButton";
import { BrandButton, BrandLink } from "@/components/ui/brand-button";
import { EmptyState } from "@/components/ui/empty-state";
import { useAccommodationsBySlugs } from "@/hooks/Modules/Hospedagens/use-accommodation";
import { useIsClient } from "@/hooks/use-is-client";
import { stayQuoteFor } from "@/lib/Modules/Hospedagens/Comparacao/stay-quote";
import {
  type FavoritesSort,
  sortFavorites,
} from "@/lib/Modules/Hospedagens/Favoritos/sort-favorites";
import {
  formatStayRange,
  pluralize,
} from "@/lib/Modules/Hospedagens/format-date";
import { useSearchStore } from "@/store/Modules/Hospedagens/Busca/use-search-store";
import { useCompareStore } from "@/store/Modules/Hospedagens/Comparacao/use-compare-store";
import { useFavoritesStore } from "@/store/Modules/Hospedagens/Favoritos/use-favorites-store";

const MIN_ITEMS_TO_COMPARE = 2;

export function FavoritesView() {
  const isClient = useIsClient();
  const favorites = useFavoritesStore((state) => state.favorites);
  const compareCount = useCompareStore((state) => state.slugs.length);
  const draft = useSearchStore((state) => state.draft);
  const [sort, setSort] = useState<FavoritesSort>("mais-recentes");

  const slugs = favorites.map((favorite) => favorite.slug);
  const {
    data: accommodations,
    isPending,
    isError,
    refetch,
  } = useAccommodationsBySlugs(slugs);

  const isLoading = !isClient || (slugs.length > 0 && isPending);
  const hasDates = Boolean(draft.checkIn && draft.checkOut);

  const items = sortFavorites(
    favorites.flatMap((favorite) => {
      const accommodation = accommodations?.find(
        (item) => item.slug === favorite.slug,
      );
      return accommodation
        ? [{ accommodation, savedAt: favorite.savedAt }]
        : [];
    }),
    sort,
  );

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
            Favoritos
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-blue-950 md:text-4xl">
            Hospedagens que você separou
          </h1>
          <p className="mt-2 text-base text-blue-950/70">
            {isLoading
              ? "Carregando sua lista"
              : `${pluralize(slugs.length, "hospedagem salva", "hospedagens salvas")}${
                  hasDates && draft.checkIn && draft.checkOut
                    ? ` · preços para ${formatStayRange(draft.checkIn, draft.checkOut)}`
                    : " · escolha datas na busca para ver o valor total"
                }`}
          </p>
        </div>

        {isClient && slugs.length > 0 && (
          <div className="flex flex-wrap items-center gap-3">
            <ShareFavoritesButton slugs={slugs} />
            {compareCount >= MIN_ITEMS_TO_COMPARE && (
              <BrandLink href="/comparar" variant="primary">
                <Scale className="h-4 w-4" aria-hidden />
                Comparar selecionados ({compareCount})
              </BrandLink>
            )}
          </div>
        )}
      </header>

      {isLoading && <FavoritesGridSkeleton />}

      {!isLoading && slugs.length === 0 && (
        <EmptyState
          icon={Heart}
          title="Você ainda não salvou nenhuma hospedagem"
          description="Toque no coração de uma hospedagem para guardá-la aqui e comparar com calma depois."
          action={<BrandLink href="/hospedagens">Ver hospedagens</BrandLink>}
        />
      )}

      {!isLoading && slugs.length > 0 && isError && (
        <EmptyState
          tone="error"
          icon={WifiOff}
          title="Não conseguimos carregar seus favoritos"
          description="Sua lista está guardada. Foi só uma falha ao buscar os detalhes."
          action={
            <BrandButton onClick={() => refetch()}>
              Tentar novamente
            </BrandButton>
          }
        />
      )}

      {!isLoading && !isError && items.length > 0 && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <FavoritesSortSelect value={sort} onChange={setSort} />
            <p className="text-xs text-blue-950/55">
              Marque duas ou mais em Comparar para ver lado a lado.
            </p>
          </div>

          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map(({ accommodation }) => (
              <FavoriteListItem
                key={accommodation.slug}
                accommodation={accommodation}
                quote={stayQuoteFor(accommodation, draft)}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
