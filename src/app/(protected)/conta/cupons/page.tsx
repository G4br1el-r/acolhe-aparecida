import type { Metadata } from "next";
import { CouponsList } from "@/components/Modules/Conta/Cupons/CouponsList";

export const metadata: Metadata = {
  title: "Cupons | Acolher Aparecida",
  description:
    "Descontos disponíveis para usar no checkout da sua hospedagem em Aparecida.",
};

export default function CuponsPage() {
  return <CouponsList />;
}
