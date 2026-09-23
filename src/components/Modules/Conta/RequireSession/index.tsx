"use client";

import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUser } from "@/hooks/Modules/Conta/use-session";

type RequireSessionProps = {
  children: ReactNode;
};

export function RequireSession({ children }: RequireSessionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isResolving } = useCurrentUser();

  useEffect(() => {
    if (!isResolving && !isAuthenticated) {
      router.replace(`/entrar?next=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, isResolving, pathname, router]);

  if (isResolving || !isAuthenticated) {
    return (
      <section
        aria-busy
        aria-label="Carregando sua conta"
        className="mx-auto w-full max-w-5xl px-4 pt-28 pb-20 sm:px-6 lg:px-8"
      >
        <Skeleton className="h-8 w-56" />
        <Skeleton className="mt-3 h-4 w-80" />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Skeleton className="h-44 rounded-3xl" />
          <Skeleton className="h-44 rounded-3xl" />
        </div>
      </section>
    );
  }

  return <>{children}</>;
}
