import Header from "./Header";
import Footer from "./Footer";
import { Props } from "@/types/default";
import ScrollToTop from "./ScrollToTop";

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main>
        <ScrollToTop />
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout;