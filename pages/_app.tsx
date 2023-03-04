import Layout from "@/components/layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }: AppProps) {
  const loadingBarRef = useRef<LoadingBarRef>(null);
  const router = useRouter();

  useEffect(() => {
    const start = () => {
      loadingBarRef.current?.continuousStart();
    };

    const stop = () => {
      loadingBarRef.current?.complete();
    };

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", stop);
    router.events.on("routeChangeError", stop);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", stop);
      router.events.off("routeChangeError", stop);
    };
  }, [router.events]);

  return (
    <Layout>
      <LoadingBar color="#f11946" ref={loadingBarRef} />
      <Component {...pageProps} />
      <Analytics />
    </Layout>
  );
}
