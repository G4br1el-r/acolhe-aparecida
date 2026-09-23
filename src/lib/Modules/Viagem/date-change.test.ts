import { findAccommodationBySlug } from "@/mocks/Modules/Hospedagens/accommodations";
import { SEEDED_RESERVATIONS } from "@/mocks/Modules/Reserva/reservations";
import { quoteDateChange } from "./date-change";

const RESERVATION = SEEDED_RESERVATIONS[0];
const ACCOMMODATION = findAccommodationBySlug(RESERVATION.accommodationSlug);

describe("quoteDateChange", () => {
  it("recalcula o preço para as novas datas mantendo o pagamento", () => {
    if (!ACCOMMODATION) throw new Error("hospedagem ausente");

    const quote = quoteDateChange({
      accommodation: ACCOMMODATION,
      reservation: RESERVATION,
      checkIn: "2026-11-20",
      checkOut: "2026-11-22",
    });

    if (!quote) throw new Error("deveria cotar");

    expect(quote.nightCount).toBe(2);
    expect(quote.summary.roomCount).toBe(RESERVATION.roomCount);
    expect(quote.summary.installmentCount).toBe(
      RESERVATION.payment.installmentCount,
    );
    expect(quote.difference).toBe(
      quote.summary.total - RESERVATION.price.total,
    );
  });

  it("retorna null sem noites ou sem o quarto", () => {
    if (!ACCOMMODATION) throw new Error("hospedagem ausente");

    expect(
      quoteDateChange({
        accommodation: ACCOMMODATION,
        reservation: RESERVATION,
        checkIn: "2026-11-20",
        checkOut: "2026-11-20",
      }),
    ).toBeNull();
    expect(
      quoteDateChange({
        accommodation: ACCOMMODATION,
        reservation: { ...RESERVATION, roomTypeId: "inexistente" },
        checkIn: "2026-11-20",
        checkOut: "2026-11-22",
      }),
    ).toBeNull();
  });
});
