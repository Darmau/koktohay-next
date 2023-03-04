import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import CDN from "./CDN";

type Picture ={
  src: string;
  alt?: string;
}

type Pictures = Picture[];

export default function useLightbox(picture: Pictures) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = () => {
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const lightbox = (
    <div className="relative group">
      <Lightbox
        open={lightboxOpen}
        close={closeLightbox}
        slides={picture}
      />
      <Image
        className="rounded-lg bg-gray-50 object-cover mb-4 cursor-pointer"
        src={CDN(picture[0].src)}
        width={1280}
        height={720}
        alt={picture[0].alt ?? "image"}
        onClick={openLightbox}
      />
    </div>
  );

  return [lightbox, openLightbox, closeLightbox];
}
