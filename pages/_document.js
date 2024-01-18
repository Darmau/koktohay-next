import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/img/logo.svg" />
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.css"
          rel="stylesheet"
        />
        <link
          rel="sitemap"
          type="application/xml"
          title="可可托海没有海的站点地图"
          href="https://darmau.design/sitemap.xml"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="可可托海没有海的RSS"
          href="https://darmau.design/rss.xml"
        />
        <script
            async src = "https://umami.darmau.dev/script.js"
            data-website-id = "f3103357-3ac6-4559-b9f8-6f645ea99f11"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
