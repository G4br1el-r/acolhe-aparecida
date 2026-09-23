import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { GalleryMosaic } from "@/components/Modules/Hospedagens/Fotos/GalleryMosaic";
import {
  findAccommodationBySlug,
  getAllAccommodationSlugs,
} from "@/lib/Modules/Hospedagens/Detalhe/accommodation";
import { buildGallery } from "@/lib/Modules/Hospedagens/gallery";

type FotosPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllAccommodationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: FotosPageProps): Promise<Metadata> {
  const { slug } = await params;
  const accommodation = findAccommodationBySlug(slug);

  if (!accommodation) {
    return { title: "Fotos não encontradas | Acolher Aparecida" };
  }

  return { title: `Fotos · ${accommodation.name} | Acolher Aparecida` };
}

export default async function HospedagemFotosPage({ params }: FotosPageProps) {
  const { slug } = await params;
  const accommodation = findAccommodationBySlug(slug);

  if (!accommodation) {
    notFound();
  }

  const photos = buildGallery(accommodation);

  return (
    <>
      <Header isSolid />

      <main className="min-h-screen bg-white pb-20 pt-20">
        <div className="sticky top-20 z-30 border-b border-blue-950/10 bg-white/95 backdrop-blur-md">
          <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <Link
              href={`/hospedagens/${slug}`}
              aria-label="Voltar para a hospedagem"
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-blue-950 transition-colors hover:bg-blue-950/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>

            <div className="min-w-0">
              <h1 className="truncate text-base font-semibold text-blue-950">
                {accommodation.name}
              </h1>
              <p className="text-xs text-blue-950/60">{photos.length} fotos</p>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <GalleryMosaic photos={photos} />
        </div>
      </main>
    </>
  );
}
