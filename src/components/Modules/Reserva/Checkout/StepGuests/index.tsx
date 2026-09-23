"use client";

import { Pencil, UserPlus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { FrequentGuest } from "@/@types/Modules/Conta/user";
import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import type {
  GuestAgeGroup,
  ReservationGuest,
} from "@/@types/Modules/Reserva/reservation";
import { BrandButton } from "@/components/ui/brand-button";
import { Checkbox } from "@/components/ui/checkbox";
import { Counter } from "@/components/ui/counter";
import { TextField } from "@/components/ui/text-field";
import type { CheckoutQuote } from "@/hooks/Modules/Reserva/Checkout/use-checkout-quote";
import {
  formatStayRange,
  pluralize,
} from "@/lib/Modules/Hospedagens/format-date";
import { availableExtrasFor } from "@/lib/Modules/Reserva/Checkout/extras-from-draft";
import { formatCurrency } from "@/lib/Modules/Reserva/Checkout/price-summary";
import { searchParamsToQueryString } from "@/schemas/Modules/Hospedagens/Busca/search-params";
import { guestNameSchema } from "@/schemas/Modules/Reserva/Checkout/checkout";
import { useCheckoutStore } from "@/store/Modules/Reserva/Checkout/use-checkout-store";

const AGE_GROUP_LABELS: Record<GuestAgeGroup, string> = {
  adulto: "Adulto",
  crianca: "Criança",
  idoso: "Idoso",
};

type StepGuestsProps = {
  accommodation: Accommodation;
  quote: CheckoutQuote;
  frequentGuests: FrequentGuest[];
  responsibleName: string;
  onContinue: () => void;
};

function buildGuestSlots(
  adults: number,
  children: number,
  seniors: number,
  existing: ReservationGuest[],
  responsibleName: string,
): ReservationGuest[] {
  const groups: GuestAgeGroup[] = [
    ...Array.from({ length: adults }, () => "adulto" as const),
    ...Array.from({ length: children }, () => "crianca" as const),
    ...Array.from({ length: seniors }, () => "idoso" as const),
  ];

  return groups.map((ageGroup, index) => {
    const previous = existing[index];
    const fullName =
      previous?.ageGroup === ageGroup
        ? previous.fullName
        : index === 0 && ageGroup === "adulto"
          ? responsibleName
          : "";

    return {
      id: previous?.id ?? `guest-${index + 1}`,
      fullName,
      ageGroup,
      age: previous?.ageGroup === ageGroup ? previous.age : undefined,
    };
  });
}

export function StepGuests({
  accommodation,
  quote,
  frequentGuests,
  responsibleName,
  onContinue,
}: StepGuestsProps) {
  const updateDraft = useCheckoutStore((state) => state.updateDraft);
  const { draft, room, roomAvailability, nightCount, guestCount } = quote;
  const [errors, setErrors] = useState<Record<string, string>>({});

  const guests = buildGuestSlots(
    draft.adults,
    draft.children,
    draft.seniors,
    draft.guests,
    responsibleName,
  );
  const extras = availableExtrasFor(accommodation);
  const maxRooms = Math.max(1, roomAvailability.unitsLeft);
  const guestsPerRoom = Math.ceil(guestCount / draft.roomCount);
  const exceedsRoom = guestsPerRoom > room.maxGuests;

  const editHref = `/hospedagens/${accommodation.slug}?${searchParamsToQueryString(
    {
      checkin: draft.checkIn,
      checkout: draft.checkOut,
      adultos: draft.adults,
      criancas: draft.children,
      idosos: draft.seniors,
      quartos: draft.roomCount,
    },
  )}`;

  function setCounts(
    changes: Partial<
      Pick<typeof draft, "adults" | "children" | "seniors" | "roomCount">
    >,
  ) {
    const next = { ...draft, ...changes };
    updateDraft({
      ...changes,
      guests: buildGuestSlots(
        next.adults,
        next.children,
        next.seniors,
        guests,
        responsibleName,
      ),
    });
  }

  function setGuestName(index: number, fullName: string) {
    const next = guests.map((guest, position) =>
      position === index ? { ...guest, fullName } : guest,
    );
    updateDraft({ guests: next });
    setErrors((current) => ({ ...current, [next[index].id]: "" }));
  }

  function fillFromFrequent(frequent: FrequentGuest) {
    const targetIndex = guests.findIndex(
      (guest) =>
        guest.ageGroup === frequent.ageGroup && guest.fullName.trim() === "",
    );
    if (targetIndex < 0) return;

    const next = guests.map((guest, position) =>
      position === targetIndex
        ? { ...guest, fullName: frequent.fullName, age: frequent.age }
        : guest,
    );
    updateDraft({ guests: next });
  }

  function toggleExtra(extraId: keyof typeof draft.extras, quantity: number) {
    updateDraft({ extras: { ...draft.extras, [extraId]: quantity } });
  }

  function handleContinue() {
    const nextErrors: Record<string, string> = {};

    for (const guest of guests) {
      const result = guestNameSchema.safeParse(guest.fullName);
      if (!result.success) {
        nextErrors[guest.id] =
          result.error.issues[0]?.message ?? "Informe o nome.";
      }
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0 || exceedsRoom) return;

    updateDraft({ guests });
    onContinue();
  }

  const unusedFrequentGuests = frequentGuests.filter(
    (frequent) => !guests.some((guest) => guest.fullName === frequent.fullName),
  );

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-3xl bg-white p-5 ring-1 ring-blue-950/10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-blue-950">Sua estadia</h2>
            <p className="mt-1 text-sm text-blue-950/70">
              {formatStayRange(draft.checkIn, draft.checkOut)} ·{" "}
              {pluralize(nightCount, "noite", "noites")}
            </p>
            <p className="text-sm text-blue-950/70">
              {room.name} · {formatCurrency(roomAvailability.nightlyRate)} por
              noite
            </p>
          </div>
          <Link
            href={editHref}
            className="flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-blue-900 hover:bg-blue-50"
          >
            <Pencil className="h-4 w-4" aria-hidden />
            Alterar
          </Link>
        </div>

        <div className="mt-4 divide-y divide-blue-950/10 border-t border-blue-950/10">
          <Counter
            label="Adultos"
            value={draft.adults}
            min={1}
            max={room.maxGuests * draft.roomCount}
            onChange={(adults) => setCounts({ adults })}
          />
          <Counter
            label="Crianças"
            description="Até 17 anos"
            value={draft.children}
            min={0}
            max={room.maxGuests * draft.roomCount}
            onChange={(children) => setCounts({ children })}
          />
          <Counter
            label="Idosos"
            value={draft.seniors}
            min={0}
            max={room.maxGuests * draft.roomCount}
            onChange={(seniors) => setCounts({ seniors })}
          />
          <Counter
            label={`Quartos (${room.name})`}
            description={
              maxRooms < 3
                ? `Só ${pluralize(maxRooms, "unidade restante", "unidades restantes")} nessas datas`
                : `Até ${pluralize(room.maxGuests, "hóspede", "hóspedes")} por quarto`
            }
            value={draft.roomCount}
            min={1}
            max={maxRooms}
            onChange={(roomCount) => setCounts({ roomCount })}
          />
        </div>

        {exceedsRoom && (
          <output className="mt-3 block rounded-xl bg-orange-50 px-3 py-2.5 text-sm text-blue-950">
            {pluralize(guestCount, "hóspede", "hóspedes")} não cabem em{" "}
            {pluralize(draft.roomCount, "quarto", "quartos")} deste tipo (máximo
            de {room.maxGuests} por quarto). Aumente o número de quartos ou
            volte e escolha outro quarto.
          </output>
        )}
      </section>

      <section className="rounded-3xl bg-white p-5 ring-1 ring-blue-950/10">
        <h2 className="text-lg font-semibold text-blue-950">Quem vai viajar</h2>
        <p className="mt-1 text-sm text-blue-950/70">
          A hospedagem pede o nome de cada hóspede para agilizar o check-in.
        </p>

        {unusedFrequentGuests.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
              Seus hóspedes frequentes
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {unusedFrequentGuests.map((frequent) => (
                <button
                  key={frequent.id}
                  type="button"
                  onClick={() => fillFromFrequent(frequent)}
                  className="flex cursor-pointer items-center gap-1.5 rounded-full bg-blue-50 px-3 py-2 text-sm font-medium text-blue-950 transition-colors hover:bg-blue-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
                >
                  <UserPlus className="h-4 w-4 text-blue-900/70" aria-hidden />
                  {frequent.fullName}
                  <span className="text-xs text-blue-950/55">
                    · {frequent.relationship}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {guests.map((guest, index) => (
            <TextField
              key={guest.id}
              label={`${AGE_GROUP_LABELS[guest.ageGroup]} ${index + 1}${index === 0 ? " (responsável)" : ""}`}
              value={guest.fullName}
              onChange={(event) => setGuestName(index, event.target.value)}
              placeholder="Nome completo"
              autoComplete="off"
              error={errors[guest.id] || undefined}
            />
          ))}
        </div>
      </section>

      {extras.length > 0 && (
        <section className="rounded-3xl bg-white p-5 ring-1 ring-blue-950/10">
          <h2 className="text-lg font-semibold text-blue-950">
            Extras para a viagem
          </h2>
          <p className="mt-1 text-sm text-blue-950/70">
            Só o que esta hospedagem oferece. Tudo aparece no total antes do
            pagamento.
          </p>

          <ul className="mt-4 divide-y divide-blue-950/10">
            {extras.map((extra) => {
              const quantity = draft.extras[extra.id] ?? 0;
              const price =
                extra.pricePerNight !== undefined
                  ? `${formatCurrency(extra.pricePerNight)} por noite`
                  : extra.pricePerStay
                    ? `${formatCurrency(extra.pricePerStay)} por estadia`
                    : "Sem custo";

              return (
                <li key={extra.id} className="py-3">
                  {extra.isPerGuest ? (
                    <Counter
                      label={`${extra.label} · ${price}`}
                      description={extra.description}
                      value={quantity}
                      min={0}
                      max={guestCount}
                      onChange={(next) => toggleExtra(extra.id, next)}
                    />
                  ) : (
                    <Checkbox
                      label={`${extra.label} · ${price}`}
                      description={extra.description}
                      checked={quantity > 0}
                      onCheckedChange={(checked) =>
                        toggleExtra(extra.id, checked ? 1 : 0)
                      }
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <div className="flex justify-end">
        <BrandButton size="lg" onClick={handleContinue} disabled={exceedsRoom}>
          Continuar
        </BrandButton>
      </div>
    </div>
  );
}
