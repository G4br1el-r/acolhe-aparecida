"use client";

import { Accessibility, MapPin, Star } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type { Accommodation } from "@/constants/Modules/Home/accommodations";
import {
  AMENITIES,
  HIGHLIGHT_BADGE_ICON,
  ROOM_CAPACITY_ICON,
  ROOM_COUNT_ICON,
} from "@/constants/Modules/Home/amenities";
import { FavoriteButton } from "./FavoriteButton";

const HOVER_SCALE = 1.05;
const TAP_SCALE = 0.97;
const TAP_SPRING_STIFFNESS = 400;
const TAP_SPRING_DAMPING = 28;
const IMAGE_HOVER_SCALE = 1.08;
const IMAGE_HOVER_DURATION_IN_SECONDS = 0.5;

type HotelCardProps = {
  accommodation: Accommodation;
  variant?: "sm" | "lg";
};

export function HotelCard({ accommodation, variant = "lg" }: HotelCardProps) {
  const shouldReduceMotion = useReducedMotion();

  const isCompact = variant === "sm";
  const visibleAmenities = accommodation.amenities.slice(0, isCompact ? 3 : 2);

  return (
    <motion.div
      whileHover={{ scale: shouldReduceMotion ? 1 : HOVER_SCALE }}
      whileTap={{ scale: shouldReduceMotion ? 1 : TAP_SCALE }}
      transition={{
        type: "spring",
        stiffness: TAP_SPRING_STIFFNESS,
        damping: TAP_SPRING_DAMPING,
      }}
      style={{ willChange: "transform" }}
      className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-blue-950/5 transition-shadow duration-300 hover:shadow-2xl focus-within:ring-2 focus-within:ring-blue-900 ${
        isCompact ? "w-64" : "h-full w-full"
      }`}
    >
      <Link
        href={`/hospedagens/${accommodation.slug}`}
        aria-label={`Ver ${accommodation.name}`}
        className="absolute inset-0 z-20 rounded-2xl focus:outline-none"
      />
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <motion.div
          className="h-full w-full"
          whileHover={{ scale: shouldReduceMotion ? 1 : IMAGE_HOVER_SCALE }}
          transition={{
            duration: shouldReduceMotion ? 0 : IMAGE_HOVER_DURATION_IN_SECONDS,
            ease: "easeOut",
          }}
        >
          <Image
            src={accommodation.image}
            alt={`Quarto de hospedagem em ${accommodation.name}`}
            fill
            sizes={isCompact ? "256px" : "(min-width: 1024px) 25vw, 50vw"}
            className="object-cover"
          />
        </motion.div>

        {!isCompact && accommodation.highlightBadge && (
          <span className="absolute left-2 top-2 z-10 flex items-center gap-1 rounded-full bg-blue-950 px-2.5 py-1 text-[11px] font-semibold text-white">
            <HIGHLIGHT_BADGE_ICON className="h-3 w-3" />
            {accommodation.highlightBadge}
          </span>
        )}

        <div className="absolute right-2 top-2 z-30">
          <FavoriteButton
            isCompact={isCompact}
            accommodationName={accommodation.name}
          />
        </div>
      </div>

      <div className={`flex flex-1 flex-col ${isCompact ? "p-3" : "p-4"}`}>
        <div className="flex items-center justify-between">
          <span
            className={`flex items-center gap-1 font-medium text-blue-950/60 ${
              isCompact ? "text-[11px]" : "text-xs"
            }`}
          >
            <MapPin className={isCompact ? "h-3 w-3" : "h-3.5 w-3.5"} />
            {accommodation.distanceFromSanctuary}
          </span>

          <span
            className={`flex items-center gap-1 rounded-full bg-amber-50 font-semibold text-amber-700 ${
              isCompact ? "px-1.5 py-0.5 text-[11px]" : "px-2 py-0.5 text-xs"
            }`}
          >
            <Star
              className={
                isCompact
                  ? "h-3 w-3 fill-amber-500 text-amber-500"
                  : "h-3.5 w-3.5 fill-amber-500 text-amber-500"
              }
            />
            {accommodation.rating.toFixed(1).replace(".", ",")}
            {!isCompact && (
              <span className="font-normal text-amber-700/70">
                ({accommodation.reviewCount})
              </span>
            )}
          </span>
        </div>

        <h3
          className={`mt-1.5 line-clamp-2 font-semibold text-blue-950 ${
            isCompact ? "text-sm" : "min-h-10 text-base"
          }`}
        >
          {accommodation.name}
        </h3>

        <div
          className={`mt-2 flex flex-wrap gap-x-2 gap-y-1 ${isCompact ? "" : "min-h-4"}`}
        >
          {visibleAmenities.map((amenityKey) => {
            const amenity = AMENITIES[amenityKey];
            return (
              <span
                key={amenityKey}
                className="flex items-center gap-1 text-[11px] text-blue-950/60"
              >
                <amenity.icon className="h-3 w-3 text-blue-900/70" />
                {amenity.label}
              </span>
            );
          })}
        </div>

        {!isCompact && (
          <>
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-blue-950/10 pt-3 text-[11px] text-blue-950/60">
              <span className="flex items-center gap-1">
                <ROOM_CAPACITY_ICON className="h-3.5 w-3.5 text-blue-900/70" />
                Até {accommodation.maxGuests} pessoas
              </span>
              <span className="flex items-center gap-1">
                <ROOM_COUNT_ICON className="h-3.5 w-3.5 text-blue-900/70" />
                {accommodation.roomCount}{" "}
                {accommodation.roomCount === 1 ? "quarto" : "quartos"} (
                {accommodation.bedCount}{" "}
                {accommodation.bedCount === 1 ? "cama" : "camas"})
              </span>
              {accommodation.isAccessible && (
                <span className="flex items-center gap-1">
                  <Accessibility className="h-3.5 w-3.5 text-blue-900/70" />
                  Acessível
                </span>
              )}
            </div>

            <div className="mt-auto flex items-baseline justify-between border-t border-blue-950/10 pt-3">
              <span className="text-base font-bold text-blue-950">
                R$ {accommodation.pricePerNight}
                <span className="text-xs font-normal text-blue-950/60">
                  {" "}
                  / noite
                </span>
              </span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                ~R${" "}
                {Math.round(
                  accommodation.pricePerNight / accommodation.maxGuests,
                )}
                /pessoa
              </span>
            </div>
          </>
        )}

        {isCompact && (
          <span className="mt-2 block text-xs font-semibold text-blue-950">
            R$ {accommodation.pricePerNight}
            <span className="font-normal text-blue-950/60"> / noite</span>
          </span>
        )}
      </div>
    </motion.div>
  );
}
