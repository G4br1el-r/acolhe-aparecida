import { describe, expect, it } from "vitest";
import { horizontalScrollDistance, trackFullWidth } from "./track-full-width";

function buildTrack(scrollWidth: number, paddingRight: string): HTMLElement {
  const track = document.createElement("div");

  Object.defineProperty(track, "scrollWidth", { value: scrollWidth });
  track.style.paddingRight = paddingRight;
  document.body.appendChild(track);

  return track;
}

describe("trackFullWidth", () => {
  it("soma o padding-right que o scrollWidth de um flex container omite", () => {
    expect(trackFullWidth(buildTrack(3572, "40px"))).toBe(3612);
  });

  it("devolve o scrollWidth quando não há padding-right", () => {
    expect(trackFullWidth(buildTrack(3572, "0px"))).toBe(3572);
  });
});

describe("horizontalScrollDistance", () => {
  it("retorna o excedente do trilho em relação à viewport", () => {
    expect(horizontalScrollDistance(3612, 1470)).toBe(2142);
  });

  it("retorna zero quando o trilho cabe na viewport", () => {
    expect(horizontalScrollDistance(1200, 1470)).toBe(0);
  });

  it("retorna zero quando trilho e viewport têm a mesma largura", () => {
    expect(horizontalScrollDistance(1470, 1470)).toBe(0);
  });
});
