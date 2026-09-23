import type { AmenityKey } from "@/constants/Modules/Home/amenities";
import type { TravelerProfileId } from "@/constants/Modules/Home/traveler-profiles";

export type AccommodationType =
  | "hotel"
  | "pousada"
  | "casa"
  | "apartamento"
  | "quarto";

export type MealOption =
  | "cafe"
  | "almoco"
  | "jantar"
  | "meia-pensao"
  | "pensao-completa"
  | "restaurante";

export type ParkingOption = "carro" | "van" | "onibus" | "gratuito" | "pago";

export type StructureFeature =
  | "wifi"
  | "ar-condicionado"
  | "piscina"
  | "elevador"
  | "recepcao-24h"
  | "pet-friendly"
  | "quartos-familiares"
  | "berco";

export type AccessibilityFeature =
  | "entrada-acessivel"
  | "banheiro-adaptado"
  | "barras-de-apoio"
  | "quarto-acessivel"
  | "elevador";

export type BookingFeature =
  | "cancelamento-gratuito"
  | "parcelamento"
  | "confirmacao-imediata";

export type AccommodationBadgeId =
  | "favorito-dos-hospedes"
  | "mais-reservado"
  | "excelente-para-familias"
  | "excelente-para-grupos"
  | "proximo-ao-santuario"
  | "excelente-cafe"
  | "estacionamento-incluso"
  | "acessibilidade-verificada"
  | "parceiro-verificado";

export type ReviewCategoryId =
  | "limpeza"
  | "atendimento"
  | "localizacao"
  | "conforto"
  | "estrutura"
  | "custo-beneficio"
  | "cafe"
  | "estacionamento"
  | "acessibilidade";

export type BedType = "casal" | "solteiro" | "beliche";

export type BedSetup = {
  type: BedType;
  count: number;
};

export type RoomType = {
  id: string;
  name: string;
  beds: BedSetup[];
  maxGuests: number;
  sizeInSquareMeters: number;
  pricePerNight: number;
  totalUnits: number;
  isAccessible: boolean;
  features: string[];
  photoIds: string[];
};

export type Coordinates = {
  lat: number;
  lng: number;
};

export type MapPosition = {
  x: number;
  y: number;
};

export type LandmarkDistances = {
  santuarioInMeters: number;
  basilicaVelhaInMeters: number;
  passarelaDaFeInMeters: number;
  rodoviariaInMeters: number;
};

export type CancellationPolicy = {
  freeUntilDaysBefore: number;
  partialRefundPercent: number;
};

export type PartnerInfo = {
  name: string;
  partnerSince: number;
  responseRatePercent: number;
  responseTimeLabel: string;
  isVerified: boolean;
  about: string;
};

export type Accommodation = {
  slug: string;
  name: string;
  type: AccommodationType;
  tagline: string;
  description: string[];
  image: string;
  photoIds: string[];
  address: {
    street: string;
    neighborhood: string;
  };
  coordinates: Coordinates;
  mapPosition: MapPosition;
  distances: LandmarkDistances;
  distanceFromSanctuary: string;
  walkingMinutes: number;
  drivingMinutes: number;
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  ratingBreakdown: Partial<Record<ReviewCategoryId, number>>;
  amenities: AmenityKey[];
  meals: MealOption[];
  parking: ParkingOption[];
  structure: StructureFeature[];
  accessibility: AccessibilityFeature[];
  booking: BookingFeature[];
  badges: AccommodationBadgeId[];
  maxGuests: number;
  totalCapacity: number;
  roomCount: number;
  bedCount: number;
  isAccessible: boolean;
  suitableFor: TravelerProfileId[];
  highlightBadge?: string;
  rooms: RoomType[];
  checkInTime: string;
  checkOutTime: string;
  houseRules: string[];
  cancellationPolicy: CancellationPolicy;
  partner: PartnerInfo;
  bookingsLastMonth: number;
};
