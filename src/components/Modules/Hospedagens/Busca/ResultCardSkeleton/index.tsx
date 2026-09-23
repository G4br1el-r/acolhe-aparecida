import { Skeleton } from "@/components/ui/skeleton";

export function ResultCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-blue-950/8 sm:flex-row">
      <Skeleton className="aspect-4/3 rounded-none sm:aspect-auto sm:w-64 md:w-72" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <div className="mt-auto flex items-end justify-between pt-4">
          <Skeleton className="h-7 w-24 rounded-full" />
          <Skeleton className="h-6 w-28" />
        </div>
      </div>
    </div>
  );
}
