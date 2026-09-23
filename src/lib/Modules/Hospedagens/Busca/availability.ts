import {
  addDays,
  differenceInCalendarDays,
  format,
  isWithinInterval,
  parseISO,
} from "date-fns";
import type {
  Accommodation,
  RoomType,
} from "@/@types/Modules/Hospedagens/accommodation";
import { HIGH_DEMAND_PERIODS } from "@/constants/Modules/Hospedagens/Busca/high-demand-periods";
import { hashToUnitInterval } from "@/lib/Modules/Hospedagens/hash";

export const ISO_DATE_FORMAT = "yyyy-MM-dd";

const BASE_OCCUPANCY_RATE = 0.55;
const HIGH_DEMAND_OCCUPANCY_RATE = 0.9;
const VERY_HIGH_DEMAND_OCCUPANCY_RATE = 0.97;
const OCCUPANCY_NOISE = 0.35;
const HIGH_DEMAND_PRICE_MULTIPLIER = 1.25;
const VERY_HIGH_DEMAND_PRICE_MULTIPLIER = 1.45;
const WEEKEND_PRICE_MULTIPLIER = 1.08;
const LOW_AVAILABILITY_THRESHOLD = 2;
const PRICE_ROUNDING_STEP = 5;
const SATURDAY = 6;
const SUNDAY = 0;

export type StayDates = {
  checkIn: string;
  checkOut: string;
};

export type RoomAvailability = {
  room: RoomType;
  unitsLeft: number;
  nightlyRate: number;
  hasHighDemandPricing: boolean;
};

export type AccommodationAvailability = {
  isAvailable: boolean;
  nightCount: number;
  rooms: RoomAvailability[];
  cheapestAvailableRoom: RoomAvailability | null;
  hasLowAvailability: boolean;
  totalUnitsLeft: number;
};

export function toIsoDate(date: Date): string {
  return format(date, ISO_DATE_FORMAT);
}

export function parseIsoDate(value: string): Date {
  return parseISO(value);
}

export function countNightsBetween(dates: StayDates): number {
  const nights = differenceInCalendarDays(
    parseIsoDate(dates.checkOut),
    parseIsoDate(dates.checkIn),
  );

  return Math.max(0, nights);
}

export function listNights(dates: StayDates): string[] {
  const nightCount = countNightsBetween(dates);
  const start = parseIsoDate(dates.checkIn);

  return Array.from({ length: nightCount }, (_, index) =>
    toIsoDate(addDays(start, index)),
  );
}

export function demandLevelFor(
  isoDate: string,
): "normal" | "alta" | "muito-alta" {
  const date = parseIsoDate(isoDate);

  for (const period of HIGH_DEMAND_PERIODS) {
    const start = parseIsoDate(period.startDate);
    const end = parseIsoDate(period.endDate);

    if (isWithinInterval(date, { start, end })) {
      return period.demand;
    }
  }

  return "normal";
}

function occupancyRateFor(isoDate: string): number {
  const demand = demandLevelFor(isoDate);

  if (demand === "muito-alta") return VERY_HIGH_DEMAND_OCCUPANCY_RATE;
  if (demand === "alta") return HIGH_DEMAND_OCCUPANCY_RATE;

  return BASE_OCCUPANCY_RATE;
}

function isWeekend(isoDate: string): boolean {
  const day = parseIsoDate(isoDate).getDay();

  return day === SATURDAY || day === SUNDAY;
}

export function nightlyRateFor(basePrice: number, isoDate: string): number {
  const demand = demandLevelFor(isoDate);
  let multiplier = 1;

  if (demand === "muito-alta") multiplier = VERY_HIGH_DEMAND_PRICE_MULTIPLIER;
  else if (demand === "alta") multiplier = HIGH_DEMAND_PRICE_MULTIPLIER;
  else if (isWeekend(isoDate)) multiplier = WEEKEND_PRICE_MULTIPLIER;

  return (
    Math.round((basePrice * multiplier) / PRICE_ROUNDING_STEP) *
    PRICE_ROUNDING_STEP
  );
}

function unitsBookedFor(slug: string, room: RoomType, isoDate: string): number {
  const noise =
    (hashToUnitInterval(`${slug}:${room.id}:${isoDate}`) - 0.5) *
    OCCUPANCY_NOISE;
  const rate = Math.min(1, Math.max(0, occupancyRateFor(isoDate) + noise));

  return Math.round(room.totalUnits * rate);
}

export function roomAvailabilityFor(
  accommodation: Pick<Accommodation, "slug">,
  room: RoomType,
  dates: StayDates,
): RoomAvailability {
  const nights = listNights(dates);

  if (nights.length === 0) {
    return {
      room,
      unitsLeft: room.totalUnits,
      nightlyRate: room.pricePerNight,
      hasHighDemandPricing: false,
    };
  }

  let unitsLeft = room.totalUnits;
  let rateTotal = 0;
  let hasHighDemandPricing = false;

  for (const night of nights) {
    const booked = unitsBookedFor(accommodation.slug, room, night);
    unitsLeft = Math.min(unitsLeft, room.totalUnits - booked);
    rateTotal += nightlyRateFor(room.pricePerNight, night);

    if (demandLevelFor(night) !== "normal") hasHighDemandPricing = true;
  }

  return {
    room,
    unitsLeft: Math.max(0, unitsLeft),
    nightlyRate: Math.round(rateTotal / nights.length),
    hasHighDemandPricing,
  };
}

export function accommodationAvailabilityFor(
  accommodation: Pick<Accommodation, "slug" | "rooms">,
  dates: StayDates | null,
  roomsNeeded = 1,
): AccommodationAvailability {
  const nightCount = dates ? countNightsBetween(dates) : 0;
  const rooms = accommodation.rooms.map((room) =>
    dates
      ? roomAvailabilityFor(accommodation, room, dates)
      : {
          room,
          unitsLeft: room.totalUnits,
          nightlyRate: room.pricePerNight,
          hasHighDemandPricing: false,
        },
  );

  const availableRooms = rooms.filter(
    (availability) => availability.unitsLeft >= roomsNeeded,
  );
  const cheapestAvailableRoom =
    [...availableRooms].sort(
      (first, second) => first.nightlyRate - second.nightlyRate,
    )[0] ?? null;
  const totalUnitsLeft = rooms.reduce(
    (total, availability) => total + availability.unitsLeft,
    0,
  );

  return {
    isAvailable: cheapestAvailableRoom !== null,
    nightCount,
    rooms,
    cheapestAvailableRoom,
    hasLowAvailability:
      cheapestAvailableRoom !== null &&
      totalUnitsLeft <= LOW_AVAILABILITY_THRESHOLD,
    totalUnitsLeft,
  };
}
