import ConvertToDate from "@/function/ConvertDate";
import getLabel from "@/function/GetLabel";
import { ContentList, ContentsProps, Labels } from "@/function/Types";
import imageLoader from "@/loader";
import { ArrowSmallRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const SectionVideo = ({ videos }: ContentsProps) => {
  const { locale } = useRouter();
  const label = getLabel(labels, locale);

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
            href="/videos/1"
            title="More"
          >
            MORE
            <ArrowSmallRightIcon className="h-5 w-5 transition-all group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      <div className="py-8 lg:py-16 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((item: ContentList) => (
          <article
            key={item.id}
            className="group relative isolate aspect-video w-full flex flex-col justify-end overflow-hidden cursor-pointer rounded-lg bg-gray-900 px-6 pb-6"
          >
            <Image
              src={item.attributes.cover.data.attributes.url}
              alt="cover"
              quality={60}
              className="absolute inset-0 -z-10 h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
              width={672}
              height={378}
              loader={imageLoader}
            />
            {/* 黑色遮罩 */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40 transition-all duration-300 group-hover:backdrop-blur-sm" />

            <div className="flex flex-wrap items-center gap-y-1 text-sm leading-6 text-gray-300">
              <time
                dateTime={item.attributes.publishDate!.toString()}
                className="mr-8"
              >
                {ConvertToDate(item.attributes.publishDate)}
              </time>
            </div>
            <h3 className="mt-2 text-xl font-normal leading-7 text-gray-200 transition-all group-hover:text-white">
              <Link href={`/video/${item.attributes.url}`}>
                <span className="absolute inset-0" />
                {item.attributes.title}
              </Link>
            </h3>
          </article>
        ))}
      </div>
    </section>
  );
};

export default SectionVideo;

const labels: Labels = {
  "zh-CN": {
    header: "视频",
    slogan: "不得不说我不喜欢这个只知道看短视频的年代",
  },
  en: {
    header: "Videos",
    slogan: "I don't like this era of only knowing how to watch Tiktok videos",
  },
};
