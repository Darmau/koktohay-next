import getLabel from "@/function/GetLabel";
import { ContentsProps, Labels } from "@/function/Types";
import imageLoader from "@/loader";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const SectionCover = ({article}: ContentsProps) => {
  const {locale} = useRouter();
  const label = getLabel(labels, locale)

  return (
    <div className="relative isolate overflow-hidden h-1/2 bg-gray-900">
      <Image
        priority
        src={article.cover.data.attributes.url}
        width={1920}
        height={1080}
        alt="封面图"
        quality={65}
        loader={imageLoader}
        className="absolute inset-0 -z-10 h-full w-full object-cover brightness-50"
      />

      <div className="px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {article.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              {article.description}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href={`/article/${article.url}`}
                className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
              >
                {label.read}
              </Link>
              <Link
                href="/articles/1"
                className="text-sm font-semibold leading-6 text-white"
              >
                {label.learnMore} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionCover;

const labels: Labels = {
  "zh-CN": {
    read: "阅读本文",
    learnMore: "浏览所有文章",
  },
  "en": {
    read: "Read this article",
    learnMore: "Browse all articles",
  },
}
