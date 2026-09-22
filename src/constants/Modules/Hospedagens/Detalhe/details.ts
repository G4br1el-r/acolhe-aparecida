import {
  Accessibility,
  Baby,
  BedDouble,
  Building2,
  Bus,
  Car,
  ChefHat,
  Clock,
  Coffee,
  ConciergeBell,
  type LucideIcon,
  MapPin,
  PawPrint,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Tv,
  UtensilsCrossed,
  Waves,
  Wifi,
} from "lucide-react";

export type DetailAmenity = {
  icon: LucideIcon;
  label: string;
};

export type RoomOption = {
  id: string;
  name: string;
  bedDescription: string;
  maxGuests: number;
  priceFrom: number;
};

export type ReviewCategory = {
  label: string;
  score: number;
};

export type GuestReview = {
  id: string;
  authorName: string;
  travelerType: string;
  monthLabel: string;
  score: number;
  comment: string;
};

export type NearbyPlace = {
  name: string;
  distanceLabel: string;
  walkingLabel: string;
};

export type HouseRule = {
  icon: LucideIcon;
  label: string;
  value: string;
};

export const DETAIL_AMENITIES: DetailAmenity[] = [
  { icon: Wifi, label: "Wi-Fi em todo o hotel" },
  { icon: Coffee, label: "Café da manhã incluso" },
  { icon: Car, label: "Estacionamento no local" },
  { icon: Bus, label: "Vaga para van e ônibus" },
  { icon: Snowflake, label: "Ar-condicionado" },
  { icon: Tv, label: "TV com canais por assinatura" },
  { icon: Waves, label: "Piscina" },
  { icon: ConciergeBell, label: "Recepção 24 horas" },
  { icon: Building2, label: "Elevador" },
  { icon: Accessibility, label: "Quarto acessível" },
  { icon: UtensilsCrossed, label: "Restaurante no local" },
  { icon: ChefHat, label: "Meia pensão opcional" },
  { icon: Baby, label: "Berço sob solicitação" },
  { icon: PawPrint, label: "Aceita animais de pequeno porte" },
];

export const VISIBLE_AMENITIES_COUNT = 8;

export const ROOM_OPTIONS: RoomOption[] = [
  {
    id: "standard-casal",
    name: "Standard Casal",
    bedDescription: "1 cama de casal",
    maxGuests: 2,
    priceFrom: 260,
  },
  {
    id: "familia-quadruplo",
    name: "Família Quádruplo",
    bedDescription: "1 cama de casal e 2 de solteiro",
    maxGuests: 4,
    priceFrom: 390,
  },
  {
    id: "acessivel-duplo",
    name: "Acessível Duplo",
    bedDescription: "2 camas de solteiro",
    maxGuests: 2,
    priceFrom: 280,
  },
  {
    id: "coletivo-romaria",
    name: "Coletivo Romaria",
    bedDescription: "6 camas de solteiro",
    maxGuests: 6,
    priceFrom: 540,
  },
];

export const REVIEW_CATEGORIES: ReviewCategory[] = [
  { label: "Limpeza", score: 4.9 },
  { label: "Atendimento", score: 4.8 },
  { label: "Localização", score: 5.0 },
  { label: "Conforto", score: 4.7 },
  { label: "Café da manhã", score: 4.9 },
  { label: "Custo-benefício", score: 4.8 },
];

export const GUEST_REVIEWS: GuestReview[] = [
  {
    id: "marta",
    authorName: "Marta e família",
    travelerType: "Viagem em família",
    monthLabel: "Agosto de 2026",
    score: 5,
    comment:
      "Ficamos a poucos minutos do Santuário e conseguimos ir a pé para a missa da manhã. O café começa às 6h, o que ajudou muito com as crianças.",
  },
  {
    id: "paroquia",
    authorName: "Paróquia São Benedito",
    travelerType: "Romaria com 22 pessoas",
    monthLabel: "Julho de 2026",
    score: 5,
    comment:
      "A van ficou no estacionamento do hotel durante os três dias. A recepção organizou os horários do grupo e separou as chaves por quarto.",
  },
  {
    id: "seu-jose",
    authorName: "Seu José",
    travelerType: "Viagem com idosos",
    monthLabel: "Julho de 2026",
    score: 4,
    comment:
      "O elevador e o quarto acessível fizeram diferença para minha esposa. O quarto fica de frente para a rua e à noite chega algum barulho.",
  },
  {
    id: "carla",
    authorName: "Carla",
    travelerType: "Casal",
    monthLabel: "Junho de 2026",
    score: 5,
    comment:
      "Reservamos e pagamos tudo pela plataforma, sem precisar ligar para o hotel. Chegamos e o quarto já estava pronto.",
  },
];

export const NEARBY_PLACES: NearbyPlace[] = [
  {
    name: "Santuário Nacional",
    distanceLabel: "450 m",
    walkingLabel: "6 min a pé",
  },
  {
    name: "Passarela da Fé",
    distanceLabel: "700 m",
    walkingLabel: "9 min a pé",
  },
  {
    name: "Basílica Velha",
    distanceLabel: "1,2 km",
    walkingLabel: "15 min a pé",
  },
  {
    name: "Rodoviária de Aparecida",
    distanceLabel: "1,8 km",
    walkingLabel: "5 min de carro",
  },
];

export const HOUSE_RULES: HouseRule[] = [
  { icon: Clock, label: "Check-in", value: "A partir das 14h" },
  { icon: Clock, label: "Check-out", value: "Até as 12h" },
  {
    icon: BedDouble,
    label: "Crianças",
    value: "Bem-vindas em todos os quartos",
  },
  { icon: ShieldCheck, label: "Documento", value: "RG ou CNH na recepção" },
];

export const PARTNER_HIGHLIGHTS: DetailAmenity[] = [
  { icon: Sparkles, label: "Parceiro verificado pela plataforma" },
  { icon: MapPin, label: "Especialista em romarias e grupos" },
  { icon: ConciergeBell, label: "Responde em até 1 hora" },
];

export const FREE_CANCELLATION_DAYS = 7;
export const INSTALLMENT_COUNT = 10;
