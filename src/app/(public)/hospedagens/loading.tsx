import { Header } from "@/components/Header";
import { ResultCardSkeleton } from "@/components/Modules/Hospedagens/Busca/ResultCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_COUNT = 4;
const QUICK_FILTER_COUNT = 5;

export default function HospedagensLoading() {
  return (
    <>
      <Header isSolid />
      <main className="min-h-screen bg-blue-50/40">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="pt-24 md:pt-28">
            <Skeleton className="h-16 w-full rounded-3xl bg-white ring-1 ring-blue-950/8" />
          </div>

          <div aria-busy className="mt-6 flex flex-col gap-4">
            <div className="flex gap-2 overflow-hidden">
              {Array.from({ length: QUICK_FILTER_COUNT }, (_, index) => (
                <Skeleton
                  // biome-ignore lint/suspicious/noArrayIndexKey: esqueletos sem identidade
                  key={index}
                  className="h-10 w-32 shrink-0 rounded-full"
                />
              ))}
            </div>

            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-80" />
              </div>
              <Skeleton className="h-11 w-44 rounded-full" />
            </div>

            <p className="sr-only">Procurando hospedagens em Aparecida</p>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,26rem)]">
              <div className="flex flex-col gap-4">
                {Array.from({ length: SKELETON_COUNT }, (_, index) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: esqueletos sem identidade
                  <ResultCardSkeleton key={index} />
                ))}
              </div>
              <Skeleton className="hidden aspect-4/5 rounded-3xl lg:block" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
