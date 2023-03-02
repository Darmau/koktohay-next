import client from "@/apollo-client";
import { gql } from "@apollo/client";
import Image from "next/image";
import { ContentList } from "../../function/Types";
import PhotoAlbum from "react-photo-album";

export default function Album({ album }: any) {
  const photoArray = album.gallery.data.map((photo: ContentList) => {
    return {
      src: photo.attributes.url,
      width: photo.attributes.width,
      height: photo.attributes.height,
      alt: photo.attributes.alternativeText,
    };
  })


  return (
    <div>
      <div>{album.title}</div>
      <PhotoAlbum layout="columns" photos={photoArray} />
    </div>
  );
}

export async function getStaticProps({ params, locale }: any) {
  const filters = {
    url: { eq: params.url },
  };
  const { data } = await client.query({
    query: GET_ALBUM,
    variables: {
      filters,
      locale: locale,
    },
  });
  return {
    props: {
      album: data.albums.data[0].attributes,
    },
    revalidate: 30,
  };
}

// 生成静态页面参数
export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_ALL_ALBUM,
  });
  const paths = data.albums.data.flatMap((album: ContentList) => {
    const albumPaths = [
      { params: { url: album.attributes.url }, locale: "zh-CN" },
    ];

    if (album.attributes.localizations?.data) {
      albumPaths.push({
        params: { url: album.attributes.url },
        locale: "en",
      });
    }

    return albumPaths;
  });
  return {
    paths,
    fallback: false,
  };
}

// 获取所有相册的url，用于生成静态页面
const GET_ALL_ALBUM = gql`
  query Albums {
    albums {
      data {
        attributes {
          url
        }
      }
    }
  }
`;

// 获取相册详细数据
const GET_ALBUM = gql`
  query Albums($locale: I18NLocaleCode, $filters: AlbumFiltersInput) {
    albums(locale: $locale, filters: $filters) {
      data {
        attributes {
          title
          description
          location
          publishDate
          gallery {
            data {
              attributes {
                url
                alternativeText
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;
