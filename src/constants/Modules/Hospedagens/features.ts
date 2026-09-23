import {
  Accessibility,
  ArrowUpDown,
  Baby,
  BadgeCheck,
  Bath,
  Bus,
  CalendarCheck,
  Car,
  ChefHat,
  Coffee,
  ConciergeBell,
  CreditCard,
  DoorOpen,
  Heart,
  Hotel,
  House,
  KeyRound,
  type LucideIcon,
  MapPin,
  Moon,
  ParkingCircle,
  PawPrint,
  Snowflake,
  Sparkles,
  Star,
  Sun,
  TrendingUp,
  Users,
  UtensilsCrossed,
  Waves,
  Wifi,
  Zap,
} from "lucide-react";
import type {
  AccessibilityFeature,
  AccommodationBadgeId,
  AccommodationType,
  BookingFeature,
  MealOption,
  ParkingOption,
  ReviewCategoryId,
  StructureFeature,
} from "@/@types/Modules/Hospedagens/accommodation";

export type FeatureLabel = {
  label: string;
  icon: LucideIcon;
};

export const ACCOMMODATION_TYPE_LABELS: Record<AccommodationType, string> = {
  hotel: "Hotel",
  pousada: "Pousada",
  casa: "Casa inteira",
  apartamento: "Apartamento",
  quarto: "Quarto em casa de família",
};

export const ACCOMMODATION_TYPE_ICONS: Record<AccommodationType, LucideIcon> = {
  hotel: Hotel,
  pousada: House,
  casa: KeyRound,
  apartamento: DoorOpen,
  quarto: Moon,
};

export const MEAL_LABELS: Record<MealOption, FeatureLabel> = {
  cafe: { label: "Café da manhã", icon: Coffee },
  almoco: { label: "Almoço", icon: Sun },
  jantar: { label: "Jantar", icon: Moon },
  "meia-pensao": { label: "Meia pensão", icon: ChefHat },
  "pensao-completa": { label: "Pensão completa", icon: ChefHat },
  restaurante: { label: "Restaurante no local", icon: UtensilsCrossed },
};

export const PARKING_LABELS: Record<ParkingOption, FeatureLabel> = {
  carro: { label: "Vaga para carro", icon: Car },
  van: { label: "Vaga para van", icon: Bus },
  onibus: { label: "Vaga para ônibus", icon: Bus },
  gratuito: { label: "Estacionamento gratuito", icon: ParkingCircle },
  pago: { label: "Estacionamento pago", icon: ParkingCircle },
};

export const STRUCTURE_LABELS: Record<StructureFeature, FeatureLabel> = {
  wifi: { label: "Wi-Fi", icon: Wifi },
  "ar-condicionado": { label: "Ar-condicionado", icon: Snowflake },
  piscina: { label: "Piscina", icon: Waves },
  elevador: { label: "Elevador", icon: ArrowUpDown },
  "recepcao-24h": { label: "Recepção 24h", icon: ConciergeBell },
  "pet-friendly": { label: "Aceita animais", icon: PawPrint },
  "quartos-familiares": { label: "Quartos familiares", icon: Users },
  berco: { label: "Berço disponível", icon: Baby },
};

export const ACCESSIBILITY_LABELS: Record<AccessibilityFeature, FeatureLabel> =
  {
    "entrada-acessivel": { label: "Entrada sem degraus", icon: DoorOpen },
    "banheiro-adaptado": { label: "Banheiro adaptado", icon: Bath },
    "barras-de-apoio": { label: "Barras de apoio", icon: Accessibility },
    "quarto-acessivel": { label: "Quarto acessível", icon: Accessibility },
    elevador: { label: "Elevador", icon: ArrowUpDown },
  };

export const BOOKING_LABELS: Record<BookingFeature, FeatureLabel> = {
  "cancelamento-gratuito": {
    label: "Cancelamento gratuito",
    icon: CalendarCheck,
  },
  parcelamento: { label: "Parcelamento sem juros", icon: CreditCard },
  "confirmacao-imediata": { label: "Confirmação imediata", icon: Zap },
};

export const BADGE_LABELS: Record<AccommodationBadgeId, FeatureLabel> = {
  "favorito-dos-hospedes": { label: "Favorito dos hóspedes", icon: Heart },
  "mais-reservado": { label: "Mais reservado", icon: TrendingUp },
  "excelente-para-familias": {
    label: "Excelente para famílias",
    icon: Users,
  },
  "excelente-para-grupos": { label: "Excelente para grupos", icon: Bus },
  "proximo-ao-santuario": { label: "Próximo ao Santuário", icon: MapPin },
  "excelente-cafe": { label: "Excelente café da manhã", icon: Coffee },
  "estacionamento-incluso": {
    label: "Estacionamento incluso",
    icon: ParkingCircle,
  },
  "acessibilidade-verificada": {
    label: "Acessibilidade verificada",
    icon: Accessibility,
  },
  "parceiro-verificado": { label: "Parceiro verificado", icon: BadgeCheck },
};

export const BADGE_CRITERIA: Record<AccommodationBadgeId, string> = {
  "favorito-dos-hospedes":
    "Nota 4,8 ou mais com pelo menos 200 avaliações de estadias concluídas.",
  "mais-reservado":
    "Entre as 5 hospedagens com mais reservas nos últimos 30 dias.",
  "excelente-para-familias":
    "Quartos familiares, berço disponível e nota alta de famílias com crianças.",
  "excelente-para-grupos":
    "Capacidade para 12 ou mais pessoas e vaga para van ou ônibus.",
  "proximo-ao-santuario": "Até 400 metros do Santuário Nacional.",
  "excelente-cafe": "Nota 4,8 ou mais na categoria café da manhã.",
  "estacionamento-incluso": "Estacionamento próprio sem custo adicional.",
  "acessibilidade-verificada":
    "Entrada, banheiro e circulação conferidos presencialmente pela equipe.",
  "parceiro-verificado":
    "Hospedagem visitada e fotografada pela nossa equipe antes de entrar na plataforma.",
};

export const REVIEW_CATEGORY_LABELS: Record<ReviewCategoryId, string> = {
  limpeza: "Limpeza",
  atendimento: "Atendimento",
  localizacao: "Localização",
  conforto: "Conforto",
  estrutura: "Estrutura",
  "custo-beneficio": "Custo-benefício",
  cafe: "Café da manhã",
  estacionamento: "Estacionamento",
  acessibilidade: "Acessibilidade",
};

export const REVIEW_CATEGORY_ORDER: ReviewCategoryId[] = [
  "limpeza",
  "atendimento",
  "localizacao",
  "conforto",
  "estrutura",
  "custo-beneficio",
  "cafe",
  "estacionamento",
  "acessibilidade",
];

export const RATING_ICON: LucideIcon = Star;
export const HIGHLIGHT_ICON: LucideIcon = Sparkles;

export const MAX_RATING = 5;
