import client from "@/apollo-client";
import ConvertToDate from "@/function/ConvertDate";
import { gql } from "@apollo/client";
import { CalendarIcon } from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";
import { ContentList, ContentsProps } from "../../function/Types";
import Image from "next/image";
import xiguaIcon from "@/public/img/video-xigua.svg";
import bilibiliIcon from "@/public/img/video-bilibili.svg";
import youtubeIcon from "@/public/img/video-youtube.svg";
import { NextSeo } from "next-seo";

export default function Video({ video }: ContentsProps) {
  const { xigua, bilibili, youtube } = video;
  const videoSources = [
    {
      name: "西瓜视频",
      value: xigua,
      icon: (
        <Image
          className="h-auto w-auto"
          src={xiguaIcon}
          alt="西瓜视频"
          width={136}
          height={72}
        />
      ),
    },
    {
      name: "YouTube",
      value: youtube,
      icon: (
        <Image
          className="h-auto w-auto"
          src={youtubeIcon}
          alt="YouTube"
          width={136}
          height={72}
        />
      ),
    },
    {
      name: "哔哩哔哩",
      value: bilibili,
      icon: (
        <Image
          className="h-auto w-auto"
          src={bilibiliIcon}
          alt="哔哩哔哩"
          width={136}
          height={72}
        />
      ),
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  let frameKey = 0;

  useEffect(() => {
    const iframe = document.querySelector("#video-frame");
    iframe!.setAttribute("src", videoSources[activeIndex].value);
    frameKey++;
  }, [activeIndex, videoSources]);

  return (
    <>
      <NextSeo
        title={video.title}
        description={video.description}
        canonical={`https://darmau.design/video/${video.url}`}
        languageAlternates={[
          {
            hrefLang: "en",
            href: `https://darmau.design/en/video/${video.url}`,
          },
        ]}
        openGraph={{
          url: `https://darmau.design/video/${video.url}`,
          title: video.title,
          description: video.description,
          images: [
            {
              url: video.cover.data.attributes.url,
              width: video.cover.data.attributes.width,
              height: video.cover.data.attributes.height,
              alt: video.cover.data.attributes.alternativeText,
              type: "image/jpeg",
            },
          ],
        }}
      />

      <main className="mx-auto max-w-7xl pt-8 mb-8 sm:px-6 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-8">
            {/* 视频主体 */}
            <div className="col-span-2 px-4">
              <iframe
                key={frameKey}
                id="video-frame"
                title={video.title}
                className="w-full h-auto aspect-video"
                src={videoSources[activeIndex].value}
                allowFullScreen
              ></iframe>
              <div className="py-4 flex gap-4">
                {videoSources.map(
                  (source, index) =>
                    source.value && (
                      <button
                        key={source.name}
                        className="border rounded-md px-2 py-1 border-gray-200 bg-white drop-shadow-sm transition-all hover:drop-shadow-md"
                        onClick={() => {
                          setActiveIndex(index);
                        }}
                      >
                        {source.icon}
                      </button>
                    )
                )}
              </div>
            </div>

            {/* 视频信息 */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:col-span-1 lg:mt-0">
              <h1 className="text-3xl mb-4 font-bold tracking-tight text-gray-900">
                {video.title}
              </h1>

              <div className="flex gap-1 items-center text-sm mb-4 text-gray-600">
                <CalendarIcon className="h-4 w-4" />
                {ConvertToDate(video.publishDate)}
              </div>

              <div className="mt-3">
                <div className="mt-6">
                  <div className="space-y-6 text-base text-gray-700">
                    {video.description}
                  </div>
                </div>
              </div>
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
    query: GET_VIDEO,
    variables: {
      filters,
      locale: locale,
    },
  });
  return {
    props: {
      video: data.videos.data[0].attributes,
    },
    revalidate: 60,
  };
}

// 生成静态页面参数
export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_ALL_VIDEO,
  });
  const paths = data.videos.data.flatMap((video: ContentList) => {
    const videoPaths = [
      { params: { url: video.attributes.url }, locale: "zh-CN" },
    ];

    if (video.attributes.localizations?.data) {
      videoPaths.push({
        params: { url: video.attributes.url },
        locale: "en",
      });
    }

    return videoPaths;
  });
  return {
    paths,
    fallback: false,
  };
}

// 获取所有文章的url，用于生成静态页面
const GET_ALL_VIDEO = gql`
  query Videos {
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

const GET_VIDEO = gql`
  query Video($filters: VideoFiltersInput, $locale: I18NLocaleCode) {
    videos(filters: $filters, locale: $locale) {
      data {
        attributes {
          title
          description
          publishDate
          xigua
          bilibili
          youtube
          cover {
            data {
              attributes {
                url
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;
