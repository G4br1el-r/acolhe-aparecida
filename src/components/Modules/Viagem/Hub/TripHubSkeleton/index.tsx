import { Skeleton } from "@/components/ui/skeleton";

const LIST_ITEM_COUNT = 3;
const LIST_ITEMS = Array.from({ length: LIST_ITEM_COUNT }, (_, index) => index);

export function TripHubSkeleton() {
  return (
    <section aria-busy aria-label="Carregando suas viagens">
      <Skeleton className="h-72 w-full rounded-3xl md:h-96" />
      <Skeleton className="mt-10 h-11 w-72 rounded-full" />
      <ul className="mt-6 flex flex-col gap-3">
        {LIST_ITEMS.map((item) => (
          <li key={item}>
            <Skeleton className="h-28 w-full rounded-2xl" />
          </li>
        ))}
      </ul>
    </section>
  );
}
