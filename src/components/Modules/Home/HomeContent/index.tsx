"use client";

import { useState } from "react";
import { AvaliacoesSection } from "@/components/Modules/Home/AvaliacoesSection";
import { ComoFuncionaSection } from "@/components/Modules/Home/ComoFuncionaSection";
import { DiaEmAparecidaSection } from "@/components/Modules/Home/DiaEmAparecidaSection";
import { FechamentoSection } from "@/components/Modules/Home/FechamentoSection";
import { Hero } from "@/components/Modules/Home/Hero";
import { HospedagensSection } from "@/components/Modules/Home/HospedagensSection";
import { MapaSection } from "@/components/Modules/Home/MapaSection";
import { SplashScreen } from "@/components/Modules/Home/SplashScreen";

export function HomeContent() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  return (
    <>
      {isSplashVisible && (
        <SplashScreen onFinish={() => setIsSplashVisible(false)} />
      )}
      <Hero isReady={!isSplashVisible} />
      <MapaSection />
      <HospedagensSection />
      <DiaEmAparecidaSection />
      <ComoFuncionaSection />
      <AvaliacoesSection />
      <FechamentoSection />
    </>
  );
}
