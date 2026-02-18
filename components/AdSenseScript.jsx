import Head from "next/head";
import Script from "next/script";

export default function AdSenseScript() {
  return (
    <>
      <Head>
        <meta name="google-adsense-account" content="ca-pub-2779482138205092" />
      </Head>
      <Script
        id="adsbygoogle-script"
        strategy="lazyOnload"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2779482138205092"
        crossOrigin="anonymous"
      />
    </>
  );
}
