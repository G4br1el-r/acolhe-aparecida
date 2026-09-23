import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_COUNT = 4;

export function FavoritesGridSkeleton() {
  return (
    <div aria-busy className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: SKELETON_COUNT }, (_, index) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: esqueletos sem identidade
          key={index}
          className="overflow-hidden rounded-2xl bg-white ring-1 ring-blue-950/8"
        >
          <Skeleton className="aspect-4/3 rounded-none" />
          <div className="flex flex-col gap-3 p-4">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-9 w-full rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
