import client from "@/apollo-client";
import { ContentList, ContentsProps } from "@/function/Types";
import { gql } from "@apollo/client";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

export default function ArticlesByYears({
  articles,
}: ContentsProps) {
  const router = useRouter();
  const {
    query: { year },
  } = router;

  return (
    <div>
      以下是{year}年的文章
      <ol>
        {articles.map((item: ContentList, index: number) => (
          <li key={index}>{item.attributes.title}</li>
        ))}
      </ol>
    </div>
  );
}

// 根据年份筛选文章
const GET_ARTICLES_BY_YEARS = gql`
  query Articles(
    $filters: ArticleFiltersInput
    $locale: I18NLocaleCode
    $pagination: PaginationArg
  ) {
    articles(filters: $filters, locale: $locale, pagination: $pagination) {
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
      }
      meta {
        pagination {
          total
          pageSize
          page
        }
      }
    }
  }
`;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { locale, query } = context;
  const { year } = query;

  // 检测年份是否合法
  const yearRegex =  /^\d{4}$/;
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
