"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type ContaNavItem = {
  label: string;
  href: string;
};

type ContaNavGroup = {
  title: string;
  items: ContaNavItem[];
};

const NAV_GROUPS: ContaNavGroup[] = [
  {
    title: "Conta",
    items: [
      { label: "Dados pessoais", href: "/conta" },
      { label: "Preferências", href: "/conta/preferencias" },
      { label: "Hóspedes frequentes", href: "/conta/hospedes" },
      { label: "Cupons", href: "/conta/cupons" },
      { label: "Notificações", href: "/conta/notificacoes" },
      { label: "Minhas avaliações", href: "/conta/avaliacoes" },
    ],
  },
  {
    title: "Sua viagem",
    items: [
      { label: "Minha Viagem", href: "/minha-viagem" },
      { label: "Favoritos", href: "/favoritos" },
    ],
  },
];

export function ContaNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Seções da conta"
      className="-mx-4 min-w-0 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
    >
      <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-none lg:sticky lg:top-28 lg:flex-col lg:gap-8 lg:overflow-visible lg:pb-0">
        {NAV_GROUPS.map((group) => (
          <div key={group.title} className="flex shrink-0 gap-1 lg:flex-col">
            <p className="hidden px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-blue-950/45 lg:block">
              {group.title}
            </p>
            {group.items.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex h-11 shrink-0 items-center whitespace-nowrap rounded-full px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 lg:rounded-xl lg:px-3",
                    isActive
                      ? "bg-blue-950 text-white lg:bg-white lg:text-blue-950 lg:shadow-sm lg:ring-1 lg:ring-blue-950/10"
                      : "bg-white text-blue-950/75 ring-1 ring-blue-950/10 hover:bg-blue-50 hover:text-blue-950 lg:bg-transparent lg:ring-0",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </nav>
  );
}
