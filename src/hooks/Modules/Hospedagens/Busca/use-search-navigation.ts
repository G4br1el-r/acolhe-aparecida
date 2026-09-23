"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import {
  type SearchParams,
  searchParamsToQueryString,
} from "@/schemas/Modules/Hospedagens/Busca/search-params";

export function useSearchNavigation(currentParams: SearchParams) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function apply(
    changes: Partial<SearchParams>,
    options?: { replace?: boolean },
  ) {
    const query = searchParamsToQueryString({ ...currentParams, ...changes });
    const href = query ? `${pathname}?${query}` : pathname;

    startTransition(() => {
      if (options?.replace) {
        router.replace(href, { scroll: false });
      } else {
        router.push(href, { scroll: false });
      }
    });
  }

  return { apply, isPending };
}
