import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";
export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://openapi.chzzk.naver.com" />

        {/* DNS prefetch for additional performance */}
        <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//openapi.chzzk.naver.com" />

        {/* Google Analytics - Load with lowest priority */}
        <Script
          id="gtag-js"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-PS481MY3B3"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-PS481MY3B3', {
                            page_title: document.title,
                            page_location: window.location.href
                        });
                    `,
          }}
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
