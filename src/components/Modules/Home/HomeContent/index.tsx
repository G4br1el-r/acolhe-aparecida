"use client";

import { CtaSection } from "@/components/Modules/Home/CtaSection";
import { Hero } from "@/components/Modules/Home/Hero";
import { HospedagensSection } from "@/components/Modules/Home/HospedagensSection";
import { ProfileSection } from "@/components/Modules/Home/ProfileSection";

// SplashScreen desabilitado temporariamente — reativar quando pedido.
// import { SplashScreen } from "@/components/Modules/Home/SplashScreen";

export function HomeContent() {
  return (
    <>
      <Hero />
      <ProfileSection />
      <HospedagensSection />
      <CtaSection />
    </>
  );
}
