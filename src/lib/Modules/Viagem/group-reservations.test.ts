import { SEEDED_RESERVATIONS } from "@/mocks/Modules/Reserva/reservations";
import { groupReservations } from "./group-reservations";

const MARCOS = SEEDED_RESERVATIONS.filter(
  (reservation) => reservation.userId === "usr-marcos",
);

describe("groupReservations", () => {
  it("separa por status e ordena cada grupo", () => {
    const groups = groupReservations(MARCOS);

    expect(groups.proximas.map((r) => r.id)).toEqual([
      "res-marcos-dezembro-2026",
    ]);
    expect(groups.anteriores.map((r) => r.id)).toEqual([
      "res-marcos-junho-2026",
      "res-marcos-outubro-2025",
    ]);
    expect(groups.canceladas.map((r) => r.id)).toEqual([
      "res-marcos-cancelada-2026",
    ]);
  });

  it("escolhe a próxima viagem confirmada mais perto", () => {
    const groups = groupReservations([
      { ...MARCOS[0], id: "b", checkIn: "2027-01-05", status: "confirmada" },
      { ...MARCOS[0], id: "a", checkIn: "2026-12-05", status: "confirmada" },
      {
        ...MARCOS[0],
        id: "c",
        checkIn: "2026-11-01",
        status: "aguardando-pagamento",
      },
    ]);

    expect(groups.nextTrip?.id).toBe("a");
  });

  it("retorna null sem viagem confirmada", () => {
    expect(groupReservations([]).nextTrip).toBeNull();
  });
});
