"use client";

import {
  Heart,
  MapPin,
  Smile,
  Star,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

const AMENITIES = [
  { icon: Users, label: "Quartos amplos" },
  { icon: UtensilsCrossed, label: "Café da manhã" },
  { icon: Smile, label: "Ambiente familiar" },
];

const ENTRANCE_DURATION_IN_SECONDS = 0.6;
const ENTRANCE_OFFSET_IN_PX = 24;

export function HotelCard() {
  const [isFavorited, setIsFavorited] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: shouldReduceMotion ? 0 : ENTRANCE_OFFSET_IN_PX,
        scale: shouldReduceMotion ? 1 : 0.96,
      }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: shouldReduceMotion ? 0 : ENTRANCE_DURATION_IN_SECONDS,
        ease: "easeOut",
      }}
      style={{ willChange: "transform, opacity" }}
      className="w-64 cursor-pointer overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-blue-950/5 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <div className="relative aspect-4/3 w-full">
        <Image
          src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
          alt="Quarto confortável de hospedagem em Aparecida"
          fill
          sizes="256px"
          className="object-cover"
        />

        <button
          type="button"
          onClick={() => setIsFavorited((current) => !current)}
          aria-pressed={isFavorited}
          aria-label="Favoritar hospedagem"
          className="absolute right-2 top-2 z-10 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white/90 text-blue-950 shadow-sm transition-colors hover:bg-white"
        >
          <Heart
            className={
              isFavorited
                ? "h-3.5 w-3.5 fill-blue-900 text-blue-900"
                : "h-3.5 w-3.5"
            }
          />
        </button>
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-[11px] font-medium text-blue-950/60">
            <MapPin className="h-3 w-3" />
            350 m do Santuário
          </span>

          <span className="flex items-center gap-1 rounded-full bg-amber-50 px-1.5 py-0.5 text-[11px] font-semibold text-amber-700">
            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
            9,2
          </span>
        </div>

        <h3 className="mt-1.5 text-sm font-semibold text-blue-950">
          Conforto para toda a família
        </h3>

        <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
          {AMENITIES.map((amenity) => (
            <span
              key={amenity.label}
              className="flex items-center gap-1 text-[11px] text-blue-950/60"
            >
              <amenity.icon className="h-3 w-3 text-blue-900/70" />
              {amenity.label}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
