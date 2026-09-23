"use client";

import { ArrowRight, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAccommodationsBySlugs } from "@/hooks/Modules/Hospedagens/use-accommodation";
import { useIsClient } from "@/hooks/use-is-client";
import {
  MAX_COMPARE_ITEMS,
  useCompareStore,
} from "@/store/Modules/Hospedagens/Comparacao/use-compare-store";

const BAR_OFFSET_IN_PX = 32;
const HIDDEN_PATH_PREFIXES = [
  "/comparar",
  "/reservar",
  "/conta",
  "/minha-viagem",
  "/entrar",
  "/cadastro",
];

export function CompareBar() {
  const isClient = useIsClient();
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const slugs = useCompareStore((state) => state.slugs);
  const removeFromCompare = useCompareStore((state) => state.removeFromCompare);
  const clearCompare = useCompareStore((state) => state.clearCompare);
  const { data: accommodations } = useAccommodationsBySlugs(slugs);

  const isHidden =
    !isClient ||
    slugs.length === 0 ||
    HIDDEN_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  return (
    <AnimatePresence>
      {!isHidden && (
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : BAR_OFFSET_IN_PX }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: shouldReduceMotion ? 0 : BAR_OFFSET_IN_PX }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.25,
            ease: "easeOut",
          }}
          className="fixed inset-x-3 bottom-3 z-60 mx-auto max-w-2xl sm:inset-x-6 sm:bottom-6"
        >
          <section
            aria-label="Hospedagens selecionadas para comparar"
            className="flex items-center gap-3 rounded-2xl bg-blue-950 p-2 pl-3 text-white shadow-2xl ring-1 ring-white/10"
          >
            <ul className="flex flex-1 items-center gap-2 overflow-x-auto scrollbar-none">
              {slugs.map((slug) => {
                const accommodation = accommodations?.find(
                  (item) => item.slug === slug,
                );

                return (
                  <li key={slug} className="relative shrink-0">
                    <span className="relative block h-11 w-11 overflow-hidden rounded-xl bg-blue-900">
                      {accommodation && (
                        <Image
                          src={accommodation.image}
                          alt={accommodation.name}
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      )}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFromCompare(slug)}
                      aria-label={`Remover ${accommodation?.name ?? "hospedagem"} da comparação`}
                      className="absolute -top-1.5 -right-1.5 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-white text-blue-950 shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </li>
                );
              })}
              {Array.from(
                { length: MAX_COMPARE_ITEMS - slugs.length },
                (_, index) => (
                  <li
                    // biome-ignore lint/suspicious/noArrayIndexKey: espaços vazios sem identidade
                    key={`vazio-${index}`}
                    aria-hidden
                    className="hidden h-11 w-11 shrink-0 rounded-xl border border-dashed border-white/25 sm:block"
                  />
                ),
              )}
            </ul>

            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={clearCompare}
                className="hidden cursor-pointer rounded-full px-3 py-2 text-xs font-medium text-white/70 transition-colors hover:text-white sm:block"
              >
                Limpar
              </button>
              <Link
                href="/comparar"
                aria-disabled={slugs.length < 2}
                className={`flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  slugs.length < 2
                    ? "bg-white/15 text-white/60"
                    : "bg-white text-blue-950 hover:bg-blue-50"
                }`}
              >
                Comparar
                <span className="tabular-nums">({slugs.length})</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
