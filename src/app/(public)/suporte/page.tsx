import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { SupportChannels } from "@/components/Modules/Suporte/Atendimento/SupportChannels";
import { ContactForm } from "@/components/Modules/Suporte/Contato/ContactForm";
import { FaqAccordion } from "@/components/Modules/Suporte/Faq/FaqAccordion";

export const metadata: Metadata = {
  title: "Suporte | Acolher Aparecida",
  description:
    "Perguntas frequentes sobre reserva, pagamento, PIX, cancelamento, grupos e acessibilidade, com canal de contato direto pela plataforma.",
  alternates: { canonical: "/suporte" },
};

export default function SuportePage() {
  return (
    <>
      <Header isSolid />
      <main className="min-h-screen bg-white pt-24 pb-24 md:pt-28">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-4 sm:px-6 lg:px-8">
          <section aria-labelledby="titulo-suporte">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
              Suporte
            </p>
            <h1
              id="titulo-suporte"
              className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-blue-950 md:text-4xl"
            >
              Como podemos ajudar na sua viagem?
            </h1>
            <p className="mt-4 max-w-2xl text-base text-blue-950/70 md:text-lg">
              As respostas mais buscadas estão logo abaixo. Se não resolver,
              escreva para a gente: atendemos todos os dias, das 7h às 22h.
            </p>
          </section>

          <section aria-labelledby="titulo-faq">
            <h2 id="titulo-faq" className="text-xl font-semibold text-blue-950">
              Perguntas frequentes
            </h2>
            <div className="mt-6">
              <FaqAccordion />
            </div>
          </section>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
            <section
              id="fale-com-a-gente"
              aria-labelledby="titulo-contato"
              className="scroll-mt-32"
            >
              <h2
                id="titulo-contato"
                className="text-xl font-semibold text-blue-950"
              >
                Fale com a gente
              </h2>
              <p className="mt-2 text-sm text-blue-950/65">
                Respondemos por e-mail em até 2 horas dentro do horário de
                atendimento.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </section>

            <aside aria-labelledby="titulo-canais" className="lg:pt-1">
              <h2
                id="titulo-canais"
                className="text-xl font-semibold text-blue-950"
              >
                Canais e horário
              </h2>
              <div className="mt-6">
                <SupportChannels />
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
