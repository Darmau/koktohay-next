import client from "@/apollo-client";
import PageNotFound from "@/components/404";
import Pagination from "@/components/Pagination";
import { ContentList, ContentsProps } from "../../function/Types";
import { gql } from "@apollo/client";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

export default function AllArticles({
  articles,
  pagination,
  pageSize,
}: ContentsProps) {
  const router = useRouter();
  const {
    query: { page },
    locale,
  } = router;

  // 若页码超出范围，则返回404页面
  if (Number(page) > pagination!.pageCount) {
    return <PageNotFound />;
  }

  return (
    <div className="h-full">
      本页为{locale}页面，第{page}页
      <ol>
        {articles.map((item: ContentList, index: number) => (
          <li key={index}>{item.attributes.title}</li>
        ))}
      </ol>
      <Pagination
        currentPage={Number(page)}
        totalEntries={pagination!.total}
        itemPerPage={pageSize}
      />
    </div>
  );
}

const GET_ARTICLES = gql`
  query Articles(
    $sort: [String]
    $pagination: PaginationArg
    $locale: I18NLocaleCode
  ) {
    articles( sort: $sort, pagination: $pagination, locale: $locale) {
      data {
        attributes {
          title
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
  }
`;

export const getServerSideProps: GetServerSideProps<ContentsProps> = async (
  context: GetServerSidePropsContext
) => {
  const { locale, query } = context;
  const { page } = query;
  const pagination = {
    pageSize: 2,
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
      pagination: data.articles.meta.pagination,
      pageSize: pagination.pageSize,
    },
  };
};
