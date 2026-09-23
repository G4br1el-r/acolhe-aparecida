import { Skeleton } from "@/components/ui/skeleton";

export function AuthFallback() {
  return (
    <div aria-busy className="flex flex-col gap-4">
      <span className="sr-only">Carregando</span>
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-64" />
      <Skeleton className="mt-4 h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="mt-2 h-13 w-full rounded-full" />
    </div>
  );
}
