import type { User, UserPersonaId } from "@/@types/Modules/Conta/user";

export type PersonaPreset = {
  id: UserPersonaId;
  userId: string;
  label: string;
  description: string;
  email: string;
};

export const MOCK_PASSWORD_MIN_LENGTH = 6;

export const PERSONA_PRESETS: PersonaPreset[] = [
  {
    id: "nova",
    userId: "usr-ana",
    label: "Ana Beatriz",
    description: "Conta nova, sem reservas nem favoritos.",
    email: "ana.beatriz@exemplo.com.br",
  },
  {
    id: "viagem-futura",
    userId: "usr-carlos",
    label: "Carlos Eduardo",
    description: "Viagem confirmada para a Festa da Padroeira.",
    email: "carlos.eduardo@exemplo.com.br",
  },
  {
    id: "viagem-concluida",
    userId: "usr-lucia",
    label: "Dona Lúcia",
    description: "Voltou de Aparecida e ainda não avaliou a estadia.",
    email: "lucia.ferreira@exemplo.com.br",
  },
  {
    id: "recorrente",
    userId: "usr-marcos",
    label: "Pe. Marcos",
    description: "Organiza romarias, tem histórico e favoritos.",
    email: "pe.marcos@exemplo.com.br",
  },
];

export const SEEDED_USERS: User[] = [
  {
    id: "usr-ana",
    personaId: "nova",
    fullName: "Ana Beatriz Moreira",
    email: "ana.beatriz@exemplo.com.br",
    phone: "(11) 98877-1020",
    document: "312.456.789-01",
    birthDate: "1994-03-18",
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
  },
  {
    id: "usr-carlos",
    personaId: "viagem-futura",
    fullName: "Carlos Eduardo Lima",
    email: "carlos.eduardo@exemplo.com.br",
    phone: "(35) 99911-4433",
    document: "204.118.552-70",
    birthDate: "1981-07-02",
    address: { city: "Pouso Alegre", state: "MG" },
    preferences: {
      travelerProfiles: ["familia-criancas", "cafe-manha"],
      needsAccessibility: false,
      usuallyTravelsWith: "Esposa e dois filhos",
      preferredPayment: "cartao",
      wantsEventAlerts: true,
    },
    frequentGuests: [
      {
        id: "fg-carlos-1",
        fullName: "Patrícia Lima",
        relationship: "Esposa",
        ageGroup: "adulto",
        document: "218.330.114-09",
        needsAccessibility: false,
      },
      {
        id: "fg-carlos-2",
        fullName: "Arthur Lima",
        relationship: "Filho",
        ageGroup: "crianca",
        age: 9,
        needsAccessibility: false,
      },
      {
        id: "fg-carlos-3",
        fullName: "Helena Lima",
        relationship: "Filha",
        ageGroup: "crianca",
        age: 5,
        needsAccessibility: false,
      },
    ],
    createdAt: "2026-04-11T10:00:00.000Z",
  },
  {
    id: "usr-lucia",
    personaId: "viagem-concluida",
    fullName: "Lúcia Helena Ferreira",
    email: "lucia.ferreira@exemplo.com.br",
    phone: "(12) 99702-5588",
    document: "087.552.310-44",
    birthDate: "1957-11-25",
    address: { city: "Taubaté", state: "SP" },
    preferences: {
      travelerProfiles: ["idosos", "acessibilidade"],
      needsAccessibility: true,
      usuallyTravelsWith: "Marido",
      preferredPayment: "pix",
      wantsEventAlerts: false,
    },
    frequentGuests: [
      {
        id: "fg-lucia-1",
        fullName: "Sebastião Ferreira",
        relationship: "Marido",
        ageGroup: "idoso",
        age: 72,
        document: "045.771.208-13",
        needsAccessibility: true,
      },
    ],
    createdAt: "2026-06-30T09:30:00.000Z",
  },
  {
    id: "usr-marcos",
    personaId: "recorrente",
    fullName: "Pe. Marcos Antônio Silva",
    email: "pe.marcos@exemplo.com.br",
    phone: "(35) 98800-2211",
    document: "156.902.447-32",
    birthDate: "1975-01-14",
    address: { city: "Itajubá", state: "MG" },
    preferences: {
      travelerProfiles: ["grupo-romarias", "estacionamento-van"],
      needsAccessibility: false,
      usuallyTravelsWith: "Grupo da paróquia, entre 18 e 30 pessoas",
      preferredPayment: "pix",
      wantsEventAlerts: true,
    },
    frequentGuests: [
      {
        id: "fg-marcos-1",
        fullName: "Maria das Graças Souza",
        relationship: "Coordenadora da pastoral",
        ageGroup: "idoso",
        age: 68,
        needsAccessibility: false,
      },
      {
        id: "fg-marcos-2",
        fullName: "João Batista Rocha",
        relationship: "Motorista da van",
        ageGroup: "adulto",
        needsAccessibility: false,
      },
      {
        id: "fg-marcos-3",
        fullName: "Terezinha de Jesus",
        relationship: "Ministra da eucaristia",
        ageGroup: "idoso",
        age: 74,
        needsAccessibility: true,
      },
    ],
    createdAt: "2025-08-02T16:45:00.000Z",
  },
];
