import client from "@/apollo-client";
import BlogPostItem from "@/components/BlogPostItem";
import { ContentList, ContentsProps } from "@/function/Types";
import { gql } from "@apollo/client";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";


export default function Topic({
  topic,
}: ContentsProps) {

  return (
    <div className="bg-white py-8 sm:py-16">
      <div className="mx-auto max-w-2xl px-6 lg:px-8 lg:max-w-4xl">
        {/* 专题标题区域 */}
        <div className="relative isolate overflow-hidden bg-gray-900 py-24 rounded-2xl sm:py-32">
          <Image
            src={topic.cover.data.attributes.url}
            width={1280}
            height={720}
            alt="cover image"
            className="absolute inset-0 -z-10 h-full w-full object-cover brightness-75 overflow-hidden transition duration-300 hover:scale-105"
          />
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                {topic.title}
              </h2>
              <p className="mt-6 text-lg leading-8 text-white">
                {topic.description}
              </p>
            </div>
          </div>
        </div>

        {/* 文章 */}
        <div className="mx-auto flex flex-col gap-8 border-t border-gray-200 pt-8 mt-8 sm:mt-16 sm:pt-16  lg:gap-24">
          {/* 文章列表 */}
          <div className="space-y-12 lg:space-y-16">
            {topic.articles.data.map((item: ContentList) => (
              <BlogPostItem post={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const {locale, query} = context;
  const {name} = query;
  const filters = {
    url: { eq: name}
  }
  const {data} = await client.query({
    query: GET_ARTICLES_BY_TOPIC,
    variables: {
      locale,
      filters,
      sort: ["publishDate:DESC"]
    }
  })
  return {
    props: {
      topic: data.topics.data.attributes,
    }
  }
};

const GET_ARTICLES_BY_TOPIC = gql`
query Articles($sort: [String], $locale: I18NLocaleCode, $filters: TopicFiltersInput) {
  topics(locale: $locale, filters: $filters) {
    data {
      attributes {
        articles(sort: $sort) {
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
              url
              publishDate
            }
            id
          }
        }
        cover {
          data {
            attributes {
              url
            }
          }
        }
        title
        description
      }
    }
  }
}
`