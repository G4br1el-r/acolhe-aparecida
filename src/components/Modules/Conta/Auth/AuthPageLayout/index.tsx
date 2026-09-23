import { type ReactNode, Suspense } from "react";
import { Header } from "@/components/Header";
import { AuthFallback } from "@/components/Modules/Conta/Auth/AuthFallback";
import { AuthGate } from "@/components/Modules/Conta/Auth/AuthGate";
import { AuthShowcase } from "@/components/Modules/Conta/Auth/AuthShowcase";

type AuthPageLayoutProps = {
  showcaseTitle: string;
  showcaseText: string;
  children: ReactNode;
};

export function AuthPageLayout({
  showcaseTitle,
  showcaseText,
  children,
}: AuthPageLayoutProps) {
  return (
    <>
      <Header isSolid />
      <main className="min-h-screen bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 pt-24 pb-16 sm:px-6 md:pt-28 md:pb-24 lg:px-8">
          <div className="grid items-stretch gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <AuthShowcase title={showcaseTitle} text={showcaseText} />

            <section
              aria-label="Acesso à conta"
              className="flex w-full flex-col justify-center lg:py-6"
            >
              <div className="mx-auto w-full max-w-md">
                <Suspense fallback={<AuthFallback />}>
                  <AuthGate>{children}</AuthGate>
                </Suspense>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
