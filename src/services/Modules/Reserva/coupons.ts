import type { Coupon } from "@/@types/Modules/Conta/user";
import { delay, FAST_LATENCY_IN_MS } from "@/mocks/latency";
import { SEEDED_COUPONS } from "@/mocks/Modules/Reserva/coupons";
import { MockServiceError } from "@/mocks/scenario";
import { readCollection, writeCollection } from "@/mocks/storage";

function readCoupons(): Coupon[] {
  return readCollection<Coupon>("coupons", () => SEEDED_COUPONS);
}

export async function fetchCoupons(): Promise<Coupon[]> {
  await delay(FAST_LATENCY_IN_MS);

  return readCoupons();
}

export async function fetchCouponByCode(code: string): Promise<Coupon> {
  await delay();

  const coupon = readCoupons().find(
    (candidate) => candidate.code.toUpperCase() === code.trim().toUpperCase(),
  );

  if (!coupon) {
    throw new MockServiceError("Cupom não encontrado. Confira o código.");
  }

  return coupon;
}

export function markCouponUsed(code: string): void {
  writeCollection(
    "coupons",
    readCoupons().map((coupon) =>
      coupon.code === code ? { ...coupon, isUsed: true } : coupon,
    ),
  );
}
