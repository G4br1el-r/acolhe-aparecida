import type { ReactNode } from "react";
import { ContaHeader } from "@/components/Modules/Conta/Hub/ContaHeader";
import { ContaNav } from "@/components/Modules/Conta/Hub/ContaNav";

type ContaShellProps = {
  children: ReactNode;
};

export function ContaShell({ children }: ContaShellProps) {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 pt-24 pb-20 sm:px-6 md:pt-28 lg:px-8">
      <ContaHeader />

      <div className="mt-8 grid gap-6 lg:mt-12 lg:grid-cols-[13.5rem_minmax(0,1fr)] lg:gap-14">
        <div className="min-w-0">
          <ContaNav />
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
