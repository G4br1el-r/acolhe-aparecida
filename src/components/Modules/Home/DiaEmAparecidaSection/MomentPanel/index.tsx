"use client";

import Image from "next/image";
import type { DayMoment } from "@/constants/Modules/Home/day-moments";

type MomentPanelProps = {
  moment: DayMoment;
  isPriority?: boolean;
};

export function MomentPanel({ moment, isPriority = false }: MomentPanelProps) {
  return (
    <article className="relative h-full w-full overflow-hidden rounded-3xl bg-blue-950">
      <Image
        src={moment.image}
        alt={moment.title}
        fill
        priority={isPriority}
        sizes="(min-width: 1024px) 58vw, 88vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-t from-blue-950/90 via-blue-950/35 to-blue-950/10" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 md:p-10">
        <span className="text-sm font-semibold text-white/70 md:text-base">
          {moment.time}
        </span>

        <h3 className="max-w-xl text-2xl font-bold leading-tight text-white md:text-4xl">
          {moment.title}
        </h3>

        <p className="max-w-lg text-sm text-white/80 md:text-base">
          {moment.description}
        </p>

        <p className="mt-2 w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm md:text-sm">
          {moment.practicalNote}
        </p>
      </div>
    </article>
  );
}
