"use client";

import { CalendarClock, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import { DateRangeField } from "@/components/Modules/Hospedagens/Busca/DateRangeField";
import { GuestsField } from "@/components/Modules/Hospedagens/Busca/GuestsField";
import { BrandButton } from "@/components/ui/brand-button";
import { useCurrentUser } from "@/hooks/Modules/Conta/use-session";
import { useBookingQuote } from "@/hooks/Modules/Hospedagens/Detalhe/use-booking-quote";
import { DESKTOP_MEDIA_QUERY, useMediaQuery } from "@/hooks/use-media-query";
import { pluralize } from "@/lib/Modules/Hospedagens/format-date";
import {
  availableInstallments,
  formatCurrency,
  PIX_DISCOUNT_RATE,
} from "@/lib/Modules/Reserva/Checkout/price-summary";
import { useCheckoutStore } from "@/store/Modules/Reserva/Checkout/use-checkout-store";

const PERCENT_MULTIPLIER = 100;

type BookingFormProps = {
  accommodation: Accommodation;
  onNavigate?: () => void;
};

export function BookingForm({ accommodation, onNavigate }: BookingFormProps) {
  const router = useRouter();
  const isDesktop = useMediaQuery(DESKTOP_MEDIA_QUERY);
  const [isPending, startTransition] = useTransition();
  const { user } = useCurrentUser();
  const startCheckout = useCheckoutStore((state) => state.startCheckout);

  const {
    draft,
    update,
    nightCount,
    guestCount,
    availability,
    selectableRooms,
    selectedRoom,
    summary,
    hasDates,
  } = useBookingQuote(accommodation);

  const isUnavailable = hasDates && !availability.isAvailable;
  const maxInstallments = summary
    ? availableInstallments(summary.total).length
    : 0;
  const pixDiscountPercent = PIX_DISCOUNT_RATE * PERCENT_MULTIPLIER;

  function handleReserve() {
    if (!hasDates || !draft.checkIn || !draft.checkOut) {
      toast.error("Escolha as datas da estadia para continuar");
      return;
    }
    if (!selectedRoom) {
      toast.error("Nenhum quarto disponível para essa combinação", {
        description: "Tente outras datas ou ajuste o número de quartos.",
      });
      return;
    }

    startCheckout({
      accommodationSlug: accommodation.slug,
      roomTypeId: selectedRoom.room.id,
      roomCount: draft.rooms,
      checkIn: draft.checkIn,
      checkOut: draft.checkOut,
      adults: draft.adults,
      children: draft.children,
      seniors: draft.seniors,
      guests: [],
      responsible: {
        fullName: user?.fullName ?? "",
        email: user?.email ?? "",
        phone: user?.phone ?? "",
        document: user?.document ?? "",
      },
      extras: {},
      specialRequests: "",
      arrivalTime: "",
      acceptedPolicy: false,
      couponCode: null,
      paymentMethod: user?.preferences.preferredPayment ?? "pix",
      installmentCount: 1,
      step: "hospedes",
    });

    onNavigate?.();
    startTransition(() => {
      router.push(`/reservar/${accommodation.slug}`);
    });
  }

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-2xl font-semibold text-blue-950">
          {formatCurrency(
            selectedRoom?.nightlyRate ?? accommodation.pricePerNight,
          )}
          <span className="text-base font-normal text-blue-950/60">
            {" "}
            / noite
          </span>
        </p>
        {selectedRoom?.hasHighDemandPricing && (
          <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-semibold text-cta">
            Alta procura
          </span>
        )}
      </div>

      <div className="mt-5 divide-y divide-blue-950/10 rounded-xl ring-1 ring-blue-950/15">
        <DateRangeField
          checkIn={draft.checkIn}
          checkOut={draft.checkOut}
          onChange={update}
          variant="card"
          isDesktop={isDesktop}
        />
        <GuestsField
          draft={{ ...draft, needsAccessibility: false }}
          onChange={update}
          variant="card"
        />
      </div>

      {selectableRooms.length > 1 && (
        <label className="mt-4 flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-wide text-blue-900/60">
          Quarto
          <select
            value={selectedRoom?.room.id ?? ""}
            onChange={(event) => update({ roomTypeId: event.target.value })}
            className="h-12 w-full cursor-pointer rounded-xl bg-white px-4 text-sm font-normal normal-case tracking-normal text-blue-950 ring-1 ring-blue-950/15 focus:outline-none focus:ring-2 focus:ring-blue-900"
          >
            {selectableRooms.map((room) => (
              <option key={room.room.id} value={room.room.id}>
                {room.room.name} · {formatCurrency(room.nightlyRate)}
              </option>
            ))}
          </select>
        </label>
      )}

      {selectableRooms.length === 1 && selectedRoom && (
        <p className="mt-4 text-sm text-blue-950/70">
          {selectedRoom.room.name} ·{" "}
          {pluralize(draft.rooms, "unidade", "unidades")}
        </p>
      )}

      <BrandButton
        onClick={handleReserve}
        fullWidth
        size="lg"
        variant="accent"
        className="mt-5"
        isLoading={isPending}
        loadingLabel="Abrindo reserva"
        disabled={isUnavailable}
      >
        {hasDates ? "Reservar" : "Escolher datas e reservar"}
      </BrandButton>

      {isUnavailable && (
        <output className="mt-3 block rounded-xl bg-blue-50 px-3 py-2.5 text-sm text-blue-950/80">
          Sem vaga para {pluralize(guestCount, "hóspede", "hóspedes")} em{" "}
          {pluralize(draft.rooms, "quarto", "quartos")} nessas datas. Tente
          mudar as datas ou dividir em mais quartos.
        </output>
      )}

      {summary ? (
        <dl className="mt-6 space-y-3 border-t border-blue-950/10 pt-5 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-blue-950/70">
              {formatCurrency(summary.nightlyRate)} x{" "}
              {pluralize(summary.nightCount, "noite", "noites")}
              {summary.roomCount > 1 &&
                ` x ${pluralize(summary.roomCount, "quarto", "quartos")}`}
            </dt>
            <dd className="shrink-0 text-blue-950">
              {formatCurrency(summary.subtotal)}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-blue-950/70">Taxa de serviço</dt>
            <dd className="shrink-0 text-blue-950">
              {formatCurrency(summary.serviceFee)}
            </dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-blue-950/10 pt-3 text-base font-semibold text-blue-950">
            <dt>Total da estadia</dt>
            <dd>{formatCurrency(summary.total)}</dd>
          </div>
          <div className="flex justify-between gap-4 text-xs text-blue-950/60">
            <dt>Em até {maxInstallments}x no cartão</dt>
            <dd>{formatCurrency(summary.total / maxInstallments)} sem juros</dd>
          </div>
          <div className="flex justify-between gap-4 rounded-xl bg-blue-50 px-3 py-2.5 text-xs">
            <dt className="font-medium text-blue-950">
              No PIX, {pixDiscountPercent}% de desconto
            </dt>
            <dd className="font-semibold text-blue-950">
              {formatCurrency(
                summary.total -
                  Math.round(summary.subtotal * PIX_DISCOUNT_RATE),
              )}
            </dd>
          </div>
        </dl>
      ) : (
        <p className="mt-6 border-t border-blue-950/10 pt-5 text-sm text-blue-950/60">
          {nightCount === 0 && draft.checkIn
            ? "Escolha a data de check-out para ver o total."
            : "Escolha as datas para ver o valor total da estadia, sem surpresas."}
        </p>
      )}

      <p className="mt-5 flex items-start gap-2 text-xs text-blue-950/60">
        <CalendarClock
          className="mt-0.5 h-4 w-4 shrink-0 text-blue-900/70"
          aria-hidden
        />
        Cancelamento gratuito até{" "}
        {accommodation.cancellationPolicy.freeUntilDaysBefore} dias antes do
        check-in
      </p>

      <p className="mt-2.5 flex items-start gap-2 text-xs text-blue-950/60">
        <ShieldCheck
          className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
          aria-hidden
        />
        Reserva e pagamento dentro da plataforma. Você só é cobrado ao
        confirmar.
      </p>
    </div>
  );
}
