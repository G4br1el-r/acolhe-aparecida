"use client";

import { Grip } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  buildPhotoUrl,
  type GalleryPhoto,
} from "@/constants/Modules/Hospedagens/Detalhe/gallery";

const MotionLink = motion.create(Link);

const MOSAIC_STAGGER_IN_SECONDS = 0.09;
const MOSAIC_INITIAL_DELAY_IN_SECONDS = 0.12;
const MOSAIC_DURATION_IN_SECONDS = 0.6;
const MOSAIC_OFFSET_IN_PX = 22;
const MOSAIC_INITIAL_SCALE = 1.04;
const IMAGE_HOVER_SCALE = 1.05;
const IMAGE_HOVER_DURATION_IN_SECONDS = 0.6;
const MAIN_PHOTO_WIDTH_IN_PX = 1400;
const SIDE_PHOTO_WIDTH_IN_PX = 800;
const SIDE_PHOTO_COUNT = 4;

type PhotoMosaicProps = {
  photos: GalleryPhoto[];
  galleryHref: string;
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: MOSAIC_INITIAL_DELAY_IN_SECONDS,
      staggerChildren: MOSAIC_STAGGER_IN_SECONDS,
    },
  },
};

export function PhotoMosaic({ photos, galleryHref }: PhotoMosaicProps) {
  const shouldReduceMotion = useReducedMotion();

  const tileVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : MOSAIC_OFFSET_IN_PX,
      scale: shouldReduceMotion ? 1 : MOSAIC_INITIAL_SCALE,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : MOSAIC_DURATION_IN_SECONDS,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const mainPhoto = photos[0];
  const sidePhotos = photos.slice(1, 1 + SIDE_PHOTO_COUNT);

  if (!mainPhoto) {
    return null;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative grid grid-cols-4 grid-rows-2 gap-2 rounded-3xl md:h-[30rem]"
    >
      <MotionLink
        href={galleryHref}
        variants={tileVariants}
        style={{ willChange: "transform, opacity" }}
        className="group relative col-span-4 row-span-1 h-56 cursor-pointer overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 sm:h-72 md:col-span-2 md:row-span-2 md:h-auto md:rounded-l-3xl md:rounded-r-none"
      >
        <motion.div
          className="relative h-full w-full"
          whileHover={{ scale: shouldReduceMotion ? 1 : IMAGE_HOVER_SCALE }}
          transition={{
            duration: shouldReduceMotion ? 0 : IMAGE_HOVER_DURATION_IN_SECONDS,
            ease: "easeOut",
          }}
        >
          <Image
            src={buildPhotoUrl(mainPhoto.url, MAIN_PHOTO_WIDTH_IN_PX)}
            alt={mainPhoto.caption}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </motion.div>
        <span className="pointer-events-none absolute inset-0 bg-blue-950/0 transition-colors duration-300 group-hover:bg-blue-950/10" />
      </MotionLink>

      {sidePhotos.map((photo, index) => {
        const isTopRight = index === 1;
        const isBottomRight = index === SIDE_PHOTO_COUNT - 1;

        return (
          <MotionLink
            key={photo.id}
            href={galleryHref}
            variants={tileVariants}
            style={{ willChange: "transform, opacity" }}
            className={`group relative col-span-2 row-span-1 h-28 cursor-pointer overflow-hidden rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 sm:h-36 md:col-span-1 md:h-auto md:rounded-none ${
              isTopRight ? "md:rounded-tr-3xl" : ""
            } ${isBottomRight ? "md:rounded-br-3xl" : ""}`}
          >
            <motion.div
              className="relative h-full w-full"
              whileHover={{ scale: shouldReduceMotion ? 1 : IMAGE_HOVER_SCALE }}
              transition={{
                duration: shouldReduceMotion
                  ? 0
                  : IMAGE_HOVER_DURATION_IN_SECONDS,
                ease: "easeOut",
              }}
            >
              <Image
                src={buildPhotoUrl(photo.url, SIDE_PHOTO_WIDTH_IN_PX)}
                alt={photo.caption}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover"
              />
            </motion.div>
            <span className="pointer-events-none absolute inset-0 bg-blue-950/0 transition-colors duration-300 group-hover:bg-blue-950/10" />
          </MotionLink>
        );
      })}

      <motion.div
        variants={tileVariants}
        className="pointer-events-none absolute bottom-4 right-4 hidden md:block"
      >
        <Link
          href={galleryHref}
          className="pointer-events-auto flex cursor-pointer items-center gap-2 rounded-xl bg-white/95 px-4 py-2.5 text-sm font-semibold text-blue-950 shadow-lg ring-1 ring-blue-950/10 backdrop-blur-sm transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
        >
          <Grip className="h-4 w-4" />
          Mostrar todas as fotos
        </Link>
      </motion.div>
    </motion.div>
  );
}
