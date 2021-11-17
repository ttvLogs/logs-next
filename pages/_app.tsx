import "../styles/globals.css";
import Router from "next/router";
import { Fragment, useState, useEffect } from "react";
import { Loading } from "../components/";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }: Props) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const Layout = Component.layout ?? Fragment;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <>
      <ThemeProvider
        attribute="class"
        themes={["dark", "light"]}
      >
        {loading ? (
          <Loading />
        ) : (
          <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
        )}
      </ThemeProvider>
    </>
  );
}
export default MyApp;
