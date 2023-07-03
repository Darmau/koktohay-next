import client from "@/apollo-client";
import PageNotFound from "@/components/404";
import BlogPostItem from "@/components/BlogPostItem";
import BlogPostTop from "@/components/BlogPostTop";
import BlogSideCategory from "@/components/BlogSideCategory";
import BlogSideYear from "@/components/BlogSideYear";
import Pagination from "@/components/Pagination";
import { ContentList, ContentsProps } from "@/function/Types";
import { gql } from "@apollo/client";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

export default function AllArticles({
  articles,
  categories,
  pagination,
  pageSize,
  locale,
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

  const lang = locale === 'zh-CN' ? '' : 'en/';

  return (
    <>
      <NextSeo
        title={locale === 'zh-CN' ? '文章 | 可可托海没有海' : 'Articles | Nomadicoder' }
        description={locale === 'zh-CN' ? '全部文章' : 'All Articles' }
        canonical={`https://darmau.design/${lang}articles/1`}
        openGraph={{
          url: `https://darmau.design/${lang}articles/1`,
          title: '文章 | 可可托海没有海',
          description: '全部文章',
          images: [{
            url: articlePosts[0].attributes.cover?.data?.attributes.url,
            width: articlePosts[0].attributes.cover?.data?.attributes.width,
            height: articlePosts[0].attributes.cover?.data?.attributes.height,
            alt: articlePosts[0].attributes.title,
            type: 'image/jpeg',
          }]
        }}
      />

      <div className="bg-white py-8 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* 封面文章 */}
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-full">
            {page === "1" ? <BlogPostTop post={theNewest[0]} /> : <></>}
          </div>

          {/* 其他文章和侧边栏 */}
          <div
            className={`mx-auto grid max-w-2xl grid-cols-1 gap-8 pt-8 mt-8 ${
              page === "1"
                ? "border-t border-gray-200 sm:mt-16 sm:pt-16"
                : "border-none pt-0"
            } lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-24`}
          >
            {/* 文章列表 */}
            <div className="space-y-20 lg:col-span-2 lg:space-y-16">
              {articlePosts.map((item: ContentList) => (
                <BlogPostItem post={item} key={item.id} />
              ))}
              <Pagination
                currentPage={Number(page)}
                totalEntries={pagination!.total}
                itemPerPage={pageSize}
                path="/articles"
              />
            </div>
            {/* 侧边栏 */}
            <div className="space-y-12 lg:col-span-1 lg:space-y-20">
              <BlogSideCategory category={categories} />
              <BlogSideYear />
            </div>
          </div>
        </div>
      </div>
    </>
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
                width
                height
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

export const runtime = 'experimental-edge';

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
      pagination: data.articles.meta.pagination,
      pageSize: pagination.pageSize,
      locale,
    },
  };
};
