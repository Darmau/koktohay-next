import ConvertToDate from "@/pages/function/ConvertDate";
import getLabel from "@/pages/function/GetLabel";
import { ContentList, Labels } from "@/pages/function/Types";
import { Dialog, Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  Bars3Icon, CodeBracketIcon,
  LightBulbIcon, PaintBrushIcon, XMarkIcon
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import logo from "../public/img/logo.svg";
import SwitchLanguage from "./SwitchLanguage";

interface navItem {
  name: string;
  href: string;
}

interface HeaderProps {
  id: string;
  recent: ContentList[];
}

interface CategoryList {
  name: string;
  href: string;
  description: string;
  icon: React.ComponentType<React.HTMLProps<HTMLElement>>;
}

const Header = ({ id, recent }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const { locale } = useRouter();
  const label = getLabel(labels, locale);

  return (
    <header
      className={`w-full fixed top-0 z-10 bg-white border-b transition-all duration-300 ${
        visible
          ? ""
          : "transform -translate-y-full"
      }`}
      id={id}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <Image className="h-8 w-auto" src={logo} alt="可可托海没有海logo" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              <span>{label.article.title}</span>
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
                    {label.article.category.map((item: CategoryList) => (
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
                          <Link
                            href={item.href}
                            className="font-semibold text-gray-900"
                          >
                            {item.name}
                            <span className="absolute inset-0" />
                          </Link>
                          <p className="mt-1 text-gray-600">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-50 p-8">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-semibold leading-6 text-gray-500">
                        {label.article.recent}
                      </h3>
                      <Link
                        href="/articles/1"
                        className="text-sm font-semibold leading-6 text-indigo-600"
                      >
                        {label.article.all}{" "}
                        <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                    <ul role="list" className="mt-6 space-y-6">
                      {recent.map((post) => (
                        <li key={post.id} className="relative">
                          <span className="block text-xs leading-6 text-gray-600">
                            {ConvertToDate(post.attributes.publishDate)}
                          </span>
                          <Link
                            href={`/article/${post.attributes.url}`}
                            className="block truncate text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600"
                          >
                            {post.attributes.title}
                            <span className="absolute inset-0" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <Link
            href="/albums/1"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            {label.album}
          </Link>
          <Link
            href="/videos/1"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            {label.video}
          </Link>

          {/* 关于 */}
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              {label.about.name}
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
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
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-56 rounded-xl bg-white p-2 shadow-lg ring-1 ring-gray-900/5">
                {label.about.items.map((item: navItem) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-lg py-2 px-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </Popover.Panel>
            </Transition>
          </Popover>
        </Popover.Group>
        <div className="hidden lg:gap-4 lg:flex lg:flex-1 lg:justify-end">
          <SwitchLanguage />
          {/* <button
            type="button"
            className="inline-flex items-center rounded-full border border-gray-300 bg-white p-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
          </button> */}
        </div>
      </nav>

      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">可可托海没有海</span>
              <Image className="h-8 w-auto" src={logo} alt="" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  href="/articles/1"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {label.article.title}
                </Link>

                <Link
                  href="/albums/1"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {label.album}
                </Link>
                <Link
                  href="/videos/1"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {label.video}
                </Link>
                <div>
                  <div className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-400">
                    {label.about.name}
                  </div>
                  <ul>
                    {label.about.items.map((item: navItem) => (
                      <li
                        key={item.name}
                        className="block rounded-lg py-2 pl-4 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        <Link href={item.href}>{item.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="py-6">
                <SwitchLanguage />
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Header;

// 文案信息
const labels: Labels = {
  "zh-CN": {
    article: {
      title: "文章",
      category: [
        {
          name: "生活",
          href: "/category/article/life/1",
          description: "杂七杂八，乱七八糟，七上八下",
          icon: LightBulbIcon,
        },
        {
          name: "开发",
          href: "/category/article/dev/1",
          description: "前端开发相关文章，专注视觉表现和创意编码",
          icon: CodeBracketIcon,
        },
        {
          name: "设计",
          href: "/category/article/design/1",
          description: "一些关于设计的吐槽",
          icon: PaintBrushIcon,
        },
      ],
      recent: "最新文章",
      all: "全部",
    },
    album: "摄影",
    video: "视频",
    about: {
      name: "关于",
      items: [
        { name: "本站", href: "/about" },
        { name: "联系我", href: "/contact" },
        { name: "更新记录", href: "/changelog" },
      ],
    },
  },
  en: {
    article: {
      title: "Article",
      category: [
        {
          name: "Life",
          href: "/category/article/life/1",
          description: "Just some thoughts",
          icon: LightBulbIcon,
        },
        {
          name: "Development",
          href: "/category/article/dev/1",
          description:
            "Focusing on visual performance and creative development",
          icon: CodeBracketIcon,
        },
        {
          name: "Design",
          href: "/category/article/design/1",
          description: "Some complaints about the design",
          icon: PaintBrushIcon,
        },
      ],
      recent: "Recent Article",
      all: "See All",
    },
    album: "Album",
    video: "Video",
    about: {
      name: "About",
      items: [
        { name: "This Site", href: "/about" },
        { name: "Contact Me", href: "/contact" },
        { name: "Changelog", href: "/changelog" },
      ],
    },
  },
};
