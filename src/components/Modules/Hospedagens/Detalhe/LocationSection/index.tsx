import { Footprints, MapPin } from "lucide-react";
import { NEARBY_PLACES } from "@/constants/Modules/Hospedagens/Detalhe/details";
import { DetailSection } from "../DetailSection";

export function LocationSection() {
  return (
    <DetailSection
      title="Onde você vai ficar"
      description="Centro de Aparecida, São Paulo."
    >
      <div className="relative overflow-hidden rounded-2xl bg-blue-50 p-6 ring-1 ring-blue-950/10 sm:p-8">
        <svg
          aria-hidden
          viewBox="0 0 400 200"
          className="pointer-events-none absolute inset-0 h-full w-full text-blue-900/8"
          preserveAspectRatio="none"
        >
          <title>Traçado decorativo de ruas</title>
          <path
            d="M0 60 H400 M0 130 H400 M90 0 V200 M230 0 V200 M320 0 V200"
            stroke="currentColor"
            strokeWidth="14"
            fill="none"
          />
        </svg>

        <ul className="relative grid gap-3 sm:grid-cols-2">
          {NEARBY_PLACES.map((place) => (
            <li
              key={place.name}
              className="flex items-start gap-3 rounded-xl bg-white/85 p-4 backdrop-blur-sm"
            >
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-blue-900/70" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-blue-950">
                  {place.name}
                </p>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-blue-950/60">
                  <Footprints className="h-3.5 w-3.5" />
                  {place.distanceLabel} · {place.walkingLabel}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </DetailSection>
  );
}
