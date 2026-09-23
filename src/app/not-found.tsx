import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { BrandLink } from "@/components/ui/brand-button";
import { NAV_LINKS } from "@/constants/navigation";

export const metadata: Metadata = {
  title: "Página não encontrada | Acolher Aparecida",
};

export default function NotFound() {
  return (
    <>
      <Header isSolid />
      <main className="flex min-h-screen items-center bg-white pt-24 pb-24 md:pt-28">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
            Erro 404
          </p>
          <h1 className="mt-3 max-w-xl text-3xl font-bold tracking-tight text-blue-950 md:text-4xl">
            Essa página não existe, mas o Santuário continua no mesmo lugar
          </h1>
          <p className="mt-4 max-w-xl text-base text-blue-950/70 md:text-lg">
            O endereço pode ter mudado ou ter sido digitado errado. Volte para a
            busca e siga organizando sua viagem.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BrandLink href="/hospedagens" variant="accent" size="lg">
              Buscar hospedagens
            </BrandLink>
            <BrandLink href="/" variant="outline" size="lg">
              Ir para o início
            </BrandLink>
          </div>

          <nav aria-label="Links úteis" className="mt-12">
            <p className="text-sm font-semibold text-blue-950">
              Talvez você esteja procurando
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-blue-900 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </main>
    </>
  );
}
