import type { Metadata } from "next";
import { AuthPageLayout } from "@/components/Modules/Conta/Auth/AuthPageLayout";
import { LoginForm } from "@/components/Modules/Conta/Auth/LoginForm";

export const metadata: Metadata = {
  title: "Entrar | Acolher Aparecida",
  description:
    "Entre na sua conta para acompanhar reservas, favoritos e tudo o que você organizou para a viagem a Aparecida.",
  alternates: { canonical: "/entrar" },
};

export default function EntrarPage() {
  return (
    <AuthPageLayout
      showcaseTitle="Sua viagem a Aparecida, organizada em um só lugar."
      showcaseText="Reserva, pagamento e acompanhamento acontecem aqui dentro. Sem ligação, sem grupo de WhatsApp, sem surpresa no valor."
    >
      <LoginForm />
    </AuthPageLayout>
  );
}
