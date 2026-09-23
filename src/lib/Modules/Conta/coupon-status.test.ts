import type { Coupon } from "@/@types/Modules/Conta/user";
import { describeCouponRule, resolveCouponStatus } from "./coupon-status";

const NON_BREAKING_SPACE = / /g;

const baseCoupon: Coupon = {
  code: "TESTE10",
  description: "Cupom de teste",
  type: "percent",
  value: 10,
  expiresAt: "2027-06-30",
  isUsed: false,
};

describe("resolveCouponStatus", () => {
  it("marks used coupons first", () => {
    expect(
      resolveCouponStatus(
        { ...baseCoupon, isUsed: true, expiresAt: "2020-01-01" },
        new Date("2026-09-23"),
      ),
    ).toBe("usado");
  });

  it("marks coupons past their expiry date as expired", () => {
    expect(
      resolveCouponStatus(
        { ...baseCoupon, expiresAt: "2026-09-22" },
        new Date("2026-09-23T15:00:00"),
      ),
    ).toBe("expirado");
  });

  it("keeps coupons valid on the expiry day", () => {
    expect(
      resolveCouponStatus(
        { ...baseCoupon, expiresAt: "2026-09-23" },
        new Date("2026-09-23T15:00:00"),
      ),
    ).toBe("disponivel");
  });
});

describe("describeCouponRule", () => {
  it("describes a percent discount without conditions", () => {
    expect(describeCouponRule(baseCoupon)).toBe("10% de desconto");
  });

  it("describes a fixed discount with a guest minimum", () => {
    const result = describeCouponRule({
      ...baseCoupon,
      type: "fixed",
      value: 150,
      minimumGuests: 10,
    }).replace(NON_BREAKING_SPACE, " ");

    expect(result).toBe("R$ 150,00 de desconto para 10 ou mais hóspedes");
  });

  it("joins total and guest conditions", () => {
    const result = describeCouponRule({
      ...baseCoupon,
      minimumTotal: 400,
      minimumGuests: 4,
    }).replace(NON_BREAKING_SPACE, " ");

    expect(result).toBe(
      "10% de desconto em reservas a partir de R$ 400,00 e para 4 ou mais hóspedes",
    );
  });
});
