import { isBefore, parseISO, startOfDay } from "date-fns";
import type { Coupon } from "@/@types/Modules/Conta/user";
import { formatCurrency } from "@/lib/Modules/Reserva/Checkout/price-summary";

export type CouponStatus = "disponivel" | "usado" | "expirado";

export function resolveCouponStatus(
  coupon: Coupon,
  today: Date = new Date(),
): CouponStatus {
  if (coupon.isUsed) return "usado";

  const expiresAt = startOfDay(parseISO(coupon.expiresAt));

  if (isBefore(expiresAt, startOfDay(today))) return "expirado";

  return "disponivel";
}

export function describeCouponRule(coupon: Coupon): string {
  const discount =
    coupon.type === "percent"
      ? `${coupon.value}% de desconto`
      : `${formatCurrency(coupon.value)} de desconto`;

  const conditions: string[] = [];

  if (coupon.minimumTotal) {
    conditions.push(
      `em reservas a partir de ${formatCurrency(coupon.minimumTotal)}`,
    );
  }

  if (coupon.minimumGuests) {
    conditions.push(`para ${coupon.minimumGuests} ou mais hóspedes`);
  }

  return conditions.length > 0
    ? `${discount} ${conditions.join(" e ")}`
    : discount;
}
