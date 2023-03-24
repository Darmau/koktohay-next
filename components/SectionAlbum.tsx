import getLabel from "@/function/GetLabel";
import NextJsImage from "@/function/NextJsImage";
import { ContentList, ContentsProps, Labels } from "@/function/Types";
import { ArrowSmallRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { PhotoAlbum } from "react-photo-album";

const SectionAlbum = ({ albums }: ContentsProps) => {
  const { locale } = useRouter();
  const label = getLabel(labels, locale);

  const imgArray = albums.map((item: ContentList) => {
    const ratio =
      item.attributes.cover.data.attributes.width /
      item.attributes.cover.data?.attributes.height;

    return {
      src: item.attributes.cover.data.attributes.formats.large.url,
      width: 960,
      height: 960 / ratio,
      alt: item.attributes.title,
      title: item.attributes.url,
    };
  });

  return (
    <section className="py-8 lg:py-16">
      <div className="flex justify-between items-start">
        <div className="">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {label.header}
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">{label.slogan}</p>
        </div>
        <div className="group mt-4 flex flex-col justify-between gap-6 cursor-pointer sm:mt-8 sm:flex-row-reverse sm:gap-8 lg:mt-4 lg:flex-col">
          <Link
            className="flex items-center text-sm font-semibold leading-6 text-blue-600"
            href="/albums/1"
            title="More"
          >
            MORE
            <ArrowSmallRightIcon className="h-5 w-5 transition-all group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      <div className="py-8 lg:py-16">
        <PhotoAlbum
          layout="rows"
          photos={imgArray}
          renderPhoto={NextJsImage}
          padding={0}
          spacing={8}
          columns={(containerWidth) => {
            if (containerWidth < 400) return 1;
            if (containerWidth < 700) return 2;
            if (containerWidth < 1000) return 3;
            return 4;
          }}
          defaultContainerWidth={960}
        />
      </div>
    </section>
  );
};

export default SectionAlbum;

const labels: Labels = {
  "zh-CN": {
    header: "摄影",
    slogan: "只用的起副厂镜头的业余摄影师",
  },
  en: {
    header: "Photography",
    slogan: "An amateur photographer who can only use a factory lens",
  },
};
