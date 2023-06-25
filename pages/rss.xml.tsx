// 本文件用于动态生成RSS文件
import client from "@/apollo-client";
import { ContentsProps } from "@/function/Types";
import { gql } from "@apollo/client";
import { Feed } from "feed";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";

const feed = new Feed({
  title: "可可托海没有海的RSS",
  description: "李大毛没有猫的个人网站",
  id: "https://darmau.design/",
  link: "https://darmau.design/",
  language: "zh-CN",
  image: "/img/default-cover.jpg",
  favicon: "/img/logo.svg",
  feedLinks: {
    RSS2: "https://darmau.design/rss.xml",
  },
  copyright: `©${new Date().getFullYear()} 李大毛`,
  author: {
    name: "李大毛",
    email: "contact@darmau.design",
    link: "https://darmau.design/",
  },
});

export const config = {
  runtime: 'edge',
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> => {
  const { res } = context;
  feed.items = [];
  const { data } = await client.query({
    query: GET_RSS,
    variables: {
      sort: ["publishDate:desc"],
      pagination: {
        limit: 50,
      },
    },
  });
  const articles = data.articles.data;

  articles.forEach((article: ContentsProps) => {
    feed.addItem({
      title: article.attributes.title,
      id: article.id,
      link: `https://darmau.design/article/${article.attributes.url}`,
      description: article.attributes.description,
      content: article.attributes.main,
      author: [
        {
          name: "李大毛",
          email: "contact@darmau.design",
          link: "https://darmau.design/",
        },
      ],
      contributor: [
        {
          name: "李大毛",
          email: "contact@darmau.design",
          link: "https://darmau.design/",
        },
      ],
      date: new Date(article.attributes.publishDate),
      image: article.attributes.cover.data.attributes.url,
    });
  });

  const cacheMaxAgeUntilStaleSeconds = 5;
  const cacheMaxAgeStaleDataReturnSeconds = 30;
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
  query Articles($sort: [String], $pagination: PaginationArg) {
    articles(sort: $sort, pagination: $pagination) {
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
