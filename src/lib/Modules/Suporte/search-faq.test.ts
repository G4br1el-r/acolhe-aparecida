import type { FaqItem } from "@/constants/Modules/Suporte/faq";
import { normalizeSearchText, searchFaq } from "./search-faq";

const ITEMS: FaqItem[] = [
  {
    id: "pix",
    question: "Posso pagar com PIX?",
    answer: "Sim, com desconto.",
    keywords: ["pagamento"],
  },
  {
    id: "cancelamento",
    question: "Como funciona o cancelamento?",
    answer: "Depende da política da hospedagem.",
    keywords: ["reembolso"],
  },
];

describe("normalizeSearchText", () => {
  it("removes accents and case", () => {
    expect(normalizeSearchText("  Reembolso Automático ")).toBe(
      "reembolso automatico",
    );
  });
});

describe("searchFaq", () => {
  it("returns everything for an empty query", () => {
    expect(searchFaq(ITEMS, "   ")).toHaveLength(2);
  });

  it("matches question, answer and keywords ignoring accents", () => {
    expect(searchFaq(ITEMS, "pagamento").map((i) => i.id)).toEqual(["pix"]);
    expect(searchFaq(ITEMS, "politica").map((i) => i.id)).toEqual([
      "cancelamento",
    ]);
  });

  it("requires every term to match", () => {
    expect(searchFaq(ITEMS, "pix cancelamento")).toEqual([]);
  });
});
