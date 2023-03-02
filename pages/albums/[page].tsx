import client from "@/apollo-client";
import PageNotFound from "@/components/404";
import Pagination from "@/components/Pagination";
import NextJsImage from "@/function/NextJsImage";
import { ContentList, ContentsProps } from "@/function/Types";
import { gql } from "@apollo/client";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { PhotoAlbum } from "react-photo-album";

export default function AllAlbums({
  albums,
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

  const coverArray = albums.map((item: ContentList) => {
    const ratio = item.attributes.cover?.data?.attributes.width / item.attributes.cover?.data?.attributes.height;

    return {
      src: item.attributes.cover?.data?.attributes.url,
      width: 960,
      height: 960 / ratio,
      alt: item.attributes.title,
    };
  });

  return (
    <div className="bg-white py-8 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <PhotoAlbum 
          layout="rows"
          photos={coverArray}
          renderPhoto={NextJsImage}
          padding={0}
          spacing={2}
          columns={(containerWidth) => {
            if (containerWidth < 400) return 2;
            if (containerWidth < 800) return 3;
            return 4;
        }}
          defaultContainerWidth={960}
          />

        <Pagination
          currentPage={Number(page)}
          totalEntries={pagination!.total}
          itemPerPage={pageSize}
        />
      </div>
    </div>
  );
}

const GET_ALBUMS = gql`
  query Albums(
    $sort: [String]
    $pagination: PaginationArg
    $locale: I18NLocaleCode
  ) {
    albums(sort: $sort, pagination: $pagination, locale: $locale) {
      data {
        attributes {
          title
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
    pageSize: 16,
    page: Number(page),
  };
  const { data } = await client.query({
    query: GET_ALBUMS,
    variables: { locale, pagination, sort: ["publishDate:DESC"] },
  });

  return {
    props: {
      albums: data.albums.data,
      pagination: data.albums.meta.pagination,
      pageSize: pagination.pageSize,
    },
  };
};
