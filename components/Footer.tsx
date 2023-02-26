import { useState } from 'react';
import { useRouter } from 'next/router';
import getLabel from "@/pages/api/GetLabel";
import { Labels } from "@/pages/api/Types";
import Link from 'next/link';
import Image from 'next/image';
import bilibiliIcon from '@/public/img/bilibili.svg';
import dribbbleIcon from '@/public/img/dribbble.svg';
import githubIcon from '@/public/img/github.svg';
import instagramIcon from '@/public/img/instagram.svg';
import rssIcon from '@/public/img/rss.svg';
import twitterIcon from '@/public/img/twitter.svg';
import wechatIcon from '@/public/img/wechat.svg';
import youtubeIcon from '@/public/img/youtube.svg';

interface navItem {
  name: string;
  href: string;
}

interface IconProps {
  className?: string;
  htmlAttributes?: string;
}

const currentYear = new Date().getFullYear()

const Footer = ({ id }: { id: string }) => {
  const { locale } = useRouter()
  const label = getLabel(labels, locale)

  const [email, setEmail] = useState('')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    window.open(
      'https://tinyletter.com/darmau', 
      'popupwindow', 
      'scrollbars=yes,width=800,height=600'); 
    return true
  }

  return (
    <footer className="bg-white" aria-labelledby="footer-heading" id={id}>
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-20 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          {/* 站内链接 */}
          <div className="md:flex md:gap-24">
            <div>
              <h3 className="text-sm font-semibold leading-6 text-gray-900">{label.blog.title}</h3>
              <ul role="list" className="mt-6 space-y-4">
                {label.blog.items.map((item: navItem) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 md:mt-0">
              <h3 className="text-sm font-semibold leading-6 text-gray-900">{label.about.title}</h3>
              <ul role="list" className="mt-6 space-y-4">
                {label.about.items.map((item: navItem) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 订阅 */}
          <div className="mt-10 xl:mt-0">
            <h3 className="text-sm font-semibold leading-6 text-gray-900">{label.subscription.title}</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              {label.subscription.description}
            </p>
            <form
              className="mt-6 sm:flex sm:max-w-md"
              action="https://tinyletter.com/darmau"
              method="post"
              onSubmit={handleSubmit}
            >
              <label htmlFor="tlemail" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="tlemail"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full min-w-0 appearance-none rounded-md border-0 bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:w-64 sm:text-sm sm:leading-6 xl:w-full"
                placeholder={label.subscription.placeholder}
              />
              <div className="mt-4 sm:mt-0 sm:ml-4 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {label.subscription.button}
                </button>
              </div>
            </form>
          </div>

        </div>
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-24">
          <div className="flex space-x-6 md:order-2">
            {social.map((item) => (
              <a target={'_blank'} title={item.name} key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-xs leading-5 text-gray-500 md:order-1 md:mt-0">
            &copy; 2019 - {currentYear} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;

// 文案信息
const social = [
  {
    name: 'RSS',
    href: '/rss',
    icon: (props: IconProps) => (
      <Image
        {...props}
        src={rssIcon}
        width={32}
        height={32}
        alt="RSS"
      />
    )
  },
  {
    name: 'Github',
    href: 'https://github.com/Darmau',
    icon: (props: IconProps) => (
      <Image
        {...props}
        src={githubIcon}
        width={32}
        height={32}
        alt="Github"
      />
    )
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/darmaulee',
    icon: (props: IconProps) => (
      <Image
        {...props}
        src={twitterIcon}
        width={32}
        height={32}
        alt="Twitter"
      />
    )
  },
  {
    name: 'Youtube',
    href: 'https://www.youtube.com/@darmau/featured',
    icon: (props: IconProps) => (
      <Image
        {...props}
        src={youtubeIcon}
        width={32}
        height={32}
        alt="Youtube"
      />
    )
  },
  {
    name: 'Wechat',
    href: 'http://mp.weixin.qq.com/mp/homepage?__biz=MzIxOTM1NzIzNw==&hid=1&sn=173a6a61a9cafb6ac2e7d36ee0efe411&scene=18#wechat_redirect',
    icon: (props: IconProps) => (
      <Image
        {...props}
        src={wechatIcon}
        width={32}
        height={32}
        alt="Wechat"
      />
    )
  },
  {
    name: 'Dribbble',
    href: 'https://dribbble.com/darmau',
    icon: (props: IconProps) => (
      <Image
        {...props}
        src={dribbbleIcon}
        width={32}
        height={32}
        alt="Dribbble"
      />
    )
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/darmaulee/',
    icon: (props: IconProps) => (
      <Image
        {...props}
        src={instagramIcon}
        width={32}
        height={32}
        alt="Instagram"
      />
    )
  },
  {
    name: 'Bilibili',
    href: 'https://space.bilibili.com/408764400',
    icon: (props: IconProps) => (
      <Image
        {...props}
        src={bilibiliIcon}
        width={32}
        height={32}
        alt="Bilibili"
      />
    )
  },
]

const labels: Labels = {
  'zh-CN': {
    blog: {
      title: '博客',
      items: [
        { name: '文章', href: '/articles/1' },
        { name: '相册', href: '/albums/1' },
        { name: '视频', href: '/videos/1' },
      ]
    },
    about: {
      title: '关于',
      items: [
        { name: '网站', href: '/about' },
        { name: '联系我', href: '/contact' },
        { name: '更新记录', href: '/changelog' },
      ]
    },
    subscription: {
      title: '订阅本站更新',
      description: '只推送我觉得值得推荐的文章\，常规内容更新请通过RSS订阅',
      placeholder: '输入你的邮箱',
      button: '订阅',
    }
  },
  'en': {
    blog: {
      title: 'Blog',
      items: [
        { name: 'Article', href: '/articles/1' },
        { name: 'Album', href: '/albums/1' },
        { name: 'Video', href: '/videos/1' },
      ]
    },
    about: {
      title: 'About',
      items: [
        { name: 'This Site', href: '/about' },
        { name: 'Contact Me', href: '/contact' },
        { name: 'Changelog', href: '/changelog' },
      ]
    },
    subscription: {
      title: 'Subscribe to updates',
      description: 'Only push the articles I think are worth recommending, and subscribe to RSS for regular content updates',
      placeholder: 'Enter your email',
      button: 'Subscribe',
    }
  }
}