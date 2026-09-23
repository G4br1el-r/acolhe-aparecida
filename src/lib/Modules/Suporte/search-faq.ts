import type { FaqItem } from "@/constants/Modules/Suporte/faq";

const DIACRITICS_PATTERN = /[̀-ͯ]/g;

export function normalizeSearchText(value: string): string {
  return value
    .normalize("NFD")
    .replace(DIACRITICS_PATTERN, "")
    .toLowerCase()
    .trim();
}

export function searchFaq(items: FaqItem[], query: string): FaqItem[] {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) return items;

  const terms = normalizedQuery.split(/\s+/);

  return items.filter((item) => {
    const haystack = normalizeSearchText(
      `${item.question} ${item.answer} ${item.keywords.join(" ")}`,
    );

    return terms.every((term) => haystack.includes(term));
  });
}
