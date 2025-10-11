import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";
export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <Script
          id="adsbygoogle-script"
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2779482138205092"
          crossOrigin="anonymous"
        ></Script>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-PS481MY3B3"
        ></Script>
        <Script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-PS481MY3B3');
                `,
          }}
        ></Script>
        <meta name="google-adsense-account" content="ca-pub-2779482138205092" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
