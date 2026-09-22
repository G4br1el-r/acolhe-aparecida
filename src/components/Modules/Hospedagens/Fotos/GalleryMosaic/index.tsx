"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import {
  buildPhotoUrl,
  type GalleryPhoto,
} from "@/constants/Modules/Hospedagens/Detalhe/gallery";
import { PhotoLightbox } from "../../Detalhe/PhotoLightbox";

const TILE_STAGGER_IN_SECONDS = 0.05;
const TILE_DURATION_IN_SECONDS = 0.55;
const TILE_OFFSET_IN_PX = 26;
const TILE_INITIAL_SCALE = 1.03;
const IMAGE_HOVER_SCALE = 1.06;
const IMAGE_HOVER_DURATION_IN_SECONDS = 0.6;
const WIDE_PHOTO_WIDTH_IN_PX = 1600;
const NARROW_PHOTO_WIDTH_IN_PX = 900;
const CLOSED_LIGHTBOX_INDEX = -1;
const MOSAIC_CYCLE_LENGTH = 5;
const WIDE_TILE_POSITION = 0;
const TALL_TILE_POSITION = 3;

type GalleryMosaicProps = {
  photos: GalleryPhoto[];
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: TILE_STAGGER_IN_SECONDS } },
};

export function GalleryMosaic({ photos }: GalleryMosaicProps) {
  const [openIndex, setOpenIndex] = useState(CLOSED_LIGHTBOX_INDEX);
  const shouldReduceMotion = useReducedMotion();

  const tileVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : TILE_OFFSET_IN_PX,
      scale: shouldReduceMotion ? 1 : TILE_INITIAL_SCALE,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : TILE_DURATION_IN_SECONDS,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="grid auto-rows-[11rem] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[13rem] md:grid-cols-4 md:gap-4 lg:auto-rows-[15rem]"
      >
        {photos.map((photo, index) => {
          const position = index % MOSAIC_CYCLE_LENGTH;
          const isWide = position === WIDE_TILE_POSITION;
          const isTall = position === TALL_TILE_POSITION;

          return (
            <motion.button
              key={photo.id}
              type="button"
              variants={tileVariants}
              onClick={() => setOpenIndex(index)}
              style={{ willChange: "transform, opacity" }}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 ${
                isWide ? "col-span-2 row-span-2" : ""
              } ${isTall ? "row-span-2" : ""}`}
            >
              <motion.div
                className="relative h-full w-full"
                whileHover={{
                  scale: shouldReduceMotion ? 1 : IMAGE_HOVER_SCALE,
                }}
                transition={{
                  duration: shouldReduceMotion
                    ? 0
                    : IMAGE_HOVER_DURATION_IN_SECONDS,
                  ease: "easeOut",
                }}
              >
                <Image
                  src={buildPhotoUrl(
                    photo.url,
                    isWide || isTall
                      ? WIDE_PHOTO_WIDTH_IN_PX
                      : NARROW_PHOTO_WIDTH_IN_PX,
                  )}
                  alt={photo.caption}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover"
                />
              </motion.div>

              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-blue-950/70 to-transparent p-4 pt-10 text-left text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                {photo.caption}
              </span>
            </motion.button>
          );
        })}
      </motion.div>

      <PhotoLightbox
        photos={photos}
        openIndex={openIndex}
        onClose={() => setOpenIndex(CLOSED_LIGHTBOX_INDEX)}
      />
    </>
  );
}
