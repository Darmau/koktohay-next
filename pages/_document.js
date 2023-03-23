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
        <link rel="sitemap" type="application/xml" title="可可托海没有海的站点地图" href="https://darmau.design/sitemap.xml"/>
        <link rel="alternate" type="application/rss+xml" title="可可托海没有海的RSS" href="https://darmau.design/rss.xml"/>
        <script async defer data-website-id="49076eec-4795-456a-a127-f163de3ea2b4" src="https://analytics.darmau.design/umami.js"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
