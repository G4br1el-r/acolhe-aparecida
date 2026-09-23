export const SANCTUARY_COORDINATES = {
  lat: -22.8672,
  lng: -45.2256,
} as const;

export const APARECIDA_LANDMARKS = [
  {
    id: "basilica-velha",
    name: "Basílica Velha",
    coordinates: { lat: -22.8598, lng: -45.2287 },
  },
  {
    id: "rodoviaria",
    name: "Rodoviária",
    coordinates: { lat: -22.8712, lng: -45.2301 },
  },
] as const;

export const DEFAULT_MAP_ZOOM = 15;
export const ACTIVE_MARKER_Z_INDEX = 30;
export const SANCTUARY_MARKER_Z_INDEX = 20;
export const DEFAULT_MARKER_Z_INDEX = 10;

export const GOOGLE_MAPS_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

export const GOOGLE_MAPS_MAP_ID =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID ?? "DEMO_MAP_ID";
