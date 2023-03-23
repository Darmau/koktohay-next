import ConvertToDate from "@/function/ConvertDate";
import getLabel from "@/function/GetLabel";
import { ContentList, ContentsProps, Labels } from "@/function/Types";
import { ArrowSmallRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const SectionArticle = ({ articles }: ContentsProps) => {
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
            href="/articles/1"
            title="More"
          >
            MORE
            <ArrowSmallRightIcon className="h-5 w-5 transition-all group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
      <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-y-12 gap-x-8 lg:mt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {articles.map((item: ContentList) => (
          <Link key={item.id} href={`/article/${item.attributes.url}`}>
            <article className="group flex flex-col gap-4">
              <div className="relative w-full">
                <Image
                  src={item.attributes.cover.data.attributes.url}
                  alt="封面图片"
                  width={600}
                  height={400}
                  loader={imageLoader}
                  className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="flex items-center gap-x-4 text-xs">
                  <time
                    dateTime={item.attributes.publishDate!.toString()}
                    className="text-gray-500"
                  >
                    {ConvertToDate(item.attributes.publishDate)}
                  </time>
                  <h4 className="relative z-10 rounded-full bg-gray-50 py-1.5 px-3 font-medium text-gray-600">
                    {item.attributes.article_category.data.attributes.title}
                  </h4>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <span className="absolute inset-0" />
                    {item.attributes.title}
                  </h3>
                  <p className="mt-5 text-sm leading-6 text-gray-600 line-clamp-3">
                    {item.attributes.description}
                  </p>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SectionArticle;

const labels: Labels = {
  "zh-CN": {
    header: "文章",
    slogan: "写作不只是为了记录，更是为了思考",
  },
  en: {
    header: "Articles",
    slogan: "Writing is not only for recording, but also for thinking",
  },
};
