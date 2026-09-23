import { ACCOMMODATIONS } from "@/mocks/Modules/Hospedagens/accommodations";
import { buildGallery, GALLERY_HERO_PHOTO_COUNT } from "./gallery";

describe("buildGallery", () => {
  it("abre com a foto de capa da hospedagem", () => {
    const accommodation = ACCOMMODATIONS[0];
    const gallery = buildGallery(accommodation);

    expect(gallery[0]?.url).toBe(accommodation.image.split("?")[0]);
  });

  it("retorna fotos suficientes para o mosaico", () => {
    for (const accommodation of ACCOMMODATIONS) {
      expect(buildGallery(accommodation).length).toBeGreaterThan(
        GALLERY_HERO_PHOTO_COUNT,
      );
    }
  });

  it("não repete fotos dentro da mesma galeria", () => {
    const gallery = buildGallery(ACCOMMODATIONS[3]);

    expect(new Set(gallery.map((photo) => photo.id)).size).toBe(gallery.length);
  });

  it("nunca abre o mosaico com banheiro", () => {
    for (const accommodation of ACCOMMODATIONS) {
      const heroPhotos = buildGallery(accommodation).slice(
        0,
        GALLERY_HERO_PHOTO_COUNT,
      );

      for (const photo of heroPhotos) {
        expect(photo.id).not.toContain("banheiro");
      }
    }
  });
});
