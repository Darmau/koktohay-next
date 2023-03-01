import ConvertToDate from "@/function/ConvertDate";
import { ContentsProps, Labels } from "@/function/Types";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import getLabel from "@/function/GetLabel";

export default function BlogPostTop({ post }: ContentsProps) {
  const { locale } = useRouter();
  const label = getLabel(labels, locale);

  return (
    <article className="relative isolate grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
      {/* 封面图 */}
      <div className="relative w-full col-span-1 aspect-[16/9] md:aspect-square lg:aspect-[4/3] lg:shrink-0 lg:col-span-2">
        <Image
          src={post.attributes.cover.data.attributes.url}
          alt="cover"
          width={600}
          height={400}
          className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
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
          className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
        >
          {post.attributes.title}
        </h2>
        <p className="mt-4 text-lg leading-8 text-gray-600">
          {post.attributes.description}
        </p>
        <div className="mt-4 flex flex-col justify-between gap-6 sm:mt-8 sm:flex-row-reverse sm:gap-8 lg:mt-4 lg:flex-col">
          <div className="flex">
            <Link
              href={`/article/${post.attributes.url}`}
              className="text-sm font-semibold leading-6 text-indigo-600"
              aria-describedby="featured-post"
            >
              {label.button} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

const labels: Labels = {
  'zh-CN': {
    button: '继续阅读',
  },
  'en': {
    button: 'Continue reading',
  }
}