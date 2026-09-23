import type {
  Coordinates,
  MapPosition,
} from "@/@types/Modules/Hospedagens/accommodation";
import { SANCTUARY_COORDINATES } from "@/constants/Modules/Home/map";

export const SANCTUARY_MAP_POSITION: MapPosition = { x: 48, y: 51 };

const METERS_PER_DEGREE_OF_LATITUDE = 111320;
const DEGREES_IN_HALF_CIRCLE = 180;
const MAP_SPAN_EAST_WEST_IN_METERS = 3200;
const MAP_SPAN_NORTH_SOUTH_IN_METERS = 2400;
const PERCENT_SCALE = 100;
const MIN_POSITION_IN_PERCENT = 5;
const MAX_POSITION_IN_PERCENT = 95;
const POSITION_DECIMALS = 1;

function clampPercent(value: number): number {
  const clamped = Math.min(
    MAX_POSITION_IN_PERCENT,
    Math.max(MIN_POSITION_IN_PERCENT, value),
  );

  return Number(clamped.toFixed(POSITION_DECIMALS));
}

export function projectMapPosition(
  coordinates: Coordinates,
  origin: Coordinates = SANCTUARY_COORDINATES,
  originPosition: MapPosition = SANCTUARY_MAP_POSITION,
): MapPosition {
  const latitudeInRadians = (origin.lat * Math.PI) / DEGREES_IN_HALF_CIRCLE;
  const metersPerDegreeOfLongitude =
    METERS_PER_DEGREE_OF_LATITUDE * Math.cos(latitudeInRadians);

  const eastOffsetInMeters =
    (coordinates.lng - origin.lng) * metersPerDegreeOfLongitude;
  const northOffsetInMeters =
    (coordinates.lat - origin.lat) * METERS_PER_DEGREE_OF_LATITUDE;

  const x =
    originPosition.x +
    (eastOffsetInMeters / MAP_SPAN_EAST_WEST_IN_METERS) * PERCENT_SCALE;
  const y =
    originPosition.y -
    (northOffsetInMeters / MAP_SPAN_NORTH_SOUTH_IN_METERS) * PERCENT_SCALE;

  return { x: clampPercent(x), y: clampPercent(y) };
}
