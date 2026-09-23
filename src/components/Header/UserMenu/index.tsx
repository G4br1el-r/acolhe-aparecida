"use client";

import { Bell, Heart, LogOut, MapPinned, UserRound } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotifications } from "@/hooks/Modules/Conta/use-notifications";
import { useLogout } from "@/hooks/Modules/Conta/use-session";

const INITIALS_COUNT = 2;
const MAX_BADGE_COUNT = 9;

type UserMenuProps = {
  fullName: string;
};

function initialsOf(fullName: string): string {
  return fullName
    .replace(/^(Pe\.|Pe|Dona|Sr\.|Sra\.)\s+/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, INITIALS_COUNT)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function UserMenu({ fullName }: UserMenuProps) {
  const logout = useLogout();
  const { data: notifications } = useNotifications();

  const unreadCount = notifications?.filter((item) => !item.isRead).length ?? 0;

  function handleLogout() {
    logout();
    window.location.assign("/");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`Conta de ${fullName}`}
        className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-blue-950 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
      >
        {initialsOf(fullName)}
        {unreadCount > 0 && (
          <>
            <span className="sr-only">
              {unreadCount} notificações não lidas
            </span>
            <span
              aria-hidden
              className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-cta px-1 text-[11px] font-bold text-white ring-2 ring-white"
            >
              {unreadCount > MAX_BADGE_COUNT
                ? `${MAX_BADGE_COUNT}+`
                : unreadCount}
            </span>
          </>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64 rounded-2xl p-2">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-3 py-2 text-xs text-blue-950/50">
            <span className="block truncate text-sm font-semibold text-blue-950">
              {fullName}
            </span>
            Sua conta
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          render={<Link href="/minha-viagem" />}
          className="cursor-pointer rounded-xl px-3 py-2.5 text-sm text-blue-950"
        >
          <MapPinned className="h-4 w-4 text-blue-900/70" />
          Minha Viagem
        </DropdownMenuItem>
        <DropdownMenuItem
          render={<Link href="/favoritos" />}
          className="cursor-pointer rounded-xl px-3 py-2.5 text-sm text-blue-950"
        >
          <Heart className="h-4 w-4 text-blue-900/70" />
          Favoritos
        </DropdownMenuItem>
        <DropdownMenuItem
          render={<Link href="/conta/notificacoes" />}
          className="cursor-pointer rounded-xl px-3 py-2.5 text-sm text-blue-950"
        >
          <Bell className="h-4 w-4 text-blue-900/70" />
          Notificações
          {unreadCount > 0 && (
            <span className="ml-auto rounded-full bg-cta px-2 py-0.5 text-[11px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          render={<Link href="/conta" />}
          className="cursor-pointer rounded-xl px-3 py-2.5 text-sm text-blue-950"
        >
          <UserRound className="h-4 w-4 text-blue-900/70" />
          Minha conta
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer rounded-xl px-3 py-2.5 text-sm text-blue-950/70"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
