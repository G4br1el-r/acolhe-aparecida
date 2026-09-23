import type { Metadata } from "next";
import { FrequentGuestsList } from "@/components/Modules/Conta/Hospedes/FrequentGuestsList";

export const metadata: Metadata = {
  title: "Hóspedes frequentes | Acolher Aparecida",
  description:
    "Cadastre quem costuma viajar com você e monte a lista de hóspedes da reserva em segundos.",
};

export default function HospedesPage() {
  return <FrequentGuestsList />;
}
