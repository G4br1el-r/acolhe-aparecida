"use client";

import { HeartHandshake, HeartOff, WifiOff } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { HotelCard } from "@/components/Modules/Home/HotelCard";
import { FavoritesGridSkeleton } from "@/components/Modules/Hospedagens/Favoritos/FavoritesGridSkeleton";
import { BrandButton, BrandLink } from "@/components/ui/brand-button";
import { EmptyState } from "@/components/ui/empty-state";
import { useAccommodationsBySlugs } from "@/hooks/Modules/Hospedagens/use-accommodation";
import { useIsClient } from "@/hooks/use-is-client";
import { pluralize } from "@/lib/Modules/Hospedagens/format-date";
import { useFavoritesStore } from "@/store/Modules/Hospedagens/Favoritos/use-favorites-store";

type SharedFavoritesViewProps = {
  slugs: string[];
};

export function SharedFavoritesView({ slugs }: SharedFavoritesViewProps) {
  const isClient = useIsClient();
  const {
    data: accommodations,
    isPending,
    isError,
    refetch,
  } = useAccommodationsBySlugs(slugs);
  const favorites = useFavoritesStore((state) => state.favorites);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const list = accommodations ?? [];
  const missingSlugs = list
    .map((item) => item.slug)
    .filter((slug) => !favorites.some((favorite) => favorite.slug === slug));
  const isEverythingSaved =
    isClient && list.length > 0 && missingSlugs.length === 0;

  function handleSaveAll() {
    for (const slug of missingSlugs) toggleFavorite(slug);

    toast.success("Lista salva nos seus favoritos", {
      description: pluralize(
        missingSlugs.length,
        "hospedagem adicionada",
        "hospedagens adicionadas",
      ),
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
            Lista compartilhada
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-blue-950 md:text-4xl">
            Alguém separou estas hospedagens para você
          </h1>
          <p className="mt-2 text-base text-blue-950/70">
            Você está vendo uma lista em modo leitura. Salve tudo nos seus
            favoritos para comparar e reservar quando quiser.
          </p>
        </div>
        <Link
          href="/favoritos"
          className="shrink-0 text-sm font-semibold text-blue-900 underline-offset-4 hover:underline"
        >
          Ver meus favoritos
        </Link>
      </header>

      {isPending && <FavoritesGridSkeleton />}

      {!isPending && isError && (
        <EmptyState
          tone="error"
          icon={WifiOff}
          title="Não conseguimos abrir a lista"
          description="Pode ter sido uma falha momentânea. Tente de novo em instantes."
          action={
            <BrandButton onClick={() => refetch()}>
              Tentar novamente
            </BrandButton>
          }
        />
      )}

      {!isPending && !isError && list.length === 0 && (
        <EmptyState
          icon={HeartOff}
          title="Esta lista está vazia ou o link veio incompleto"
          description="Peça o link de novo para quem enviou ou comece a sua própria lista."
          action={<BrandLink href="/hospedagens">Ver hospedagens</BrandLink>}
        />
      )}

      {!isPending && !isError && list.length > 0 && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-blue-50/60 px-5 py-4">
            <p className="text-sm text-blue-950/75">
              {pluralize(list.length, "hospedagem", "hospedagens")} nesta lista
            </p>
            <BrandButton
              onClick={handleSaveAll}
              disabled={!isClient || isEverythingSaved}
            >
              <HeartHandshake className="h-4 w-4" aria-hidden />
              {isEverythingSaved
                ? "Todas já estão nos seus favoritos"
                : "Salvar todas nos meus favoritos"}
            </BrandButton>
          </div>

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((accommodation) => (
              <li key={accommodation.slug}>
                <HotelCard accommodation={accommodation} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
