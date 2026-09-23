import { Skeleton } from "@/components/ui/skeleton";

const SECTION_COUNT = 4;
const SECTIONS = Array.from({ length: SECTION_COUNT }, (_, index) => index);

export function TripDetailSkeleton() {
  return (
    <section aria-busy aria-label="Carregando sua reserva">
      <Skeleton className="h-6 w-40 rounded-full" />
      <Skeleton className="mt-4 h-10 w-3/4 max-w-md" />
      <Skeleton className="mt-3 h-5 w-64" />
      <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="flex flex-col gap-5">
          {SECTIONS.map((section) => (
            <Skeleton key={section} className="h-48 rounded-3xl" />
          ))}
        </div>
        <Skeleton className="hidden h-80 rounded-3xl lg:block" />
      </div>
    </section>
  );
}
