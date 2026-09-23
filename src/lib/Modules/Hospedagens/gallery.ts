import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import {
  findStockPhoto,
  type StockPhoto,
} from "@/mocks/Modules/Hospedagens/photos";

export type GalleryPhoto = {
  id: string;
  url: string;
  width: number;
  height: number;
  caption: string;
};

export const GALLERY_HERO_PHOTO_COUNT = 5;

const COVER_PHOTO_ID = "capa";
const COVER_PHOTO_WIDTH = 1600;
const COVER_PHOTO_HEIGHT = 1067;

function toGalleryPhoto(photo: StockPhoto): GalleryPhoto {
  return {
    id: photo.id,
    url: photo.url,
    width: photo.width,
    height: photo.height,
    caption: photo.caption,
  };
}

function stripQuery(url: string): string {
  return url.split("?")[0];
}

export function buildGallery(
  accommodation: Pick<Accommodation, "image" | "photoIds" | "name">,
): GalleryPhoto[] {
  const coverPhoto: GalleryPhoto = {
    id: COVER_PHOTO_ID,
    url: stripQuery(accommodation.image),
    width: COVER_PHOTO_WIDTH,
    height: COVER_PHOTO_HEIGHT,
    caption: `Fachada e quarto principal de ${accommodation.name}`,
  };

  const stockPhotos = accommodation.photoIds
    .map(findStockPhoto)
    .filter((photo): photo is StockPhoto => Boolean(photo))
    .map(toGalleryPhoto);

  return [coverPhoto, ...stockPhotos];
}

export function buildRoomPhotos(photoIds: string[]): GalleryPhoto[] {
  return photoIds
    .map(findStockPhoto)
    .filter((photo): photo is StockPhoto => Boolean(photo))
    .map(toGalleryPhoto);
}
