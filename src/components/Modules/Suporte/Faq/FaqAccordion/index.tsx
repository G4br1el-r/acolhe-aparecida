"use client";

import { Accordion } from "@base-ui/react/accordion";
import { ChevronDown, Search } from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";
import { FAQ_ITEMS } from "@/constants/Modules/Suporte/faq";
import { pluralize } from "@/lib/Modules/Hospedagens/format-date";
import { searchFaq } from "@/lib/Modules/Suporte/search-faq";

export function FaqAccordion() {
  const [query, setQuery] = useState("");
  const searchId = useId();
  const results = searchFaq(FAQ_ITEMS, query);
  const isFiltering = query.trim().length > 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <label htmlFor={searchId} className="sr-only">
          Buscar nas perguntas frequentes
        </label>
        <Search
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-blue-950/40"
        />
        <input
          id={searchId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Busque por cancelamento, PIX, ônibus, crianças..."
          className="h-12 w-full rounded-full bg-white pr-4 pl-11 text-base text-blue-950 ring-1 ring-blue-950/15 transition-shadow placeholder:text-blue-950/35 focus:outline-none focus:ring-2 focus:ring-blue-900"
        />
      </div>

      {isFiltering && (
        <p aria-live="polite" className="text-sm text-blue-950/60">
          {results.length === 0
            ? "Nenhuma pergunta com esse termo."
            : `${pluralize(results.length, "pergunta encontrada", "perguntas encontradas")}`}
        </p>
      )}

      {results.length === 0 ? (
        <p className="rounded-3xl bg-blue-50/60 px-6 py-8 text-sm text-blue-950/70">
          Não achou o que procurava?{" "}
          <Link
            href="#fale-com-a-gente"
            className="font-semibold text-blue-900 underline-offset-4 hover:underline"
          >
            Escreva para a gente
          </Link>{" "}
          e respondemos ainda hoje.
        </p>
      ) : (
        <Accordion.Root className="divide-y divide-blue-950/10 rounded-3xl bg-white px-5 ring-1 ring-blue-950/8 sm:px-6">
          {results.map((item) => (
            <Accordion.Item key={item.id} value={item.id}>
              <Accordion.Header>
                <Accordion.Trigger className="group flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 py-4 text-left text-base font-semibold text-blue-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-offset-2 focus-visible:rounded-xl">
                  {item.question}
                  <ChevronDown
                    aria-hidden
                    className="h-5 w-5 shrink-0 text-blue-900/70 transition-transform group-data-panel-open:rotate-180"
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0">
                <p className="pb-5 text-sm leading-relaxed text-blue-950/70 md:text-base">
                  {item.answer}
                </p>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      )}
    </div>
  );
}
