import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Props } from "@/types/default";
import ScrollToTop from "./ScrollToTop";

const Layout = ({ children }: Props) => {
  const [minHeight, setMinHeight] = useState(0);

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
    }
  }, []);

  return (
    <>
      <Header id="header" />
      <main style={{minHeight: minHeight}}>
        <ScrollToTop />
        {children}
      </main>
      <Footer id="footer" />
    </>
  )
}

export default Layout;