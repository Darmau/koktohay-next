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
          async
          src="https://analytics.darmau.design/script.js"
          data-website-id="ee645858-14fa-4787-ab19-6a7902c0e75b"
          data-do-not-track="true"
          data-cache="true"
        ></script>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2439295902943960"
          crossorigin="anonymous"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
