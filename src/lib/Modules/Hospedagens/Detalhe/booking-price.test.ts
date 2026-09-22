import { describe, expect, it } from "vitest";
import {
  buildPriceBreakdown,
  countNights,
  formatCurrency,
} from "./booking-price";

const NIGHTLY_RATE = 320;
const INSTALLMENTS = 10;

describe("countNights", () => {
  it("conta as noites entre check-in e check-out", () => {
    const checkIn = new Date(2026, 9, 2);
    const checkOut = new Date(2026, 9, 5);

    expect(countNights(checkIn, checkOut)).toBe(3);
  });

  it("retorna 0 quando falta uma das datas", () => {
    expect(countNights(new Date(2026, 9, 2), undefined)).toBe(0);
    expect(countNights(undefined, new Date(2026, 9, 5))).toBe(0);
  });

  it("retorna 0 quando o check-out não é depois do check-in", () => {
    const sameDay = new Date(2026, 9, 2);

    expect(countNights(sameDay, sameDay)).toBe(0);
    expect(countNights(new Date(2026, 9, 5), new Date(2026, 9, 2))).toBe(0);
  });

  it("não perde uma noite na virada do horário de verão", () => {
    const checkIn = new Date(2026, 1, 20, 12);
    const checkOut = new Date(2026, 1, 23, 12);

    expect(countNights(checkIn, checkOut)).toBe(3);
  });
});

describe("buildPriceBreakdown", () => {
  it("soma diárias, taxa e total", () => {
    const breakdown = buildPriceBreakdown(NIGHTLY_RATE, 3, INSTALLMENTS);

    expect(breakdown.subtotal).toBe(960);
    expect(breakdown.serviceFee).toBe(77);
    expect(breakdown.total).toBe(1037);
  });

  it("usa no mínimo uma noite quando nenhuma data foi escolhida", () => {
    const breakdown = buildPriceBreakdown(NIGHTLY_RATE, 0, INSTALLMENTS);

    expect(breakdown.nightCount).toBe(1);
    expect(breakdown.subtotal).toBe(NIGHTLY_RATE);
  });

  it("divide o total pelo número de parcelas", () => {
    const breakdown = buildPriceBreakdown(NIGHTLY_RATE, 2, INSTALLMENTS);

    expect(breakdown.installmentValue * INSTALLMENTS).toBeCloseTo(
      breakdown.total,
    );
  });

  it("cobra 30% do total no momento da reserva", () => {
    const breakdown = buildPriceBreakdown(NIGHTLY_RATE, 2, INSTALLMENTS);

    expect(breakdown.dueNow).toBe(Math.round(breakdown.total * 0.3));
    expect(breakdown.dueNow).toBeLessThan(breakdown.total);
  });
});

describe("formatCurrency", () => {
  it("formata em real brasileiro", () => {
    expect(formatCurrency(1037)).toContain("1.037");
    expect(formatCurrency(1037)).toContain("R$");
  });
});
