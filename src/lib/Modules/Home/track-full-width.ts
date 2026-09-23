const NO_WIDTH_IN_PX = 0;

export function trackFullWidth(track: HTMLElement): number {
  const paddingRight = Number.parseFloat(
    getComputedStyle(track).paddingRight || "0",
  );

  if (Number.isNaN(paddingRight)) {
    return track.scrollWidth;
  }

  return track.scrollWidth + paddingRight;
}

export function horizontalScrollDistance(
  trackWidthInPx: number,
  viewportWidthInPx: number,
): number {
  return Math.max(NO_WIDTH_IN_PX, trackWidthInPx - viewportWidthInPx);
}
