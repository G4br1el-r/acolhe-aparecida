"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/constants/navigation";
import { useCurrentUser } from "@/hooks/Modules/Conta/use-session";
import { FavoritesLink } from "./FavoritesLink";
import { MobileMenu } from "./MobileMenu";
import { UserMenu } from "./UserMenu";

const ENTRANCE_DURATION_IN_SECONDS = 0.5;
const ENTRANCE_DELAY_IN_SECONDS = 0.1;
const SCROLL_THRESHOLD_IN_PX = 8;

type HeaderProps = {
  isReady?: boolean;
  isSolid?: boolean;
};

export function Header({ isReady = true, isSolid = false }: HeaderProps) {
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, isResolving } = useCurrentUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD_IN_PX);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showsBackdrop = isScrolled || isSolid;

  return (
    <motion.header
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -16 }}
      animate={
        isReady
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: shouldReduceMotion ? 0 : -16 }
      }
      transition={{
        duration: shouldReduceMotion ? 0 : ENTRANCE_DURATION_IN_SECONDS,
        delay: shouldReduceMotion ? 0 : ENTRANCE_DELAY_IN_SECONDS,
        ease: "easeOut",
      }}
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-4 transition-all duration-300 md:px-10 md:py-5 ${
        showsBackdrop ? "bg-white/70 backdrop-blur-md" : ""
      }`}
    >
      <Link
        href="/"
        aria-label="Acolher Aparecida, página inicial"
        className="flex cursor-pointer items-center rounded-full bg-white p-2 shadow-sm ring-1 ring-black/5 transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
      >
        <Image
          src="/logo.png"
          alt=""
          width={44}
          height={44}
          className="h-10 w-10 object-contain md:h-11 md:w-11"
        />
      </Link>

      <nav
        aria-label="Navegação principal"
        className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full bg-white px-2 py-2 shadow-sm ring-1 ring-black/5 lg:flex"
      >
        {NAV_LINKS.map((link) => {
          const isActive = pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 ${
                isActive
                  ? "bg-blue-50 text-blue-950"
                  : "text-blue-950/80 hover:text-blue-950"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-2">
        <FavoritesLink />

        {isAuthenticated && user ? (
          <UserMenu fullName={user.fullName} />
        ) : isResolving && isAuthenticated ? (
          <span
            aria-hidden
            className="h-11 w-11 animate-pulse rounded-full bg-white/80 ring-1 ring-black/5"
          />
        ) : (
          <Link
            href="/entrar"
            className="hidden h-11 cursor-pointer items-center rounded-full bg-blue-950 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 sm:flex"
          >
            Entrar
          </Link>
        )}

        <MobileMenu userName={user?.fullName ?? null} />
      </div>
    </motion.header>
  );
}
