import { Props } from "@/function/Types";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import ScrollToTop from "./ScrollToTop";

const Layout = ({ children }: Props) => {
  const [minHeight, setMinHeight] = useState(0);

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
      <Header id="header" />
      <div style={{ minHeight: minHeight }} className="mt-20 sm:mt-16">
        <ScrollToTop />
        {children}
      </div>
      <Footer id="footer" />
    </>
  );
};

export default Layout;