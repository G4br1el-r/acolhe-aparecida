import type { GuestAgeGroup } from "@/@types/Modules/Reserva/reservation";
import type { TravelerProfileId } from "@/constants/Modules/Home/traveler-profiles";

export type UserPersonaId =
  | "nova"
  | "viagem-futura"
  | "viagem-concluida"
  | "recorrente";

export type FrequentGuest = {
  id: string;
  fullName: string;
  relationship: string;
  ageGroup: GuestAgeGroup;
  age?: number;
  document?: string;
  needsAccessibility: boolean;
};

export type UserPreferences = {
  travelerProfiles: TravelerProfileId[];
  needsAccessibility: boolean;
  usuallyTravelsWith: string;
  preferredPayment: "pix" | "cartao" | null;
  wantsEventAlerts: boolean;
};

export type UserAddress = {
  city: string;
  state: string;
  zipCode?: string;
};

export type User = {
  id: string;
  personaId: UserPersonaId;
  fullName: string;
  email: string;
  phone: string;
  document: string;
  birthDate?: string;
  avatarUrl?: string;
  address: UserAddress;
  preferences: UserPreferences;
  frequentGuests: FrequentGuest[];
  createdAt: string;
};

export type NotificationKind =
  | "reserva-confirmada"
  | "pagamento-aprovado"
  | "pagamento-recusado"
  | "viagem-proxima"
  | "check-in"
  | "check-out"
  | "avaliacao"
  | "cancelamento"
  | "reembolso"
  | "evento";

export type AppNotification = {
  id: string;
  userId: string;
  kind: NotificationKind;
  title: string;
  body: string;
  createdAt: string;
  isRead: boolean;
  href?: string;
};

export type Coupon = {
  code: string;
  description: string;
  type: "percent" | "fixed";
  value: number;
  minimumTotal?: number;
  minimumGuests?: number;
  expiresAt: string;
  isUsed: boolean;
};
