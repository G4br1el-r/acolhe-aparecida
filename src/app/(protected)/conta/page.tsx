import type { Metadata } from "next";
import { ProfileForm } from "@/components/Modules/Conta/DadosPessoais/ProfileForm";
import { ContaSessionActions } from "@/components/Modules/Conta/Hub/ContaSessionActions";
import { ContaPageHeading } from "@/components/Modules/Conta/Shared/ContaPageHeading";

export const metadata: Metadata = {
  title: "Minha conta | Acolher Aparecida",
  description:
    "Seus dados, preferências de viagem, hóspedes frequentes, cupons e notificações em um só lugar.",
};

export default function ContaPage() {
  return (
    <section aria-labelledby="dados-pessoais-title">
      <ContaPageHeading
        title="Dados pessoais"
        description="Usamos essas informações para preencher suas reservas e para a hospedagem entrar em contato se precisar."
      />
      <ProfileForm />
      <ContaSessionActions />
    </section>
  );
}
