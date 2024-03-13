import getLabel from "@/function/GetLabel";
import { Labels } from "@/function/Types";
import bilibiliIcon from "@/public/img/bilibili.svg";
import dribbbleIcon from "@/public/img/dribbble.svg";
import githubIcon from "@/public/img/github.svg";
import instagramIcon from "@/public/img/instagram.svg";
import rssIcon from "@/public/img/rss.svg";
import twitterIcon from "@/public/img/twitter.svg";
import wechatIcon from "@/public/img/wechat.svg";
import youtubeIcon from "@/public/img/youtube.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

interface navItem {
  name: string;
  href: string;
}

interface IconProps {
  className?: string;
  htmlAttributes?: string;
}

const currentYear = new Date().getFullYear();

const Footer = ({ id }: { id: string }) => {
  const { locale } = useRouter();
  const label = getLabel(labels, locale);
  const socialLinks = locale === "zh-CN" ? social : socialEng;

  const [email, setEmail] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.open(
      "https://tinyletter.com/darmau",
      "popupwindow",
      "scrollbars=yes,width=800,height=600"
    );
    return true;
  };

  return (
    <footer
      className="bg-white border-t border-gray-900/10"
      aria-labelledby="footer-heading"
      id={id}
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="lg:my-16">
          {/* 站内链接 */}
          <div className="sm:block md:flex md:gap-24 lg:justify-evenly">
            <div>
              <h3 className="text-sm font-semibold leading-6 text-gray-900">
                {label.blog.title}
              </h3>
              <ul role="list" className="mt-6 space-y-4">
                {label.blog.items.map((item: navItem) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 md:mt-0">
              <h3 className="text-sm font-semibold leading-6 text-gray-900">
                {label.about.title}
              </h3>
              <ul role="list" className="mt-6 space-y-4">
                {label.about.items.map((item: navItem) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                {/* <li>
                  <a href="https://darmau.dev" target="_blank" className="text-sm leading-6 text-gray-600 hover:text-gray-900">{label.about.portfolio}</a>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-900/10 pt-8 lg:flex lg:items-center lg:justify-between">
          <div className="flex space-x-6 md:order-3">
            {socialLinks.map((item) => (
              <a
                data-umami-event="Social Network"
                target={"_blank"}
                title={item.name}
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-xs leading-5 text-gray-500 lg:order-1 lg:mt-0">
            &copy; 2019 - {currentYear} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// 文案信息
const social = [
  {
    name: "RSS",
    href: "/rss.xml",
    icon: (props: IconProps) => (
      <Image {...props} src={rssIcon} width={32} height={32} alt="RSS" />
    ),
  },
  {
    name: "Github",
    href: "https://github.com/Darmau",
    icon: (props: IconProps) => (
      <Image {...props} src={githubIcon} width={32} height={32} alt="Github" />
    ),
  },
  {
    name: "Twitter",
    href: "https://twitter.com/darmaulee",
    icon: (props: IconProps) => (
      <Image
        {...props}
        src={twitterIcon}
        width={32}
        height={32}
        alt="Twitter"
      />
    ),
  },
  {
    name: "Youtube",
    href: "https://www.youtube.com/@darmau/featured",
    icon: (props: IconProps) => (
      <Image
        {...props}
        src={youtubeIcon}
        width={32}
        height={32}
        alt="Youtube"
      />
    ),
  },
  {
    name: "Wechat",
    href: "http://mp.weixin.qq.com/mp/homepage?__biz=MzIxOTM1NzIzNw==&hid=1&sn=173a6a61a9cafb6ac2e7d36ee0efe411&scene=18#wechat_redirect",
    icon: (props: IconProps) => (
      <Image {...props} src={wechatIcon} width={32} height={32} alt="Wechat" />
    ),
  },
  {
    name: "Dribbble",
    href: "https://dribbble.com/darmau",
    icon: (props: IconProps) => (
      <Image
        {...props}
        src={dribbbleIcon}
        width={32}
        height={32}
        alt="Dribbble"
      />
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/darmaulee/",
    icon: (props: IconProps) => (
      <Image
        {...props}
        src={instagramIcon}
        width={32}
        height={32}
        alt="Instagram"
      />
    ),
  },
  {
    name: "Bilibili",
    href: "https://space.bilibili.com/408764400",
    icon: (props: IconProps) => (
      <Image
        {...props}
        src={bilibiliIcon}
        width={32}
        height={32}
        alt="Bilibili"
      />
    ),
  },
];

const socialEng = [
  {
    name: "RSS",
    href: "/rss-en.xml",
    icon: (props: IconProps) => (
      <Image {...props} src={rssIcon} width={32} height={32} alt="RSS" />
    ),
  },
  {
    name: "Github",
    href: "https://github.com/Darmau",
    icon: (props: IconProps) => (
      <Image {...props} src={githubIcon} width={32} height={32} alt="Github" />
    ),
  },
  {
    name: "Twitter",
    href: "https://twitter.com/darmaulee",
    icon: (props: IconProps) => (
      <Image
        {...props}
        src={twitterIcon}
        width={32}
        height={32}
        alt="Twitter"
      />
    ),
  },
  {
    name: "Youtube",
    href: "https://www.youtube.com/@darmau/featured",
    icon: (props: IconProps) => (
      <Image
        {...props}
        src={youtubeIcon}
        width={32}
        height={32}
        alt="Youtube"
      />
    ),
  },
  {
    name: "Wechat",
    href: "http://mp.weixin.qq.com/mp/homepage?__biz=MzIxOTM1NzIzNw==&hid=1&sn=173a6a61a9cafb6ac2e7d36ee0efe411&scene=18#wechat_redirect",
    icon: (props: IconProps) => (
      <Image {...props} src={wechatIcon} width={32} height={32} alt="Wechat" />
    ),
  },
  {
    name: "Dribbble",
    href: "https://dribbble.com/darmau",
    icon: (props: IconProps) => (
      <Image
        {...props}
        src={dribbbleIcon}
        width={32}
        height={32}
        alt="Dribbble"
      />
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/darmaulee/",
    icon: (props: IconProps) => (
      <Image
        {...props}
        src={instagramIcon}
        width={32}
        height={32}
        alt="Instagram"
      />
    ),
  },
  {
    name: "Bilibili",
    href: "https://space.bilibili.com/408764400",
    icon: (props: IconProps) => (
      <Image
        {...props}
        src={bilibiliIcon}
        width={32}
        height={32}
        alt="Bilibili"
      />
    ),
  },
];

const labels: Labels = {
  "zh-CN": {
    blog: {
      title: "博客",
      items: [
        { name: "文章", href: "/articles/1" },
        { name: "摄影", href: "/albums/1" },
        { name: "视频", href: "/videos/1" },
        // { name: "碎片", href: "/memo" },
      ],
    },
    about: {
      title: "关于",
      items: [
        { name: "网站", href: "/about" },
        { name: "联系我", href: "/contact" },
      ],
      // portfolio: "作品集",
    },
    subscription: {
      title: "订阅本站更新",
      description: "只推送我觉得值得推荐的文章，常规内容更新请通过RSS订阅",
      placeholder: "输入你的邮箱",
      button: "订阅",
    },
  },
  en: {
    blog: {
      title: "Blog",
      items: [
        { name: "Article", href: "/articles/1" },
        { name: "Album", href: "/albums/1" },
        { name: "Video", href: "/videos/1" },
        // { name: "Memo", href: "/memo" },
      ],
    },
    about: {
      title: "About",
      items: [
        { name: "This Site", href: "/about" },
        { name: "Contact Me", href: "/contact" },
      ],
      // portfolio: "Portfolio",
    },
    subscription: {
      title: "Subscribe to updates",
      description:
        "Only push the articles I think are worth recommending, and subscribe to RSS for regular content updates",
      placeholder: "Enter your email",
      button: "Subscribe",
    },
  },
};
