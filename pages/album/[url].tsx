import client from "@/apollo-client";
import Carousel from "@/components/Carousel";
import { Comments } from "@/components/Comment";
import MapWithExif from "@/components/Map";
import ConvertToDate from "@/function/ConvertDate";
import { gql } from "@apollo/client";
import {
  CalendarIcon
} from "@heroicons/react/20/solid";
import { ArticleJsonLd, NextSeo } from "next-seo";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import { ContentList, ContentsProps } from "../../function/Types";

export default function Album({ album }: ContentsProps) {

  const previewPhoto = album.gallery.data.map((photo: ContentList) => {
    return {
      smallSrc: photo.attributes.formats.small.url,
      smallWidth: photo.attributes.formats.small.width,
      smallHeight: photo.attributes.formats.small.height,
      alt: album.title,
      largeWidth: photo.attributes.width / 2,
      largeHeight: photo.attributes.height / 2,
      original: photo.attributes.url,
    }
  });


  return (
    <>
      <NextSeo
        title={album.title}
        description={album.description}
        canonical={`https://darmau.design/album/${album.url}`}
        languageAlternates={[{
          hrefLang: 'en',
          href: `https://darmau.design/en/album/${album.url}`,
        }]}
        openGraph={{
          url: `https://darmau.design/album/${album.url}`,
          title: album.title,
          description: album.description,
          images: [{
            url: album.gallery.data[0].attributes.url,
            width: album.gallery.data[0].attributes.width,
            height: album.gallery.data[0].attributes.height,
            alt: album.gallery.data[0].attributes.alternativeText,
            type: 'image/jpeg',
          }]
        }}
      />
      {/* 结构化搜索数据 */}
      <ArticleJsonLd
        url={`https://darmau.design/album/${album.url}`}
        title={album.title.title}
        images={[
          album.gallery.data[0].attributes.url
        ]}
        datePublished={album.publishDate}
        authorName={[{name: '李大毛', url: 'https://darmau.design'}]}
        publisherName="可可托海没有海"
        publisherLogo="/img/logo.svg"
        description={album.description}
        isAccessibleForFree={true}
      />

      <main className="mx-auto max-w-7xl pt-8 mb-8 sm:px-6 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-8">

            <Carousel photos={previewPhoto} />

            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:col-span-1 lg:mt-0">
              <h1 className="text-3xl font-bold mb-4 tracking-tight text-gray-900">
                {album.title}
              </h1>

              <div className="flex gap-1 items-center text-sm mb-4 text-gray-600">
                <CalendarIcon className="h-4 w-4" />
                {ConvertToDate(album.publishDate)}
              </div>

              <div className="mt-3">
                <div className="mt-6">
                  <div className="space-y-6 text-base text-gray-700">
                    {album.description}
                  </div>
                </div>
              </div>
              {/* 放置地图 */}
              <MapWithExif src={previewPhoto[0].original} />
              <Comments location={""} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps({ params, locale }: any) {
  const filters = {
    url: { eq: params.url },
  };
  const { data } = await client.query({
    query: GET_ALBUM,
    variables: {
      filters,
      locale: locale,
    },
  });
  return {
    props: {
      album: data.albums.data[0].attributes,
    },
    revalidate: 60 * 60 * 24 * 7,
  };
}

// 生成静态页面参数
export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_ALL_ALBUM,
  });
  const paths = data.albums.data.flatMap((album: ContentList) => {
    const albumPaths = [
      { params: { url: album.attributes.url }, locale: "zh-CN" },
    ];

    if (album.attributes.localizations?.data) {
      albumPaths.push({
        params: { url: album.attributes.url },
        locale: "en",
      });
    }

    return albumPaths;
  });
  return {
    paths,
    fallback: 'blocking',
  };
}

// 获取所有相册的url，用于生成静态页面
const GET_ALL_ALBUM = gql`
  query Albums {
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
  }
`;

// 获取相册详细数据
const GET_ALBUM = gql`
  query Album($locale: I18NLocaleCode, $filters: AlbumFiltersInput) {
    albums(locale: $locale, filters: $filters) {
      data {
        attributes {
          title
          description
          location
          publishDate
          gallery {
            data {
              attributes {
                url
                width
                height
                formats
              }
            }
          }
          url
        }
      }
    }
  }
`;
