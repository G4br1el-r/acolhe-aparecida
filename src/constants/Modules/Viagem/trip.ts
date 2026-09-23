import type {
  GuestAgeGroup,
  PaymentMethod,
} from "@/@types/Modules/Reserva/reservation";
import type { ReservationGroupId } from "@/lib/Modules/Viagem/group-reservations";

export const TRIP_TAB_LABELS: Record<ReservationGroupId, string> = {
  proximas: "Próximas",
  anteriores: "Anteriores",
  canceladas: "Canceladas",
};

export const TRIP_TAB_ORDER: ReservationGroupId[] = [
  "proximas",
  "anteriores",
  "canceladas",
];

export const GUEST_AGE_GROUP_LABELS: Record<GuestAgeGroup, string> = {
  adulto: "Adulto",
  crianca: "Criança",
  idoso: "Idoso",
};

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  pix: "PIX",
  cartao: "Cartão de crédito",
};

export const REFUND_DEADLINE_LABEL = "em até 5 dias úteis";
export const HERO_PHOTO_WIDTH = 1600;
export const LIST_PHOTO_WIDTH = 320;
export const DETAIL_PHOTO_WIDTH = 960;
export const CALENDAR_FILE_EXTENSION = "ics";
