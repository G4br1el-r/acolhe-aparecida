import {
  Accessibility,
  Bed,
  Car,
  Coffee,
  Home,
  type LucideIcon,
  ShieldCheck,
  Sparkles,
  Users,
  Waves,
} from "lucide-react";

export type AmenityKey =
  | "breakfast"
  | "parking"
  | "pool"
  | "familyFriendly"
  | "accessible"
  | "vanSpot"
  | "wholeHouse"
  | "securedBooking";

export const AMENITIES: Record<
  AmenityKey,
  { icon: LucideIcon; label: string }
> = {
  breakfast: { icon: Coffee, label: "Café incluso" },
  parking: { icon: Car, label: "Estacionamento" },
  pool: { icon: Waves, label: "Piscina" },
  familyFriendly: { icon: Users, label: "Ambiente familiar" },
  accessible: { icon: Accessibility, label: "Acessível" },
  vanSpot: { icon: Car, label: "Vaga p/ van" },
  wholeHouse: { icon: Home, label: "Casa inteira" },
  securedBooking: { icon: ShieldCheck, label: "Reserva garantida" },
};

export const ROOM_CAPACITY_ICON: LucideIcon = Users;
export const ROOM_COUNT_ICON: LucideIcon = Bed;
export const HIGHLIGHT_BADGE_ICON: LucideIcon = Sparkles;
