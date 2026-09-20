import Link from "next/link";

const NAV_LINKS = [
  { label: "Hospedagens", href: "/hospedagens" },
  { label: "Datas e eventos", href: "/eventos" },
  { label: "Guia de Aparecida", href: "/guia" },
  { label: "Suporte", href: "/suporte" },
];

export function Header() {
  return (
    <header className="relative z-20 flex items-center justify-end px-6 py-5 md:px-10">
      <Link
        href="/"
        className="absolute left-6 flex cursor-pointer items-center gap-3 rounded-full bg-white/40 px-4 py-2 shadow-sm ring-1 ring-white/40 backdrop-blur-sm transition-colors hover:bg-white/50 md:left-10"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-900 text-sm font-semibold text-white">
          AA
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-sm font-semibold text-blue-950">
            Acolher Aparecida
          </span>
          <span className="text-xs text-blue-900/70">
            Sua viagem ao Santuário
          </span>
        </span>
      </Link>

      <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full bg-white/40 px-2 py-2 shadow-sm ring-1 ring-white/40 backdrop-blur-sm lg:flex">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="cursor-pointer rounded-full px-4 py-2 text-sm font-medium text-blue-950 transition-colors hover:bg-white/60"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <Link
        href="/entrar"
        className="cursor-pointer rounded-full bg-white/40 px-5 py-2.5 text-sm font-semibold text-blue-950 shadow-sm ring-1 ring-white/40 backdrop-blur-sm transition-colors hover:bg-white/50"
      >
        Entrar
      </Link>
    </header>
  );
}
