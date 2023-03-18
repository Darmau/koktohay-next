import ConvertToDate from "@/function/ConvertDate";
import { ContentsProps } from "@/function/Types";
import Image from "next/image";
import Link from "next/link";

export default function BlogPostItem({ post }: ContentsProps) {
  return (
    <article key={post.id} className="relative isolate group">
      <Link
        className="flex flex-col gap-6 md:gap-8 md:flex-row"
        href={`/article/${post.attributes.url}`}
      >
        <div className="relative shrink-0 aspect-[16/9] overflow-hidden rounded-lg sm:aspect-[2/1] md:aspect-[4/3] md:w-64">
          <Image
            src={post.attributes.cover.data.attributes.url}
            alt="cover"
            width={300}
            height={200}
            quality={65}
            className="absolute inset-0 h-full w-full  bg-gray-50 object-cover transition-all duration-300 transform group-hover:scale-105"
          />
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
        </div>
        <div className="grow">
          <div className="flex items-center gap-x-4 text-xs">
            {post.attributes.article_category ? (
              <span className="rounded-full bg-gray-50 py-1.5 px-3 font-bold text-gray-600 hover:bg-gray-100">
                {post.attributes.article_category.data.attributes.title}
              </span>
            ) : (
              <></>
            )}
            <time
              dateTime={post.attributes.publishDate!.toString()}
              className="text-gray-500"
            >
              {ConvertToDate(post.attributes.publishDate)}
            </time>
          </div>
          <div className="relative max-w-xl">
            <h3 className="mt-3 text-2xl font-semibold leading-8 text-gray-900 group-hover:text-blue-600">
              <span className="absolute inset-0" />
              {post.attributes.title}
            </h3>
            <p className="mt-5 text-sm leading-6 text-gray-600">
              {post.attributes.description}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}
