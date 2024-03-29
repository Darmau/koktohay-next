import { Photos } from "@/function/Types";
import {
  ArrowSmallLeftIcon,
  ArrowSmallRightIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";
import ExifInfo from "./ExifInfo";
import useLightbox from "@/hooks/useLightbox";

export default function Carousel({ photos }: Photos) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { openLightbox, renderLightbox } = useLightbox();

  const slides = photos.map((photo) => {
    return {
      src: photo.original,
      width: photo.largeWidth,
      height: photo.largeHeight,
    };
  });

  return (
    <>
      {renderLightbox({ slides })}
      <div className="flex flex-col gap-4 col-span-2 px-4">
        <div className="w-full flex flex-col items-center">
          <div className="relative">
            <button
              type="button"
              className={`${
                activeIndex === 0 ? "hidden" : ""
              } absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-gray-900/20 backdrop-blur hover:bg-gray-900/60 rounded-full p-2`}
              onClick={() => setActiveIndex(activeIndex - 1)}
              disabled={activeIndex === 0}
            >
              <ArrowSmallLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <Image
              className="object-cover w-full aspect-4/3 sm:w-auto sm:h-96 lg:h-[32rem] rounded-lg"
              src={photos[activeIndex].original}
              height={photos[activeIndex].largeHeight}
              width={photos[activeIndex].largeWidth}
              alt={photos[activeIndex].alt}
              quality={75}
            />
            <button
              type="button"
              className={`${
                activeIndex === photos.length - 1 ? "hidden" : ""
              } absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-gray-900/20 backdrop-blur hover:bg-gray-900/60 rounded-full p-2`}
              onClick={() => {
                if (activeIndex !== photos.length - 1) {
                  setActiveIndex(activeIndex + 1);
                }
              }}
            >
              <ArrowSmallRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              data-umami-event="Fullscreen"
              type="button"
              className="absolute top-8 right-4 transform -translate-y-1/2 text-white bg-gray-900/20 backdrop-blur hover:bg-gray-900/60 rounded-full p-2"
              onClick={openLightbox}
            >
              <ArrowsPointingOutIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <ExifInfo url={photos[activeIndex].original} />
        </div>
        <div className="w-full h-40 flex gap overflow-x-scroll scrollbar-hidden">
          {photos.map((photo, index) => (
            <Image
              className={
                activeIndex === index
                  ? "border-4 border-blue-500 object-cover h-full w-auto rounded-lg"
                  : "cursor-pointer border-4 border-transparent object-cover h-full w-auto rounded-lg"
              }
              key={index}
              src={photo.smallSrc}
              height={photo.smallHeight}
              width={photo.smallWidth}
              alt={photo.alt}
              quality={75}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
