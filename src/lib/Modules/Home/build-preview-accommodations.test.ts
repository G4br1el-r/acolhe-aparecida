import { describe, expect, it } from "vitest";
import {
  ACCOMMODATIONS,
  type Accommodation,
} from "@/constants/Modules/Home/accommodations";
import {
  buildPreviewAccommodations,
  MAX_PREVIEW_ACCOMMODATIONS,
} from "./build-preview-accommodations";

function buildAccommodation(slug: string): Accommodation {
  return { ...ACCOMMODATIONS[0], slug };
}

const ALL = Array.from({ length: 30 }, (_, index) =>
  buildAccommodation(`hospedagem-${index}`),
);

describe("buildPreviewAccommodations", () => {
  it("limita a prévia ao máximo configurado", () => {
    const preview = buildPreviewAccommodations(ALL, null);

    expect(preview).toHaveLength(MAX_PREVIEW_ACCOMMODATIONS);
    expect(preview[0].slug).toBe("hospedagem-0");
  });

  it("mantém a prévia intacta quando a fixada já aparece nela", () => {
    const preview = buildPreviewAccommodations(ALL, "hospedagem-2");

    expect(preview).toHaveLength(MAX_PREVIEW_ACCOMMODATIONS);
    expect(preview[0].slug).toBe("hospedagem-0");
    expect(preview.map((item) => item.slug)).toContain("hospedagem-2");
  });

  it("traz a hospedagem fixada para a prévia quando ela estava oculta", () => {
    const preview = buildPreviewAccommodations(ALL, "hospedagem-25");

    expect(preview).toHaveLength(MAX_PREVIEW_ACCOMMODATIONS);
    expect(preview[0].slug).toBe("hospedagem-25");
  });

  it("ignora um slug fixado que não existe na lista", () => {
    const preview = buildPreviewAccommodations(ALL, "inexistente");

    expect(preview).toHaveLength(MAX_PREVIEW_ACCOMMODATIONS);
    expect(preview[0].slug).toBe("hospedagem-0");
  });

  it("devolve a lista inteira quando ela é menor que o máximo", () => {
    const few = ALL.slice(0, 3);

    expect(buildPreviewAccommodations(few, null)).toHaveLength(3);
  });
});
