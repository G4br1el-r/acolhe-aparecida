import { Accessibility, Bed, DoorOpen, Users } from "lucide-react";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import type { Accommodation } from "@/constants/Modules/Home/accommodations";
import { PARTNER_HIGHLIGHTS } from "@/constants/Modules/Hospedagens/Detalhe/details";

const VIEWPORT_AMOUNT = 0.1;
const VIEWPORT_MARGIN = "0px 0px -5% 0px";

type OverviewSectionProps = {
  accommodation: Accommodation;
};

export function OverviewSection({ accommodation }: OverviewSectionProps) {
  const summaryItems = [
    { icon: Users, label: `Até ${accommodation.maxGuests} hóspedes` },
    {
      icon: DoorOpen,
      label: `${accommodation.roomCount} ${
        accommodation.roomCount === 1 ? "quarto" : "quartos"
      }`,
    },
    {
      icon: Bed,
      label: `${accommodation.bedCount} ${
        accommodation.bedCount === 1 ? "cama" : "camas"
      }`,
    },
  ];

  if (accommodation.isAccessible) {
    summaryItems.push({ icon: Accessibility, label: "Quarto acessível" });
  }

  return (
    <Reveal
      trigger="inView"
      amount={VIEWPORT_AMOUNT}
      margin={VIEWPORT_MARGIN}
      className="border-b border-blue-950/10 py-9"
    >
      <RevealItem>
        <p className="text-sm font-medium text-blue-900/70">
          Hospedagem em Aparecida
        </p>
        <h2 className="mt-1 text-xl font-semibold tracking-tight text-blue-950 sm:text-2xl">
          {accommodation.distanceFromSanctuary}
        </h2>
      </RevealItem>

      <RevealItem className="mt-5">
        <ul className="flex flex-wrap gap-x-6 gap-y-3">
          {summaryItems.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-2 text-sm text-blue-950/70"
            >
              <item.icon className="h-4 w-4 text-blue-900/70" />
              {item.label}
            </li>
          ))}
        </ul>
      </RevealItem>

      <RevealItem className="mt-7">
        <ul className="grid gap-4 sm:grid-cols-3">
          {PARTNER_HIGHLIGHTS.map((highlight) => (
            <li
              key={highlight.label}
              className="flex items-start gap-3 rounded-xl bg-blue-50/60 p-4"
            >
              <highlight.icon className="mt-0.5 h-5 w-5 shrink-0 text-blue-900/70" />
              <span className="text-sm text-blue-950/80">
                {highlight.label}
              </span>
            </li>
          ))}
        </ul>
      </RevealItem>
    </Reveal>
  );
}
