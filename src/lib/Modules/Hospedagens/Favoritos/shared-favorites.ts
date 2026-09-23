export const SHARED_FAVORITES_PARAM = "itens";

const SLUG_PATTERN = /^[a-z0-9-]+$/;
const MAX_SHARED_SLUGS = 20;

export function parseSharedSlugs(raw: string | string[] | undefined): string[] {
  const value = Array.isArray(raw) ? raw[0] : raw;

  if (!value) return [];

  const unique = new Set<string>();

  for (const part of value.split(",")) {
    const slug = part.trim();
    if (slug && SLUG_PATTERN.test(slug)) unique.add(slug);
  }

  return Array.from(unique).slice(0, MAX_SHARED_SLUGS);
}

export function buildSharedFavoritesPath(slugs: string[]): string {
  if (slugs.length === 0) return "/favoritos";

  return `/favoritos?${SHARED_FAVORITES_PARAM}=${slugs.join(",")}`;
}
