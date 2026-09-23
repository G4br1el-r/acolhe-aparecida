import type { BedSetup } from "@/@types/Modules/Hospedagens/accommodation";

export type RoomTemplateId =
  | "standard-casal"
  | "duplo-solteiro"
  | "triplo"
  | "familia"
  | "acessivel"
  | "coletivo"
  | "suite"
  | "casa-inteira"
  | "apartamento";

export type RoomTemplate = {
  name: string;
  beds: BedSetup[];
  maxGuests: number;
  sizeInSquareMeters: number;
  priceFactor: number;
  isAccessible: boolean;
  features: string[];
  photoIds: string[];
};

export const ROOM_TEMPLATES: Record<RoomTemplateId, RoomTemplate> = {
  "standard-casal": {
    name: "Standard Casal",
    beds: [{ type: "casal", count: 1 }],
    maxGuests: 2,
    sizeInSquareMeters: 16,
    priceFactor: 1,
    isAccessible: false,
    features: ["Ar-condicionado", "TV", "Banheiro privativo"],
    photoIds: ["quarto-casal", "banheiro-box"],
  },
  "duplo-solteiro": {
    name: "Duplo com camas de solteiro",
    beds: [{ type: "solteiro", count: 2 }],
    maxGuests: 2,
    sizeInSquareMeters: 17,
    priceFactor: 1.05,
    isAccessible: false,
    features: ["Ar-condicionado", "TV", "Banheiro privativo"],
    photoIds: ["quarto-duas-camas", "banheiro-claro"],
  },
  triplo: {
    name: "Triplo",
    beds: [
      { type: "casal", count: 1 },
      { type: "solteiro", count: 1 },
    ],
    maxGuests: 3,
    sizeInSquareMeters: 20,
    priceFactor: 1.3,
    isAccessible: false,
    features: ["Ar-condicionado", "TV", "Frigobar"],
    photoIds: ["quarto-espelho", "banheiro-amplo"],
  },
  familia: {
    name: "Família Quádruplo",
    beds: [
      { type: "casal", count: 1 },
      { type: "solteiro", count: 2 },
    ],
    maxGuests: 4,
    sizeInSquareMeters: 26,
    priceFactor: 1.55,
    isAccessible: false,
    features: ["Ar-condicionado", "TV", "Frigobar", "Berço sob solicitação"],
    photoIds: ["quarto-mesa", "banheiro-amplo"],
  },
  acessivel: {
    name: "Acessível Duplo",
    beds: [{ type: "solteiro", count: 2 }],
    maxGuests: 2,
    sizeInSquareMeters: 22,
    priceFactor: 1.08,
    isAccessible: true,
    features: [
      "Porta com 90 cm",
      "Barras de apoio no banheiro",
      "Chuveiro sem desnível",
      "Ar-condicionado",
    ],
    photoIds: ["quarto-claro", "banheiro-claro"],
  },
  coletivo: {
    name: "Coletivo para grupos",
    beds: [{ type: "beliche", count: 3 }],
    maxGuests: 6,
    sizeInSquareMeters: 30,
    priceFactor: 2.1,
    isAccessible: false,
    features: ["Ventilador de teto", "Armários individuais", "Banheiro amplo"],
    photoIds: ["quarto-ventilador", "banheiro-toalhas"],
  },
  suite: {
    name: "Suíte Superior",
    beds: [{ type: "casal", count: 1 }],
    maxGuests: 2,
    sizeInSquareMeters: 28,
    priceFactor: 1.45,
    isAccessible: false,
    features: ["Cama king", "Varanda", "Ar-condicionado", "Frigobar"],
    photoIds: ["suite-cortina", "banheiro-box"],
  },
  "casa-inteira": {
    name: "Casa inteira",
    beds: [
      { type: "casal", count: 3 },
      { type: "solteiro", count: 6 },
      { type: "beliche", count: 2 },
    ],
    maxGuests: 16,
    sizeInSquareMeters: 180,
    priceFactor: 1,
    isAccessible: false,
    features: ["Cozinha completa", "Sala ampla", "Área externa", "Garagem"],
    photoIds: ["sala-estar", "quarto-cabeceira", "varanda-mesa"],
  },
  apartamento: {
    name: "Apartamento completo",
    beds: [
      { type: "casal", count: 1 },
      { type: "solteiro", count: 2 },
    ],
    maxGuests: 4,
    sizeInSquareMeters: 48,
    priceFactor: 1,
    isAccessible: false,
    features: ["Cozinha equipada", "Sala com sofá-cama", "Máquina de lavar"],
    photoIds: ["sala-estar", "quarto-janela", "banheiro-amplo"],
  },
};
