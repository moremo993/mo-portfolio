import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="description" content="Story Engine - React Three Fiber" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}