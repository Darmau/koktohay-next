import { Props } from "@/function/Types";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import ScrollToTop from "./ScrollToTop";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const Layout = ({ children }: Props) => {
  const [minHeight, setMinHeight] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const { locale } = useRouter();

  const Search = dynamic(() => import("@/components/Search"));

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

  return (
    <>
      {showSearch && locale === "zh-CN" && (
        <Search
          onClose={() => {
            setShowSearch(false);
          }}
        />
      )}
      <Header
        id="header"
        onSearchButtonClick={() => {
          setShowSearch(true);
        }}
      />
      <div style={{ minHeight: minHeight }} className="mt-20 sm:mt-16">
        <ScrollToTop />
        {children}
      </div>
      <Footer id="footer" />
    </>
  );
};

export default Layout;
