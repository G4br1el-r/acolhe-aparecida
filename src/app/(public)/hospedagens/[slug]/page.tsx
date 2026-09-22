import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { AmenitiesSection } from "@/components/Modules/Hospedagens/Detalhe/AmenitiesSection";
import { BookingCard } from "@/components/Modules/Hospedagens/Detalhe/BookingCard";
import { DescriptionSection } from "@/components/Modules/Hospedagens/Detalhe/DescriptionSection";
import { DetalheHeading } from "@/components/Modules/Hospedagens/Detalhe/DetalheHeading";
import { GalleryShowcase } from "@/components/Modules/Hospedagens/Detalhe/GalleryShowcase";
import { LocationSection } from "@/components/Modules/Hospedagens/Detalhe/LocationSection";
import { MobileBookingBar } from "@/components/Modules/Hospedagens/Detalhe/MobileBookingBar";
import { OverviewSection } from "@/components/Modules/Hospedagens/Detalhe/OverviewSection";
import { PartnerSection } from "@/components/Modules/Hospedagens/Detalhe/PartnerSection";
import { ReviewsSection } from "@/components/Modules/Hospedagens/Detalhe/ReviewsSection";
import { RoomsSection } from "@/components/Modules/Hospedagens/Detalhe/RoomsSection";
import { RulesSection } from "@/components/Modules/Hospedagens/Detalhe/RulesSection";
import { getGalleryPhotos } from "@/constants/Modules/Hospedagens/Detalhe/gallery";
import {
  findAccommodationBySlug,
  getAllAccommodationSlugs,
} from "@/lib/Modules/Hospedagens/Detalhe/accommodation";

type DetalhePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllAccommodationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: DetalhePageProps): Promise<Metadata> {
  const { slug } = await params;
  const accommodation = findAccommodationBySlug(slug);

  if (!accommodation) {
    return { title: "Hospedagem não encontrada | Acolher Aparecida" };
  }

  return {
    title: `${accommodation.name} | Acolher Aparecida`,
    description: `${accommodation.name} — ${accommodation.distanceFromSanctuary}, em Aparecida-SP.`,
  };
}

export default async function HospedagemDetalhePage({
  params,
}: DetalhePageProps) {
  const { slug } = await params;
  const accommodation = findAccommodationBySlug(slug);

  if (!accommodation) {
    notFound();
  }

  const photos = getGalleryPhotos(slug);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white pb-28 pt-24 md:pt-28 lg:pb-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <DetalheHeading accommodation={accommodation} />

          <div className="mt-6">
            <GalleryShowcase
              photos={photos}
              galleryHref={`/hospedagens/${slug}/fotos`}
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-x-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <div className="min-w-0">
              <OverviewSection accommodation={accommodation} />
              <DescriptionSection accommodation={accommodation} />
              <AmenitiesSection />
              <RoomsSection />
            </div>

            <div id="card-reserva" className="py-9 lg:py-9">
              <BookingCard accommodation={accommodation} />
            </div>
          </div>

          <ReviewsSection accommodation={accommodation} />
          <LocationSection />
          <PartnerSection accommodation={accommodation} />
          <RulesSection />
        </div>
      </main>

      <MobileBookingBar accommodation={accommodation} />
    </>
  );
}
