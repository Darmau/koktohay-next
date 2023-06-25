import client from "@/apollo-client";
import BlogPostItem from "@/components/BlogPostItem";
import getLabel from "@/function/GetLabel";
import { ContentList, ContentsProps, Labels } from "@/function/Types";
import { gql } from "@apollo/client";
import { GetServerSidePropsContext } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

export default function ArticlesByYears({ articles }: ContentsProps) {
  const router = useRouter();
  const {
    query: { year },
    locale,
  } = router;
  const label = getLabel(labels, locale);

  return (
    <>
      <NextSeo
        title={locale === 'zh-CN' ? `${year}年的所有文章 | 可可托海没有海` : `All Articles in ${year} | Nomadicoder` }
        description={locale === 'zh-CN' ? `${year}年的所有文章 | 可可托海没有海` : `All Articles in ${year} | Nomadicoder` }
        canonical={`https://darmau.design/articles/${year}`}
        languageAlternates={[
          {
            hrefLang: "en",
            href: `https://darmau.design/en/articles/${year}`,
          },
        ]}
      />

      <div className="bg-white py-8 sm:py-16">
        <div className="mx-auto max-w-2xl px-6 lg:px-8 lg:max-w-4xl">
          <div className="bg-white py-12 sm:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <p className="text-base font-semibold leading-7 text-blue-600">
                  {label.title}
                </p>
                <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  {year}年
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  {label.description}
                </p>
              </div>
            </div>
          </div>

          {/* 其他文章 */}
          <div className="mx-auto flex flex-col gap-8 border-t border-gray-200 pt-8 mt-8 sm:mt-16 sm:pt-16  lg:gap-24">
            {/* 文章列表 */}
            <div className="space-y-12 lg:space-y-16">
              {articles.map((item: ContentList) => (
                <BlogPostItem post={item} key={item.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// 根据年份筛选文章
const GET_ARTICLES_BY_YEARS = gql`
  query Articles($filters: ArticleFiltersInput, $locale: I18NLocaleCode) {
    articles(filters: $filters, locale: $locale) {
      data {
        attributes {
          title
          description
          url
          publishDate
          cover {
            data {
              attributes {
                url
                alternativeText
                width
                height
              }
            }
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
        id
      }
    }
  }
`;

export const runtime = 'edge'

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { locale, query } = context;
  const { year } = query;

  // 检测年份是否合法
  const yearRegex = /^\d{4}$/;
  let yearNumber = Number(year);
  if (!yearRegex.test(year as string)) {
    yearNumber = 2023;
  }
  const filters = {
    publishDate: {
      gte: `${yearNumber}-01-01T00:00:00+08:00`,
      lte: `${yearNumber}-12-31T23:59:59+08:00`,
    },
  };
  const { data } = await client.query({
    query: GET_ARTICLES_BY_YEARS,
    variables: {
      locale,
      filters,
    },
  });

  return {
    props: {
      articles: data.articles.data,
    },
  };
};

const labels: Labels = {
  "zh-CN": {
    title: "以下文章发布于",
    description: "想了一下每年就那么几篇文章，没必要做分页了",
  },
  en: {
    title: "The following articles were published in",
    description:
      "I thought there were only a few articles a year, so there was no need to do pagination",
  },
};
