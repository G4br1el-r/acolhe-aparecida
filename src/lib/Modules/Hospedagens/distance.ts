import type { Coordinates } from "@/@types/Modules/Hospedagens/accommodation";

const EARTH_RADIUS_IN_METERS = 6371000;
const DEGREES_IN_HALF_CIRCLE = 180;
const WALKING_SPEED_IN_METERS_PER_MINUTE = 75;
const DRIVING_SPEED_IN_METERS_PER_MINUTE = 250;
const MIN_WALKING_MINUTES = 2;
const MIN_DRIVING_MINUTES = 2;
const METERS_IN_A_KILOMETER = 1000;
const METERS_ROUNDING_STEP = 10;

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / DEGREES_IN_HALF_CIRCLE;
}

export function distanceInMeters(from: Coordinates, to: Coordinates): number {
  const latitudeDelta = toRadians(to.lat - from.lat);
  const longitudeDelta = toRadians(to.lng - from.lng);

  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(toRadians(from.lat)) *
      Math.cos(toRadians(to.lat)) *
      Math.sin(longitudeDelta / 2) ** 2;

  const angularDistance =
    2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));

  return Math.round(EARTH_RADIUS_IN_METERS * angularDistance);
}

export function walkingMinutesFor(meters: number): number {
  return Math.max(
    MIN_WALKING_MINUTES,
    Math.ceil(meters / WALKING_SPEED_IN_METERS_PER_MINUTE),
  );
}

export function drivingMinutesFor(meters: number): number {
  return Math.max(
    MIN_DRIVING_MINUTES,
    Math.round(meters / DRIVING_SPEED_IN_METERS_PER_MINUTE),
  );
}

export function formatDistance(meters: number): string {
  if (meters < METERS_IN_A_KILOMETER) {
    const rounded =
      Math.round(meters / METERS_ROUNDING_STEP) * METERS_ROUNDING_STEP;
    return `${rounded} m`;
  }

  const kilometers = meters / METERS_IN_A_KILOMETER;

  return `${kilometers.toLocaleString("pt-BR", {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  })} km`;
}
