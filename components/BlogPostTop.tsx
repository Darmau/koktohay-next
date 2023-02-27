import ConvertToDate from "@/pages/api/ConvertDate";
import { ContentsProps } from "@/pages/api/Types";
import Link from "next/link";
import Image from "next/image";

export default function BlogPostTop({ post }: ContentsProps) {
  return (
    <article className="relative isolate flex flex-col gap-8 lg:flex-row">
      {/* 封面图 */}
      <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-[4/3] lg:w-64 lg:shrink-0">
        <Image
          src={post.attributes.cover.data.attributes.url}
          alt="cover"
          width={300}
          height={200}
          className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
        />
      </div>

      {/* 文字部分 */}
      <div>
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
              Continue reading <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
