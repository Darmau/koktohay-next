import client from "@/apollo-client";
import { gql } from "@apollo/client";
import { ContentList } from "../api/Types";
import options from "../api/TextStyle";
import parse from "html-react-parser";

export default function Article({ article }: any) {
  const styles = options;

  return (
    <div className="bg-white py-32 px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        {/* 正文部分 */}
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{article.title}</h1>
        <article className="text-base leading-7 text-gray-700">
          {parse(article.main, styles)}
        </article>
      </div>
    </div>
  );
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
      article: data.articles.data[0].attributes,
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
          main
          description
          cover {
            data {
              attributes {
                url
              }
            }
          }
          publishDate
          tag {
            name
          }
          article_category {
            data {
              attributes {
                title
                url
              }
            }
          }
        }
      }
    }
  }
`;
