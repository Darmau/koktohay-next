import ConvertToDate from "@/function/ConvertDate";
import getLabel from "@/function/GetLabel";
import { addPageView, getPageView } from "@/function/Pageview";
import { ContentsProps, Labels } from "@/function/Types";
import { ArrowSmallRightIcon, EyeIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function BlogPostTop({ post }: ContentsProps) {
  const { locale } = useRouter();
  const label = getLabel(labels, locale);

  const [pageview, setPageview] = useState(0);

  useEffect(() => {
    const fetchPageViews = async () => {
      const views = await getPageView(
        `https://darmau.design/article/${post.attributes.url}`
      );
      setPageview(views);
    };
    fetchPageViews();
  }, [post]);

  return (
    <article>
      <Link
        href={`/article/${post.attributes.url}`}
        className="group relative isolate grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5"
        onClick={() =>
          addPageView(`https://darmau.design/article/${post.attributes.url}`)
        }
      >
        {/* 封面图 */}
        <div className="relative w-full col-span-1 aspect-[16/9] md:aspect-square lg:aspect-[4/3] lg:shrink-0 lg:col-span-2">
          <Image
            src={post.attributes.cover.data.attributes.url}
            alt="cover"
            width={600}
            height={400}
            className="absolute inset-0 h-full w-full rounded-lg bg-gray-50 object-cover"
          />
        </div>

        {/* 文字部分 */}
        <div className="lg:col-span-3">
          <time
            dateTime={post.attributes.publishDate!.toString()}
            className="block text-sm leading-6 text-gray-600"
          >
            {ConvertToDate(post.attributes.publishDate)}
          </time>
          <h2
            id="featured-post"
            className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl group-hover:text-blue-600"
          >
            {post.attributes.title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            {post.attributes.description}
          </p>
          <div className="flex gap-1 items-center mt-4 text-sm text-gray-500">
            <EyeIcon className="w-4 h-4" />
            {pageview}
          </div>
          <div className="group/more mt-4 flex flex-col justify-between gap-6 sm:mt-8 sm:flex-row-reverse sm:gap-8 lg:mt-4 lg:flex-col">
            <div className="flex items-center text-sm font-semibold leading-6 text-blue-600">
              {label.button}
              <ArrowSmallRightIcon className="h-5 w-5 transition-all group-hover/more:translate-x-0.5" />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

const labels: Labels = {
  "zh-CN": {
    button: "继续阅读",
  },
  en: {
    button: "Continue reading",
  },
};
