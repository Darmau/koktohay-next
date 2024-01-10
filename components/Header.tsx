import getLabel from "@/function/GetLabel";
import { Labels } from "@/function/Types";
import { Dialog, Popover, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
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
  onSearchButtonClick: () => void;
}

const Header = ({ id, onSearchButtonClick }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { locale } = useRouter();
  const label = getLabel(labels, locale);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <header
      className={`w-full fixed top-0 z-10 bg-white/70 border-b transition-all duration-300 backdrop-blur-lg  ${
        visible ? "" : "transform -translate-y-full"
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
          <Link
            href="/articles/1"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600"
          >
            {label.article}
          </Link>
          <Link
            href="/albums/1"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600"
          >
            {label.album}
          </Link>
          <Link
            href="/videos/1"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600"
          >
            {label.video}
          </Link>
          <Link
              href="/about"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600"
          >
            {label.about}
          </Link>

        </Popover.Group>
        <div className="hidden lg:gap-4 lg:flex lg:flex-1 lg:justify-end">
          <div
            className="cursor-pointer flex leading-7 lg:inline-flex items-center lg:rounded-full lg:border border-gray-300 bg-white p-2 text-sm font-medium lg:leading-4 text-gray-700 lg:shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={onSearchButtonClick}
            data-umami-event="Search"
          >
            <MagnifyingGlassIcon className="w-5 h-5" />
          </div>
          <SwitchLanguage />
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
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label.article}
                </Link>

                <Link
                  href="/albums/1"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label.album}
                </Link>
                <Link
                  href="/videos/1"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label.video}
                </Link>
                <Link
                    href="/about"
                    className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                >
                  {label.about}
                </Link>
              </div>
              <div className="py-6">
                <Link
                  data-umami-event="Search"
                  className="flex leading-7 lg:inline-flex items-center lg:rounded-md lg:border border-gray-300 bg-white px-3 py-2 text-sm font-medium lg:leading-4 text-gray-700 lg:shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  href="/search"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <MagnifyingGlassIcon
                    className="-ml-1 mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                  {label.search}
                </Link>
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
    article: "文章",
    album: "摄影",
    video: "视频",
    about: "关于",
    search: "搜索",
  },
  en: {
    article: "Article",
    album: "Album",
    video: "Video",
    // memo: "Memo",
    about: "About",
    search: "Search",
  },
};
