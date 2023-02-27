import client from "@/apollo-client";
import { gql } from "@apollo/client";
import { ContentList } from "../api/Types";

export default function Article({ article }: any) {
  return <div>{article.attributes.title}</div>;
}

export async function getStaticProps({ params, locale }: any) {
  const filters = {
    url: { eq: params.url },
  };
  const { data } = await client.query({
    query: GET_ARTICLE,
    variables: {
      filters,
      locale: locale,
    },
  });
  return {
    props: {
      article: data.articles.data[0],
    },
  };
}

// 生成静态页面参数
export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_ALL_ARTICLE,
  });
  const paths = data.articles.data.flatMap((article: ContentList) => [
    { params: { url: article.attributes.url }, locale: "zh-CN" },
    { params: { url: article.attributes.url }, locale: "en" },
  ]);
  return {
    paths,
    fallback: false,
  };
}

// 获取所有文章的url，用于生成静态页面
const GET_ALL_ARTICLE = gql`
  query Articles($locale: I18NLocaleCode) {
    articles(locale: $locale) {
      data {
        attributes {
          url
        }
      }
    }
  }
`;

const GET_ARTICLE = gql`
  query Attributes($filters: ArticleFiltersInput, $locale: I18NLocaleCode) {
    articles(filters: $filters, locale: $locale) {
      data {
        attributes {
          title
        }
      }
    }
  }
`;
