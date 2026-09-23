import type { Coupon } from "@/@types/Modules/Conta/user";
import {
  availableInstallments,
  buildPriceSummary,
  extrasTotalFor,
  formatCurrency,
  validateCoupon,
} from "./price-summary";

const PERCENT_COUPON: Coupon = {
  code: "BEMVINDO10",
  description: "10%",
  type: "percent",
  value: 10,
  expiresAt: "2099-01-01",
  isUsed: false,
};

const GROUP_COUPON: Coupon = {
  code: "ROMARIA150",
  description: "R$ 150",
  type: "fixed",
  value: 150,
  minimumGuests: 10,
  expiresAt: "2099-01-01",
  isUsed: false,
};

describe("extrasTotalFor", () => {
  it("soma extras por noite e por estadia", () => {
    expect(
      extrasTotalFor(
        [
          { id: "almoco", label: "Almoço", pricePerNight: 40, quantity: 2 },
          { id: "berco", label: "Berço", pricePerStay: 30, quantity: 1 },
        ],
        3,
      ),
    ).toBe(270);
  });
});

describe("validateCoupon", () => {
  it("aplica percentual sobre o subtotal", () => {
    expect(validateCoupon(PERCENT_COUPON, 1000, 2)).toEqual({
      isValid: true,
      discount: 100,
    });
  });

  it("recusa cupom de grupo para poucos hóspedes", () => {
    const result = validateCoupon(GROUP_COUPON, 1000, 4);
    expect(result.isValid).toBe(false);
  });

  it("recusa cupom expirado", () => {
    const result = validateCoupon(
      { ...PERCENT_COUPON, expiresAt: "2020-01-01" },
      1000,
      2,
    );
    expect(result.isValid).toBe(false);
  });
});

describe("availableInstallments", () => {
  it("limita parcelas pelo valor mínimo", () => {
    expect(availableInstallments(250)).toEqual([1, 2, 3]);
  });

  it("nunca passa do máximo", () => {
    expect(availableInstallments(10000)).toHaveLength(12);
  });
});

describe("buildPriceSummary", () => {
  it("calcula subtotal, taxa e total no cartão", () => {
    const summary = buildPriceSummary({
      nightlyRate: 300,
      nightCount: 2,
      roomCount: 1,
      extras: [],
      guestCount: 2,
      installmentCount: 3,
      paymentMethod: "cartao",
      hasHighDemandPricing: false,
    });

    expect(summary.subtotal).toBe(600);
    expect(summary.serviceFee).toBe(48);
    expect(summary.total).toBe(648);
    expect(summary.installmentCount).toBe(3);
    expect(summary.installmentValue).toBe(216);
  });

  it("aplica desconto do PIX e força parcela única", () => {
    const summary = buildPriceSummary({
      nightlyRate: 300,
      nightCount: 2,
      roomCount: 1,
      extras: [],
      guestCount: 2,
      installmentCount: 6,
      paymentMethod: "pix",
      hasHighDemandPricing: false,
    });

    expect(summary.discount).toBe(30);
    expect(summary.installmentCount).toBe(1);
    expect(summary.total).toBe(618);
  });

  it("soma o desconto do cupom", () => {
    const summary = buildPriceSummary({
      nightlyRate: 500,
      nightCount: 2,
      roomCount: 1,
      extras: [],
      coupon: PERCENT_COUPON,
      guestCount: 2,
      installmentCount: 1,
      paymentMethod: "cartao",
      hasHighDemandPricing: false,
    });

    expect(summary.discount).toBe(100);
  });
});

describe("formatCurrency", () => {
  it("formata em reais", () => {
    expect(formatCurrency(1234.5).replace(/\s/g, " ")).toBe("R$ 1.234,50");
  });
});
