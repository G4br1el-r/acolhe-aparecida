import type {
  PaymentMethod,
  PaymentRecord,
} from "@/@types/Modules/Reserva/reservation";
import { delay, PAYMENT_LATENCY_IN_MS } from "@/mocks/latency";
import { MockServiceError } from "@/mocks/scenario";

export const TEST_CARDS = {
  approved: "4242 4242 4242 4242",
  declined: "4000 0000 0000 0002",
  error: "4000 0000 0000 0119",
} as const;

const DECLINED_SUFFIX = "0002";
const ERROR_SUFFIX = "0119";
const LAST_DIGITS_COUNT = 4;
const PIX_EXPIRATION_IN_MINUTES = 15;
const PIX_CODE_PREFIX = "00020126580014br.gov.bcb.pix0136acolher";

export const PIX_EXPIRATION_IN_SECONDS = PIX_EXPIRATION_IN_MINUTES * 60;

export type CardInput = {
  number: string;
  holderName: string;
  expiry: string;
  cvv: string;
  installmentCount: number;
};

export type PaymentResult =
  | { status: "aprovado"; payment: PaymentRecord }
  | { status: "recusado"; reason: string }
  | { status: "expirado" };

export function detectCardBrand(cardNumber: string): string {
  const digits = cardNumber.replace(/\D/g, "");

  if (digits.startsWith("4")) return "Visa";
  if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) return "Mastercard";
  if (/^3[47]/.test(digits)) return "Amex";
  if (
    /^(4011|4312|4389|4514|4576|5041|5066|5090|6277|6362|6363)/.test(digits)
  ) {
    return "Elo";
  }

  return "Cartão";
}

export async function chargeCard(
  input: CardInput,
  amount: number,
): Promise<PaymentResult> {
  await delay(PAYMENT_LATENCY_IN_MS);

  const digits = input.number.replace(/\D/g, "");

  if (digits.endsWith(ERROR_SUFFIX)) {
    throw new MockServiceError(
      "A operadora não respondeu. Nenhum valor foi cobrado. Tente novamente em instantes.",
    );
  }

  if (digits.endsWith(DECLINED_SUFFIX)) {
    return {
      status: "recusado",
      reason:
        "O banco emissor não autorizou a compra. Nenhum valor foi cobrado. Tente outro cartão ou pague com PIX.",
    };
  }

  return {
    status: "aprovado",
    payment: {
      method: "cartao",
      status: "aprovado",
      installmentCount: input.installmentCount,
      cardLastDigits: digits.slice(-LAST_DIGITS_COUNT),
      cardBrand: detectCardBrand(digits),
      paidAt: new Date().toISOString(),
      amountPaid: amount,
    },
  };
}

export type PixCharge = {
  code: string;
  expiresAt: string;
  amount: number;
};

export async function createPixCharge(amount: number): Promise<PixCharge> {
  await delay();

  const expiresAt = new Date(
    Date.now() + PIX_EXPIRATION_IN_SECONDS * 1000,
  ).toISOString();
  const suffix = Math.random().toString(36).slice(2, 10).toUpperCase();

  return {
    code: `${PIX_CODE_PREFIX}-${suffix}5204000053039865802BR5925ACOLHER APARECIDA LTDA6009APARECIDA`,
    expiresAt,
    amount,
  };
}

export async function confirmPixPayment(
  charge: PixCharge,
): Promise<PaymentResult> {
  await delay(PAYMENT_LATENCY_IN_MS);

  if (new Date(charge.expiresAt).getTime() < Date.now()) {
    return { status: "expirado" };
  }

  return {
    status: "aprovado",
    payment: {
      method: "pix",
      status: "aprovado",
      installmentCount: 1,
      pixCode: charge.code,
      paidAt: new Date().toISOString(),
      amountPaid: charge.amount,
    },
  };
}

export function paymentMethodLabel(method: PaymentMethod): string {
  return method === "pix" ? "PIX" : "Cartão de crédito";
}
