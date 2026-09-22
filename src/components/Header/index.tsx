"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Hospedagens", href: "/hospedagens" },
  { label: "Datas e eventos", href: "/eventos" },
  { label: "Guia de Aparecida", href: "/guia" },
  { label: "Suporte", href: "/suporte" },
];

const ENTRANCE_DURATION_IN_SECONDS = 0.5;
const ENTRANCE_DELAY_IN_SECONDS = 0.1;
const SCROLL_THRESHOLD_IN_PX = 8;

type HeaderProps = {
  isReady?: boolean;
  isSolid?: boolean;
};

export function Header({ isReady = true, isSolid = false }: HeaderProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD_IN_PX);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-end px-6 py-5 backdrop-blur-sm transition-colors duration-300 md:px-10 ${
        isSolid
          ? "bg-white/90 shadow-sm"
          : isScrolled
            ? "bg-white/70 shadow-sm"
            : "bg-transparent"
      }`}
    >
      <Link
        href="/"
        className="absolute left-6 flex cursor-pointer items-center rounded-full bg-white p-2 shadow-sm ring-1 ring-black/5 transition-opacity hover:opacity-80 md:left-10"
      >
        <Image
          src="/logo.png"
          alt="Acolher Aparecida"
          width={44}
          height={44}
          className="h-11 w-11 object-contain"
        />
      </Link>

      <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full bg-white px-2 py-2 shadow-sm ring-1 ring-black/5 lg:flex">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="cursor-pointer rounded-full px-4 py-2 text-sm font-medium text-blue-950/80 transition-colors hover:text-blue-950"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <Link
        href="/entrar"
        className="cursor-pointer rounded-full bg-blue-950 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-900"
      >
        Entrar
      </Link>
    </motion.header>
  );
}
