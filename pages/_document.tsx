import Document, { Html, Head, Main, NextScript ,DocumentContext } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): React.ReactElement {
    return (
      <Html>
        <Head />
        <body className="bg-white dark:bg-darkBlack selection:bg-purple-400 overflow-y-scroll scrollbar scrollbar-thumb-primary scrollbar-track-gray-100 dark:scrollbar-track-darkGrey scrollbar-thin">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;