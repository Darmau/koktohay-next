import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { BookmarkSquareIcon } from "@heroicons/react/24/outline";
import { Labels, ContentList, ContentsProps } from "@/pages/api/Types";
import getLabel from "@/pages/api/GetLabel";
import { useRouter } from "next/router";
import Link from "next/link";
import client from "@/apollo-client";
import { gql } from "@apollo/client";

const labels: Labels = {
  "zh-CN": {
    title: "文章",
    category: [
      {
        name: "生活",
        href: "/category/article/life/1",
        description: "杂七杂八，乱七八糟，七上八下",
        icon: BookmarkSquareIcon,
      },
      {
        name: "开发",
        href: "/category/article/dev/1",
        description: "前端开发相关文章，专注视觉表现和创意编码",
        icon: BookmarkSquareIcon,
      },
      {
        name: "设计",
        href: "/category/article/design/1",
        description: "一些关于设计的吐槽",
        icon: BookmarkSquareIcon,
      },
    ],
    recent: "最新文章",
    all: "全部",
  },
  en: {
    title: "Article",
    category: [
      {
        name: "Life",
        href: "/category/article/life/1",
        description: "Just some thoughts",
        icon: BookmarkSquareIcon,
      },
      {
        name: "Development",
        href: "/category/article/dev/1",
        description: "Focusing on visual performance and creative development",
        icon: BookmarkSquareIcon,
      },
      {
        name: "Design",
        href: "/category/article/design/1",
        description: "Some complaints about the design",
        icon: BookmarkSquareIcon,
      },
    ],
    recent: "Recent Article",
    all: "See All",
  },
};

interface Category {
  name: string;
  href: string;
  description: string;
  icon: React.FC<{ className: string }>;
}

export default function DropArticle({
  articles,
  pagination,
  pageSize,
}: ContentsProps) {
  const router = useRouter();
  const {
    query: { page },
    locale,
  } = router;
  const label = getLabel(labels, locale);

  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
        <span>{label.title}</span>
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
              {label.category.map((item: Category) => (
                <div
                  key={item.name}
                  className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <item.icon
                      className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <a href={item.href} className="font-semibold text-gray-900">
                      {item.name}
                      <span className="absolute inset-0" />
                    </a>
                    <p className="mt-1 text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 p-8">
              <div className="flex justify-between">
                <h3 className="text-sm font-semibold leading-6 text-gray-500">
                  {label.recent}
                </h3>
                <Link
                  href="/articles/1"
                  className="text-sm font-semibold leading-6 text-indigo-600"
                >
                  {label.all} <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
              <ul role="list" className="mt-6 space-y-6">
                <li key={post.id} className="relative">
                  <time
                    dateTime={post.attributes.publishDate?.toString()}
                    className="block text-xs leading-6 text-gray-600"
                  >
                    {post.attributes.publishDate.toDateString()}
                  </time>
                  <Link
                    href={`/article/${post.attributes.url}`}
                    className="block truncate text-sm font-semibold leading-6 text-gray-900"
                  >
                    {post.attributes.title}
                    <span className="absolute inset-0" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
