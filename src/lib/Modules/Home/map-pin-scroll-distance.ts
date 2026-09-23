const NO_SCROLL_DISTANCE_IN_PX = 0;

export function mapPinScrollDistance(
  listHeightInPx: number,
  stageHeightInPx: number,
): number {
  return Math.max(NO_SCROLL_DISTANCE_IN_PX, listHeightInPx - stageHeightInPx);
}

export function mapPinListOffset(
  scrollDistanceInPx: number,
  progress: number,
): number {
  const clampedProgress = Math.min(1, Math.max(0, progress));

  return -scrollDistanceInPx * clampedProgress;
}
