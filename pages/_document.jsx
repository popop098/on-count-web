import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";
export default function Document() {
  return (
    <Html lang="ko">
        <Head>
            <Script async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2779482138205092"
                    crossOrigin="anonymous"></Script>
            <meta name="google-adsense-account" content="ca-pub-2779482138205092"/>
        </Head>
        <body className="antialiased">
        <Main/>
        <NextScript/>
            </body>
    </Html>
);
}
