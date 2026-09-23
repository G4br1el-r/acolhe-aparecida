"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUser } from "@/hooks/Modules/Conta/use-session";
import { formatMonthYear } from "@/lib/Modules/Hospedagens/format-date";

export function ContaHeader() {
  const { user } = useCurrentUser();

  if (!user) {
    return (
      <div aria-busy className="flex flex-col gap-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-4 w-80" />
      </div>
    );
  }

  const location = [user.address.city, user.address.state]
    .filter(Boolean)
    .join(", ");

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
        Sua conta
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-blue-950 md:text-4xl">
        {user.fullName}
      </h1>
      <p className="mt-2 flex flex-wrap items-center gap-x-2 text-sm text-blue-950/65 md:text-base">
        <span>{user.email}</span>
        {location && (
          <>
            <span aria-hidden className="text-blue-950/30">
              ·
            </span>
            <span>{location}</span>
          </>
        )}
        <span aria-hidden className="text-blue-950/30">
          ·
        </span>
        <span>
          Com a gente desde {formatMonthYear(user.createdAt).toLowerCase()}
        </span>
      </p>
    </div>
  );
}
