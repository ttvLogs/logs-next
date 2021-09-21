import "../styles/globals.css";
import Router from "next/router";
import { Fragment, useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import Loading from "../components/Loading";

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
      {loading ? (
        <ThemeProvider attribute="class" defaultTheme="system">
          <Loading />
        </ThemeProvider>
      ) : (
        <ThemeProvider attribute="class" defaultTheme="system">
          <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
        </ThemeProvider>
      )}
    </>
  );
}
export default MyApp;
