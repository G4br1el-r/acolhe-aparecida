import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { AmenitiesSection } from "@/components/Modules/Hospedagens/Detalhe/AmenitiesSection";
import { BookingCard } from "@/components/Modules/Hospedagens/Detalhe/BookingCard";
import { BookingDraftInitializer } from "@/components/Modules/Hospedagens/Detalhe/BookingDraftInitializer";
import { DescriptionSection } from "@/components/Modules/Hospedagens/Detalhe/DescriptionSection";
import { DetalheHeading } from "@/components/Modules/Hospedagens/Detalhe/DetalheHeading";
import { GalleryShowcase } from "@/components/Modules/Hospedagens/Detalhe/GalleryShowcase";
import { LocationSection } from "@/components/Modules/Hospedagens/Detalhe/LocationSection";
import { MobileBookingBar } from "@/components/Modules/Hospedagens/Detalhe/MobileBookingBar";
import { OverviewSection } from "@/components/Modules/Hospedagens/Detalhe/OverviewSection";
import { PartnerSection } from "@/components/Modules/Hospedagens/Detalhe/PartnerSection";
import { RelatedSection } from "@/components/Modules/Hospedagens/Detalhe/RelatedSection";
import { ReviewsSection } from "@/components/Modules/Hospedagens/Detalhe/ReviewsSection";
import { RoomsSection } from "@/components/Modules/Hospedagens/Detalhe/RoomsSection";
import { RulesSection } from "@/components/Modules/Hospedagens/Detalhe/RulesSection";
import { ACCOMMODATION_TYPE_LABELS } from "@/constants/Modules/Hospedagens/features";
import {
  findAccommodationBySlug,
  getAllAccommodationSlugs,
} from "@/lib/Modules/Hospedagens/Detalhe/accommodation";
import { buildGallery } from "@/lib/Modules/Hospedagens/gallery";
import { buildPhotoUrl } from "@/mocks/Modules/Hospedagens/photos";
import {
  parseSearchParams,
  type RawSearchParams,
} from "@/schemas/Modules/Hospedagens/Busca/search-params";

const OG_IMAGE_WIDTH = 1200;

type DetalhePageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<RawSearchParams>;
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

  const description = `${ACCOMMODATION_TYPE_LABELS[accommodation.type]} a ${accommodation.distanceFromSanctuary}, em Aparecida-SP. ${accommodation.tagline}`;

  return {
    title: `${accommodation.name} | Acolher Aparecida`,
    description,
    alternates: { canonical: `/hospedagens/${slug}` },
    openGraph: {
      title: accommodation.name,
      description,
      type: "website",
      locale: "pt_BR",
      images: [{ url: accommodation.image, width: OG_IMAGE_WIDTH }],
    },
  };
}

export default async function HospedagemDetalhePage({
  params,
  searchParams,
}: DetalhePageProps) {
  const { slug } = await params;
  const accommodation = findAccommodationBySlug(slug);

  if (!accommodation) {
    notFound();
  }

  const search = parseSearchParams(await searchParams);
  const photos = buildGallery(accommodation);
  const cheapestRoom = [...accommodation.rooms].sort(
    (first, second) => first.pricePerNight - second.pricePerNight,
  )[0];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: accommodation.name,
    description: accommodation.tagline,
    image: buildPhotoUrl(photos[0].url, OG_IMAGE_WIDTH),
    address: {
      "@type": "PostalAddress",
      streetAddress: accommodation.address.street,
      addressLocality: "Aparecida",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: accommodation.coordinates.lat,
      longitude: accommodation.coordinates.lng,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: accommodation.rating,
      reviewCount: accommodation.reviewCount,
      bestRating: 5,
    },
    priceRange: `R$ ${accommodation.pricePerNight}`,
    checkinTime: accommodation.checkInTime,
    checkoutTime: accommodation.checkOutTime,
  };

  return (
    <>
      <Header />
      <BookingDraftInitializer
        slug={slug}
        params={search}
        defaultRoomTypeId={cheapestRoom.id}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD estático gerado no servidor
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen bg-white pb-28 pt-24 md:pt-28 lg:pb-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <DetalheHeading accommodation={accommodation} />

          <div className="mt-6">
            <GalleryShowcase
              photos={photos}
              galleryHref={`/hospedagens/${slug}/fotos`}
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-x-12 lg:grid-cols-[minmax(0,1fr)_23rem]">
            <div className="min-w-0">
              <OverviewSection accommodation={accommodation} />
              <DescriptionSection accommodation={accommodation} />
              <AmenitiesSection accommodation={accommodation} />
              <RoomsSection accommodation={accommodation} />
            </div>

            <div id="card-reserva" className="lg:py-9">
              <BookingCard accommodation={accommodation} />
            </div>
          </div>

          <ReviewsSection accommodation={accommodation} />
          <LocationSection accommodation={accommodation} />
          <PartnerSection accommodation={accommodation} />
          <RulesSection accommodation={accommodation} />
          <RelatedSection slug={slug} />
        </div>
      </main>

      <MobileBookingBar accommodation={accommodation} />
    </>
  );
}
