"use client";

import {
  List,
  Map as MapIcon,
  SearchX,
  SlidersHorizontal,
  WifiOff,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { BrandButton } from "@/components/ui/brand-button";
import { EmptyState } from "@/components/ui/empty-state";
import { Sheet } from "@/components/ui/sheet";
import { useSearchNavigation } from "@/hooks/Modules/Hospedagens/Busca/use-search-navigation";
import { useSearchResults } from "@/hooks/Modules/Hospedagens/Busca/use-search-results";
import {
  LARGE_DESKTOP_MEDIA_QUERY,
  useMediaQuery,
} from "@/hooks/use-media-query";
import {
  clearAllFilters,
  listActiveFilters,
} from "@/lib/Modules/Hospedagens/Busca/active-filters";
import { searchParamsToDraft } from "@/lib/Modules/Hospedagens/Busca/search-draft";
import {
  formatStayRange,
  pluralize,
} from "@/lib/Modules/Hospedagens/format-date";
import {
  type SearchParams,
  searchParamsToQueryString,
} from "@/schemas/Modules/Hospedagens/Busca/search-params";
import { useSearchStore } from "@/store/Modules/Hospedagens/Busca/use-search-store";
import { ActiveFilters } from "../ActiveFilters";
import { FiltersPanel } from "../FiltersPanel";
import { QuickFilters } from "../QuickFilters";
import { ResultCard } from "../ResultCard";
import { ResultCardSkeleton } from "../ResultCardSkeleton";
import { ResultsMap } from "../ResultsMap";
import { SearchBar } from "../SearchBar";
import { SortSelect } from "../SortSelect";

const SKELETON_COUNT = 4;

type ResultsViewProps = {
  params: SearchParams;
};

export function ResultsView({ params }: ResultsViewProps) {
  const isLargeDesktop = useMediaQuery(LARGE_DESKTOP_MEDIA_QUERY);
  const { apply, isPending } = useSearchNavigation(params);
  const {
    data,
    isPending: isLoading,
    isError,
    refetch,
    isFetching,
  } = useSearchResults(params);
  const updateDraft = useSearchStore((state) => state.updateDraft);

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [pinnedSlug, setPinnedSlug] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const draftFromParams = useMemo(() => searchParamsToDraft(params), [params]);

  useEffect(() => {
    updateDraft(draftFromParams);
  }, [draftFromParams, updateDraft]);

  useEffect(() => {
    if (!pinnedSlug) return;
    const element = listRef.current?.querySelector<HTMLElement>(
      `[data-slug="${pinnedSlug}"]`,
    );
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [pinnedSlug]);

  const results = data?.results ?? [];
  const activeFilterCount = listActiveFilters(params).length;
  const hasDates = Boolean(params.checkin && params.checkout);
  const isMapView = params.ver === "mapa";
  const showsSkeleton = isLoading || (isFetching && !data);

  const detailQuery = searchParamsToQueryString({
    checkin: params.checkin,
    checkout: params.checkout,
    adultos: params.adultos,
    criancas: params.criancas,
    idosos: params.idosos,
    quartos: params.quartos,
    idades: params.idades,
  });

  function hrefFor(slug: string): string {
    return detailQuery
      ? `/hospedagens/${slug}?${detailQuery}`
      : `/hospedagens/${slug}`;
  }

  const resultsHeading = showsSkeleton
    ? "Procurando hospedagens"
    : `${pluralize(results.length, "hospedagem", "hospedagens")} em Aparecida`;

  const subheading =
    hasDates && params.checkin && params.checkout
      ? `${formatStayRange(params.checkin, params.checkout)} · ${pluralize(params.adultos + params.criancas + params.idosos, "hóspede", "hóspedes")}`
      : "Escolha as datas para ver preço total e disponibilidade.";

  const listContent = (
    <div
      ref={listRef}
      aria-busy={showsSkeleton || isPending}
      className={`flex flex-col gap-4 transition-opacity ${isPending && !showsSkeleton ? "opacity-60" : ""}`}
    >
      {showsSkeleton &&
        Array.from({ length: SKELETON_COUNT }, (_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: esqueletos sem identidade
          <ResultCardSkeleton key={index} />
        ))}

      {!showsSkeleton && isError && (
        <EmptyState
          tone="error"
          icon={WifiOff}
          title="Não conseguimos carregar as hospedagens"
          description="Pode ter sido uma falha momentânea de conexão. Tente de novo em instantes."
          action={
            <BrandButton onClick={() => refetch()}>
              Tentar novamente
            </BrandButton>
          }
        />
      )}

      {!showsSkeleton && !isError && results.length === 0 && (
        <EmptyState
          icon={SearchX}
          title="Nenhuma hospedagem com todos esses critérios"
          description={
            activeFilterCount > 0
              ? "Remova um ou dois filtros. Perto do Santuário quase sempre existe uma boa opção."
              : "Tente outras datas ou reduza o número de quartos."
          }
          action={
            activeFilterCount > 0 ? (
              <BrandButton
                variant="secondary"
                onClick={() => apply(clearAllFilters())}
              >
                Limpar filtros
              </BrandButton>
            ) : undefined
          }
        />
      )}

      {!showsSkeleton &&
        !isError &&
        results.map((result) => (
          <div
            key={result.accommodation.slug}
            data-slug={result.accommodation.slug}
          >
            <ResultCard
              result={result}
              href={hrefFor(result.accommodation.slug)}
              roomsNeeded={params.quartos}
              isActive={activeSlug === result.accommodation.slug}
              onActivate={setActiveSlug}
            />
          </div>
        ))}

      {!showsSkeleton && !isError && data && data.unavailableCount > 0 && (
        <p className="pt-2 text-center text-xs text-blue-950/55">
          {pluralize(
            data.unavailableCount,
            "hospedagem está",
            "hospedagens estão",
          )}{" "}
          sem vaga nessas datas e aparecem no fim da lista.
        </p>
      )}
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="pt-24 md:pt-28">
        <SearchBar variant="compact" preservedParams={params} />
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <QuickFilters values={params} onChange={(changes) => apply(changes)} />

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-blue-950 md:text-3xl">
              {resultsHeading}
            </h1>
            <p className="mt-1 text-sm text-blue-950/60">{subheading}</p>
          </div>

          <div className="flex w-full items-center gap-2 md:w-auto">
            <button
              type="button"
              onClick={() => setIsFiltersOpen(true)}
              className="flex h-11 cursor-pointer items-center gap-2 rounded-full bg-white px-4 text-sm font-medium text-blue-950 ring-1 ring-blue-950/15 transition-colors hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" aria-hidden />
              Filtros
              {activeFilterCount > 0 && (
                <span className="rounded-full bg-blue-950 px-1.5 py-0.5 text-[11px] font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <SortSelect
              value={params.ordenar}
              onChange={(ordenar) => apply({ ordenar })}
            />

            <fieldset className="flex rounded-full bg-white p-1 ring-1 ring-blue-950/15 lg:hidden">
              <legend className="sr-only">Modo de visualização</legend>
              <button
                type="button"
                onClick={() => apply({ ver: "lista" }, { replace: true })}
                aria-pressed={!isMapView}
                aria-label="Ver em lista"
                className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors ${!isMapView ? "bg-blue-950 text-white" : "text-blue-950/70"}`}
              >
                <List className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => apply({ ver: "mapa" }, { replace: true })}
                aria-pressed={isMapView}
                aria-label="Ver no mapa"
                className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors ${isMapView ? "bg-blue-950 text-white" : "text-blue-950/70"}`}
              >
                <MapIcon className="h-4 w-4" />
              </button>
            </fieldset>
          </div>
        </div>

        <ActiveFilters values={params} onChange={(changes) => apply(changes)} />
      </div>

      <div className="mt-6 grid gap-8 pb-20 lg:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[15rem_minmax(0,1fr)_19rem] 2xl:grid-cols-[16rem_minmax(0,1fr)_22rem]">
        <aside className="hidden lg:block">
          <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-3xl bg-white p-5 ring-1 ring-blue-950/8 scrollbar-none">
            <FiltersPanel
              values={params}
              onChange={(changes) => apply(changes)}
            />
          </div>
        </aside>

        {isMapView && !isLargeDesktop ? (
          <div className="flex flex-col gap-4">
            <div className="h-[60vh] min-h-96">
              <ResultsMap
                results={results}
                activeSlug={activeSlug ?? pinnedSlug}
                onActivate={setActiveSlug}
                onSelect={setPinnedSlug}
                className="h-full"
              />
            </div>
            {pinnedSlug && (
              <div>
                {results
                  .filter((result) => result.accommodation.slug === pinnedSlug)
                  .map((result) => (
                    <ResultCard
                      key={result.accommodation.slug}
                      result={result}
                      href={hrefFor(result.accommodation.slug)}
                      roomsNeeded={params.quartos}
                      layout="column"
                    />
                  ))}
              </div>
            )}
          </div>
        ) : (
          listContent
        )}

        <aside className="hidden xl:block">
          <div className="sticky top-28 h-[calc(100vh-8rem)]">
            <ResultsMap
              results={results}
              activeSlug={activeSlug ?? pinnedSlug}
              onActivate={setActiveSlug}
              onSelect={setPinnedSlug}
              className="h-full"
            />
          </div>
        </aside>
      </div>

      <Sheet
        open={isFiltersOpen}
        onOpenChange={setIsFiltersOpen}
        side="bottom"
        title="Filtros"
        description="Só o que faz diferença numa viagem para Aparecida."
        footer={
          <div className="flex items-center gap-3">
            <BrandButton
              variant="ghost"
              onClick={() => apply(clearAllFilters())}
              disabled={activeFilterCount === 0}
            >
              Limpar
            </BrandButton>
            <BrandButton
              fullWidth
              onClick={() => setIsFiltersOpen(false)}
              isLoading={isPending || isFetching}
              loadingLabel="Atualizando"
            >
              Ver {pluralize(results.length, "hospedagem", "hospedagens")}
            </BrandButton>
          </div>
        }
      >
        <FiltersPanel
          values={params}
          onChange={(changes) => apply(changes, { replace: true })}
        />
      </Sheet>
    </div>
  );
}
