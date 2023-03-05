import aperture from "@/public/img/aperture.svg";
import focalLength from "@/public/img/focal-length.svg";
import iso from "@/public/img/iso.svg";
import shutterSpeed from "@/public/img/shutter.svg";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import exifr from "exifr";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

interface Props {
  url: string;
}

interface ExifData {
  Maker?: string;
  Model?: string;
  ExposureTime?: string;
  FNumber?: string;
  iso?: number;
  FocalLength?: string;
  LensModel?: string;
  latitude?: number;
  longitude?: number;
}

const ExifInfo: FC<Props> = ({ url }: Props) => {
  const [exif, setExif] = useState<ExifData>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadExif() {
      try {
        const exifRes = await fetch(
          `https://exif.darmau.design/exif?url=${url}`
        );
        const exifData = await exifRes.json();
        setExif(exifData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }

    loadExif();
  }, [url]);

  if (isLoading) {
    return (
      <div className="w-full h-24 flex items-center justify-center">
        <ArrowPathIcon className="h-5 w-5 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <>
      {Object.entries(exif).length > 0 ? (
        <div className="flex justify-around gap-6 pt-4">
          <div className="flex flex-col items-center gap-1">
            <header className="text-xs text-gray-500">相机</header>
            <p className="text-xs text-gray-700">
              {exif.Maker} {exif.Model}
            </p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <header className="text-xs text-gray-500">镜头</header>
            <p className="text-xs text-gray-700">{exif.LensModel}</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <header className="text-xs text-gray-500">参数</header>
            <div className="grid gap-4 grid-cols-2 items-center justify-between md:grid-cols-4">
              <div className="flex items-center justify-center gap-1 text-xs text-gray-700">
                <Image
                  src={focalLength}
                  width={20}
                  height={20}
                  alt="镜头焦距"
                  className="opacity-70"
                />
                {exif.FocalLength}mm
              </div>
              <div className="flex items-center justify-center gap-1 text-xs text-gray-700">
                <Image
                  src={aperture}
                  width={20}
                  height={20}
                  alt="光圈"
                  className="opacity-70"
                />
                ƒ/{exif.FNumber}
              </div>
              <div className="flex items-center justify-center gap-1 text-xs text-gray-700">
                <Image
                  src={shutterSpeed}
                  width={20}
                  height={20}
                  alt="快门"
                  className="opacity-70"
                />
                {exif.ExposureTime}s
              </div>
              <div className="flex items-center justify-center gap-1 text-xs text-gray-700">
                <Image
                  src={iso}
                  width={20}
                  height={20}
                  alt="ISO"
                  className="opacity-70"
                />
                {exif.iso}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4 mb-8 flex gap-x-2 text-sm leading-6 text-gray-500">
          <InformationCircleIcon
            className="mt-0.5 h-5 w-5 flex-none text-gray-300"
            aria-hidden="true"
          />
          该图片没有获取到 EXIF 信息
        </div>
      )}
    </>
  );
};

export default ExifInfo;
