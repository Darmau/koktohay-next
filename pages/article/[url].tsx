import client from "@/apollo-client";
import { gql } from "@apollo/client";
import { ContentList } from "../../function/Types";
import Body from "@/components/Body";
import Catalog from "@/components/Catalog";
import Image from "next/image";

export default function Article({ article }: any) {
  return (
    <div className="bg-white py-32 px-6 max-w-5xl mx-auto  lg:grid lg:grid-cols-article lg:px-8 lg:gap-12">
      <main className="w-full text-base leading-7 text-gray-700 lg:col-span-1">
        {/* 封面和标题 */}
        <header>
          <p className="text-base font-semibold leading-7 text-indigo-600">
            {article.article_category.data.attributes.title ?? '无分类'}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {article.title}
          </h1>
          <Image
            src={article.cover.data.attributes.url}
            alt={article.title}
            width={1280}
            height={720}
            className="rounded-lg bg-gray-50 object-cover my-4"
          />
        </header>

        {/* 正文 */}
        <div className="text-base leading-7 text-gray-700">
          <Body main={article.main} />
        </div>
      </main>

      {/* 目录 */}
      <aside className="h-full lg:col-span-1">
        <Catalog main={article.main} />
      </aside>
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
// 获取文章详细数据
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
