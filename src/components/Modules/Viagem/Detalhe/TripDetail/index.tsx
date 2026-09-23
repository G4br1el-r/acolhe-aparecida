"use client";

import { CircleAlert } from "lucide-react";
import { useState } from "react";
import { BrandButton, BrandLink } from "@/components/ui/brand-button";
import { EmptyState } from "@/components/ui/empty-state";
import { useCurrentUser } from "@/hooks/Modules/Conta/use-session";
import { useReservation } from "@/hooks/Modules/Reserva/use-reservations";
import { buildRebookHref } from "@/lib/Modules/Viagem/rebook-href";
import { findAccommodationBySlug } from "@/mocks/Modules/Hospedagens/accommodations";
import { AccommodationSection } from "../AccommodationSection";
import { CancelDialog } from "../CancelDialog";
import { ChangeDatesDialog } from "../ChangeDatesDialog";
import { DatesSection } from "../DatesSection";
import { GuestsSection } from "../GuestsSection";
import { ImportantInfoSection } from "../ImportantInfoSection";
import { LocationSection } from "../LocationSection";
import { MobileActionBar } from "../MobileActionBar";
import { PaymentSection } from "../PaymentSection";
import { ReceiptDialog } from "../ReceiptDialog";
import { ReviewSection } from "../ReviewSection";
import { SupportSection } from "../SupportSection";
import { SupportSheet } from "../SupportSheet";
import { TripAside } from "../TripAside";
import { TripDetailSkeleton } from "../TripDetailSkeleton";
import { TripHeader } from "../TripHeader";
import { TripNotFound } from "../TripNotFound";
import { YourTripSection } from "../YourTripSection";

type TripDialog = "cancel" | "dates" | "receipt" | "support" | null;

type TripDetailProps = {
  reservationId: string;
};

export function TripDetail({ reservationId }: TripDetailProps) {
  const { userId, isResolving } = useCurrentUser();
  const {
    data: reservation,
    isPending,
    isError,
    refetch,
  } = useReservation(reservationId);
  const [dialog, setDialog] = useState<TripDialog>(null);

  if (isPending || isResolving) return <TripDetailSkeleton />;

  if (isError) {
    return (
      <EmptyState
        tone="error"
        icon={CircleAlert}
        title="Não conseguimos abrir sua reserva"
        description="Tente de novo em instantes. Sua reserva continua garantida."
        action={
          <BrandButton variant="primary" onClick={() => refetch()}>
            Tentar novamente
          </BrandButton>
        }
      />
    );
  }

  if (!reservation || reservation.userId !== userId) return <TripNotFound />;

  const accommodation = findAccommodationBySlug(reservation.accommodationSlug);

  if (!accommodation) return <TripNotFound />;

  const isActive = reservation.status === "confirmada";
  const isCompleted = reservation.status === "concluida";
  const isCancelled =
    reservation.status === "cancelada" || reservation.status === "reembolsada";
  const closeDialog = () => setDialog(null);

  const actions = isActive ? (
    <>
      <BrandButton variant="outline" onClick={() => setDialog("dates")}>
        Alterar datas
      </BrandButton>
      <BrandButton variant="primary" onClick={() => setDialog("receipt")}>
        Ver comprovante
      </BrandButton>
    </>
  ) : isCompleted ? (
    <>
      <BrandLink href={buildRebookHref(reservation)} variant="outline">
        Reservar novamente
      </BrandLink>
      {!reservation.reviewId && (
        <BrandLink
          href={`/minha-viagem/${reservation.id}/avaliar`}
          variant="accent"
        >
          Avaliar estadia
        </BrandLink>
      )}
    </>
  ) : (
    <BrandLink href="/hospedagens" variant="primary">
      Buscar outra hospedagem
    </BrandLink>
  );

  return (
    <>
      <TripHeader reservation={reservation} accommodation={accommodation} />

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-8">
        <div className="flex min-w-0 flex-col gap-5">
          {isCompleted && <ReviewSection reservation={reservation} />}
          {isCancelled && (
            <EmptyState
              icon={CircleAlert}
              title="Esta reserva foi cancelada"
              description={
                reservation.refundAmount
                  ? "O reembolso foi encaminhado para o mesmo meio de pagamento. Os detalhes seguem abaixo."
                  : "Não houve reembolso para esta reserva. Os detalhes seguem abaixo."
              }
              action={
                <BrandLink href="/hospedagens" variant="primary">
                  Buscar outra hospedagem
                </BrandLink>
              }
              className="py-8"
            />
          )}
          <AccommodationSection accommodation={accommodation} />
          <DatesSection
            reservation={reservation}
            accommodation={accommodation}
          />
          <GuestsSection
            reservation={reservation}
            accommodation={accommodation}
          />
          <LocationSection accommodation={accommodation} />
          <PaymentSection
            reservation={reservation}
            onOpenReceipt={() => setDialog("receipt")}
          />
          <ImportantInfoSection
            reservation={reservation}
            accommodation={accommodation}
            onOpenCancel={() => setDialog("cancel")}
          />
          {!isCancelled && <YourTripSection reservation={reservation} />}
          <SupportSection onOpenSupport={() => setDialog("support")} />
        </div>

        <TripAside reservation={reservation} accommodation={accommodation}>
          {actions}
        </TripAside>
      </div>

      <MobileActionBar>{actions}</MobileActionBar>

      {isActive && (
        <>
          <CancelDialog
            open={dialog === "cancel"}
            onOpenChange={(open) =>
              open ? setDialog("cancel") : closeDialog()
            }
            reservation={reservation}
          />
          <ChangeDatesDialog
            key={`${reservation.checkIn}-${reservation.checkOut}`}
            open={dialog === "dates"}
            onOpenChange={(open) => (open ? setDialog("dates") : closeDialog())}
            reservation={reservation}
            accommodation={accommodation}
          />
        </>
      )}
      <ReceiptDialog
        open={dialog === "receipt"}
        onOpenChange={(open) => (open ? setDialog("receipt") : closeDialog())}
        reservation={reservation}
        accommodation={accommodation}
      />
      <SupportSheet
        open={dialog === "support"}
        onOpenChange={(open) => (open ? setDialog("support") : closeDialog())}
        reservation={reservation}
      />
    </>
  );
}
