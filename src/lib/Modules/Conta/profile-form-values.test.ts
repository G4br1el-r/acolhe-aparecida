import type { User } from "@/@types/Modules/Conta/user";
import { toProfileFormValues } from "./profile-form-values";

const user: User = {
  id: "usr-teste",
  personaId: "nova",
  fullName: "Ana Beatriz Moreira",
  email: "ana@exemplo.com.br",
  phone: "(11) 98877-1020",
  document: "312.456.789-01",
  address: { city: "São Paulo", state: "SP" },
  preferences: {
    travelerProfiles: [],
    needsAccessibility: false,
    usuallyTravelsWith: "",
    preferredPayment: null,
    wantsEventAlerts: true,
  },
  frequentGuests: [],
  createdAt: "2026-09-20T14:12:00.000Z",
};

describe("toProfileFormValues", () => {
  it("maps the user into flat form values", () => {
    expect(toProfileFormValues({ ...user, birthDate: "1994-03-18" })).toEqual({
      fullName: "Ana Beatriz Moreira",
      email: "ana@exemplo.com.br",
      phone: "(11) 98877-1020",
      city: "São Paulo",
      state: "SP",
      birthDate: "1994-03-18",
    });
  });

  it("uses an empty string when the birth date is missing", () => {
    expect(toProfileFormValues(user).birthDate).toBe("");
  });
});
