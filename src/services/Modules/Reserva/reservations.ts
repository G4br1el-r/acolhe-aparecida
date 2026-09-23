import { differenceInCalendarDays } from "date-fns";
import type {
  AppliedCoupon,
  PaymentRecord,
  PriceSummary,
  Reservation,
  ReservationExtra,
  ReservationGuest,
  ReservationStatus,
} from "@/@types/Modules/Reserva/reservation";
import { parseIsoDate } from "@/lib/Modules/Hospedagens/Busca/availability";
import { delay, FAST_LATENCY_IN_MS } from "@/mocks/latency";
import { findAccommodationBySlug } from "@/mocks/Modules/Hospedagens/accommodations";
import { SEEDED_RESERVATIONS } from "@/mocks/Modules/Reserva/reservations";
import { MockServiceError } from "@/mocks/scenario";
import { createMockId, readCollection, writeCollection } from "@/mocks/storage";
import { pushNotification } from "@/services/Modules/Conta/notifications";
import { markCouponUsed } from "./coupons";

const CODE_LENGTH = 6;
const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const PERCENT_DIVISOR = 100;

function readReservations(): Reservation[] {
  return readCollection<Reservation>("reservations", () => SEEDED_RESERVATIONS);
}

function buildCode(): string {
  let code = "";
  for (let index = 0; index < CODE_LENGTH; index += 1) {
    code += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  }
  return `AC-${code}`;
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export function resolveReservationStatus(
  reservation: Reservation,
  today: string = todayIso(),
): ReservationStatus {
  if (
    reservation.status === "cancelada" ||
    reservation.status === "reembolsada" ||
    reservation.status === "aguardando-pagamento"
  ) {
    return reservation.status;
  }

  return reservation.checkOut <= today ? "concluida" : "confirmada";
}

export async function fetchReservations(
  userId: string,
): Promise<Reservation[]> {
  await delay(FAST_LATENCY_IN_MS);

  return readReservations()
    .filter((reservation) => reservation.userId === userId)
    .map((reservation) => ({
      ...reservation,
      status: resolveReservationStatus(reservation),
    }))
    .sort((first, second) => second.checkIn.localeCompare(first.checkIn));
}

export async function fetchReservation(
  reservationId: string,
): Promise<Reservation | null> {
  await delay(FAST_LATENCY_IN_MS);

  const reservation = readReservations().find(
    (candidate) => candidate.id === reservationId,
  );

  return reservation
    ? { ...reservation, status: resolveReservationStatus(reservation) }
    : null;
}

export type CreateReservationInput = {
  userId: string;
  accommodationSlug: string;
  roomTypeId: string;
  roomCount: number;
  checkIn: string;
  checkOut: string;
  guests: ReservationGuest[];
  responsible: Reservation["responsible"];
  extras: ReservationExtra[];
  specialRequests?: string;
  coupon?: AppliedCoupon;
  price: PriceSummary;
  payment: PaymentRecord;
};

export async function createReservation(
  input: CreateReservationInput,
): Promise<Reservation> {
  await delay();

  const accommodation = findAccommodationBySlug(input.accommodationSlug);
  if (!accommodation) {
    throw new MockServiceError("Hospedagem não encontrada.");
  }

  const reservation: Reservation = {
    id: createMockId("res"),
    code: buildCode(),
    userId: input.userId,
    accommodationSlug: input.accommodationSlug,
    roomTypeId: input.roomTypeId,
    roomCount: input.roomCount,
    checkIn: input.checkIn,
    checkOut: input.checkOut,
    guests: input.guests,
    responsible: input.responsible,
    extras: input.extras,
    specialRequests: input.specialRequests,
    coupon: input.coupon,
    price: input.price,
    payment: input.payment,
    status: "confirmada",
    createdAt: new Date().toISOString(),
  };

  writeCollection("reservations", [reservation, ...readReservations()]);

  if (input.coupon) markCouponUsed(input.coupon.code);

  pushNotification({
    userId: input.userId,
    kind: "pagamento-aprovado",
    title: "Pagamento aprovado",
    body: `Recebemos ${input.price.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} via ${input.payment.method === "pix" ? "PIX" : `cartão final ${input.payment.cardLastDigits}`}.`,
    href: `/minha-viagem/${reservation.id}`,
  });
  pushNotification({
    userId: input.userId,
    kind: "reserva-confirmada",
    title: `Reserva confirmada em ${accommodation.name}`,
    body: `Check-in em ${parseIsoDate(input.checkIn).toLocaleDateString("pt-BR", { day: "numeric", month: "long" })} a partir das ${accommodation.checkInTime}. Código ${reservation.code}.`,
    href: `/minha-viagem/${reservation.id}`,
  });

  return reservation;
}

export type CancellationPreview = {
  isFree: boolean;
  refundAmount: number;
  refundPercent: number;
  daysUntilCheckIn: number;
  freeUntilDaysBefore: number;
};

export function previewCancellation(
  reservation: Reservation,
  today: Date = new Date(),
): CancellationPreview {
  const accommodation = findAccommodationBySlug(reservation.accommodationSlug);
  const policy = accommodation?.cancellationPolicy ?? {
    freeUntilDaysBefore: 7,
    partialRefundPercent: 50,
  };
  const daysUntilCheckIn = differenceInCalendarDays(
    parseIsoDate(reservation.checkIn),
    today,
  );
  const isFree = daysUntilCheckIn >= policy.freeUntilDaysBefore;
  const refundPercent = isFree
    ? PERCENT_DIVISOR
    : daysUntilCheckIn > 0
      ? policy.partialRefundPercent
      : 0;

  return {
    isFree,
    refundAmount: Math.round(
      (reservation.payment.amountPaid * refundPercent) / PERCENT_DIVISOR,
    ),
    refundPercent,
    daysUntilCheckIn,
    freeUntilDaysBefore: policy.freeUntilDaysBefore,
  };
}

export async function cancelReservation(
  reservationId: string,
): Promise<Reservation> {
  await delay();

  const reservations = readReservations();
  const index = reservations.findIndex(
    (reservation) => reservation.id === reservationId,
  );

  if (index < 0) {
    throw new MockServiceError("Reserva não encontrada.");
  }

  const reservation = reservations[index];
  const preview = previewCancellation(reservation);
  const cancelled: Reservation = {
    ...reservation,
    status: preview.refundAmount > 0 ? "reembolsada" : "cancelada",
    cancelledAt: new Date().toISOString(),
    refundAmount: preview.refundAmount,
    payment: {
      ...reservation.payment,
      status:
        preview.refundAmount > 0 ? "reembolsado" : reservation.payment.status,
    },
  };

  const next = [...reservations];
  next[index] = cancelled;
  writeCollection("reservations", next);

  pushNotification({
    userId: reservation.userId,
    kind: "cancelamento",
    title: "Reserva cancelada",
    body:
      preview.refundAmount > 0
        ? `Reembolso de ${preview.refundAmount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} no mesmo meio de pagamento em até 5 dias úteis.`
        : "Esta reserva não tinha direito a reembolso pela política escolhida.",
    href: `/minha-viagem/${reservation.id}`,
  });

  return cancelled;
}

export type ChangeDatesInput = {
  reservationId: string;
  checkIn: string;
  checkOut: string;
  price: PriceSummary;
};

export async function changeReservationDates(
  input: ChangeDatesInput,
): Promise<Reservation> {
  await delay();

  const reservations = readReservations();
  const index = reservations.findIndex(
    (reservation) => reservation.id === input.reservationId,
  );

  if (index < 0) {
    throw new MockServiceError("Reserva não encontrada.");
  }

  const updated: Reservation = {
    ...reservations[index],
    checkIn: input.checkIn,
    checkOut: input.checkOut,
    price: input.price,
  };
  const next = [...reservations];
  next[index] = updated;
  writeCollection("reservations", next);

  return updated;
}

export async function attachReviewToReservation(
  reservationId: string,
  reviewId: string,
): Promise<void> {
  await delay(FAST_LATENCY_IN_MS);

  writeCollection(
    "reservations",
    readReservations().map((reservation) =>
      reservation.id === reservationId
        ? { ...reservation, reviewId }
        : reservation,
    ),
  );
}
