import ConvertToDate from "@/pages/function/ConvertDate";
import { ContentsProps } from "@/pages/function/Types";
import Image from "next/image";
import Link from "next/link";

export default function BlogPostItem({post}: ContentsProps) {
  return (
    <article
      key={post.id}
      className="relative isolate flex flex-col gap-8 md:flex-row"
    >
      <div className="relative aspect-[16/9] sm:aspect-[2/1] md:aspect-[4/3] md:w-64 lg:shrink-0">
        <Image
          src={post.attributes.cover.data.attributes.url}
          alt="cover"
          width={300}
          height={200}
          className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
      <div>
        <div className="flex items-center gap-x-4 text-xs">
          <span className="rounded-full bg-gray-50 py-1.5 px-3 font-medium text-gray-600 hover:bg-gray-100">
            {post.attributes.article_category.data.attributes.title}
          </span>
          <time
            dateTime={post.attributes.publishDate!.toString()}
            className="text-gray-500"
          >
            {ConvertToDate(post.attributes.publishDate)}
          </time>
        </div>
        <div className="group relative max-w-xl">
          <h3 className="mt-3 text-2xl font-semibold leading-8 text-gray-900 group-hover:text-gray-600">
            <Link href={`/article/${post.attributes.url}`}>
              <span className="absolute inset-0" />
              {post.attributes.title}
            </Link>
          </h3>
          <p className="mt-5 text-sm leading-6 text-gray-600">
            {post.attributes.description}
          </p>
        </div>
      </div>
    </article>
  );
}
