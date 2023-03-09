import client from "@/apollo-client";
import { Comments } from "@/components/Comment";
import ExifInfo from "@/components/ExifInfo";
import MapWithExif from "@/components/Map";
import ConvertToDate from "@/function/ConvertDate";
import { gql } from "@apollo/client";
import { Tab } from "@headlessui/react";
import {
  ArrowSmallLeftIcon,
  ArrowSmallRightIcon,
  ArrowsPointingOutIcon,
  CalendarIcon
} from "@heroicons/react/20/solid";
import { ArticleJsonLd, NextSeo } from "next-seo";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import { ContentList, ContentsProps, PhotoArray } from "../../function/Types";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Album({ album }: ContentsProps) {
  // 根据返回的相册数据，生成一个更简洁结构的图片数组
  const photoArray: PhotoArray = album.gallery.data.map(
    (photo: ContentList) => {
      return {
        src: photo.attributes.url,
        width: photo.attributes.width,
        height: photo.attributes.height,
        alt: album.title,
      };
    }
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [open, setOpen] = useState(false);

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

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={photoArray}
        plugins={[Thumbnails, Zoom]}
      />

      <main className="mx-auto max-w-7xl pt-8 mb-8 sm:px-6 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-8">
            <Tab.Group
              as="div"
              className="flex flex-col-reverse col-span-2 px-4"
              selectedIndex={selectedIndex}
              onChange={(index) => setSelectedIndex(index as number)}
            >
              {/* Image selector */}
              <div className="mx-auto mt-6 block py-4 w-full max-w-2xl lg:max-w-none">
                <Tab.List className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-4">
                  {photoArray.map((image, index: number) => (
                    <Tab
                      key={index}
                      className="relative flex h-32 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                    >
                      {({ selected }) => {
                        const ratio = image.height / image.width;
                        return (
                          <>
                            <span className="absolute inset-0 overflow-hidden rounded-md">
                              <Image
                                src={image.src}
                                alt={image.alt}
                                width={240}
                                height={240 * ratio}
                                priority
                                quality={60}
                                className="h-full w-full object-cover object-center"
                              />
                            </span>
                            <span
                              className={classNames(
                                selected
                                  ? "ring-blue-500"
                                  : "ring-transparent",
                                "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                              )}
                              aria-hidden="true"
                            />
                          </>
                        );
                      }}
                    </Tab>
                  ))}
                </Tab.List>
              </div>

              <Tab.Panels className="w-full relative">
                {photoArray.map((image, index: number) => {
                  return (
                    <Tab.Panel key={index}>
                      {index > 0 && (
                        <button
                          type="button"
                          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-gray-900/20 backdrop-blur hover:bg-gray-900/60 rounded-full p-2"
                          onClick={() => setSelectedIndex(index - 1)}
                        >
                          <ArrowSmallLeftIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </button>
                      )}
                      {index < photoArray.length - 1 && (
                        <button
                          type="button"
                          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-gray-900/20 backdrop-blur hover:bg-gray-900/60 rounded-full p-2"
                          onClick={() => setSelectedIndex(index + 1)}
                        >
                          <ArrowSmallRightIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </button>
                      )}
                      <button
                        type="button"
                        className="absolute top-8 right-4 transform -translate-y-1/2 text-white bg-gray-900/20 backdrop-blur hover:bg-gray-900/60 rounded-full p-2"
                        onClick={() => setOpen(true)}
                      >
                        <ArrowsPointingOutIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </button>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={1280}
                        height={720}
                        className="w-full h-auto object-contain object-center sm:rounded-lg"
                      />

                      <ExifInfo url={image.src} />
                    </Tab.Panel>
                  );
                })}
              </Tab.Panels>
            </Tab.Group>

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
              <MapWithExif src={photoArray[0].src} />
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
              }
            }
          }
          url
        }
      }
    }
  }
`;
