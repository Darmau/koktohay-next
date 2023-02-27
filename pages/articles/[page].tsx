import client from "@/apollo-client";
import PageNotFound from "@/components/404";
import BlogPostItem from "@/components/BlogPostItem";
import BlogPostTop from "@/components/BlogPostTop";
import BlogSideCategory from "@/components/BlogSideCategory";
import BlogSideTopic from "@/components/BlogSideTopic";
import Pagination from "@/components/Pagination";
import { ContentList, ContentsProps } from "@/pages/api/Types";
import { gql } from "@apollo/client";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

export default function AllArticles({
  articles,
  categories,
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
    theNewest = articles.slice(0,1);
    articlePosts = articles.slice(1, articles.length)
  }

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-6 lg:gap-x-12 xl:gap-x-20">
          <div className="lg:col-span-4 rounded-xl">
            <div className="mx-auto max-w-3xl">
              
              {/* 如果是第一页，最新文章放大显示 */}
              {page === "1" ? <BlogPostTop post={theNewest[0]} /> : <p>test</p>}

              {/* 文章列表 */}
              <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
                {articlePosts.map((item: ContentList) => (
                  <BlogPostItem post={item} key={item.id} />
                ))}
              </div>

              <Pagination
                currentPage={Number(page)}
                totalEntries={pagination!.total}
                itemPerPage={pageSize}
              />
            </div>
          </div>

          {/* 侧边栏 */}
          <aside className="lg:col-span-2">
            <BlogSideCategory category={categories} />
            <BlogSideTopic category={categories} />
          </aside>
        </div>
      </div>
    </section>
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
  }
`;

export const getServerSideProps: GetServerSideProps<ContentsProps> = async (
  context: GetServerSidePropsContext
) => {
  const { locale, query } = context;
  const { page } = query;
  const pagination = {
    pageSize: 4,
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
      pagination: data.articles.meta.pagination,
      pageSize: pagination.pageSize,
    },
  };
};
