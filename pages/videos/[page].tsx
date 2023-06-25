import client from "@/apollo-client";
import PageNotFound from "@/components/404";
import Pagination from "@/components/Pagination";
import ConvertToDate from "@/function/ConvertDate";
import getLabel from "@/function/GetLabel";
import { ContentList, ContentsProps, Labels } from "@/function/Types";
import { gql } from "@apollo/client";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function AllVideos({
  videos,
  pagination,
  pageSize,
}: ContentsProps) {
  const router = useRouter();
  const {
    query: { page },
    locale,
  } = router;

  const label = getLabel(labels, locale);
  const lang = locale === "zh-CN" ? "" : "en/";

  // 若页码超出范围，则返回404页面
  if (Number(page) > pagination!.pageCount) {
    return <PageNotFound />;
  }

  return (
    <>
      <NextSeo
        title={locale === 'zh-CN' ? '视频 | 可可托海没有海' : 'Videos | Nomadicoder' }
        description={locale === 'zh-CN' ? '全部视频' : 'All Videos' }
        canonical={`https://darmau.design/${lang}videos/1`}
        openGraph={{
          url: `https://darmau.design/${lang}videos/1`,
          title: '视频 | 可可托海没有海',
          description: '全部视频',
          images: [{
            url: videos[0].attributes.cover.data.attributes.url,
            width: videos[0].attributes.cover.data.attributes.width,
            height: videos[0].attributes.cover.data.attributes.height,
            alt: videos[0].attributes.title,
            type: 'image/jpeg',
          }]
        }}
      />

      <div className="bg-white py-8 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl pt-4 pb-10 lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {label.header}
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              {label.slogan}
            </p>
          </div>

          {/* 视频主体区域 */}
          <div className="mx-auto grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {videos.map((item: ContentList) => (
              <article
                key={item.id}
                className="group relative isolate aspect-video w-full flex flex-col justify-end overflow-hidden cursor-pointer rounded-lg bg-gray-900 px-6 pb-6"
              >
                <Image
                  src={item.attributes.cover.data.attributes.url}
                  alt="cover"
                  className="absolute inset-0 -z-10 h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                  width={672}
                  height={378}
                />
                {/* 黑色遮罩 */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40 transition-all duration-300 group-hover:backdrop-blur-sm" />

                <div className="flex flex-wrap items-center gap-y-1 text-sm leading-6 text-gray-300">
                  <time
                    dateTime={item.attributes.publishDate!.toString()}
                    className="mr-8"
                  >
                    {ConvertToDate(item.attributes.publishDate)}
                  </time>
                </div>
                <h3 className="mt-2 text-xl font-normal leading-7 text-gray-200 transition-all group-hover:text-white">
                  <Link href={`/video/${item.attributes.url}`}>
                    <span className="absolute inset-0" />
                    {item.attributes.title}
                  </Link>
                </h3>
              </article>
            ))}
          </div>

          <Pagination
            currentPage={Number(page)}
            totalEntries={pagination!.total}
            itemPerPage={pageSize}
            path="/videos"
          />
        </div>
      </div>
    </>
  );
}

const GET_VIDEOS = gql`
  query Videos(
    $sort: [String]
    $pagination: PaginationArg
    $locale: I18NLocaleCode
  ) {
    videos(locale: $locale, sort: $sort, pagination: $pagination) {
      data {
        attributes {
          title
          url
          publishDate
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
        id
      }
      meta {
        pagination {
          total
          pageCount
          page
        }
      }
    }
  }
`;

export const runtime = 'edge'

export const getServerSideProps: GetServerSideProps<ContentsProps> = async (
  context: GetServerSidePropsContext
) => {
  const { locale, query } = context;
  const { page } = query;
  const pagination = {
    pageSize: 12,
    page: Number(page),
  };
  const { data } = await client.query({
    query: GET_VIDEOS,
    variables: { locale, pagination, sort: ["publishDate:DESC"] },
  });

  return {
    props: {
      videos: data.videos.data,
      pagination: data.videos.meta.pagination,
      pageSize: pagination.pageSize,
    },
  };
};

const labels: Labels = {
  "zh-CN": {
    header: "视频",
    slogan: "我的原则是想怎么剪就怎么剪",
  },
  en: {
    header: "Videos",
    slogan: "My principle is to cut as I want",
  },
};
