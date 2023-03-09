import client from "@/apollo-client";
import PageNotFound from "@/components/404";
import Pagination from "@/components/Pagination";
import getLabel from "@/function/GetLabel";
import NextJsImage from "@/function/NextJsImage";
import { ContentList, ContentsProps, Labels } from "@/function/Types";
import { gql } from "@apollo/client";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { NextSeo } from "next-seo";
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

  const label = getLabel(labels, locale);

  // 若页码超出范围，则返回404页面
  if (Number(page) > pagination!.pageCount) {
    return <PageNotFound />;
  }

  const coverArray = albums.map((item: ContentList) => {
    const ratio =
      item.attributes.cover.data.attributes.formats.large.width /
      item.attributes.cover.data.attributes.formats.large.height;

    return {
      src: item.attributes.cover.data.attributes.formats.large.url,
      width: 960,
      height: 960 / ratio,
      alt: item.attributes.title,
      title: item.attributes.url,
    };
  });

  return (
    <>
      <NextSeo
        title={
          locale === "zh-CN" ? "摄影 | 可可托海没有海" : "Albums | Nomadicoder"
        }
        description={locale === "zh-CN" ? "全部摄影" : "All Photography"}
        canonical="https://darmau.design/albums/1"
        languageAlternates={[
          {
            hrefLang: "en",
            href: "https://darmau.design/en/albums/1",
          },
        ]}
        openGraph={{
          url: `https://darmau.design/albums/1`,
          title: "摄影 | 可可托海没有海",
          description: "全部摄影",
          images: [
            {
              url: coverArray[0].src,
              width: coverArray[0].width,
              height: coverArray[0].height,
              alt: coverArray[0].alt,
              type: "image/jpeg",
            },
          ],
        }}
      />

      <div className="bg-white py-8 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="pt-4 pb-10 lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {label.header}
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              {label.slogan}
            </p>
          </div>

          <PhotoAlbum
            layout="rows"
            photos={coverArray}
            renderPhoto={NextJsImage}
            padding={0}
            spacing={8}
            columns={(containerWidth) => {
              if (containerWidth < 400) return 2;
              if (containerWidth < 700) return 3;
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
    </>
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
                formats
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

const labels: Labels = {
  "zh-CN": {
    header: "摄影",
    slogan: "只用的起副厂镜头的业余摄影师",
  },
  en: {
    header: "Photography",
    slogan: "An amateur photographer who can only use a factory lens",
  },
};
