"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { useIsClient } from "@/hooks/use-is-client";
import { useFavoritesStore } from "@/store/Modules/Hospedagens/Favoritos/use-favorites-store";

const MAX_BADGE_COUNT = 9;

export function FavoritesLink() {
  const isClient = useIsClient();
  const count = useFavoritesStore((state) => state.favorites.length);
  const visibleCount = isClient ? count : 0;

  return (
    <Link
      href="/favoritos"
      aria-label={
        visibleCount > 0 ? `Favoritos, ${visibleCount} salvos` : "Favoritos"
      }
      className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white text-blue-950 shadow-sm ring-1 ring-black/5 transition-colors hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
    >
      <Heart
        className={`h-5 w-5 ${visibleCount > 0 ? "fill-blue-900 text-blue-900" : ""}`}
      />
      {visibleCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-900 px-1 text-[11px] font-bold text-white ring-2 ring-white">
          {visibleCount > MAX_BADGE_COUNT
            ? `${MAX_BADGE_COUNT}+`
            : visibleCount}
        </span>
      )}
    </Link>
  );
}
