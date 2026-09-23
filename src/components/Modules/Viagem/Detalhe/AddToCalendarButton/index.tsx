"use client";

import { CalendarPlus } from "lucide-react";
import { toast } from "sonner";
import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import type { Reservation } from "@/@types/Modules/Reserva/reservation";
import { BrandButton } from "@/components/ui/brand-button";
import { CALENDAR_FILE_EXTENSION } from "@/constants/Modules/Viagem/trip";
import { buildCalendarFile } from "@/lib/Modules/Viagem/calendar-file";

type AddToCalendarButtonProps = {
  reservation: Reservation;
  accommodation: Accommodation;
};

export function AddToCalendarButton({
  reservation,
  accommodation,
}: AddToCalendarButtonProps) {
  function handleDownload() {
    const content = buildCalendarFile({
      uid: reservation.id,
      title: `Viagem a Aparecida: ${accommodation.name}`,
      checkIn: reservation.checkIn,
      checkOut: reservation.checkOut,
      location: `${accommodation.address.street}, ${accommodation.address.neighborhood}, Aparecida, SP`,
      description: `Reserva ${reservation.code}. Check-in a partir das ${accommodation.checkInTime}, check-out até ${accommodation.checkOutTime}.`,
      url: `${window.location.origin}/minha-viagem/${reservation.id}`,
    });
    const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = `viagem-aparecida-${reservation.code}.${CALENDAR_FILE_EXTENSION}`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);

    toast.success("Evento salvo", {
      description: "Abra o arquivo para adicionar ao seu calendário.",
    });
  }

  return (
    <BrandButton variant="ghost" size="sm" onClick={handleDownload}>
      <CalendarPlus className="h-4 w-4" aria-hidden />
      Adicionar ao calendário
    </BrandButton>
  );
}
