"use client";

import { useEffect } from "react";
import { Header } from "@/components/Header";
import { BrandButton, BrandLink } from "@/components/ui/brand-button";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Header isSolid />
      <main className="flex min-h-screen items-center bg-white pt-24 pb-24 md:pt-28">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
            Algo saiu do lugar
          </p>
          <h1 className="mt-3 max-w-xl text-3xl font-bold tracking-tight text-blue-950 md:text-4xl">
            Não conseguimos carregar esta página
          </h1>
          <p className="mt-4 max-w-xl text-base text-blue-950/70 md:text-lg">
            Foi uma falha do nosso lado, não sua. Suas reservas, favoritos e
            buscas continuam guardados. Tente de novo em instantes.
          </p>
          {error.digest && (
            <p className="mt-2 text-xs text-blue-950/45">
              Código do erro: {error.digest}
            </p>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BrandButton onClick={reset} size="lg">
              Tentar novamente
            </BrandButton>
            <BrandLink href="/" variant="outline" size="lg">
              Ir para o início
            </BrandLink>
          </div>
        </div>
      </main>
    </>
  );
}
