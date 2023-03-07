import client from "@/apollo-client";
import SectionAlbum from "@/components/SectionAlbum";
import SectionArticle from "@/components/SectionArticle";
import SectionCover from "@/components/SectionCover";
import SectionStats from "@/components/SectionStats";
import SectionVideo from "@/components/SectionVideo";
import { ContentsProps } from "@/function/Types";
import { gql } from "@apollo/client";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { NextSeo } from "next-seo";

export default function Home({
  cover,
  articles,
  albums,
  videos,
  locale,
}: ContentsProps) {
  return (
    <>
    <NextSeo 
      title={locale === "zh-CN" ? "首页 | 可可托海没有海" : "Home | Nomadicoder"}
      openGraph={{
        url: "https://darmau.design",
        title: locale === "zh-CN" ? "首页 | 可可托海没有海" : "Home | Nomadicoder",
        images: [{
          url: cover.cover.data.attributes.url,
          width: cover.cover.data.attributes.width,
          height: cover.cover.data.attributes.height,
          type: "image/jpeg",
        }]
      }}
    />
      <div className="isolate bg-white pb-8 sm:pb-16 sm:pt-6">
        <SectionCover article={cover} />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionArticle articles={articles} />
          <SectionAlbum albums={albums} />
          <SectionVideo videos={videos} />
          <SectionStats />
        </div>
      </div>
    </>
  );
}

const GET_HOMEPAGE = gql`
  query Homepage(
    $sort: [String]
    $locale: I18NLocaleCode
    $articleLimit: PaginationArg
    $albumLimit: PaginationArg
    $videoLimit: PaginationArg
  ) {
    articles(sort: $sort, locale: $locale, pagination: $articleLimit) {
      data {
        attributes {
          title
          description
          publishDate
          article_category {
            data {
              attributes {
                title
                url
              }
            }
          }
          url
          cover {
            data {
              attributes {
                url
                height
                width
              }
            }
          }
        }
        id
      }
    }
    albums(pagination: $albumLimit, sort: $sort, locale: $locale) {
      data {
        attributes {
          cover {
            data {
              attributes {
                url
                height
                width
              }
            }
          }
          title
          publishDate
          url
        }
      }
    }
    videos(sort: $sort, pagination: $videoLimit, locale: $locale) {
      data {
        attributes {
          title
          xigua
          publishDate
          cover {
            data {
              attributes {
                url
              }
            }
          }
        }
        id
      }
    }
  }
`;

export const getServerSideProps: GetServerSideProps<ContentsProps> = async (
  context: GetServerSidePropsContext
) => {
  const { locale } = context;
  const { data } = await client.query({
    query: GET_HOMEPAGE,
    variables: {
      sort: ["publishDate:desc"],
      locale,
      articleLimit: { limit: 4 },
      albumLimit: { limit: 12 },
      videoLimit: { limit: 6 },
    },
  });

  return {
    props: {
      cover: data.articles.data[0].attributes,
      articles: data.articles.data.slice(1),
      albums: data.albums.data,
      videos: data.videos.data,
      locale,
    },
  };
};
