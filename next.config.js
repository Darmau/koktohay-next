/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  i18n: {
    locales: ['zh-CN', 'en'],
    defaultLocale: 'zh-CN',
  },

  env: {
    BASE_URL: process.env.BASE_URL,
  }
}

module.exports = nextConfig
