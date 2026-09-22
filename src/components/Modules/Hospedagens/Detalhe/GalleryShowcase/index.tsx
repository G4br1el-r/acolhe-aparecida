import { Grip } from "lucide-react";
import Link from "next/link";
import type { GalleryPhoto } from "@/constants/Modules/Hospedagens/Detalhe/gallery";
import { PhotoMosaic } from "../PhotoMosaic";

type GalleryShowcaseProps = {
  photos: GalleryPhoto[];
  galleryHref: string;
};

export function GalleryShowcase({ photos, galleryHref }: GalleryShowcaseProps) {
  return (
    <div className="relative">
      <PhotoMosaic photos={photos} galleryHref={galleryHref} />

      <Link
        href={galleryHref}
        className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-blue-950 shadow-sm ring-1 ring-blue-950/10 transition-colors hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 md:hidden"
      >
        <Grip className="h-4 w-4" />
        Mostrar todas as {photos.length} fotos
      </Link>
    </div>
  );
}
