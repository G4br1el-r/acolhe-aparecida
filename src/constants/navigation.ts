export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Hospedagens", href: "/hospedagens" },
  { label: "Datas e eventos", href: "/eventos" },
  { label: "Guia de Aparecida", href: "/guia" },
  { label: "Suporte", href: "/suporte" },
];

export const ACCOUNT_LINKS: NavLink[] = [
  { label: "Minha Viagem", href: "/minha-viagem" },
  { label: "Favoritos", href: "/favoritos" },
  { label: "Minha conta", href: "/conta" },
  { label: "Notificações", href: "/conta/notificacoes" },
];

export const LEGAL_LINKS: NavLink[] = [
  { label: "Termos de uso", href: "/termos" },
  { label: "Política de privacidade", href: "/privacidade" },
];
