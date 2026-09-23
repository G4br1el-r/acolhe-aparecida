import type { Metadata } from "next";
import { NotificationsList } from "@/components/Modules/Conta/Notificacoes/NotificationsList";

export const metadata: Metadata = {
  title: "Notificações | Acolher Aparecida",
  description:
    "Avisos sobre reserva, pagamento, check-in e datas importantes em Aparecida.",
};

export default function NotificacoesPage() {
  return <NotificationsList />;
}
