import client from "@/apollo-client";
import PageNotFound from "@/components/404";
import BlogPostItem from "@/components/BlogPostItem";
import BlogPostTop from "@/components/BlogPostTop";
import BlogSideCategory from "@/components/BlogSideCategory";
import BlogSideTopic from "@/components/BlogSideTopic";
import BlogSideYear from "@/components/BlogSideYear";
import Pagination from "@/components/Pagination";
import { ContentList, ContentsProps } from "@/pages/function/Types";
import { gql } from "@apollo/client";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

export default function AllArticles({
  articles,
  categories,
  topics,
  pagination,
  pageSize,
}: ContentsProps) {
  const router = useRouter();
  const {
    query: { page },
  } = router;

  // 若页码超出范围，则返回404页面
  if (Number(page) > pagination!.pageCount) {
    return <PageNotFound />;
  }

  // 针对第一篇文章采用特殊样式
  let theNewest = new Array();
  let articlePosts = articles;
  if (page === "1") {
    theNewest = articles.slice(0, 1);
    articlePosts = articles.slice(1, articles.length);
  }

  return (
    <div className="bg-white py-8 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* 封面文章 */}
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-full">
          {page === "1" ? <BlogPostTop post={theNewest[0]} /> : <p>test</p>}
        </div>

        {/* 其他文章和侧边栏 */}
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 border-t border-gray-200 pt-8 mt-8 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-16">
          {/* 文章列表 */}
          <div className="space-y-20 lg:col-span-2 lg:space-y-16">
            {articlePosts.map((item: ContentList) => (
              <BlogPostItem post={item} key={item.id} />
            ))}
            <Pagination
              currentPage={Number(page)}
              totalEntries={pagination!.total}
              itemPerPage={pageSize}
            />
          </div>
          {/* 侧边栏 */}
          <div className="space-y-20 lg:col-span-1 lg:space-y-20">
            <BlogSideCategory category={categories} />
            <BlogSideYear />
            <BlogSideTopic topics={topics} />
          </div>
        </div>
      </div>
    </div>
  );
}

const GET_ARTICLES = gql`
  query Articles(
    $sort: [String]
    $pagination: PaginationArg
    $locale: I18NLocaleCode
  ) {
    articles(sort: $sort, pagination: $pagination, locale: $locale) {
      data {
        attributes {
          title
          description
          publishDate
          url
          cover {
            data {
              attributes {
                url
              }
            }
          }
          article_category {
            data {
              attributes {
                title
              }
            }
          }
        }
        id
      }
      meta {
        pagination {
          total
          pageCount
          page
        }
      }
    }
    articleCategories(locale: $locale) {
      data {
        attributes {
          title
          url
        }
        id
      }
    }
    topics(locale: $locale) {
    data {
      attributes {
        title
        url
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

export const getServerSideProps: GetServerSideProps<ContentsProps> = async (
  context: GetServerSidePropsContext
) => {
  const { locale, query } = context;
  const { page } = query;
  const pagination = {
    pageSize: 10,
    page: Number(page),
  };
  const { data } = await client.query({
    query: GET_ARTICLES,
    variables: {
      locale,
      pagination,
      sort: ["publishDate:DESC"],
    },
  });

  return {
    props: {
      articles: data.articles.data,
      categories: data.articleCategories.data,
      topics: data.topics.data,
      pagination: data.articles.meta.pagination,
      pageSize: pagination.pageSize,
    },
  };
};
