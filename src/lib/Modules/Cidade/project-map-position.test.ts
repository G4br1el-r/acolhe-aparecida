import { SANCTUARY_COORDINATES } from "@/constants/Modules/Home/map";
import {
  projectMapPosition,
  SANCTUARY_MAP_POSITION,
} from "./project-map-position";

describe("projectMapPosition", () => {
  it("places the sanctuary at its fixed position on the artwork", () => {
    expect(projectMapPosition(SANCTUARY_COORDINATES)).toEqual(
      SANCTUARY_MAP_POSITION,
    );
  });

  it("moves east when longitude grows", () => {
    const east = projectMapPosition({
      lat: SANCTUARY_COORDINATES.lat,
      lng: SANCTUARY_COORDINATES.lng + 0.005,
    });

    expect(east.x).toBeGreaterThan(SANCTUARY_MAP_POSITION.x);
    expect(east.y).toBe(SANCTUARY_MAP_POSITION.y);
  });

  it("moves up when latitude grows", () => {
    const north = projectMapPosition({
      lat: SANCTUARY_COORDINATES.lat + 0.005,
      lng: SANCTUARY_COORDINATES.lng,
    });

    expect(north.y).toBeLessThan(SANCTUARY_MAP_POSITION.y);
    expect(north.x).toBe(SANCTUARY_MAP_POSITION.x);
  });

  it("keeps far away places inside the visible map", () => {
    const farAway = projectMapPosition({ lat: -22.7, lng: -45.5 });

    expect(farAway.x).toBeGreaterThanOrEqual(5);
    expect(farAway.x).toBeLessThanOrEqual(95);
    expect(farAway.y).toBeGreaterThanOrEqual(5);
    expect(farAway.y).toBeLessThanOrEqual(95);
  });

  it("returns positions rounded to one decimal", () => {
    const position = projectMapPosition({ lat: -22.8598, lng: -45.2287 });

    expect(position.x).toBe(Number(position.x.toFixed(1)));
    expect(position.y).toBe(Number(position.y.toFixed(1)));
  });
});
