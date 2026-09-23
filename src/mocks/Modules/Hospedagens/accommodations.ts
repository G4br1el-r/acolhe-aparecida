import type {
  Accommodation,
  AccommodationBadgeId,
  BedSetup,
  ReviewCategoryId,
  RoomType,
} from "@/@types/Modules/Hospedagens/accommodation";
import type { AmenityKey } from "@/constants/Modules/Home/amenities";
import {
  BASILICA_VELHA_COORDINATES,
  PASSARELA_DA_FE_COORDINATES,
  RODOVIARIA_COORDINATES,
  SANCTUARY_COORDINATES,
} from "@/constants/Modules/Home/map";
import {
  distanceInMeters,
  drivingMinutesFor,
  formatDistance,
  walkingMinutesFor,
} from "@/lib/Modules/Hospedagens/distance";
import { hashString, hashToUnitInterval } from "@/lib/Modules/Hospedagens/hash";
import {
  ACCOMMODATION_SEEDS,
  type AccommodationSeed,
  type RoomSeed,
} from "./accommodation-seeds";
import { STOCK_PHOTOS } from "./photos";
import { ROOM_TEMPLATES } from "./room-templates";

const PRICE_ROUNDING_STEP = 5;
const CATEGORY_SCORE_SPREAD = 0.3;
const MIN_CATEGORY_SCORE = 3.6;
const MAX_CATEGORY_SCORE = 5;
const SCORE_DECIMALS = 1;
const DEFAULT_CHECK_IN_TIME = "14:00";
const DEFAULT_CHECK_OUT_TIME = "12:00";
const WHOLE_HOME_CHECK_IN_TIME = "15:00";
const WHOLE_HOME_CHECK_OUT_TIME = "11:00";
const DEFAULT_FREE_CANCELLATION_DAYS = 7;
const PARTIAL_REFUND_PERCENT = 50;
const GALLERY_PHOTO_COUNT = 14;
const FAVORITE_MIN_RATING = 4.8;
const FAVORITE_MIN_REVIEWS = 200;
const MOST_BOOKED_RANK_LIMIT = 5;
const GROUP_MIN_CAPACITY = 12;
const NEAR_SANCTUARY_MAX_METERS = 400;
const GREAT_COFFEE_MIN_SCORE = 4.8;
const VERIFIED_ACCESSIBILITY_MIN_FEATURES = 3;
const FAMILY_MIN_RATING = 4.6;
const MIN_RESPONSE_RATE_PERCENT = 92;
const RESPONSE_RATE_SPREAD_PERCENT = 7;
const GUESTS_PER_DOUBLE_BED_GROUP = 6;
const GUESTS_PER_BEDROOM = 3.5;
const DOUBLE_BED_CAPACITY = 2;

const RESPONSE_TIME_LABELS = ["até 30 minutos", "até 1 hora", "até 2 horas"];

function roundPrice(value: number): number {
  return Math.round(value / PRICE_ROUNDING_STEP) * PRICE_ROUNDING_STEP;
}

function roundScore(value: number): number {
  return Number(value.toFixed(SCORE_DECIMALS));
}

function buildWholeHomeBeds(maxGuests: number): BedSetup[] {
  const doubleBeds = Math.ceil(maxGuests / GUESTS_PER_DOUBLE_BED_GROUP);
  const singleBeds = Math.max(0, maxGuests - doubleBeds * DOUBLE_BED_CAPACITY);

  return [
    { type: "casal", count: doubleBeds },
    { type: "solteiro", count: singleBeds },
  ];
}

function buildRoom(seed: AccommodationSeed, roomSeed: RoomSeed): RoomType {
  const template = ROOM_TEMPLATES[roomSeed.template];
  const maxGuests = roomSeed.maxGuests ?? template.maxGuests;
  const isWholeHome = roomSeed.template === "casa-inteira";
  const beds =
    isWholeHome && roomSeed.maxGuests
      ? buildWholeHomeBeds(maxGuests)
      : template.beds;

  return {
    id: roomSeed.template,
    name: template.name,
    beds,
    maxGuests,
    sizeInSquareMeters: template.sizeInSquareMeters,
    pricePerNight: roundPrice(
      seed.basePrice * (roomSeed.priceFactor ?? template.priceFactor),
    ),
    totalUnits: roomSeed.units,
    isAccessible: template.isAccessible,
    features: template.features,
    photoIds: template.photoIds,
  };
}

function countBeds(beds: BedSetup[]): number {
  return beds.reduce((total, bed) => total + bed.count, 0);
}

function buildRatingBreakdown(
  seed: AccommodationSeed,
): Partial<Record<ReviewCategoryId, number>> {
  const categories: ReviewCategoryId[] = [
    "limpeza",
    "atendimento",
    "localizacao",
    "conforto",
    "estrutura",
    "custo-beneficio",
  ];

  if (seed.meals.includes("cafe")) categories.push("cafe");
  if (seed.parking.length > 0) categories.push("estacionamento");
  if (seed.accessibility.length > 0) categories.push("acessibilidade");

  const breakdown: Partial<Record<ReviewCategoryId, number>> = {};

  for (const category of categories) {
    const offset =
      (hashToUnitInterval(`${seed.slug}:${category}`) - 0.5) *
      CATEGORY_SCORE_SPREAD;
    const score = Math.min(
      MAX_CATEGORY_SCORE,
      Math.max(MIN_CATEGORY_SCORE, seed.rating + offset),
    );
    breakdown[category] = roundScore(score);
  }

  return breakdown;
}

function buildLegacyAmenities(seed: AccommodationSeed): AmenityKey[] {
  const amenities: AmenityKey[] = [];

  if (seed.meals.includes("cafe")) amenities.push("breakfast");
  if (seed.type === "casa") amenities.push("wholeHouse");
  if (seed.parking.includes("van") || seed.parking.includes("onibus")) {
    amenities.push("vanSpot");
  } else if (seed.parking.includes("carro")) {
    amenities.push("parking");
  }
  if (seed.structure.includes("piscina")) amenities.push("pool");
  if (seed.accessibility.includes("quarto-acessivel")) {
    amenities.push("accessible");
  }
  if (seed.structure.includes("quartos-familiares")) {
    amenities.push("familyFriendly");
  }

  return amenities;
}

function buildPhotoIds(seed: AccommodationSeed): string[] {
  const offset = hashString(seed.slug) % STOCK_PHOTOS.length;
  const rotated = STOCK_PHOTOS.map(
    (_, index) => STOCK_PHOTOS[(index + offset) % STOCK_PHOTOS.length],
  );
  const roomPhotos = rotated.filter((photo) => photo.kind === "quarto");
  const otherPhotos = rotated.filter((photo) => photo.kind !== "quarto");

  return [...roomPhotos, ...otherPhotos]
    .slice(0, GALLERY_PHOTO_COUNT)
    .map((photo) => photo.id);
}

function buildDescription(
  seed: AccommodationSeed,
  distances: Accommodation["distances"],
  walkingMinutes: number,
): string[] {
  const paragraphs = [seed.story];

  paragraphs.push(
    `Fica a ${formatDistance(distances.santuarioInMeters)} do Santuário Nacional, cerca de ${walkingMinutes} minutos a pé, e a ${formatDistance(distances.basilicaVelhaInMeters)} da Basílica Velha. A rodoviária está a ${drivingMinutesFor(distances.rodoviariaInMeters)} minutos de carro.`,
  );

  const servicePhrases: string[] = [];

  if (seed.meals.includes("pensao-completa")) {
    servicePhrases.push(
      "A pensão completa cobre café, almoço e jantar em horário combinado com o grupo",
    );
  } else if (seed.meals.includes("meia-pensao")) {
    servicePhrases.push(
      "Há opção de meia pensão, com café da manhã e jantar incluídos",
    );
  } else if (seed.meals.includes("cafe")) {
    servicePhrases.push("O café da manhã está incluído na diária");
  } else {
    servicePhrases.push(
      "As refeições não estão incluídas, e há padarias e restaurantes a poucos minutos",
    );
  }

  if (seed.parking.includes("onibus")) {
    servicePhrases.push(
      "o estacionamento é gratuito e recebe carros, vans e ônibus",
    );
  } else if (seed.parking.includes("van")) {
    servicePhrases.push("o estacionamento é gratuito e tem vaga para van");
  } else if (seed.parking.includes("gratuito")) {
    servicePhrases.push("há estacionamento gratuito para carros no local");
  } else if (seed.parking.includes("pago")) {
    servicePhrases.push(
      "o estacionamento é pago à parte e a vaga deve ser reservada na chegada",
    );
  } else {
    servicePhrases.push(
      "não há estacionamento próprio, e o público mais próximo fica a poucos minutos a pé",
    );
  }

  paragraphs.push(`${servicePhrases.join(", e ")}.`);

  if (seed.accessibility.length >= VERIFIED_ACCESSIBILITY_MIN_FEATURES) {
    paragraphs.push(
      "A acessibilidade foi conferida presencialmente pela nossa equipe: entrada, banheiro e circulação foram medidos e fotografados na visita.",
    );
  }

  return paragraphs;
}

function buildHouseRules(seed: AccommodationSeed): string[] {
  const rules = [
    "Documento com foto de todos os hóspedes na chegada",
    "Silêncio nos corredores a partir das 22h",
  ];

  if (seed.structure.includes("pet-friendly")) {
    rules.push("Animais de pequeno porte são bem-vindos, avise na reserva");
  } else {
    rules.push("Não aceita animais");
  }

  if (seed.structure.includes("berco")) {
    rules.push("Crianças até 5 anos não pagam e há berço sob solicitação");
  } else {
    rules.push("Crianças são bem-vindas em todos os quartos");
  }

  if (seed.type === "casa") {
    rules.push("Festas e eventos não são permitidos");
  }

  return rules;
}

function buildBadges(
  seed: AccommodationSeed,
  ratingBreakdown: Partial<Record<ReviewCategoryId, number>>,
  totalCapacity: number,
  santuarioInMeters: number,
  isMostBooked: boolean,
): AccommodationBadgeId[] {
  const badges: AccommodationBadgeId[] = ["parceiro-verificado"];

  if (
    seed.rating >= FAVORITE_MIN_RATING &&
    seed.reviewCount >= FAVORITE_MIN_REVIEWS
  ) {
    badges.push("favorito-dos-hospedes");
  }
  if (isMostBooked) badges.push("mais-reservado");
  if (
    seed.structure.includes("quartos-familiares") &&
    seed.structure.includes("berco") &&
    seed.suitableFor.includes("familia-criancas") &&
    seed.rating >= FAMILY_MIN_RATING
  ) {
    badges.push("excelente-para-familias");
  }
  if (
    totalCapacity >= GROUP_MIN_CAPACITY &&
    (seed.parking.includes("van") || seed.parking.includes("onibus"))
  ) {
    badges.push("excelente-para-grupos");
  }
  if (santuarioInMeters <= NEAR_SANCTUARY_MAX_METERS) {
    badges.push("proximo-ao-santuario");
  }
  if ((ratingBreakdown.cafe ?? 0) >= GREAT_COFFEE_MIN_SCORE) {
    badges.push("excelente-cafe");
  }
  if (seed.parking.includes("gratuito")) badges.push("estacionamento-incluso");
  if (seed.accessibility.length >= VERIFIED_ACCESSIBILITY_MIN_FEATURES) {
    badges.push("acessibilidade-verificada");
  }

  return badges;
}

const MOST_BOOKED_SLUGS = new Set(
  [...ACCOMMODATION_SEEDS]
    .sort((first, second) => second.bookingsLastMonth - first.bookingsLastMonth)
    .slice(0, MOST_BOOKED_RANK_LIMIT)
    .map((seed) => seed.slug),
);

function buildAccommodation(seed: AccommodationSeed): Accommodation {
  const rooms = seed.rooms.map((roomSeed) => buildRoom(seed, roomSeed));
  const leadRoom = [...rooms].sort(
    (first, second) => first.pricePerNight - second.pricePerNight,
  )[0];
  const largestRoom = [...rooms].sort(
    (first, second) => second.maxGuests - first.maxGuests,
  )[0];
  const totalCapacity = rooms.reduce(
    (total, room) => total + room.maxGuests * room.totalUnits,
    0,
  );
  const isWholeHome = seed.type === "casa" || seed.type === "apartamento";

  const distances = {
    santuarioInMeters: distanceInMeters(
      seed.coordinates,
      SANCTUARY_COORDINATES,
    ),
    basilicaVelhaInMeters: distanceInMeters(
      seed.coordinates,
      BASILICA_VELHA_COORDINATES,
    ),
    passarelaDaFeInMeters: distanceInMeters(
      seed.coordinates,
      PASSARELA_DA_FE_COORDINATES,
    ),
    rodoviariaInMeters: distanceInMeters(
      seed.coordinates,
      RODOVIARIA_COORDINATES,
    ),
  };

  const walkingMinutes = walkingMinutesFor(distances.santuarioInMeters);
  const ratingBreakdown = buildRatingBreakdown(seed);
  const responseRatePercent =
    MIN_RESPONSE_RATE_PERCENT +
    Math.round(
      hashToUnitInterval(`${seed.slug}:response`) *
        RESPONSE_RATE_SPREAD_PERCENT,
    );
  const responseTimeLabel =
    RESPONSE_TIME_LABELS[
      hashString(`${seed.slug}:time`) % RESPONSE_TIME_LABELS.length
    ];

  return {
    slug: seed.slug,
    name: seed.name,
    type: seed.type,
    tagline: seed.tagline,
    description: buildDescription(seed, distances, walkingMinutes),
    image: seed.image,
    photoIds: buildPhotoIds(seed),
    address: { street: seed.street, neighborhood: seed.neighborhood },
    coordinates: seed.coordinates,
    mapPosition: seed.mapPosition,
    distances,
    distanceFromSanctuary: `${formatDistance(distances.santuarioInMeters)} do Santuário`,
    walkingMinutes,
    drivingMinutes: drivingMinutesFor(distances.santuarioInMeters),
    pricePerNight: leadRoom.pricePerNight,
    rating: seed.rating,
    reviewCount: seed.reviewCount,
    ratingBreakdown,
    amenities: buildLegacyAmenities(seed),
    meals: seed.meals,
    parking: seed.parking,
    structure: seed.structure,
    accessibility: seed.accessibility,
    booking: seed.booking,
    badges: buildBadges(
      seed,
      ratingBreakdown,
      totalCapacity,
      distances.santuarioInMeters,
      MOST_BOOKED_SLUGS.has(seed.slug),
    ),
    maxGuests: largestRoom.maxGuests,
    totalCapacity,
    roomCount: isWholeHome
      ? Math.max(1, Math.round(largestRoom.maxGuests / GUESTS_PER_BEDROOM))
      : 1,
    bedCount: countBeds(isWholeHome ? largestRoom.beds : leadRoom.beds),
    isAccessible: seed.accessibility.includes("quarto-acessivel"),
    suitableFor: seed.suitableFor,
    highlightBadge: seed.highlightBadge,
    rooms,
    checkInTime:
      seed.checkInTime ??
      (seed.type === "casa" ? WHOLE_HOME_CHECK_IN_TIME : DEFAULT_CHECK_IN_TIME),
    checkOutTime:
      seed.checkOutTime ??
      (seed.type === "casa"
        ? WHOLE_HOME_CHECK_OUT_TIME
        : DEFAULT_CHECK_OUT_TIME),
    houseRules: buildHouseRules(seed),
    cancellationPolicy: {
      freeUntilDaysBefore:
        seed.freeCancellationDays ?? DEFAULT_FREE_CANCELLATION_DAYS,
      partialRefundPercent: PARTIAL_REFUND_PERCENT,
    },
    partner: {
      name: seed.name,
      partnerSince: seed.partnerSince,
      responseRatePercent,
      responseTimeLabel,
      isVerified: true,
      about: seed.partnerAbout,
    },
    bookingsLastMonth: seed.bookingsLastMonth,
  };
}

export const ACCOMMODATIONS: Accommodation[] =
  ACCOMMODATION_SEEDS.map(buildAccommodation);

export function findAccommodationBySlug(
  slug: string,
): Accommodation | undefined {
  return ACCOMMODATIONS.find((accommodation) => accommodation.slug === slug);
}
