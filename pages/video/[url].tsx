import client from "@/apollo-client";
import { gql } from "@apollo/client";
import { ContentList } from "../api/Types";

export default function Video({video}: any) {
  return <div>{video.attributes.title}</div>;
}

export async function getStaticProps({ params, locale }: any) {
  const filters = {
    url: { eq: params.url },
  }
  const { data } = await client.query({
    query: GET_VIDEO,
    variables: {
      filters,
      locale: locale,
    },
  });
  return {
    props: {
      video: data.videos.data[0],
    },
  };
}

// 生成静态页面参数
export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_ALL_VIDEO,
  });
  const paths = data.videos.data.flatMap((video: ContentList) => ([
    { params: { url: video.attributes.url }, locale: "zh-CN"},
    { params: { url: video.attributes.url }, locale: "en"},
  ]));
  return {
    paths,
    fallback: false,
  };
}

// 获取所有文章的url，用于生成静态页面
const GET_ALL_VIDEO = gql`
  query Videos($locale: I18NLocaleCode) {
    videos(locale: $locale) {
      data {
        attributes {
          url
        }
      }
    }
  }
`;

const GET_VIDEO = gql`
  query Attributes($filters: VideoFiltersInput, $locale: I18NLocaleCode) {
    videos(filters: $filters, locale: $locale) {
      data {
        attributes {
          title
        }
      }
    }
  }
`;
