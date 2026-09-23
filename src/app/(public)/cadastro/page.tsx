import type { Metadata } from "next";
import { AuthPageLayout } from "@/components/Modules/Conta/Auth/AuthPageLayout";
import { RegisterForm } from "@/components/Modules/Conta/Auth/RegisterForm";

export const metadata: Metadata = {
  title: "Criar conta | Acolher Aparecida",
  description:
    "Crie sua conta para reservar hospedagem em Aparecida com pagamento pela plataforma e guardar hóspedes e favoritos para as próximas viagens.",
  alternates: { canonical: "/cadastro" },
};

export default function CadastroPage() {
  return (
    <AuthPageLayout
      showcaseTitle="Da primeira busca ao check-in, tudo com o seu nome."
      showcaseText="Guarde quem viaja com você, compare hospedagens perto do Santuário e reserve quando estiver pronto."
    >
      <RegisterForm />
    </AuthPageLayout>
  );
}
