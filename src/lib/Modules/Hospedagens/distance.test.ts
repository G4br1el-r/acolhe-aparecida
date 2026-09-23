import {
  distanceInMeters,
  drivingMinutesFor,
  formatDistance,
  walkingMinutesFor,
} from "./distance";

describe("distanceInMeters", () => {
  it("returns zero for the same point", () => {
    const point = { lat: -22.8672, lng: -45.2256 };
    expect(distanceInMeters(point, point)).toBe(0);
  });

  it("approximates the distance between two nearby points", () => {
    const sanctuary = { lat: -22.8672, lng: -45.2256 };
    const nearby = { lat: -22.8672, lng: -45.2156 };
    const result = distanceInMeters(sanctuary, nearby);
    expect(result).toBeGreaterThan(1000);
    expect(result).toBeLessThan(1050);
  });
});

describe("walkingMinutesFor", () => {
  it("never goes below the minimum", () => {
    expect(walkingMinutesFor(10)).toBe(2);
  });

  it("rounds up", () => {
    expect(walkingMinutesFor(760)).toBe(11);
  });
});

describe("drivingMinutesFor", () => {
  it("rounds to the nearest minute with a floor", () => {
    expect(drivingMinutesFor(100)).toBe(2);
    expect(drivingMinutesFor(1250)).toBe(5);
  });
});

describe("formatDistance", () => {
  it("formats meters rounded to tens", () => {
    expect(formatDistance(384)).toBe("380 m");
  });

  it("formats kilometers with one decimal", () => {
    expect(formatDistance(1140)).toBe("1,1 km");
  });
});
