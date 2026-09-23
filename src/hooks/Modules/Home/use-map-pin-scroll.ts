"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";
import {
  mapPinListOffset,
  mapPinScrollDistance,
} from "@/lib/Modules/Home/map-pin-scroll-distance";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const DESKTOP_MIN_WIDTH_IN_PX = 1024;
const STAGE_TOP_OFFSET_IN_PX = 112;
const BOTTOM_BREATHING_ROOM_IN_PX = 64;
const NO_SCROLL_DISTANCE_IN_PX = 0;

type UseMapPinScrollParams = {
  sectionRef: RefObject<HTMLElement | null>;
  stageRef: RefObject<HTMLDivElement | null>;
  listRef: RefObject<HTMLDivElement | null>;
  dependencies: unknown[];
};

export function useMapPinScroll({
  sectionRef,
  stageRef,
  listRef,
  dependencies,
}: UseMapPinScrollParams) {
  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add(
        `(min-width: ${DESKTOP_MIN_WIDTH_IN_PX}px) and (prefers-reduced-motion: no-preference)`,
        () => {
          const stage = stageRef.current;
          const list = listRef.current;

          if (!stage || !list) {
            return;
          }

          function getScrollDistance() {
            const currentStage = stageRef.current;
            const currentList = listRef.current;

            if (!currentStage || !currentList) {
              return NO_SCROLL_DISTANCE_IN_PX;
            }

            return mapPinScrollDistance(
              currentList.scrollHeight,
              currentStage.clientHeight,
            );
          }

          ScrollTrigger.create({
            trigger: stage,
            start: `top ${STAGE_TOP_OFFSET_IN_PX}px`,
            end: () => `+=${getScrollDistance() + BOTTOM_BREATHING_ROOM_IN_PX}`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            scrub: true,
            onUpdate: (self) => {
              gsap.set(list, {
                y: mapPinListOffset(getScrollDistance(), self.progress),
              });
            },
          });

          const observer = new ResizeObserver(() => ScrollTrigger.refresh());
          observer.observe(list);

          return () => {
            observer.disconnect();
            gsap.set(list, { y: NO_SCROLL_DISTANCE_IN_PX });
          };
        },
      );

      return () => media.revert();
    },
    { scope: sectionRef, dependencies, revertOnUpdate: true },
  );
}
