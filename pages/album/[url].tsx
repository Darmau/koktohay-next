import client from "@/apollo-client";
import { gql } from "@apollo/client";
import { ContentList } from "../../function/Types";

export default function Album({album}: any) {
  return <div>{album.attributes.title}</div>;
}

export async function getStaticProps({ params, locale }: any) {
  const filters = {
    url: { eq: params.url },
  }
  const { data } = await client.query({
    query: GET_ALBUM,
    variables: {
      filters,
      locale: locale,
    },
  });
  return {
    props: {
      album: data.albums.data[0],
    },
  };
}

// 生成静态页面参数
export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_ALL_ALBUM,
  });
  const paths = data.albums.data.flatMap((album: ContentList) => ([
    { params: { url: album.attributes.url }, locale: "zh-CN"},
    { params: { url: album.attributes.url }, locale: "en"},
  ]));
  return {
    paths,
    fallback: false,
  };
}

// 获取所有文章的url，用于生成静态页面
const GET_ALL_ALBUM = gql`
  query Albums($locale: I18NLocaleCode) {
    albums(locale: $locale) {
      data {
        attributes {
          url
        }
      }
    }
  }
`;

const GET_ALBUM = gql`
  query Attributes($filters: AlbumFiltersInput, $locale: I18NLocaleCode) {
    albums(filters: $filters, locale: $locale) {
      data {
        attributes {
          title
        }
      }
    }
  }
`;
