import { describe, expect, it } from "vitest";
import {
  mapPinListOffset,
  mapPinScrollDistance,
} from "./map-pin-scroll-distance";

describe("mapPinScrollDistance", () => {
  it("retorna o excedente da lista em relação ao palco", () => {
    expect(mapPinScrollDistance(2400, 800)).toBe(1600);
  });

  it("retorna zero quando a lista cabe inteira no palco", () => {
    expect(mapPinScrollDistance(600, 800)).toBe(0);
  });

  it("retorna zero quando lista e palco têm a mesma altura", () => {
    expect(mapPinScrollDistance(800, 800)).toBe(0);
  });
});

describe("mapPinListOffset", () => {
  it("não desloca a lista no início do percurso", () => {
    expect(mapPinListOffset(1600, 0)).toBe(-0);
  });

  it("desloca a lista pela distância total no fim do percurso", () => {
    expect(mapPinListOffset(1600, 1)).toBe(-1600);
  });

  it("desloca proporcionalmente no meio do percurso", () => {
    expect(mapPinListOffset(1600, 0.5)).toBe(-800);
  });

  it("limita o progresso acima de 1", () => {
    expect(mapPinListOffset(1600, 1.4)).toBe(-1600);
  });

  it("limita o progresso abaixo de 0", () => {
    expect(mapPinListOffset(1600, -0.3)).toBe(-0);
  });
});
