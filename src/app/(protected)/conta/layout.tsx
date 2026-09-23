import type { ReactNode } from "react";
import { ContaShell } from "@/components/Modules/Conta/Hub/ContaShell";

type ContaLayoutProps = {
  children: ReactNode;
};

export default function ContaLayout({ children }: ContaLayoutProps) {
  return <ContaShell>{children}</ContaShell>;
}
