import client from "@/apollo-client";
import BlogPostItem from "@/components/BlogPostItem";
import Pagination from "@/components/Pagination";
import { ContentList, ContentsProps } from "@/function/Types";
import { gql } from "@apollo/client";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

export default function ArticlesByCategory({
  category,
  articles,
  pagination,
  pageSize,
}: ContentsProps) {
  const router = useRouter();
  const { name, page } = router.query;

  return (
    <div className="bg-white py-8 sm:py-16">
      <div className="mx-auto max-w-2xl px-6 lg:px-8 lg:max-w-4xl">
        {/* 分类标题区域 */}
        <div className="relative isolate overflow-hidden bg-gray-900 py-24 rounded-2xl sm:py-32">
          <Image
            src={category.cover.data.attributes.url}
            width={1280}
            height={720}
            alt="cover image"
            className="absolute inset-0 -z-10 h-full w-full object-cover brightness-75 overflow-hidden transition duration-300 hover:scale-105"
          />
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                {category.title}
              </h2>
              <p className="mt-6 text-lg leading-8 text-white">
                {category.description}
              </p>
            </div>
          </div>
        </div>

        {/* 文章 */}
        <div className="mx-auto flex flex-col gap-8 border-t border-gray-200 pt-8 mt-8 sm:mt-16 sm:pt-16  lg:gap-24">
          {/* 文章列表 */}
          <div className="space-y-12 lg:space-y-16">
            {articles.map((item: ContentList) => (
              <BlogPostItem post={item} key={item.id} />
            ))}
            <Pagination
              currentPage={Number(page)}
              totalEntries={pagination!.total}
              itemPerPage={pageSize}
              path={`/category/article/${name}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export const runtime = 'edge';

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { locale, query } = context;
  const { name, page } = query;
  const pagination = {
    pageSize: 10,
    page: Number(page),
  };
  const filters = {
    "article_category": {
      url: { eq: name },
    }
  };
  const articleCategoriesFilters = {
    url: { eq: name },
  };

  const { data } = await client.query({
    query: GET_ARTICLES_BY_CATEGORY,
    variables: {
      locale,
      pagination,
      filters,
      articleCategoriesFilters,
      sort: ["publishDate:DESC"],
    },
  });
  return {
    props: {
      category: data.articleCategories.data[0].attributes,
      articles: data.articles.data,
      pagination: data.articles.meta.pagination,
      pageSize: pagination.pageSize,
    },
  };
};

// 获取制定分类下的文章
const GET_ARTICLES_BY_CATEGORY = gql`
  query Articles(
    $filters: ArticleFiltersInput
    $pagination: PaginationArg
    $locale: I18NLocaleCode
    $sort: [String]
    $articleCategoriesFilters: ArticleCategoryFiltersInput
  ) {
    articles(
      filters: $filters
      pagination: $pagination
      locale: $locale
      sort: $sort
    ) {
      data {
        id
        attributes {
          title
          description
          url
          publishDate
          cover {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
      meta {
        pagination {
          total
          pageCount
          page
        }
      }
    }
    articleCategories(filters: $articleCategoriesFilters) {
      data {
        attributes {
          title
          description
          cover {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;
