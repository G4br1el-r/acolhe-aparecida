export type PriceBreakdown = {
  nightCount: number;
  nightlyRate: number;
  subtotal: number;
  serviceFee: number;
  total: number;
  installmentCount: number;
  installmentValue: number;
  dueNow: number;
};

const MILLISECONDS_IN_A_DAY = 86_400_000;
const SERVICE_FEE_RATE = 0.08;
const DEPOSIT_RATE = 0.3;
const MIN_NIGHT_COUNT = 1;

export function countNights(
  checkIn: Date | undefined,
  checkOut: Date | undefined,
): number {
  if (!checkIn || !checkOut) {
    return 0;
  }

  const difference = checkOut.getTime() - checkIn.getTime();

  if (difference <= 0) {
    return 0;
  }

  return Math.round(difference / MILLISECONDS_IN_A_DAY);
}

export function buildPriceBreakdown(
  nightlyRate: number,
  nightCount: number,
  installmentCount: number,
): PriceBreakdown {
  const safeNightCount = Math.max(nightCount, MIN_NIGHT_COUNT);
  const subtotal = nightlyRate * safeNightCount;
  const serviceFee = Math.round(subtotal * SERVICE_FEE_RATE);
  const total = subtotal + serviceFee;

  return {
    nightCount: safeNightCount,
    nightlyRate,
    subtotal,
    serviceFee,
    total,
    installmentCount,
    installmentValue: total / installmentCount,
    dueNow: Math.round(total * DEPOSIT_RATE),
  };
}

export function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
