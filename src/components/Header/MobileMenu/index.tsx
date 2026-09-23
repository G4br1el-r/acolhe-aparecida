"use client";

import { LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandLink } from "@/components/ui/brand-button";
import { Sheet } from "@/components/ui/sheet";
import { ACCOUNT_LINKS, NAV_LINKS } from "@/constants/navigation";
import { useLogout } from "@/hooks/Modules/Conta/use-session";

type MobileMenuProps = {
  userName: string | null;
};

export function MobileMenu({ userName }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const logout = useLogout();

  function handleLogout() {
    logout();
    setIsOpen(false);
    window.location.assign("/");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Abrir menu"
        aria-expanded={isOpen}
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white text-blue-950 shadow-sm ring-1 ring-black/5 transition-colors hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <Sheet
        open={isOpen}
        onOpenChange={setIsOpen}
        side="right"
        title={userName ? `Olá, ${userName.split(" ")[0]}` : "Menu"}
        description={
          userName ? "Sua viagem, suas reservas e sua conta." : undefined
        }
        footer={
          userName ? (
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full py-3 text-sm font-medium text-blue-950/70 transition-colors hover:bg-blue-50 hover:text-blue-950"
            >
              <LogOut className="h-4 w-4" />
              Sair da conta
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <BrandLink href="/entrar" fullWidth>
                Entrar
              </BrandLink>
              <BrandLink href="/cadastro" variant="secondary" fullWidth>
                Criar conta
              </BrandLink>
            </div>
          )
        }
      >
        <nav aria-label="Navegação principal">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center rounded-2xl px-4 py-3.5 text-base font-medium transition-colors hover:bg-blue-50 ${
                    pathname.startsWith(link.href)
                      ? "bg-blue-50 text-blue-950"
                      : "text-blue-950/80"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {userName && (
          <nav aria-label="Sua conta" className="mt-6">
            <p className="px-4 text-xs font-semibold uppercase tracking-wide text-blue-950/45">
              Sua conta
            </p>
            <ul className="mt-2 flex flex-col">
              {ACCOUNT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition-colors hover:bg-blue-50 ${
                      pathname === link.href
                        ? "bg-blue-50 text-blue-950"
                        : "text-blue-950/80"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </Sheet>
    </>
  );
}
