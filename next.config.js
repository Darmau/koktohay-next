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
    minimumCacheTTL: 60 * 60 * 24 * 7,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "darmau-image-1256887306.cos.ap-hongkong.myqcloud.com",
      },
      {
        protocol: "https",
        hostname: "darmau-image-1256887306.cos.accelerate.myqcloud.com",
      }
    ],
  },
};

module.exports = nextConfig;
