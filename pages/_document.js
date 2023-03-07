import { Html, Head, Main, NextScript } from "next/document";

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
        <script
          defer
          data-domain="darmau.design"
          src="https://analytics.darmau.design/js/script.js"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
