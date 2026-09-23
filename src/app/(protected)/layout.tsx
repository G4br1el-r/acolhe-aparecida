import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { RequireSession } from "@/components/Modules/Conta/RequireSession";

type ProtectedLayoutProps = {
  children: ReactNode;
};

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <>
      <Header isSolid />
      <main className="min-h-screen bg-blue-50/40">
        <RequireSession>{children}</RequireSession>
      </main>
    </>
  );
}
