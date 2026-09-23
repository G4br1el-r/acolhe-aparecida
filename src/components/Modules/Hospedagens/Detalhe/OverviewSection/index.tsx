import { BadgeCheck, Bed, DoorOpen, Footprints, Users } from "lucide-react";
import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import { Reveal, RevealItem } from "@/components/ui/reveal";
import {
  ACCOMMODATION_TYPE_LABELS,
  BADGE_CRITERIA,
  BADGE_LABELS,
} from "@/constants/Modules/Hospedagens/features";
import { pluralize } from "@/lib/Modules/Hospedagens/format-date";

const VIEWPORT_AMOUNT = 0.1;
const VIEWPORT_MARGIN = "0px 0px -5% 0px";

type OverviewSectionProps = {
  accommodation: Accommodation;
};

export function OverviewSection({ accommodation }: OverviewSectionProps) {
  const isWholeHome =
    accommodation.type === "casa" || accommodation.type === "apartamento";

  const summaryItems = [
    {
      icon: Users,
      label: isWholeHome
        ? `Até ${accommodation.maxGuests} hóspedes`
        : `Quartos para até ${accommodation.maxGuests} hóspedes`,
    },
    {
      icon: DoorOpen,
      label: isWholeHome
        ? pluralize(accommodation.roomCount, "quarto", "quartos")
        : pluralize(
            accommodation.rooms.length,
            "tipo de quarto",
            "tipos de quarto",
          ),
    },
    {
      icon: Bed,
      label: pluralize(accommodation.bedCount, "cama", "camas"),
    },
  ];

  const badges = accommodation.badges.filter(
    (badge) => badge !== "parceiro-verificado",
  );

  return (
    <Reveal
      trigger="inView"
      amount={VIEWPORT_AMOUNT}
      margin={VIEWPORT_MARGIN}
      className="border-b border-blue-950/10 py-9"
    >
      <RevealItem>
        <p className="text-sm font-medium text-blue-900/70">
          {ACCOMMODATION_TYPE_LABELS[accommodation.type]} em{" "}
          {accommodation.address.neighborhood}
        </p>
        <h2 className="mt-1 flex items-center gap-2 text-xl font-semibold tracking-tight text-blue-950 sm:text-2xl">
          <Footprints className="h-5 w-5 text-blue-900/70" aria-hidden />
          {accommodation.distanceFromSanctuary}, {accommodation.walkingMinutes}{" "}
          min a pé
        </h2>
        <p className="mt-2 max-w-prose text-base text-blue-950/70">
          {accommodation.tagline}
        </p>
      </RevealItem>

      <RevealItem className="mt-5">
        <ul className="flex flex-wrap gap-x-6 gap-y-3">
          {summaryItems.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-2 text-sm text-blue-950/70"
            >
              <item.icon className="h-4 w-4 text-blue-900/70" aria-hidden />
              {item.label}
            </li>
          ))}
        </ul>
      </RevealItem>

      <RevealItem className="mt-7">
        <ul className="grid gap-3 sm:grid-cols-2">
          <li className="flex items-start gap-3 rounded-2xl bg-blue-50/60 p-4">
            <BadgeCheck
              className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
              aria-hidden
            />
            <div>
              <p className="text-sm font-semibold text-blue-950">
                Parceiro verificado desde {accommodation.partner.partnerSince}
              </p>
              <p className="mt-0.5 text-xs text-blue-950/60">
                {BADGE_CRITERIA["parceiro-verificado"]}
              </p>
            </div>
          </li>
          {badges.map((badge) => {
            const { label, icon: Icon } = BADGE_LABELS[badge];
            return (
              <li
                key={badge}
                className="flex items-start gap-3 rounded-2xl bg-blue-50/60 p-4"
              >
                <Icon
                  className="mt-0.5 h-5 w-5 shrink-0 text-blue-900/70"
                  aria-hidden
                />
                <div>
                  <p className="text-sm font-semibold text-blue-950">{label}</p>
                  <p className="mt-0.5 text-xs text-blue-950/60">
                    {BADGE_CRITERIA[badge]}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </RevealItem>
    </Reveal>
  );
}
