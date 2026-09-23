"use client";

import { ArrowRight, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { DESKTOP_MEDIA_QUERY, useMediaQuery } from "@/hooks/use-media-query";
import { draftToSearchParams } from "@/lib/Modules/Hospedagens/Busca/search-draft";
import { cn } from "@/lib/utils";
import {
  type SearchParams,
  searchParamsToQueryString,
} from "@/schemas/Modules/Hospedagens/Busca/search-params";
import { useSearchStore } from "@/store/Modules/Hospedagens/Busca/use-search-store";
import { DateRangeField } from "../DateRangeField";
import { GuestsField } from "../GuestsField";

type SearchBarProps = {
  variant?: "hero" | "compact";
  preservedParams?: Partial<SearchParams>;
  className?: string;
};

export function SearchBar({
  variant = "hero",
  preservedParams,
  className,
}: SearchBarProps) {
  const router = useRouter();
  const isDesktop = useMediaQuery(DESKTOP_MEDIA_QUERY);
  const [isPending, startTransition] = useTransition();

  const draft = useSearchStore((state) => state.draft);
  const updateDraft = useSearchStore((state) => state.updateDraft);
  const rememberSearch = useSearchStore((state) => state.rememberSearch);

  const isHero = variant === "hero";

  function handleSubmit() {
    const query = searchParamsToQueryString({
      ...preservedParams,
      ...draftToSearchParams(draft),
    });

    rememberSearch(query);

    startTransition(() => {
      router.push(query ? `/hospedagens?${query}` : "/hospedagens");
    });
  }

  return (
    <form
      aria-label="Buscar hospedagem em Aparecida"
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
      className={cn(
        "relative flex w-full flex-col gap-0.5 bg-white p-1.5 md:flex-row md:items-center md:gap-0",
        isHero
          ? "z-20 rounded-3xl shadow-xl md:rounded-full"
          : "rounded-3xl shadow-sm ring-1 ring-blue-950/10 md:rounded-full",
        className,
      )}
    >
      <div className="md:w-0 md:flex-[3.2]">
        <DateRangeField
          checkIn={draft.checkIn}
          checkOut={draft.checkOut}
          onChange={updateDraft}
          isDesktop={isDesktop}
        />
      </div>

      <div className="hidden h-7 w-px bg-blue-950/10 md:block" />

      <div className="md:w-0 md:flex-[2.6]">
        <GuestsField draft={draft} onChange={updateDraft} />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className={cn(
          "flex cursor-pointer items-center justify-center gap-2 rounded-full bg-cta font-semibold text-white shadow-md transition-all hover:bg-cta-hover hover:shadow-lg active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-offset-2 disabled:opacity-70",
          isHero ? "animate-cta-pulse px-6 py-3 text-sm" : "px-5 py-3 text-sm",
        )}
      >
        {isHero ? (
          <>
            Buscar hospedagem
            <ArrowRight className="h-4 w-4" />
          </>
        ) : (
          <>
            <Search className="h-4 w-4" />
            <span className="md:sr-only lg:not-sr-only">Buscar</span>
          </>
        )}
      </button>
    </form>
  );
}
