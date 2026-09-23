import type { Metadata } from "next";
import { PreferencesPanel } from "@/components/Modules/Conta/Preferencias/PreferencesPanel";
import { ContaPageHeading } from "@/components/Modules/Conta/Shared/ContaPageHeading";

export const metadata: Metadata = {
  title: "Preferências | Acolher Aparecida",
  description:
    "Conte como você costuma viajar para Aparecida e ajustamos a busca, os destaques e o checkout para você.",
};

export default function PreferenciasPage() {
  return (
    <section aria-labelledby="preferencias-title">
      <ContaPageHeading
        title="Preferências"
        description="Quanto mais soubermos sobre a sua forma de viajar, mais certeira fica a busca. Nada disso é obrigatório."
      />
      <PreferencesPanel />
    </section>
  );
}
