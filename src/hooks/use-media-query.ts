"use client";

import { useSyncExternalStore } from "react";

export const DESKTOP_MEDIA_QUERY = "(min-width: 768px)";
export const LARGE_DESKTOP_MEDIA_QUERY = "(min-width: 1024px)";

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener("change", onChange);
      return () => mediaQueryList.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
