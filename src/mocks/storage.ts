const STORAGE_PREFIX = "acolher-aparecida";
const STORAGE_VERSION = "v1";

export type MockCollectionKey =
  | "users"
  | "reservations"
  | "reviews"
  | "notifications"
  | "coupons";

function buildStorageKey(key: MockCollectionKey): string {
  return `${STORAGE_PREFIX}:${STORAGE_VERSION}:${key}`;
}

function isStorageAvailable(): boolean {
  try {
    return typeof window !== "undefined" && Boolean(window.localStorage);
  } catch {
    return false;
  }
}

export function readCollection<Item>(
  key: MockCollectionKey,
  seed: () => Item[],
): Item[] {
  if (!isStorageAvailable()) return seed();

  const storageKey = buildStorageKey(key);

  try {
    const raw = window.localStorage.getItem(storageKey);

    if (raw === null) {
      const seeded = seed();
      window.localStorage.setItem(storageKey, JSON.stringify(seeded));
      return seeded;
    }

    const parsed: unknown = JSON.parse(raw);

    return Array.isArray(parsed) ? (parsed as Item[]) : seed();
  } catch {
    return seed();
  }
}

export function writeCollection<Item>(
  key: MockCollectionKey,
  items: Item[],
): void {
  if (!isStorageAvailable()) return;

  try {
    window.localStorage.setItem(buildStorageKey(key), JSON.stringify(items));
  } catch {}
}

export function resetMockCollections(): void {
  if (!isStorageAvailable()) return;

  const keys: MockCollectionKey[] = [
    "users",
    "reservations",
    "reviews",
    "notifications",
    "coupons",
  ];

  for (const key of keys) {
    window.localStorage.removeItem(buildStorageKey(key));
  }
}

export function createMockId(prefix: string): string {
  const randomPart = Math.random().toString(36).slice(2, 8);
  const timePart = Date.now().toString(36);

  return `${prefix}-${timePart}${randomPart}`;
}
