"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Accommodation } from "@/@types/Modules/Hospedagens/accommodation";
import type { Reservation } from "@/@types/Modules/Reserva/reservation";
import { HERO_PHOTO_WIDTH } from "@/constants/Modules/Viagem/trip";
import {
  formatLongDate,
  formatShortDate,
} from "@/lib/Modules/Hospedagens/format-date";
import { buildCountdown } from "@/lib/Modules/Viagem/countdown";
import { buildPhotoUrl } from "@/mocks/Modules/Hospedagens/photos";

type NextTripHeroProps = {
  reservation: Reservation;
  accommodation: Accommodation;
};

export function NextTripHero({
  reservation,
  accommodation,
}: NextTripHeroProps) {
  const countdown = buildCountdown(reservation);
  const href = `/minha-viagem/${reservation.id}`;

  return (
    <section
      aria-labelledby="proxima-viagem"
      className="relative isolate overflow-hidden rounded-3xl bg-blue-950 text-white shadow-lg ring-1 ring-blue-950/10"
    >
      <Image
        src={buildPhotoUrl(accommodation.image.split("?")[0], HERO_PHOTO_WIDTH)}
        alt=""
        fill
        priority
        sizes="(min-width: 1024px) 64rem, 100vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-blue-950 via-blue-950/70 to-blue-950/15"
      />

      <div className="relative flex min-h-80 flex-col justify-end gap-6 p-6 sm:p-8 md:min-h-96 md:flex-row md:items-end md:justify-between md:p-10">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-white/70">
            Sua próxima viagem
          </p>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {countdown.label}
          </p>
          <h2
            id="proxima-viagem"
            className="mt-4 text-lg font-semibold sm:text-xl"
          >
            {accommodation.name}
          </h2>
          <p className="mt-1 text-sm text-white/80">
            <time dateTime={reservation.checkIn}>
              {formatLongDate(reservation.checkIn)}
            </time>{" "}
            até{" "}
            <time dateTime={reservation.checkOut}>
              {formatShortDate(reservation.checkOut)}
            </time>
            {" · "}
            {accommodation.distanceFromSanctuary}
          </p>
          <p className="mt-3 text-xs text-white/60">
            Código da reserva{" "}
            <span className="font-mono text-sm font-semibold text-white">
              {reservation.code}
            </span>
          </p>
        </div>

        <Link
          href={href}
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-blue-950 shadow-md transition-colors hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-950"
        >
          Ver detalhes
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
