import client from "@/apollo-client";
import Body from "@/components/Body";
import Catalog from "@/components/Catalog";
import WordCount from "@/components/WordCount";
import CDN from "@/function/CDN";
import ConvertToDate from "@/function/ConvertDate";
import { gql } from "@apollo/client";
import { CalendarIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { ContentList } from "../../function/Types";

export default function Article({ article }: any) {
  return (
    <div className="bg-white py-16 px-6 max-w-5xl mx-auto lg:py-32 lg:grid lg:grid-cols-article lg:px-8 lg:gap-12">
      <main className="w-full text-base leading-7 text-gray-700 lg:col-span-1">
        {/* 封面和标题 */}
        <header>
          <Link className="mb-6 text-base font-semibold leading-7 text-indigo-600 hover:font-bold cursor-pointer"
          href={article.article_category.data.attributes.url}>
            {article.article_category.data.attributes.title ?? "无分类"}
          </Link>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {article.title}
          </h1>
          <p className="my-6 text-xl leading-8">{article.description}</p>
          {/* 发布日期和字数统计 */}
          <div className="flex gap-1 items-center text-sm mb-4">
            <CalendarIcon className="h-4 w-4" />
            {ConvertToDate(article.publishDate)}
          </div>

          {article.cover.data ? (
            // 如果没有封面图显示分割线
            <Image
              src={CDN(article.cover.data.attributes.url)}
              alt={article.title}
              width={1280}
              height={720}
              priority
              className="rounded-lg bg-gray-50 object-cover my-6"
            />
          ) : (
            <div className="relative my-8">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm uppercase text-gray-500">
                  Continue
                </span>
              </div>
            </div>
          )}
          <WordCount main={article.main} />
        </header>

        {/* 正文 */}
        <div className="text-base leading-7 text-gray-700">
          <Body html={article.main} />
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
    revalidate: 60,
  };
}

// 生成静态页面参数
export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_ALL_ARTICLE,
  });
  const paths = data.articles.data.flatMap((article: ContentList) => {
    const articlePaths = [
      { params: { url: article.attributes.url }, locale: "zh-CN" },
    ];

    if (article.attributes.localizations?.data.length! > 0) {
      articlePaths.push({
        params: { url: article.attributes.url },
        locale: "en",
      });
    }

    return articlePaths;
  });
  return {
    paths,
    fallback: false,
  };
}

// 获取所有文章的url，用于生成静态页面
const GET_ALL_ARTICLE = gql`
  query Articles {
    articles {
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
