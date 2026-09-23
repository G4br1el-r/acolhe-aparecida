import {
  Bus,
  Church,
  Landmark,
  type LucideIcon,
  ParkingCircle,
  Store,
  UtensilsCrossed,
} from "lucide-react";
import type { GuidePlaceCategory } from "@/@types/Modules/Cidade/city";

export type GuideCategoryOption = {
  id: GuidePlaceCategory;
  label: string;
  icon: LucideIcon;
};

export const GUIDE_CATEGORIES: GuideCategoryOption[] = [
  { id: "santuario", label: "Santuários", icon: Church },
  { id: "atracao", label: "Atrações", icon: Landmark },
  { id: "restaurante", label: "Restaurantes", icon: UtensilsCrossed },
  { id: "estacionamento", label: "Estacionamentos", icon: ParkingCircle },
  { id: "transporte", label: "Transporte", icon: Bus },
  { id: "servico", label: "Serviços", icon: Store },
];

export const GUIDE_CATEGORY_LABELS: Record<GuidePlaceCategory, string> =
  Object.fromEntries(
    GUIDE_CATEGORIES.map((category) => [category.id, category.label]),
  ) as Record<GuidePlaceCategory, string>;
