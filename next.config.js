const { hostname } = require("os");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  i18n: {
    locales: ["zh-CN", "en"],
    defaultLocale: "zh-CN",
  },

  env: {
    BASE_URL: process.env.BASE_URL,
  },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "darmau-design.hks3.layerstackobjects.com",
      },
    ],
  },
};

module.exports = nextConfig;
