import type { LegalDocumentContent } from "@/constants/Modules/Suporte/legal-document";
import { formatNumericDate } from "@/lib/Modules/Hospedagens/format-date";

type LegalDocumentProps = {
  content: LegalDocumentContent;
};

export function LegalDocument({ content }: LegalDocumentProps) {
  return (
    <div className="grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
      <nav
        aria-label="Sumário"
        className="hidden lg:sticky lg:top-28 lg:block lg:self-start"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
          Nesta página
        </p>
        <ol className="mt-3 flex flex-col gap-1 border-l border-blue-950/10">
          {content.sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-blue-950/65 transition-colors hover:border-blue-900 hover:text-blue-950 focus:outline-none focus-visible:border-blue-900 focus-visible:text-blue-950"
              >
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <article className="min-w-0">
        <header>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
            Acolher Aparecida
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-blue-950 md:text-4xl">
            {content.title}
          </h1>
          <p className="mt-2 text-sm text-blue-950/55">
            Última atualização em{" "}
            <time dateTime={content.lastUpdated}>
              {formatNumericDate(content.lastUpdated)}
            </time>
          </p>
          <p className="mt-6 max-w-2xl text-base text-blue-950/75 md:text-lg">
            {content.intro}
          </p>
        </header>

        <details className="mt-8 rounded-2xl bg-blue-50/60 px-5 py-4 lg:hidden">
          <summary className="cursor-pointer text-sm font-semibold text-blue-950">
            Ver sumário
          </summary>
          <ol className="mt-3 flex flex-col gap-2">
            {content.sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-sm text-blue-950/70 underline-offset-4 hover:underline"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </details>

        <div className="mt-12 flex flex-col gap-12">
          {content.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-titulo`}
              className="scroll-mt-32"
            >
              <h2
                id={`${section.id}-titulo`}
                className="text-xl font-semibold text-blue-950"
              >
                {section.title}
              </h2>
              <div className="mt-4 flex max-w-2xl flex-col gap-4 text-base leading-relaxed text-blue-950/75">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-blue-900/50">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
