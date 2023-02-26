import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Props } from "@/pages/api/Types";
import ScrollToTop from "./ScrollToTop";
import { gql } from "@apollo/client";
import client from "@/apollo-client";
import { useRouter } from "next/router";

const Layout = ({ children }: Props) => {
  const [minHeight, setMinHeight] = useState(0);
  const [recentPosts, setRecentPosts] = useState([]);
  const {locale} = useRouter();

  // 获取窗口高度
  useEffect(() => {
    const updateMinHeight = () => {
      const windowHeight = window.innerHeight;
      const headerHeight = document.querySelector("header")?.clientHeight || 0;
      const footerHeight = document.querySelector("footer")?.clientHeight || 0;
      const mainHeight = windowHeight - headerHeight - footerHeight;
      setMinHeight(mainHeight);
    };

    updateMinHeight();
    window.addEventListener("resize", updateMinHeight);

    return () => {
      window.removeEventListener("resize", updateMinHeight);
    };
  }, []);

  useEffect(() => {
    async function getRecentPosts() {
      const {data} = await client.query({
        query: GET_RECENT_ARTICLE,
        variables: {
          locale,
          sort: ["publishDate:DESC"],
          pagination: {
            limit: 3,
          }
        }
      })
      setRecentPosts(data.articles.data);
    }
    getRecentPosts();
  }, [locale]);

  return (
    <>
      <Header id="header" recent={recentPosts} />
      <main style={{ minHeight: minHeight }}>
        <ScrollToTop />
        {children}
      </main>
      <Footer id="footer" />
    </>
  );
};

export default Layout;

const GET_RECENT_ARTICLE = gql`
  query Articles(
    $sort: [String]
    $locale: I18NLocaleCode
    $pagination: PaginationArg
  ) {
    articles(sort: $sort, locale: $locale, pagination: $pagination) {
      data {
        id
        attributes {
          title
          publishDate
          url
        }
      }
    }
  }
`;
