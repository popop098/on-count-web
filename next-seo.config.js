const SEO = {
  titleTemplate: '%s | 온카운트',
  defaultTitle: '온카운트',
  description: '온카운트는 다양한 정보를 제공하는 웹사이트입니다.',
  canonical: 'https://on-count.kr',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://on-count.kr',
    site_name: '온카운트',
    images: [
      {
        url: 'https://on-count.kr/icon.png',
        width: 500,
        height: 500,
        alt: '온카운트',
      },
    ],
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary',
  },
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '76x76'
    },
    {
      rel: 'manifest',
      href: '/manifest.json'
    }
  ],
  additionalMetaTags: [
    {
      name: 'theme-color',
      content: '#FFFFFF'
    }
  ],
  additionalJsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: 'https://on-count.kr',
      name: '온카운트',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://on-count.kr/search?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      }
    }
  ]
};

export default SEO;
