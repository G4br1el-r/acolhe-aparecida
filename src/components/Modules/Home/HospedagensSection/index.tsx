import { Reveal, RevealItem } from "@/components/ui/reveal";
import { ACCOMMODATIONS } from "@/constants/Modules/Home/accommodations";
import { HotelCard } from "../HotelCard";
import { ViewAllCard } from "../ViewAllCard";

const VIEW_ALL_PREVIEW_COUNT = 3;
const MAX_VISIBLE_ACCOMMODATIONS = 7;

export function HospedagensSection() {
  return (
    <section className="bg-white px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal trigger="inView" amount={0.1} margin="0px 0px -5% 0px">
          <RevealItem>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
              Hospedagens em Aparecida
            </p>
          </RevealItem>

          <RevealItem className="mt-4">
            <h2 className="text-4xl font-bold leading-[1.05] text-blue-950 md:text-5xl">
              Encontre seu lugar em Aparecida
            </h2>
          </RevealItem>

          <RevealItem className="mt-4 max-w-2xl">
            <p className="text-base text-blue-950/70 md:text-lg">
              Hotéis, pousadas e casas de temporada para uma estadia tranquila,
              perto da sua fé.
            </p>
          </RevealItem>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ACCOMMODATIONS.slice(0, MAX_VISIBLE_ACCOMMODATIONS).map(
              (accommodation) => (
                <RevealItem key={accommodation.slug} className="h-full">
                  <HotelCard accommodation={accommodation} />
                </RevealItem>
              ),
            )}

            <RevealItem className="h-full">
              <ViewAllCard
                href="/hospedagens"
                previewAccommodations={ACCOMMODATIONS.slice(
                  -VIEW_ALL_PREVIEW_COUNT,
                )}
              />
            </RevealItem>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
