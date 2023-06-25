import client from "@/apollo-client";
import { ContentsProps } from "@/function/Types";
import { gql } from "@apollo/client";

interface BaseUrl {
  url: string;
  localizations: boolean;
}

function generateSiteMap({ albums, articles, videos }: ContentsProps) {
  
  const articleList: BaseUrl[] = articles.data.map((article: ContentsProps) => {
    return {
      url: article.attributes.url,
      localizations:
        article.attributes.localizations.data.length > 0 ? true : false,
    };
  });

  const albumList: BaseUrl[] = albums.data.map((album: ContentsProps) => {
    return {
      url: album.attributes.url,
      localizations:
        album.attributes.localizations.data.length > 0 ? true : false,
    };
  });

  const videoList: BaseUrl[] = videos.data.map((video: ContentsProps) => {
    return {
      url: video.attributes.url,
      localizations:
        video.attributes.localizations.data.length > 0 ? true : false,
    };
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
   http://www.w3.org/1999/xhtml http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd"
   xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
   xmlns:xhtml="http://www.w3.org/1999/xhtml" >
     <url>
       <loc>https://darmau.design</loc>
       <xhtml:link rel="alternate" hreflang="zh-CN" href="https://darmau.design/"/>
        <xhtml:link rel="alternate" hreflang="en" href="https://darmau.design/en"/>
     </url>
     <url>
       <loc>https://darmau.design/about</loc>
     </url>
     <url>
       <loc>https://darmau.design/memo</loc>
     </url>

     ${articleList.map((item) => {
        return item.localizations ? 
          `
            <url>
              <loc>https://darmau.design/article/${item.url}</loc>
              <xhtml:link rel="alternate" hreflang="zh-CN" href="https://darmau.design/article/${item.url}"/>
              <xhtml:link rel="alternate" hreflang="en" href="https://darmau.design/en/article/${item.url}"/>
           </url>
         ` : `
            <url>
              <loc>https://darmau.design/article/${item.url}</loc>
              <xhtml:link rel="alternate" hreflang="zh-CN" href="https://darmau.design/article/${item.url}"/>
            </url>
         `;
       })
       .join("")}

       ${albumList.map((item) => {
        return item.localizations ? 
          `
            <url>
              <loc>https://darmau.design/album/${item.url}</loc>
              <xhtml:link rel="alternate" hreflang="zh-CN" href="https://darmau.design/album/${item.url}"/>
              <xhtml:link rel="alternate" hreflang="en" href="https://darmau.design/en/album/${item.url}"/>
           </url>
         ` : `
            <url>
              <loc>https://darmau.design/album/${item.url}</loc>
              <xhtml:link rel="alternate" hreflang="zh-CN" href="https://darmau.design/album/${item.url}"/>
            </url>
         `;
       })
       .join("")}

       ${videoList.map((item) => {
        return item.localizations ? 
          `
            <url>
              <loc>https://darmau.design/video/${item.url}</loc>
              <xhtml:link rel="alternate" hreflang="zh-CN" href="https://darmau.design/video/${item.url}"/>
              <xhtml:link rel="alternate" hreflang="en" href="https://darmau.design/en/video/${item.url}"/>
           </url>
         ` : `
            <url>
              <loc>https://darmau.design/video/${item.url}</loc>
              <xhtml:link rel="alternate" hreflang="zh-CN" href="https://darmau.design/video/${item.url}"/>
            </url>
         `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const runtime = 'experimental-edge';

export async function getServerSideProps({ res }: any) {
  // We make an API call to gather the URLs for our site
  const { data } = await client.query({ query: GET_LINKS });
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
  query AllLinks {
    albums {
      data {
        attributes {
          url
          localizations {
            data {
              id
            }
          }
        }
      }
    }
    articles {
      data {
        attributes {
          url
          localizations {
            data {
              id
            }
          }
        }
      }
    }
    videos {
      data {
        attributes {
          url
          localizations {
            data {
              id
            }
          }
        }
      }
    }
  }
`;
