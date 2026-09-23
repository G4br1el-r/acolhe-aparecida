import type { Coupon } from "@/@types/Modules/Conta/user";
import type {
  PriceSummary,
  ReservationExtra,
} from "@/@types/Modules/Reserva/reservation";

export const SERVICE_FEE_RATE = 0.08;
export const PIX_DISCOUNT_RATE = 0.05;
export const MAX_INSTALLMENTS = 12;
export const MIN_INSTALLMENT_VALUE = 80;
const PERCENT_DIVISOR = 100;
const SINGLE_INSTALLMENT = 1;

export type PriceSummaryInput = {
  nightlyRate: number;
  nightCount: number;
  roomCount: number;
  extras: ReservationExtra[];
  coupon?: Coupon | null;
  guestCount: number;
  installmentCount: number;
  paymentMethod: "pix" | "cartao";
  hasHighDemandPricing: boolean;
};

export function extrasTotalFor(
  extras: ReservationExtra[],
  nightCount: number,
): number {
  return extras.reduce((total, extra) => {
    const perNight = (extra.pricePerNight ?? 0) * nightCount;
    const perStay = extra.pricePerStay ?? 0;
    return total + (perNight + perStay) * extra.quantity;
  }, 0);
}

export type CouponValidation =
  | { isValid: true; discount: number }
  | { isValid: false; reason: string };

export function validateCoupon(
  coupon: Coupon,
  subtotal: number,
  guestCount: number,
  today: Date = new Date(),
): CouponValidation {
  if (coupon.isUsed) {
    return { isValid: false, reason: "Este cupom já foi usado." };
  }
  if (new Date(`${coupon.expiresAt}T23:59:59`) < today) {
    return { isValid: false, reason: "Este cupom expirou." };
  }
  if (coupon.minimumTotal !== undefined && subtotal < coupon.minimumTotal) {
    return {
      isValid: false,
      reason: `Válido para reservas a partir de ${formatCurrency(coupon.minimumTotal)}.`,
    };
  }
  if (coupon.minimumGuests !== undefined && guestCount < coupon.minimumGuests) {
    return {
      isValid: false,
      reason: `Válido para grupos a partir de ${coupon.minimumGuests} pessoas.`,
    };
  }

  const discount =
    coupon.type === "percent"
      ? Math.round((subtotal * coupon.value) / PERCENT_DIVISOR)
      : Math.min(coupon.value, subtotal);

  return { isValid: true, discount };
}

export function availableInstallments(total: number): number[] {
  const maxByValue = Math.max(
    SINGLE_INSTALLMENT,
    Math.floor(total / MIN_INSTALLMENT_VALUE),
  );
  const count = Math.min(MAX_INSTALLMENTS, maxByValue);

  return Array.from({ length: count }, (_, index) => index + 1);
}

export function buildPriceSummary(input: PriceSummaryInput): PriceSummary {
  const subtotal = input.nightlyRate * input.nightCount * input.roomCount;
  const extrasTotal = extrasTotalFor(input.extras, input.nightCount);
  const serviceFee = Math.round((subtotal + extrasTotal) * SERVICE_FEE_RATE);

  let discount = 0;
  if (input.coupon) {
    const validation = validateCoupon(input.coupon, subtotal, input.guestCount);
    if (validation.isValid) discount = validation.discount;
  }
  if (input.paymentMethod === "pix") {
    discount += Math.round(subtotal * PIX_DISCOUNT_RATE);
  }

  const total = Math.max(0, subtotal + extrasTotal + serviceFee - discount);
  const installmentCount =
    input.paymentMethod === "pix"
      ? SINGLE_INSTALLMENT
      : Math.min(input.installmentCount, availableInstallments(total).length);

  return {
    nightlyRate: input.nightlyRate,
    nightCount: input.nightCount,
    roomCount: input.roomCount,
    subtotal,
    extrasTotal,
    serviceFee,
    discount,
    total,
    installmentCount,
    installmentValue: total / installmentCount,
    dueNow: total,
    hasHighDemandPricing: input.hasHighDemandPricing,
  };
}

export function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
