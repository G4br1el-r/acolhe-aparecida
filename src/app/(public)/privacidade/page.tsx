import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { LegalDocument } from "@/components/Modules/Suporte/Legal/LegalDocument";
import { PRIVACY_POLICY } from "@/constants/Modules/Suporte/privacy";

export const metadata: Metadata = {
  title: "Política de privacidade | Acolher Aparecida",
  description:
    "Como o Acolher Aparecida coleta, usa e protege seus dados pessoais, em conformidade com a LGPD.",
  alternates: { canonical: "/privacidade" },
};

export default function PrivacidadePage() {
  return (
    <>
      <Header isSolid />
      <main className="min-h-screen bg-white pt-24 pb-24 md:pt-28">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <LegalDocument content={PRIVACY_POLICY} />
        </div>
      </main>
    </>
  );
}
