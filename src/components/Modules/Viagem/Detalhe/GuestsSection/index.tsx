import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import type { Reservation } from "@/@types/Modules/Reserva/reservation";
import { GUEST_AGE_GROUP_LABELS } from "@/constants/Modules/Viagem/trip";
import { pluralize } from "@/lib/Modules/Hospedagens/format-date";
import { TripSection } from "../TripSection";

type GuestsSectionProps = {
  reservation: Reservation;
  accommodation: Accommodation;
};

export function GuestsSection({
  reservation,
  accommodation,
}: GuestsSectionProps) {
  const room = accommodation.rooms.find(
    (candidate) => candidate.id === reservation.roomTypeId,
  );
  const roomLabel = room
    ? `${pluralize(reservation.roomCount, "quarto", "quartos")} ${room.name}`
    : pluralize(reservation.roomCount, "quarto", "quartos");

  return (
    <TripSection
      id="hospedes"
      title="Quarto e hóspedes"
      description={`${roomLabel}${room?.isAccessible ? " · Quarto acessível" : ""}`}
    >
      <ul className="divide-y divide-blue-950/8">
        {reservation.guests.map((guest) => (
          <li
            key={guest.id}
            className="flex items-center justify-between gap-4 py-3"
          >
            <span className="text-sm font-medium text-blue-950">
              {guest.fullName}
            </span>
            <span className="text-xs text-blue-950/60">
              {GUEST_AGE_GROUP_LABELS[guest.ageGroup]}
              {guest.age !== undefined &&
                ` · ${pluralize(guest.age, "ano", "anos")}`}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs text-blue-950/55">
        Responsável pela reserva: {reservation.responsible.fullName} ·{" "}
        {reservation.responsible.phone}
      </p>
    </TripSection>
  );
}
