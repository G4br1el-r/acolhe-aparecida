"use client";

import type { ReactNode } from "react";

type MobileActionBarProps = {
  children: ReactNode;
};

export function MobileActionBar({ children }: MobileActionBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-blue-950/10 bg-white/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden [&>*]:flex-1">
      {children}
    </div>
  );
}
