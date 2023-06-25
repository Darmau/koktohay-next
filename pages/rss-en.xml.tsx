// 本文件用于动态生成RSS文件
import client from "@/apollo-client";
import { ContentsProps } from "@/function/Types";
import { gql } from "@apollo/client";
import { Feed } from "feed";
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";

const feed = new Feed({
  title: "Nomadicoder RSS",
  description: "Darmau's Personal Website",
  id: "https://darmau.design/en",
  link: "https://darmau.design/en",
  language: "en",
  image: "/img/default-cover.jpg",
  favicon: "/img/logo.svg",
  feedLinks: {
    RSS2: "https://darmau.design/rss-en.xml",
  },
  copyright: `©${new Date().getFullYear()} 李大毛`,
  author: {
    name: "Darmau",
    email: "contact@darmau.design",
    link: "https://darmau.design/en",
  },
});

export const runtime = 'edge';

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<any>> => {
  const { res } = context;
  feed.items =[]
  const { data } = await client.query({
    query: GET_RSS,
    variables: {
      sort: ["publishDate:desc"],
      pagination: {
        limit: 20,
      },
      locale: "en",
    },
  });
  const articles = data.articles.data;

  articles.forEach((article: ContentsProps) => {
    feed.addItem({
      title: article.attributes.title,
      id: article.id,
      link: `https://darmau.design/en/article/${article.attributes.url}`,
      description: article.attributes.description,
      content: article.attributes.main,
      author: [
        {
          name: "Darmau",
          email: "contact@darmau.design",
          link: "https://darmau.design/en",
        },
      ],
      contributor: [
        {
          name: "Darmau",
          email: "contact@darmau.design",
          link: "https://darmau.design/en",
        },
      ],
      date: new Date(article.attributes.publishDate),
      image: article.attributes.cover.data.attributes.url,
    });
  });

  const cacheMaxAgeUntilStaleSeconds = 5; // 1 minute
  const cacheMaxAgeStaleDataReturnSeconds = 30; // 60 minutes
  res.setHeader(
    "Cache-Control",
    `public, s-maxage=${cacheMaxAgeUntilStaleSeconds}, stale-while-revalidate=${cacheMaxAgeStaleDataReturnSeconds}`
  );

  res.setHeader("Content-Type", "text/xml");
  res.write(feed.rss2());
  res.end();

  return { props: {} };
};

export default function RSS() {}

const GET_RSS = gql`
  query Articles($sort: [String], $pagination: PaginationArg, $locale: I18NLocaleCode) {
    articles(sort: $sort, pagination: $pagination, locale: $locale) {
      data {
        attributes {
          title
          url
          publishDate
          description
          main
          cover {
            data {
              attributes {
                url
              }
            }
          }
        }
        id
      }
    }
  }
`;