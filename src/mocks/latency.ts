export const DEFAULT_LATENCY_IN_MS = 450;
export const FAST_LATENCY_IN_MS = 200;
export const SLOW_LATENCY_IN_MS = 900;
export const PAYMENT_LATENCY_IN_MS = 1800;

const IS_TEST_ENVIRONMENT = process.env.NODE_ENV === "test";
const IS_SERVER = typeof window === "undefined";
const NO_LATENCY_IN_MS = 0;

export function delay(durationInMs = DEFAULT_LATENCY_IN_MS): Promise<void> {
  const effectiveDuration =
    IS_TEST_ENVIRONMENT || IS_SERVER ? NO_LATENCY_IN_MS : durationInMs;

  return new Promise((resolve) => setTimeout(resolve, effectiveDuration));
}
