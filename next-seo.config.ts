import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
  title: '可可托海没有海',
  openGraph: {
    type: 'website',
    locale: 'zh-CN',
    url: 'https://darmau.design',
    siteName: '可可托海没有海',
    images: [{
      url: '/img/default-cover.jpg',
      width: 960,
      height: 540,
      alt: '封面图',
      type: 'image/jpeg',
    },]
  },
  twitter: {
    handle: '@darmaulee',
    cardType: 'summary_large_image',
  },
  languageAlternates: [{
    hrefLang: 'en',
    href: 'https://darmau.design/en',
  }],
};

export default config;