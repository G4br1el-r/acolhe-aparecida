"use client";

import { useSearchParams } from "next/navigation";
import { resolveNextPath } from "@/lib/Modules/Conta/resolve-next-path";

export const NEXT_SEARCH_PARAM = "next";

export function useNextPath(): string {
  const searchParams = useSearchParams();

  return resolveNextPath(searchParams.get(NEXT_SEARCH_PARAM));
}
