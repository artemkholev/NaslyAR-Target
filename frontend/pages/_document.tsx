import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => (
  <Html className="page" lang="ru">
    <Head>
      <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
      {/* <link rel="manifest" href="/manifest.json" /> */}
      <link
        href="/icons/favicon-16x16.png"
        rel="icon"
        sizes="16x16"
        type="image/png"
      />
      <link
        href="/icons/favicon-32x32.png"
        rel="icon"
        sizes="32x32"
        type="image/png"
      />
      <link href="/apple-icon.png" rel="apple-touch-icon" />
      <meta content="#000" name="theme-color" />
    </Head>
    <body className="page__body">
      <Main />
      <div id="modal" />
      <div id="notification" />
      <NextScript />
    </body>
  </Html>
);

export default Document;