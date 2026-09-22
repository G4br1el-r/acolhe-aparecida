"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Accommodation } from "@/constants/Modules/Home/accommodations";

const REST_ROTATIONS_IN_DEG = [-6, 0, 5];
const REST_OFFSETS_X_IN_PX = [-10, 0, 10];
const HOVER_ROTATIONS_IN_DEG = [-16, -2, 14];
const HOVER_OFFSETS_X_IN_PX = [-38, 0, 38];
const HOVER_OFFSETS_Y_IN_PX = [4, -10, 2];

const DEAL_DURATION_IN_SECONDS = 0.6;
const DEAL_STAGGER_IN_SECONDS = 0.1;
const SPRING_STIFFNESS = 220;
const SPRING_DAMPING = 15;

const FLOAT_DURATION_IN_SECONDS = 3.2;
const FLOAT_AMPLITUDE_IN_DEG = 1.6;
const FLOAT_STAGGER_IN_SECONDS = 0.25;

const TAP_SCALE = 0.96;

type ViewAllCardProps = {
  previewAccommodations: Accommodation[];
  href: string;
};

export function ViewAllCard({ previewAccommodations, href }: ViewAllCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [hasDealt, setHasDealt] = useState(false);
  const photos = previewAccommodations.slice(0, REST_ROTATIONS_IN_DEG.length);

  return (
    <Link
      href={href}
      className="group flex h-full w-full cursor-pointer flex-col items-center justify-center gap-6 overflow-visible rounded-2xl bg-blue-50 p-6 text-center ring-1 ring-blue-950/5 transition-colors hover:bg-blue-100"
    >
      <motion.div
        whileTap={{ scale: shouldReduceMotion ? 1 : TAP_SCALE }}
        onViewportEnter={() => setHasDealt(true)}
        viewport={{ once: true, amount: 0.6 }}
        className="relative h-28 w-40"
      >
        {photos.map((accommodation, index) => {
          const restRotation = shouldReduceMotion
            ? 0
            : REST_ROTATIONS_IN_DEG[index];
          const restX = shouldReduceMotion ? 0 : REST_OFFSETS_X_IN_PX[index];

          const cardVariants: Variants = {
            hidden: { x: "-50%", y: "10%", rotate: 0, scale: 0.6, opacity: 0 },
            resting: {
              x: `calc(-50% + ${restX}px)`,
              y: "-50%",
              rotate: shouldReduceMotion
                ? 0
                : [
                    restRotation,
                    restRotation - FLOAT_AMPLITUDE_IN_DEG,
                    restRotation + FLOAT_AMPLITUDE_IN_DEG,
                    restRotation,
                  ],
              scale: 1,
              opacity: 1,
              transition: {
                x: {
                  type: "spring",
                  stiffness: SPRING_STIFFNESS,
                  damping: SPRING_DAMPING,
                  delay: shouldReduceMotion
                    ? 0
                    : index * DEAL_STAGGER_IN_SECONDS,
                },
                y: {
                  type: "spring",
                  stiffness: SPRING_STIFFNESS,
                  damping: SPRING_DAMPING,
                  delay: shouldReduceMotion
                    ? 0
                    : index * DEAL_STAGGER_IN_SECONDS,
                },
                scale: {
                  type: "spring",
                  stiffness: SPRING_STIFFNESS,
                  damping: SPRING_DAMPING,
                  delay: shouldReduceMotion
                    ? 0
                    : index * DEAL_STAGGER_IN_SECONDS,
                },
                opacity: {
                  duration: shouldReduceMotion
                    ? 0
                    : DEAL_DURATION_IN_SECONDS * 0.5,
                  delay: shouldReduceMotion
                    ? 0
                    : index * DEAL_STAGGER_IN_SECONDS,
                },
                rotate: shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      duration: FLOAT_DURATION_IN_SECONDS,
                      delay:
                        DEAL_DURATION_IN_SECONDS +
                        index * FLOAT_STAGGER_IN_SECONDS,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    },
              },
            },
          };

          return (
            <motion.div
              key={accommodation.slug}
              className="absolute inset-0 h-24 w-32 origin-bottom overflow-hidden rounded-xl bg-white shadow-md ring-4 ring-white"
              style={{
                left: "50%",
                top: "50%",
                zIndex: index === 1 ? 2 : 1,
              }}
              variants={cardVariants}
              initial="hidden"
              animate={hasDealt ? "resting" : "hidden"}
              whileHover={{
                x: `calc(-50% + ${shouldReduceMotion ? 0 : HOVER_OFFSETS_X_IN_PX[index]}px)`,
                y: `calc(-50% + ${shouldReduceMotion ? 0 : HOVER_OFFSETS_Y_IN_PX[index]}px)`,
                rotate: shouldReduceMotion ? 0 : HOVER_ROTATIONS_IN_DEG[index],
                scale: 1.08,
                transition: { duration: 0.35, ease: "easeOut" },
              }}
            >
              <Image
                src={accommodation.image}
                alt=""
                fill
                sizes="128px"
                className="object-cover"
              />
            </motion.div>
          );
        })}
      </motion.div>

      <div className="flex flex-col items-center gap-1">
        <span className="text-base font-semibold text-blue-950">Ver tudo</span>
        <span className="flex items-center gap-1 text-sm font-medium text-blue-900 transition-transform group-hover:translate-x-1">
          Todas as hospedagens
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
