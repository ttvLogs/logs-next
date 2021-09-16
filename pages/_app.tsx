import "../styles/globals.css";
import { Fragment } from "react";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import type { Page } from "../types/page";

type Props = AppProps & {
  Component: Page;
};

function MyApp({ Component, pageProps }: Props) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const Layout = Component.layout ?? Fragment;

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
    </ThemeProvider>
  );
}
export default MyApp;
