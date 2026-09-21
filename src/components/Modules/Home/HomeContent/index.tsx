"use client";

import { useState } from "react";
import { CtaSection } from "@/components/Modules/Home/CtaSection";
import { Hero } from "@/components/Modules/Home/Hero";
import { HospedagensSection } from "@/components/Modules/Home/HospedagensSection";
import { ProfileSection } from "@/components/Modules/Home/ProfileSection";
import { SplashScreen } from "@/components/Modules/Home/SplashScreen";

export function HomeContent() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  return (
    <>
      {isSplashVisible && (
        <SplashScreen onFinish={() => setIsSplashVisible(false)} />
      )}
      <Hero isReady={!isSplashVisible} />
      <ProfileSection />
      <HospedagensSection />
      <CtaSection />
    </>
  );
}
