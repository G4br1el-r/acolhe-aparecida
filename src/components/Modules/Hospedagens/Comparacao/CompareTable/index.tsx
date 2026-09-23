"use client";

import { Check, Scale, WifiOff } from "lucide-react";
import Image from "next/image";
import { CompareColumnHeader } from "@/components/Modules/Hospedagens/Comparacao/CompareColumnHeader";
import { BrandButton, BrandLink } from "@/components/ui/brand-button";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { useAccommodationsBySlugs } from "@/hooks/Modules/Hospedagens/use-accommodation";
import { useIsClient } from "@/hooks/use-is-client";
import {
  buildCompareRows,
  findBestIndexes,
} from "@/lib/Modules/Hospedagens/Comparacao/compare-rows";
import {
  stayDatesFromDraft,
  stayQuoteFor,
} from "@/lib/Modules/Hospedagens/Comparacao/stay-quote";
import {
  formatStayRange,
  pluralize,
} from "@/lib/Modules/Hospedagens/format-date";
import { formatCurrency } from "@/lib/Modules/Reserva/Checkout/price-summary";
import { cn } from "@/lib/utils";
import { searchParamsToQueryString } from "@/schemas/Modules/Hospedagens/Busca/search-params";
import { useSearchStore } from "@/store/Modules/Hospedagens/Busca/use-search-store";
import {
  MAX_COMPARE_ITEMS,
  useCompareStore,
} from "@/store/Modules/Hospedagens/Comparacao/use-compare-store";

const MIN_ITEMS_TO_COMPARE = 2;
const SKELETON_COLUMNS = 3;

export function CompareTable() {
  const isClient = useIsClient();
  const slugs = useCompareStore((state) => state.slugs);
  const removeFromCompare = useCompareStore((state) => state.removeFromCompare);
  const clearCompare = useCompareStore((state) => state.clearCompare);
  const draft = useSearchStore((state) => state.draft);
  const {
    data: accommodations,
    isPending,
    isError,
    refetch,
  } = useAccommodationsBySlugs(slugs);

  const isLoading = !isClient || (slugs.length > 0 && isPending);
  const dates = stayDatesFromDraft(draft);

  const ordered = slugs.flatMap((slug) => {
    const accommodation = accommodations?.find((item) => item.slug === slug);
    return accommodation ? [accommodation] : [];
  });

  const quotes = ordered.map((accommodation) =>
    stayQuoteFor(accommodation, draft),
  );
  const comparablePrices = ordered.map((accommodation, index) => {
    const quote = quotes[index];
    if (!quote || quote.status === "indisponivel") return null;
    return quote.status === "disponivel"
      ? quote.total
      : accommodation.pricePerNight;
  });
  const bestPriceIndexes = findBestIndexes(comparablePrices, "min");
  const bestRatingIndexes = findBestIndexes(
    ordered.map((accommodation) => accommodation.rating),
    "max",
  );
  const rows = buildCompareRows(ordered);

  const detailQuery = searchParamsToQueryString({
    checkin: dates?.checkIn,
    checkout: dates?.checkOut,
    adultos: draft.adults,
    criancas: draft.children,
    idosos: draft.seniors,
    quartos: draft.rooms,
    idades: draft.childAges,
  });

  function detailHrefFor(slug: string): string {
    return detailQuery
      ? `/hospedagens/${slug}?${detailQuery}`
      : `/hospedagens/${slug}`;
  }

  const subtitle = dates
    ? `Preços para ${formatStayRange(dates.checkIn, dates.checkOut)}, ${pluralize(draft.rooms, "quarto", "quartos")}`
    : "Escolha datas na busca para comparar o valor total da estadia.";

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
            Comparação
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-blue-950 md:text-4xl">
            Lado a lado, sem abrir dez abas
          </h1>
          <p className="mt-2 text-base text-blue-950/70">{subtitle}</p>
        </div>
        {isClient && slugs.length > 0 && (
          <BrandButton variant="ghost" onClick={clearCompare}>
            Limpar comparação
          </BrandButton>
        )}
      </header>

      {isLoading && (
        <div
          aria-busy
          className="grid grid-cols-[8rem_repeat(3,minmax(0,1fr))] gap-4"
        >
          <Skeleton className="h-64" />
          {Array.from({ length: SKELETON_COLUMNS }, (_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: esqueletos sem identidade
            <Skeleton key={index} className="h-64" />
          ))}
        </div>
      )}

      {!isLoading && slugs.length < MIN_ITEMS_TO_COMPARE && (
        <EmptyState
          icon={Scale}
          title={
            slugs.length === 0
              ? "Nenhuma hospedagem para comparar"
              : "Falta uma hospedagem para comparar"
          }
          description={`Marque de ${MIN_ITEMS_TO_COMPARE} a ${MAX_COMPARE_ITEMS} hospedagens em Comparar na lista de resultados. Elas aparecem aqui lado a lado.`}
          action={<BrandLink href="/hospedagens">Ver hospedagens</BrandLink>}
        />
      )}

      {!isLoading && slugs.length >= MIN_ITEMS_TO_COMPARE && isError && (
        <EmptyState
          tone="error"
          icon={WifiOff}
          title="Não conseguimos carregar a comparação"
          description="Sua seleção está guardada. Foi só uma falha ao buscar os detalhes."
          action={
            <BrandButton onClick={() => refetch()}>
              Tentar novamente
            </BrandButton>
          }
        />
      )}

      {!isLoading && !isError && ordered.length >= MIN_ITEMS_TO_COMPARE && (
        <div className="-mx-4 max-h-[calc(100dvh-7rem)] overflow-auto sm:mx-0 sm:rounded-3xl sm:ring-1 sm:ring-blue-950/8">
          <table className="w-full min-w-max border-separate border-spacing-0 text-left text-sm">
            <caption className="sr-only">
              Comparação entre {ordered.length} hospedagens
            </caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  className="sticky left-0 z-20 w-32 bg-white p-3 align-bottom text-xs font-semibold uppercase tracking-wide text-blue-900/60 sm:w-40 sm:p-4"
                >
                  Hospedagem
                </th>
                {ordered.map((accommodation, index) => (
                  <th
                    key={accommodation.slug}
                    scope="col"
                    className="w-56 bg-white p-3 align-top font-normal sm:w-64 sm:p-4"
                  >
                    <CompareColumnHeader
                      accommodation={accommodation}
                      quote={quotes[index] ?? { status: "sem-datas" }}
                      detailHref={detailHrefFor(accommodation.slug)}
                      isBestPrice={bestPriceIndexes.includes(index)}
                      isBestRating={bestRatingIndexes.includes(index)}
                      onRemove={() => removeFromCompare(accommodation.slug)}
                    />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th
                  scope="row"
                  className="sticky top-0 left-0 z-40 border-t border-blue-950/8 bg-white/95 p-3 align-middle text-xs font-semibold uppercase tracking-wide text-blue-900/60 backdrop-blur-sm sm:p-4"
                >
                  Resumo
                </th>
                {ordered.map((accommodation, index) => {
                  const quote = quotes[index];
                  const summaryPrice =
                    quote?.status === "disponivel"
                      ? quote.total
                      : accommodation.pricePerNight;

                  return (
                    <td
                      key={`resumo-${accommodation.slug}`}
                      className="sticky top-0 z-30 border-t border-blue-950/8 bg-white/95 p-3 align-middle backdrop-blur-sm sm:p-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-blue-100">
                          <Image
                            src={accommodation.image}
                            alt=""
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold text-blue-950">
                            {accommodation.name}
                          </span>
                          <span
                            className={cn(
                              "block text-xs",
                              bestPriceIndexes.includes(index)
                                ? "font-semibold text-emerald-700"
                                : "text-blue-950/60",
                            )}
                          >
                            {quote?.status === "indisponivel"
                              ? "Sem vaga nessas datas"
                              : `${formatCurrency(summaryPrice)}${
                                  quote?.status === "disponivel"
                                    ? " total"
                                    : " / noite"
                                }`}
                          </span>
                        </span>
                      </div>
                    </td>
                  );
                })}
              </tr>
              {rows.map((row) => (
                <tr key={row.id} className="group">
                  <th
                    scope="row"
                    className="sticky left-0 z-10 border-t border-blue-950/8 bg-white p-3 align-top text-sm font-semibold text-blue-950 group-hover:bg-blue-50/60 sm:p-4"
                  >
                    {row.label}
                  </th>
                  {row.cells.map((cell, index) => (
                    <td
                      key={`${row.id}-${ordered[index]?.slug ?? index}`}
                      className={cn(
                        "border-t border-blue-950/8 p-3 align-top text-blue-950/75 group-hover:bg-blue-50/40 sm:p-4",
                        cell.isMissing && "text-blue-950/40",
                        cell.isBest && "font-semibold text-emerald-700",
                      )}
                    >
                      <span className="flex items-start gap-1.5">
                        {cell.isBest && (
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0"
                            aria-label="Melhor nesta linha"
                          />
                        )}
                        {cell.text}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
