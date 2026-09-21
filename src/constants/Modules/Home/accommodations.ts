import type { AmenityKey } from "./amenities";

export type Accommodation = {
  slug: string;
  name: string;
  image: string;
  distanceFromSanctuary: string;
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  amenities: AmenityKey[];
  maxGuests: number;
  roomCount: number;
  bedCount: number;
  isAccessible: boolean;
  highlightBadge?: string;
};

export const MAP_HIGHLIGHT_ACCOMMODATION: Accommodation = {
  slug: "conforto-para-toda-familia",
  name: "Conforto para toda a família",
  image:
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  distanceFromSanctuary: "350 m do Santuário",
  pricePerNight: 280,
  rating: 9.2,
  reviewCount: 214,
  amenities: ["familyFriendly", "breakfast"],
  maxGuests: 4,
  roomCount: 1,
  bedCount: 2,
  isAccessible: false,
};

export const ACCOMMODATIONS: Accommodation[] = [
  {
    slug: "hotel-rainha-do-brasil",
    name: "Hotel Rainha do Brasil",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    distanceFromSanctuary: "A 5 minutos do Santuário",
    pricePerNight: 320,
    rating: 4.8,
    reviewCount: 612,
    amenities: ["breakfast"],
    maxGuests: 2,
    roomCount: 1,
    bedCount: 1,
    isAccessible: false,
  },
  {
    slug: "pousada-mae-aparecida",
    name: "Pousada Mãe Aparecida",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    distanceFromSanctuary: "450 m do Santuário",
    pricePerNight: 250,
    rating: 4.9,
    reviewCount: 387,
    amenities: ["parking"],
    maxGuests: 3,
    roomCount: 1,
    bedCount: 2,
    isAccessible: false,
  },
  {
    slug: "hotel-sao-miguel",
    name: "Hotel São Miguel",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    distanceFromSanctuary: "A 7 minutos do Santuário",
    pricePerNight: 290,
    rating: 4.7,
    reviewCount: 521,
    amenities: ["breakfast"],
    maxGuests: 4,
    roomCount: 1,
    bedCount: 2,
    isAccessible: true,
  },
  {
    slug: "pousada-do-devoto",
    name: "Pousada do Devoto",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    distanceFromSanctuary: "A 10 minutos do Santuário",
    pricePerNight: 220,
    rating: 4.6,
    reviewCount: 298,
    amenities: ["pool", "parking"],
    maxGuests: 6,
    roomCount: 2,
    bedCount: 3,
    isAccessible: false,
  },
  {
    slug: "hotel-portal-da-fe",
    name: "Hotel Portal da Fé",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    distanceFromSanctuary: "A 6 minutos do Santuário",
    pricePerNight: 310,
    rating: 4.8,
    reviewCount: 466,
    amenities: ["breakfast"],
    maxGuests: 2,
    roomCount: 1,
    bedCount: 1,
    isAccessible: true,
  },
  {
    slug: "pousada-bom-caminho",
    name: "Pousada Bom Caminho",
    image:
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    distanceFromSanctuary: "A 8 minutos do Santuário",
    pricePerNight: 240,
    rating: 4.7,
    reviewCount: 320,
    amenities: ["familyFriendly"],
    maxGuests: 4,
    roomCount: 2,
    bedCount: 2,
    isAccessible: false,
  },
  {
    slug: "recanto-da-padroeira",
    name: "Recanto da Padroeira · Casa Inteira",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    distanceFromSanctuary: "5 min a pé da Passarela da Fé",
    pricePerNight: 980,
    rating: 4.98,
    reviewCount: 52,
    amenities: ["wholeHouse", "vanSpot", "accessible"],
    maxGuests: 22,
    roomCount: 6,
    bedCount: 16,
    isAccessible: true,
    highlightBadge: "Mais procurada p/ romarias",
  },
  {
    slug: "hospedagem-familia-aparecida",
    name: "Hospedagem Família Aparecida",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    distanceFromSanctuary: "A 9 minutos do Santuário",
    pricePerNight: 260,
    rating: 4.5,
    reviewCount: 178,
    amenities: ["breakfast", "familyFriendly"],
    maxGuests: 5,
    roomCount: 2,
    bedCount: 3,
    isAccessible: false,
  },
];
