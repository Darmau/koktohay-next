import client from "@/apollo-client";
import { ContentsProps } from "@/function/Types";
import { gql } from "@apollo/client";

interface EngUrl {
  url: string;
}

function generateSiteMap({ albums, articles, videos }: ContentsProps) {
  
  const articleList: EngUrl[] = articles.data.map((article: ContentsProps) => {
    return {
      url: article.attributes.url,
  }});

  const albumList: EngUrl[] = albums.data.map((album: ContentsProps) => {
    return {
      url: album.attributes.url,
  }});

  const videoList: EngUrl[] = videos.data.map((video: ContentsProps) => {
    return {
      url: video.attributes.url,
  }});

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
   http://www.w3.org/1999/xhtml http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd"
   xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
   xmlns:xhtml="http://www.w3.org/1999/xhtml" >
     <url>
       <loc>https://darmau.design/en</loc>
       <xhtml:link rel="alternate" hreflang="en" href="https://darmau.design/en"/>
       <xhtml:link rel="alternate" hreflang="zh-CN" href="https://darmau.design/"/>
     </url>
     <url>
       <loc>https://darmau.design/en/contact</loc>
     </url>
     <url>
       <loc>https://darmau.design/en/memo</loc>
     </url>

     ${articleList.map((item) => {
        return `
           <url>
              <loc>https://darmau.design/en/article/${item.url}</loc>
              <xhtml:link rel="alternate" hreflang="en" href="https://darmau.design/en/article/${item.url}"/>
              <xhtml:link rel="alternate" hreflang="zh-CN" href="https://darmau.design/article/${item.url}"/>
           </url>`;
       })
       .join("")}

       ${albumList.map((item) => {
        return `
            <url>
              <loc>https://darmau.design/en/album/${item.url}</loc>
              <xhtml:link rel="alternate" hreflang="en" href="https://darmau.design/en/album/${item.url}"/>
              <xhtml:link rel="alternate" hreflang="zh-CN" href="https://darmau.design/album/${item.url}"/>
           </url>
         `;
       })
       .join("")}

       ${videoList.map((item) => {
        return `
            <url>
              <loc>https://darmau.design/en/video/${item.url}</loc>
              <xhtml:link rel="alternate" hreflang="en" href="https://darmau.design/en/video/${item.url}"/>
              <xhtml:link rel="alternate" hreflang="zh-CN" href="https://darmau.design/video/${item.url}"/>
           </url>`;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const runtime = 'edge'

export async function getServerSideProps({ res }: any) {
  // We make an API call to gather the URLs for our site
  const { data } = await client.query({ query: GET_LINKS, variables: { locale: "en" } });
  const { albums, articles, videos } = await data;

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap({ albums, articles, videos });

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;

const GET_LINKS = gql`
  query AllLinks($locale: I18NLocaleCode) {
    albums(locale: $locale) {
      data {
        attributes {
          url
        }
      }
    }
    articles(locale: $locale) {
      data {
        attributes {
          url
        }
      }
    }
    videos(locale: $locale) {
      data {
        attributes {
          url
        }
      }
    }
  }
`;
