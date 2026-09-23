"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { AuthFallback } from "@/components/Modules/Conta/Auth/AuthFallback";
import { useNextPath } from "@/hooks/Modules/Conta/use-next-path";
import { useCurrentUser } from "@/hooks/Modules/Conta/use-session";

type AuthGateProps = {
  children: ReactNode;
};

export function AuthGate({ children }: AuthGateProps) {
  const router = useRouter();
  const nextPath = useNextPath();
  const { isAuthenticated, isResolving } = useCurrentUser();

  useEffect(() => {
    if (!isResolving && isAuthenticated) {
      router.replace(nextPath);
    }
  }, [isAuthenticated, isResolving, nextPath, router]);

  if (isResolving || isAuthenticated) {
    return <AuthFallback />;
  }

  return <>{children}</>;
}
