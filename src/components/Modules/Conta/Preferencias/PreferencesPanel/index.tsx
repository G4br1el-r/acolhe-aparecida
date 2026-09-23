"use client";

import { PreferencesForm } from "@/components/Modules/Conta/Preferencias/PreferencesForm";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUser } from "@/hooks/Modules/Conta/use-session";

export function PreferencesPanel() {
  const { user } = useCurrentUser();

  if (!user) {
    return (
      <div aria-busy className="mt-8 flex flex-col gap-6">
        <Skeleton className="h-5 w-72" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-11 w-40 rounded-full" />
          <Skeleton className="h-11 w-36 rounded-full" />
          <Skeleton className="h-11 w-44 rounded-full" />
        </div>
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  return (
    <PreferencesForm key={user.id} initialPreferences={user.preferences} />
  );
}
