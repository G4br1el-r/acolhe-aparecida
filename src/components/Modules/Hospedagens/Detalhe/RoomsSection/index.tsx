"use client";

import { BedDouble, Check, Ruler, Users } from "lucide-react";
import Image from "next/image";
import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import { useBookingQuote } from "@/hooks/Modules/Hospedagens/Detalhe/use-booking-quote";
import { pluralize } from "@/lib/Modules/Hospedagens/format-date";
import { buildRoomPhotos } from "@/lib/Modules/Hospedagens/gallery";
import { formatCurrency } from "@/lib/Modules/Reserva/Checkout/price-summary";
import { cn } from "@/lib/utils";
import { buildPhotoUrl } from "@/mocks/Modules/Hospedagens/photos";
import { DetailSection } from "../DetailSection";

const ROOM_PHOTO_WIDTH_IN_PX = 600;
const LOW_UNITS_THRESHOLD = 2;
const BOOKING_CARD_ELEMENT_ID = "card-reserva";

type RoomsSectionProps = {
  accommodation: Accommodation;
};

function describeBeds(room: Accommodation["rooms"][number]): string {
  return room.beds
    .map((bed) => {
      const label =
        bed.type === "casal"
          ? pluralize(bed.count, "cama de casal", "camas de casal")
          : bed.type === "solteiro"
            ? pluralize(bed.count, "cama de solteiro", "camas de solteiro")
            : pluralize(bed.count, "beliche", "beliches");
      return label;
    })
    .join(", ");
}

export function RoomsSection({ accommodation }: RoomsSectionProps) {
  const { draft, update, availability, hasDates, guestsPerRoom } =
    useBookingQuote(accommodation);

  const isWholeHome =
    accommodation.type === "casa" || accommodation.type === "apartamento";

  function handleSelect(roomTypeId: string) {
    update({ roomTypeId });
    document
      .getElementById(BOOKING_CARD_ELEMENT_ID)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <DetailSection
      title={isWholeHome ? "O espaço" : "Quartos disponíveis"}
      description={
        hasDates
          ? "Preços e disponibilidade para as datas escolhidas."
          : "Escolha as datas para ver o preço exato e quantas unidades restam."
      }
    >
      <ul className="grid gap-4">
        {availability.rooms.map((roomAvailability) => {
          const { room, unitsLeft, nightlyRate, hasHighDemandPricing } =
            roomAvailability;
          const photo = buildRoomPhotos(room.photoIds)[0];
          const fitsGuests = room.maxGuests >= guestsPerRoom;
          const isSoldOut = hasDates && unitsLeft < draft.rooms;
          const isSelected = draft.roomTypeId === room.id;
          const isSelectable = fitsGuests && !isSoldOut;

          return (
            <li
              key={room.id}
              className={cn(
                "flex flex-col gap-4 rounded-3xl bg-white p-4 ring-1 transition-shadow sm:flex-row",
                isSelected
                  ? "ring-2 ring-blue-900 shadow-lg shadow-blue-950/10"
                  : "ring-blue-950/10",
                !isSelectable && "opacity-70",
              )}
            >
              <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden rounded-2xl bg-blue-100 sm:w-48">
                {photo && (
                  <Image
                    src={buildPhotoUrl(photo.url, ROOM_PHOTO_WIDTH_IN_PX)}
                    alt={`${room.name} em ${accommodation.name}`}
                    fill
                    sizes="(min-width: 640px) 192px, 100vw"
                    className="object-cover"
                  />
                )}
              </div>

              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold text-blue-950">
                      {room.name}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-blue-950/60">
                      <span className="flex items-center gap-1.5">
                        <BedDouble
                          className="h-4 w-4 text-blue-900/70"
                          aria-hidden
                        />
                        {describeBeds(room)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users
                          className="h-4 w-4 text-blue-900/70"
                          aria-hidden
                        />
                        Até {pluralize(room.maxGuests, "hóspede", "hóspedes")}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Ruler
                          className="h-4 w-4 text-blue-900/70"
                          aria-hidden
                        />
                        {room.sizeInSquareMeters} m²
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <span className="flex shrink-0 items-center gap-1 rounded-full bg-blue-950 px-2.5 py-1 text-[11px] font-semibold text-white">
                      <Check className="h-3 w-3" aria-hidden />
                      Selecionado
                    </span>
                  )}
                </div>

                <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-blue-950/65">
                  {room.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-1">
                      <span
                        aria-hidden
                        className="h-1 w-1 rounded-full bg-blue-900/50"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap items-end justify-between gap-3 border-t border-blue-950/10 pt-4">
                  <div>
                    <p className="text-sm text-blue-950/60">
                      {hasDates ? "Por noite nessas datas" : "A partir de"}
                    </p>
                    <p className="text-lg font-bold text-blue-950">
                      {formatCurrency(nightlyRate)}
                      <span className="text-xs font-normal text-blue-950/60">
                        {" "}
                        / noite
                      </span>
                    </p>
                    {hasHighDemandPricing && (
                      <p className="text-[11px] font-medium text-cta">
                        Preço de alta procura
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-1.5">
                    {!fitsGuests && (
                      <p className="text-xs text-blue-950/60">
                        Não comporta {guestsPerRoom} por quarto
                      </p>
                    )}
                    {fitsGuests && isSoldOut && (
                      <p className="text-xs font-medium text-blue-950/60">
                        Esgotado nessas datas
                      </p>
                    )}
                    {fitsGuests &&
                      !isSoldOut &&
                      hasDates &&
                      unitsLeft <= LOW_UNITS_THRESHOLD && (
                        <p className="text-xs font-medium text-cta">
                          {isWholeHome
                            ? "Última unidade"
                            : pluralize(unitsLeft, "restante", "restantes")}
                        </p>
                      )}
                    <button
                      type="button"
                      onClick={() => handleSelect(room.id)}
                      disabled={!isSelectable}
                      className={cn(
                        "cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 disabled:cursor-not-allowed disabled:opacity-40",
                        isSelected
                          ? "bg-blue-50 text-blue-950"
                          : "bg-blue-950 text-white hover:bg-blue-900",
                      )}
                    >
                      {isSelected ? "Escolhido" : "Escolher este quarto"}
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </DetailSection>
  );
}
