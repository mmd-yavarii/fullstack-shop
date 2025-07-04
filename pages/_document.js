import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="fa" dir="rtl">
      <Head>
        <link rel="icon" href="/icone.png" type="image/png" />
        <title>فروشگاه نکست</title>
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
