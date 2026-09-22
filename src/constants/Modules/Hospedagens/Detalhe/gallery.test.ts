import { describe, expect, it } from "vitest";
import {
  buildPhotoUrl,
  GALLERY_HERO_PHOTO_COUNT,
  getGalleryPhotos,
} from "./gallery";

const IMAGE_WIDTH_IN_PX = 1200;

describe("getGalleryPhotos", () => {
  it("retorna fotos suficientes para o mosaico da hero", () => {
    expect(getGalleryPhotos("hotel-rainha-do-brasil").length).toBeGreaterThan(
      GALLERY_HERO_PHOTO_COUNT,
    );
  });

  it("é determinístico para o mesmo slug", () => {
    const first = getGalleryPhotos("pousada-do-devoto");
    const second = getGalleryPhotos("pousada-do-devoto");

    expect(first.map((photo) => photo.id)).toEqual(
      second.map((photo) => photo.id),
    );
  });

  it("varia a ordem entre slugs diferentes", () => {
    const first = getGalleryPhotos("hotel-rainha-do-brasil");
    const second = getGalleryPhotos("pousada-mae-aparecida");

    expect(first[0]?.id).not.toBe(second[0]?.id);
  });

  it("abre a galeria com quartos e áreas de estar, nunca com banheiro", () => {
    const slugs = [
      "hotel-rainha-do-brasil",
      "pousada-mae-aparecida",
      "recanto-da-padroeira",
      "hotel-portal-da-fe",
    ];

    for (const slug of slugs) {
      const heroPhotos = getGalleryPhotos(slug).slice(
        0,
        GALLERY_HERO_PHOTO_COUNT,
      );

      for (const photo of heroPhotos) {
        expect(photo.id).not.toContain("banheiro");
      }
    }
  });

  it("não repete fotos dentro da mesma galeria", () => {
    const photos = getGalleryPhotos("hotel-sao-miguel");

    expect(new Set(photos.map((photo) => photo.id)).size).toBe(photos.length);
  });
});

describe("buildPhotoUrl", () => {
  it("adiciona os parâmetros de otimização com a largura pedida", () => {
    const url = buildPhotoUrl(
      "https://images.unsplash.com/photo-1590490360182-c33d57733427",
      IMAGE_WIDTH_IN_PX,
    );

    expect(url).toContain(`w=${IMAGE_WIDTH_IN_PX}`);
    expect(url).toContain("auto=format");
  });
});
