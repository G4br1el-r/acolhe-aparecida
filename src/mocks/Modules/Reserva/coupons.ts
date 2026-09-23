import type { Coupon } from "@/@types/Modules/Conta/user";

export const SEEDED_COUPONS: Coupon[] = [
  {
    code: "BEMVINDO10",
    description: "10% de desconto na primeira reserva",
    type: "percent",
    value: 10,
    expiresAt: "2027-06-30",
    isUsed: false,
  },
  {
    code: "ROMARIA150",
    description: "R$ 150 de desconto para grupos a partir de 10 pessoas",
    type: "fixed",
    value: 150,
    minimumGuests: 10,
    expiresAt: "2027-12-31",
    isUsed: false,
  },
  {
    code: "VOLTEI5",
    description: "5% de desconto para quem já se hospedou pela plataforma",
    type: "percent",
    value: 5,
    minimumTotal: 400,
    expiresAt: "2027-03-31",
    isUsed: false,
  },
];
