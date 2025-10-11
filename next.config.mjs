import withPWAInit from "@ducanh2912/next-pwa";
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nng-phinf.pstatic.net",
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  webpack: (config, { isServer, dev }) => {
    // Add a rule to handle .lottie files as raw assets (like file-loader)
    config.module.rules.push({
      test: /\.lottie$/,
      type: "asset/resource",
      generator: {
        filename: "static/media/[name].[hash][ext]",
      },
    });

    // Optimize bundle splitting
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        heroui: {
          name: 'heroui',
          test: /[\\/]node_modules[\\/]@heroui[\\/]/,
          chunks: 'all',
          priority: 30,
        },
        gsap: {
          name: 'gsap',
          test: /[\\/]node_modules[\\/]gsap[\\/]/,
          chunks: 'all',
          priority: 30,
        },
        ogl: {
          name: 'ogl',
          test: /[\\/]node_modules[\\/]ogl[\\/]/,
          chunks: 'all',
          priority: 30,
        },
        firebase: {
          name: 'firebase',
          test: /[\\/]node_modules[\\/]firebase[\\/]/,
          chunks: 'all',
          priority: 30,
        },
      };
    }

    return config;
  },
};

const withPWA = withPWAInit({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
    fallbacks: {
        document: '/_offline',
    },
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/nng-phinf\.pstatic\.net\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'external-images',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          },
        },
      },
      {
        urlPattern: /\.(?:js|css|woff2|png|jpg|jpeg|svg)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'static-resources',
          expiration: {
            maxEntries: 200,
            maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
          },
        },
      },
    ],
});
export default withPWA(nextConfig);
