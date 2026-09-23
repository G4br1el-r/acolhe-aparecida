import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { Toaster } from "sonner";
import { Footer } from "@/components/Footer";
import { CompareBar } from "@/components/Modules/Hospedagens/Comparacao/CompareBar";
import { QueryProvider } from "@/components/Providers/QueryProvider";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const SITE_URL = "https://acolheraparecida.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Acolher Aparecida | Sua viagem ao Santuário",
    template: "%s",
  },
  description:
    "Hospedagens para sua fé em Aparecida-SP, com reserva e pagamento 100% pela plataforma.",
  openGraph: {
    siteName: "Acolher Aparecida",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={cn("font-sans", geist.variable)}>
      <body>
        <QueryProvider>
          {children}
          <Footer />
          <CompareBar />
        </QueryProvider>
        <Toaster
          position="bottom-center"
          richColors
          toastOptions={{
            classNames: {
              toast:
                "rounded-2xl! border! border-blue-950/10! bg-white! shadow-lg! font-sans!",
              title: "text-blue-950! font-semibold!",
              description: "text-blue-950/60!",
            },
          }}
        />
      </body>
    </html>
  );
}
