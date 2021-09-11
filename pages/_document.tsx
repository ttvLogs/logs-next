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
        <body className="bg-white dark:bg-darkBlack">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;