import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { InstagramIcon } from "./InstagramIcon";

const NAV_LINKS = [
  { label: "Hospedagens", href: "/hospedagens" },
  { label: "Datas e eventos", href: "/eventos" },
  { label: "Guia de Aparecida", href: "/guia" },
  { label: "Suporte", href: "/suporte" },
];

const LEGAL_LINKS = [
  { label: "Termos de uso", href: "/termos" },
  { label: "Política de privacidade", href: "/privacidade" },
];

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-blue-950 px-6 py-16 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="flex w-fit cursor-pointer items-center gap-3"
            >
              <Image
                src="/logo.png"
                alt="Acolher Aparecida"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <span className="text-base font-semibold text-white">
                Acolher Aparecida
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm text-white/60">
              Hospedagens para sua fé em Aparecida-SP, com reserva e pagamento
              100% pela plataforma.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Navegação</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="cursor-pointer text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Contato</h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-white/60">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-white/70" />
                Aparecida, São Paulo
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-white/70" />
                contato@acolheraparecida.com.br
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-white/70" />
                (12) 0000-0000
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs text-white/50">
            © {CURRENT_YEAR} Acolher Aparecida. Todos os direitos reservados.
          </p>

          <ul className="flex items-center gap-6">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="cursor-pointer text-xs text-white/50 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
