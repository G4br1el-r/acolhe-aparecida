const HASH_SEED = 5381;
const HASH_SHIFT = 5;
const UNIT_INTERVAL_DIVISOR = 4294967296;

export function hashString(value: string): number {
  let hash = HASH_SEED;

  for (let index = 0; index < value.length; index += 1) {
    hash = ((hash << HASH_SHIFT) + hash + value.charCodeAt(index)) >>> 0;
  }

  return hash;
}

export function hashToUnitInterval(value: string): number {
  return hashString(value) / UNIT_INTERVAL_DIVISOR;
}
