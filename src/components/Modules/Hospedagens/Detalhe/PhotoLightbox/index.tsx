"use client";

import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import {
  buildPhotoUrl,
  type GalleryPhoto,
} from "@/constants/Modules/Hospedagens/Detalhe/gallery";

const LIGHTBOX_PHOTO_WIDTH_IN_PX = 2000;
const THUMBNAIL_WIDTH_IN_PX = 140;
const THUMBNAIL_HEIGHT_IN_PX = 94;
const BACKDROP_OPACITY = 0.96;
const FADE_DURATION_IN_MS = 260;
const SWIPE_DURATION_IN_MS = 420;
const BACKDROP_COLOR = "6, 16, 43";
const CONTROL_COLOR = "#ffffff";

type PhotoLightboxProps = {
  photos: GalleryPhoto[];
  openIndex: number;
  onClose: () => void;
};

export function PhotoLightbox({
  photos,
  openIndex,
  onClose,
}: PhotoLightboxProps) {
  return (
    <Lightbox
      open={openIndex >= 0}
      index={Math.max(openIndex, 0)}
      close={onClose}
      plugins={[Captions, Counter, Thumbnails, Zoom]}
      slides={photos.map((photo) => ({
        src: buildPhotoUrl(photo.url, LIGHTBOX_PHOTO_WIDTH_IN_PX),
        alt: photo.caption,
        description: photo.caption,
      }))}
      animation={{ fade: FADE_DURATION_IN_MS, swipe: SWIPE_DURATION_IN_MS }}
      carousel={{ finite: false, padding: 0 }}
      thumbnails={{
        width: THUMBNAIL_WIDTH_IN_PX,
        height: THUMBNAIL_HEIGHT_IN_PX,
        border: 0,
        borderRadius: 10,
        padding: 0,
        gap: 10,
      }}
      captions={{ showToggle: false, descriptionTextAlign: "center" }}
      styles={{
        root: { "--yarl__counter_color": CONTROL_COLOR },
        container: {
          backgroundColor: `rgba(${BACKDROP_COLOR}, ${BACKDROP_OPACITY})`,
        },
        button: { color: CONTROL_COLOR, filter: "none" },
        icon: { color: CONTROL_COLOR },
        thumbnailsContainer: {
          backgroundColor: `rgba(${BACKDROP_COLOR}, ${BACKDROP_OPACITY})`,
        },
        thumbnail: {
          backgroundColor: "transparent",
          border: "none",
        },
        captionsDescriptionContainer: {
          background: `rgba(${BACKDROP_COLOR}, ${BACKDROP_OPACITY})`,
        },
        captionsDescription: {
          color: CONTROL_COLOR,
          background: "transparent",
        },
      }}
    />
  );
}
