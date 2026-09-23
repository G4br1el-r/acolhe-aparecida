import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { FavoritesView } from "@/components/Modules/Hospedagens/Favoritos/FavoritesView";
import { SharedFavoritesView } from "@/components/Modules/Hospedagens/Favoritos/SharedFavoritesView";
import {
  parseSharedSlugs,
  SHARED_FAVORITES_PARAM,
} from "@/lib/Modules/Hospedagens/Favoritos/shared-favorites";

export const metadata: Metadata = {
  title: "Favoritos | Acolher Aparecida",
  description:
    "Hospedagens que você salvou em Aparecida-SP, com preço total para as suas datas, comparação e lista compartilhável.",
  alternates: { canonical: "/favoritos" },
};

type FavoritosPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function FavoritosPage({
  searchParams,
}: FavoritosPageProps) {
  const params = await searchParams;
  const sharedSlugs = parseSharedSlugs(params[SHARED_FAVORITES_PARAM]);

  return (
    <>
      <Header isSolid />
      <main className="min-h-screen bg-blue-50/40 pt-24 pb-24 md:pt-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {sharedSlugs.length > 0 ? (
            <SharedFavoritesView slugs={sharedSlugs} />
          ) : (
            <FavoritesView />
          )}
        </div>
      </main>
    </>
  );
}
