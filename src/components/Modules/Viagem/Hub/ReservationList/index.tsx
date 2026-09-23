import { CalendarDays, type LucideIcon } from "lucide-react";
import type { Reservation } from "@/@types/Modules/Reserva/reservation";
import { BrandLink } from "@/components/ui/brand-button";
import { EmptyState } from "@/components/ui/empty-state";
import type { ReservationGroupId } from "@/lib/Modules/Viagem/group-reservations";
import { findAccommodationBySlug } from "@/mocks/Modules/Hospedagens/accommodations";
import { ReservationListItem } from "../ReservationListItem";

const EMPTY_COPY: Record<
  ReservationGroupId,
  { title: string; description: string; icon: LucideIcon }
> = {
  proximas: {
    title: "Nenhuma viagem marcada",
    description:
      "Quando você reservar uma hospedagem, ela aparece aqui com tudo o que precisa para a viagem.",
    icon: CalendarDays,
  },
  anteriores: {
    title: "Você ainda não se hospedou pela plataforma",
    description:
      "Suas estadias concluídas ficam guardadas aqui para você avaliar e reservar de novo.",
    icon: CalendarDays,
  },
  canceladas: {
    title: "Nenhuma reserva cancelada",
    description: "Que bom. Suas viagens seguem de pé.",
    icon: CalendarDays,
  },
};

type ReservationListProps = {
  group: ReservationGroupId;
  reservations: Reservation[];
};

export function ReservationList({ group, reservations }: ReservationListProps) {
  if (reservations.length === 0) {
    const copy = EMPTY_COPY[group];

    return (
      <EmptyState
        icon={copy.icon}
        title={copy.title}
        description={copy.description}
        action={
          <BrandLink href="/hospedagens" variant="primary">
            Encontrar hospedagem
          </BrandLink>
        }
      />
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {reservations.map((reservation) => (
        <ReservationListItem
          key={reservation.id}
          reservation={reservation}
          accommodation={findAccommodationBySlug(reservation.accommodationSlug)}
        />
      ))}
    </ul>
  );
}
