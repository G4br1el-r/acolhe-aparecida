import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Acolher Aparecida | Sua viagem ao Santuário",
  description:
    "Hospedagens para sua fé em Aparecida-SP, com reserva e pagamento 100% pela plataforma.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={cn("font-sans", geist.variable)}>
      <body>{children}</body>
    </html>
  );
}
