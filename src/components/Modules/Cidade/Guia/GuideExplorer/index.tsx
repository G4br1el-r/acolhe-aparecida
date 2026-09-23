"use client";

import { MapPinOff, WifiOff } from "lucide-react";
import { useState } from "react";
import type { GuidePlaceCategory } from "@/@types/Modules/Cidade/city";
import { GuideMap } from "@/components/Modules/Cidade/Guia/GuideMap";
import { GuidePlaceCard } from "@/components/Modules/Cidade/Guia/GuidePlaceCard";
import { BrandButton } from "@/components/ui/brand-button";
import { Chip } from "@/components/ui/chip";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { GUIDE_CATEGORIES } from "@/constants/Modules/Cidade/guide-categories";
import { useGuidePlaces } from "@/hooks/Modules/Cidade/use-city";
import { pluralize } from "@/lib/Modules/Hospedagens/format-date";

const SKELETON_COUNT = 4;

export function GuideExplorer() {
  const [category, setCategory] = useState<GuidePlaceCategory | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const {
    data: places,
    isPending,
    isError,
    refetch,
  } = useGuidePlaces(category ?? undefined);

  function handleSelect(placeId: string) {
    document
      .getElementById(`lugar-${placeId}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  const list = places ?? [];

  return (
    <div className="flex flex-col gap-6">
      <fieldset className="-mx-4 flex min-w-0 gap-2 overflow-x-auto px-4 pb-1 scrollbar-none sm:mx-0 sm:flex-wrap sm:px-0">
        <legend className="sr-only">Filtrar por categoria</legend>
        <Chip
          label="Todos"
          isSelected={category === null}
          onToggle={() => setCategory(null)}
        />
        {GUIDE_CATEGORIES.map((option) => (
          <Chip
            key={option.id}
            label={option.label}
            icon={option.icon}
            isSelected={category === option.id}
            onToggle={() =>
              setCategory((current) =>
                current === option.id ? null : option.id,
              )
            }
          />
        ))}
      </fieldset>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,26rem)] lg:items-start lg:gap-8">
        <div className="lg:order-2 lg:sticky lg:top-28">
          {isPending ? (
            <Skeleton className="aspect-4/3 w-full rounded-3xl" />
          ) : (
            <GuideMap
              places={list}
              activeId={activeId}
              onActivate={setActiveId}
              onSelect={handleSelect}
            />
          )}
        </div>

        <div className="flex flex-col gap-4 lg:order-1">
          <p aria-live="polite" className="text-sm text-blue-950/60">
            {isPending
              ? "Carregando lugares"
              : `${pluralize(list.length, "lugar", "lugares")}, do mais perto ao mais longe do Santuário`}
          </p>

          {isPending &&
            Array.from({ length: SKELETON_COUNT }, (_, index) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: esqueletos sem identidade
                key={index}
                className="flex flex-col gap-4 rounded-3xl bg-white p-3 ring-1 ring-blue-950/8 sm:flex-row sm:p-4"
              >
                <Skeleton className="aspect-4/3 rounded-2xl sm:aspect-square sm:w-40" />
                <div className="flex flex-1 flex-col gap-3">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}

          {!isPending && isError && (
            <EmptyState
              tone="error"
              icon={WifiOff}
              title="Não conseguimos carregar o guia"
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
              icon={MapPinOff}
              title="Nada nessa categoria por enquanto"
              description="Estamos visitando novos lugares. Veja as outras categorias enquanto isso."
              action={
                <BrandButton
                  variant="secondary"
                  onClick={() => setCategory(null)}
                >
                  Ver todos os lugares
                </BrandButton>
              }
            />
          )}

          {!isPending &&
            !isError &&
            list.map((place) => (
              <GuidePlaceCard
                key={place.id}
                place={place}
                isActive={activeId === place.id}
                onActivate={setActiveId}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
