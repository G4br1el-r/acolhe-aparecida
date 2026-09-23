import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import {
  buildCompareRows,
  findBestIndexes,
  maxGuestsPerRoom,
} from "./compare-rows";

function accommodation(
  overrides: Partial<Accommodation> & Pick<Accommodation, "slug">,
): Accommodation {
  return {
    name: overrides.slug,
    type: "hotel",
    tagline: "",
    description: [],
    image: "",
    photoIds: [],
    address: { street: "", neighborhood: "" },
    coordinates: { lat: 0, lng: 0 },
    mapPosition: { x: 0, y: 0 },
    distances: {
      santuarioInMeters: 500,
      basilicaVelhaInMeters: 0,
      passarelaDaFeInMeters: 0,
      rodoviariaInMeters: 0,
    },
    distanceFromSanctuary: "500 m",
    walkingMinutes: 7,
    drivingMinutes: 2,
    pricePerNight: 200,
    rating: 4.5,
    reviewCount: 10,
    ratingBreakdown: {},
    amenities: [],
    meals: [],
    parking: [],
    structure: [],
    accessibility: [],
    booking: [],
    badges: [],
    maxGuests: 4,
    totalCapacity: 20,
    roomCount: 5,
    bedCount: 8,
    isAccessible: false,
    suitableFor: [],
    rooms: [],
    checkInTime: "14:00",
    checkOutTime: "12:00",
    houseRules: [],
    cancellationPolicy: { freeUntilDaysBefore: 7, partialRefundPercent: 50 },
    partner: {
      name: "",
      partnerSince: 2020,
      responseRatePercent: 95,
      responseTimeLabel: "",
      isVerified: true,
      about: "",
    },
    bookingsLastMonth: 0,
    ...overrides,
  };
}

function room(id: string, maxGuests: number): Accommodation["rooms"][number] {
  return {
    id,
    name: id,
    beds: [],
    maxGuests,
    sizeInSquareMeters: 20,
    pricePerNight: 200,
    totalUnits: 2,
    isAccessible: false,
    features: [],
    photoIds: [],
  };
}

describe("findBestIndexes", () => {
  it("returns the index of the smallest value", () => {
    expect(findBestIndexes([300, 100, 200], "min")).toEqual([1]);
  });

  it("returns every index tied for the largest value", () => {
    expect(findBestIndexes([5, 5, 2], "max")).toEqual([0, 1]);
  });

  it("returns nothing when all values are equal", () => {
    expect(findBestIndexes([4, 4], "max")).toEqual([]);
  });

  it("ignores missing values and needs at least two to compare", () => {
    expect(findBestIndexes([null, 10], "min")).toEqual([]);
    expect(findBestIndexes([null, 10, 4], "min")).toEqual([2]);
  });
});

describe("maxGuestsPerRoom", () => {
  it("returns the largest room capacity", () => {
    const item = accommodation({
      slug: "a",
      rooms: [room("r1", 2), room("r2", 6)],
    });

    expect(maxGuestsPerRoom(item)).toBe(6);
  });
});

describe("buildCompareRows", () => {
  const near = accommodation({
    slug: "perto",
    distances: {
      santuarioInMeters: 150,
      basilicaVelhaInMeters: 0,
      passarelaDaFeInMeters: 0,
      rodoviariaInMeters: 0,
    },
    walkingMinutes: 2,
    meals: ["cafe"],
    parking: ["carro", "onibus"],
    structure: ["elevador", "piscina"],
    booking: ["cancelamento-gratuito", "parcelamento"],
    rooms: [room("r1", 4)],
    badges: ["proximo-ao-santuario"],
  });
  const far = accommodation({
    slug: "longe",
    distances: {
      santuarioInMeters: 1200,
      basilicaVelhaInMeters: 0,
      passarelaDaFeInMeters: 0,
      rodoviariaInMeters: 0,
    },
    walkingMinutes: 16,
    rooms: [room("r1", 6)],
  });

  const rows = buildCompareRows([near, far]);
  const rowById = Object.fromEntries(rows.map((row) => [row.id, row]));

  it("marks the shortest distance as best", () => {
    expect(rowById.distancia?.cells[0]?.isBest).toBe(true);
    expect(rowById.distancia?.cells[1]?.isBest).toBe(false);
    expect(rowById.distancia?.cells[0]?.text).toBe("150 m · 2 min a pé");
  });

  it("marks the largest room capacity as best", () => {
    expect(rowById.capacidade?.cells[1]?.isBest).toBe(true);
    expect(rowById.capacidade?.cells[1]?.text).toBe("Até 6 pessoas");
  });

  it("describes missing features and highlights the one that has them", () => {
    expect(rowById.estacionamento?.cells[1]?.text).toBe("Sem estacionamento");
    expect(rowById.estacionamento?.cells[1]?.isMissing).toBe(true);
    expect(rowById.estacionamento?.cells[0]?.isBest).toBe(true);
    expect(rowById.elevador?.cells[0]?.text).toBe("Sim");
    expect(rowById.elevador?.cells[0]?.isBest).toBe(true);
  });

  it("shows the free cancellation window", () => {
    expect(rowById.cancelamento?.cells[0]?.text).toBe("Até 7 dias antes");
    expect(rowById.cancelamento?.cells[1]?.text).toBe("Não");
  });

  it("never highlights rows without a comparable value", () => {
    expect(rowById.tipo?.cells.every((cell) => !cell.isBest)).toBe(true);
    expect(rowById.selos?.cells.every((cell) => !cell.isBest)).toBe(true);
  });
});
